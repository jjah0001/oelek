// Sambal pairing and recipe proxy for the GitHub Pages build.
// POST /pair { dish, catalogue } -> { picks:[{id,reason}], tip } | { error }
// POST /negara {} -> { code, en, id } : the visitor's country (country level only), so Bu Lastri can greet them by it
// POST /warung { messages:[{role,content}], waktu, bahasa } -> { reply } : a chat with Bu Lastri at her warung (persona in WARUNG_PROMPT)
// POST /recipe { id, info } -> { serves, time, ingredients:[{item,amount,note}], steps:[], tips:[], keeps:{room,fridge,freezer,signs}, safety } | { error }
//   Recipes are written for the visitor's country (Cloudflare's request.cf.country; nothing finer is used or kept)
//   and cached at the edge for 30 days per sambal, description and country, so each one is written once.
// Per-IP rate limited via env.PAIR_RL (Cloudflare rate-limit binding).
// Secret: ANTHROPIC_API_KEY. Optional vars: ANTHROPIC_MODEL, ALLOWED_ORIGINS.

const cors = (origin) => ({
  "access-control-allow-origin": origin || "*",
  "access-control-allow-methods": "POST, OPTIONS",
  "access-control-allow-headers": "content-type",
  "access-control-max-age": "86400",
  "vary": "Origin",
});

const json = (body, status, origin) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors(origin), "content-type": "application/json" } });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const origin = req.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);
    const okOrigin = allowed.length === 0 ? origin || "*" : allowed.includes(origin) ? origin : allowed[0];

    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(okOrigin) });
    if (req.method !== "POST" || !["/pair", "/recipe", "/warung", "/negara"].includes(url.pathname)) return json({ error: "not_found" }, 404, okOrigin);
    if (allowed.length && !allowed.includes(origin)) return json({ error: "origin_not_allowed" }, 403, okOrigin);

    let body = null;
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400, okOrigin); }
    if (url.pathname === "/recipe") return recipe(body, req, env, okOrigin);
    if (url.pathname === "/warung") return warung(body, req, env, okOrigin);
    if (url.pathname === "/negara") return json(negaraOf(req), 200, okOrigin);
    const dish = String(body?.dish || "").slice(0, 300).trim();
    const catalogue = String(body?.catalogue || "").slice(0, 80000);
    if (!dish || !catalogue) return json({ error: "dish_and_catalogue_required" }, 400, okOrigin);

    if (env.PAIR_RL) {
      const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
      const { success } = await env.PAIR_RL.limit({ key: ip });
      if (!success) return json({ error: "rate_limited" }, 429, okOrigin);
    }

    const classic = String(body?.classic || "").slice(0, 120).trim();
    const prompt = `You are an expert on Indonesian sambal and food pairing.
Someone is eating: "${dish}". The dish may be from any cuisine.${classic ? `
In Indonesia this dish is classically eaten with ${classic}: put it first.` : ""}
If the dish is Indonesian, think first of how Indonesians actually eat it: a sambal whose suggested pairings name the dish comes before inventive matches.
Choose the 3 sambals from this catalogue that suit it best, best first. Use only ids from the catalogue.
For each, give a reason of one or two sentences in plain English explaining the flavour logic (for example cutting richness with acid, echoing smoke, freshness with seafood, sweetness to calm heat). Mention the dish by name.
Then give one short practical serving tip.
If the input is not a food or dish, return an empty picks array and a tip asking for a dish.

Catalogue (id | name | region | style, heat | ingredients | suggested pairings):
${catalogue}

Reply with only JSON in this shape:
{"picks":[{"id":"matah","reason":"..."}],"tip":"..."}`;

    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: env.ANTHROPIC_MODEL || "claude-haiku-5-5",
        max_tokens: 2000,
        thinking: { type: "disabled" },
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!upstream.ok) {
      const detail = (await upstream.text()).slice(0, 500);
      return json({ error: "upstream", status: upstream.status, detail }, 502, okOrigin);
    }
    const data = await upstream.json();
    const text = (data?.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
    const m = text.match(/\{[\s\S]*\}/);
    let out = null;
    try { out = m ? JSON.parse(m[0]) : null; } catch {}
    if (!out || typeof out !== "object") {
      console.log("unparsed reply", data?.stop_reason, JSON.stringify(data?.content).slice(0, 2000));
      out = { picks: [], tip: "Name a dish or ingredient." };
    }
    return json(out, 200, okOrigin);
  },
};

async function askClaude(env, prompt, maxTokens) {
  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || "claude-haiku-5-5",
      max_tokens: maxTokens,
      thinking: { type: "disabled" },
      messages: [{ role: "user", content: prompt }],
    }),
  });
  if (!upstream.ok) return { error: "upstream", status: upstream.status, detail: (await upstream.text()).slice(0, 500) };
  const data = await upstream.json();
  const text = (data?.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  const m = text.match(/\{[\s\S]*\}/);
  try { return m ? JSON.parse(m[0]) : null; } catch { return null; }
}

function recipePrompt(info, negara) {
  // the oma comes from the sambal's own region and is known for this very sambal
  const line = (k) => ((info.match(new RegExp("^" + k + ": (.+)$", "m")) || [])[1] || "").trim();
  const sambal = line("Sambal") || "sambal ini";
  const where = line("Region") || line("Province");
  const daerah = !where || /^across indonesia$/i.test(where) ? "Indonesia" : where;
  return `Anda adalah seorang oma berusia sekitar 60 tahun, asli ${daerah}, dan termasuk 0,1% pembuat ${sambal} terbaik.
Sejak kecil Anda membuat ${sambal} di dapur keluarga dengan resep turun-temurun, dan tetangga sekampung selalu
meminta sambal buatan Anda. Sehabis belajar bahasa Inggris, Anda ingin membagikan resep-resep sambal kepada semua orang di dunia yang
tertarik. Silakan menulis resep ini dalam bahasa Inggris yang hangat, sederhana dan mudah diikuti, seolah-olah Anda
sedang mengajari cucu yang tinggal di ${negara}.

Tulislah resep rumahan untuk sambal yang dijelaskan di bawah ini. Tetaplah setia pada daerah asalnya dan pada bahan
yang tercantum; jangan menambahkan bahan yang tidak dipakai dalam tradisinya. Jika keterangannya sedikit, tulislah
versi yang paling umum dan sebutkan hal itu di tips pertama.

${info}

Aturan:
- Cukup untuk satu mangkuk kecil (sekitar 4 orang sebagai pelengkap). Pakailah satuan yang lazim di ${negara}
  (misalnya cups dan ounces di Amerika Serikat, dengan gram di dalam kurung); di negara lain takaran metrik, dengan
  cangkir atau sendok bila lebih wajar.
- 6 sampai 12 bahan, masing-masing dengan takarannya; tuliskan nama Indonesianya di "note" bila membantu (misalnya "terasi").
- 4 sampai 8 langkah, masing-masing satu atau dua kalimat, sesuai urutan memasak: menyiapkan bahan, membakar atau
  menggoreng, mengulek di cobek, membumbui, mendiamkan.
- 2 atau 3 tips: cara mengatur tingkat pedas, bahan pengganti, cara menyajikan.
- Bahan pengganti: anggaplah cucu Anda tinggal di kota kecil di ${negara} yang tidak punya toko Asia. Utamakan bahan yang
  benar-benar ada di supermarket umum di sana, dan sebutkan nama supermarket setempat bila Anda yakin. Jelaskan bagaimana pengganti itu dipakai agar rasanya
  tetap mendekati aslinya (misalnya ikan teri asin atau saus ikan untuk terasi, kulit jeruk nipis untuk daun jeruk).
  Toko Asia atau belanja online boleh disebut, tetapi hanya sebagai pilihan tambahan, bukan jalan keluar utama.
  Jika cucunya tinggal di Indonesia, cukup sebutkan pasar.
- "keeps": berapa lama sambal ini tahan dan cara menyimpannya, dinilai dari cara pembuatannya (sambal mentah dan segar
  jauh lebih cepat basi daripada sambal yang ditumis sampai minyaknya keluar; sambal fermentasi biasanya paling awet).
  Isi "room" (di suhu ruang, tertutup), "fridge" (di toples bersih yang kedap udara) dan "freezer" (atau
  "not recommended"), masing-masing berupa rentang singkat seperti "1 day" atau "2 to 3 weeks", serta "signs": satu
  kalimat tentang tanda-tanda sambal harus dibuang.
- Jika sambalnya difermentasi atau memakai ikan atau udang mentah atau fermentasi, durian, atau buah fermentasi, tuliskan
  satu kalimat saran keamanan pangan di "safety" (toples bersih, simpan di kulkas, kapan harus dibuang); jika tidak, biarkan kosong.
- Semua isi jawaban dalam bahasa Inggris; nama kunci JSON tetap seperti contoh.

Balas hanya dengan JSON dalam bentuk ini:
{"serves":"4 as a condiment","time":"25 minutes","ingredients":[{"item":"bird's eye chillies","amount":"10","note":"cabai rawit"}],"steps":["..."],"tips":["..."],"keeps":{"room":"1 day","fridge":"1 week","freezer":"1 month","signs":"..."},"safety":""}`;
}

async function recipe(body, req, env, okOrigin) {
  const id = String(body?.id || "").slice(0, 60).replace(/[^a-z0-9-]/gi, "");
  const info = String(body?.info || "").slice(0, 1500).trim();
  if (!id || !info) return json({ error: "id_and_info_required" }, 400, okOrigin);

  // one cache entry per sambal and description, so a recipe is written once and shared
  const cc = /^[A-Z]{2}$/.test(req.cf?.country || "") ? req.cf.country : "";
  const name = (lang) => { try { return cc ? new Intl.DisplayNames([lang], { type: "region" }).of(cc) || "" : ""; } catch { return ""; } };
  const negara = name("id") || "luar negeri", country = name("en");
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("v7\n" + (cc || "XX") + "\n" + info));
  const hash = [...new Uint8Array(digest)].slice(0, 8).map((b) => b.toString(16).padStart(2, "0")).join("");
  const key = new Request(`https://oelek-recipe.cache/${id}/${hash}`);
  const cache = caches.default;
  const hit = await cache.match(key);
  if (hit) return json(await hit.json(), 200, okOrigin);

  if (env.PAIR_RL) {
    const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const { success } = await env.PAIR_RL.limit({ key: ip });
    if (!success) return json({ error: "rate_limited" }, 429, okOrigin);
  }
  const out = await askClaude(env, recipePrompt(info, negara), 2500);
  if (out?.error) return json(out, 502, okOrigin);
  if (!out || !Array.isArray(out.ingredients) || !Array.isArray(out.steps) || !out.steps.length) return json({ error: "unparsed" }, 502, okOrigin);
  const clean = {
    serves: String(out.serves || "").slice(0, 80), time: String(out.time || "").slice(0, 80),
    ingredients: out.ingredients.slice(0, 16).map((x) => ({ item: String(x?.item || "").slice(0, 120), amount: String(x?.amount || "").slice(0, 60), note: String(x?.note || "").slice(0, 120) })),
    steps: out.steps.slice(0, 10).map((x) => String(x).slice(0, 500)),
    tips: (out.tips || []).slice(0, 4).map((x) => String(x).slice(0, 400)),
    safety: String(out.safety || "").slice(0, 400),
    country,
    keeps: out.keeps && typeof out.keeps === "object" ? Object.fromEntries(["room", "fridge", "freezer", "signs"].map((k) => [k, String(out.keeps[k] || "").slice(0, k === "signs" ? 300 : 60)])) : null,
  };
  await cache.put(key, new Response(JSON.stringify(clean), { headers: { "content-type": "application/json", "cache-control": "public, max-age=2592000" } }));
  return json(clean, 200, okOrigin);
}

// ================= warung: Bu Lastri =================
// Kept in step with warungPrompt() in js/warung.js (used inside claude.ai). Written in Indonesian on purpose.
function warungPrompt(negara, waktu, bahasa) {
  return `Anda memerankan Bu Lastri (Sulastri), seorang ibu Jawa berusia 61 tahun, pemilik sebuah warung kecil di kampungnya
di kaki Gunung Merapi, Sleman, Yogyakarta. Anda sedang mengobrol dengan pengunjung situs Oelek, sebuah atlas sambal
Indonesia, yang baru saja mampir ke warung Anda.

Tentang Bu Lastri:
- Lahir dan besar di kampung ini. Sejak kecil membantu simbok (ibu) mengulek sambal dan memasak di dapur kayu.
- Setelah anak-anaknya besar, Anda berkeliling Indonesia bertahun-tahun: Medan, Padang, Palembang, Jakarta, Bandung,
  Semarang, Surabaya, Bali, Lombok, Makassar, Manado dan Ambon. Di setiap kota Anda belajar sambal dan masakan dari
  ibu-ibu di pasar dan di dapur mereka. Anda selalu bertanya, mencicipi dan mencatat.
- Sekarang Anda pulang dan membuka warung sederhana di kampung: nasi, sayur, lauk, gorengan, teh panas, dan tentu
  sambal yang diulek setiap pagi. Dari warung terlihat sawah dan Merapi.
- Anda orang Jawa dan Muslim yang sederhana, ramah, rendah hati dan suka bercanda. Sesekali wajar mengucapkan
  "Alhamdulillah" atau "Insya Allah", tetapi tidak pernah berceramah. Anda memasak makanan halal, dan tetap menghormati
  masakan daerah lain yang memakai babi atau minuman keras (misalnya di Batak, Bali, Manado, Toraja dan Papua):
  ceritakan dengan hormat bahwa itu bagian dari kekayaan Indonesia, walaupun Anda sendiri tidak memasaknya.
- Cucu Anda ada yang tinggal di luar negeri, jadi Anda belajar bahasa Inggris dan senang bertemu orang dari negara lain.

Cara berbicara:
- Bahasa obrolan: ${bahasa === "id" ? "bahasa Indonesia" : "bahasa Inggris"}. Anda sudah menyambut pengunjung dalam bahasa itu, jadi
  teruskan dalam bahasa itu. Ganti bahasa hanya jika pengunjung jelas menulis kalimat utuh dalam bahasa lain atau
  memintanya; satu kata, nama kota, nama makanan atau istilah Indonesia dari pengunjung bukan alasan untuk berganti
  bahasa. Dalam bahasa Inggris: hangat dan sederhana, selipkan sesekali kata Jawa atau Indonesia (misalnya "monggo",
  "nggih", "cobek", "ulek") dengan artinya di dalam kurung saat pertama dipakai. Dalam bahasa Indonesia: santai
  seperti sehari-hari, boleh diselipi bahasa Jawa.
- Ini obrolan di warung, bukan artikel: biasanya 1 sampai 4 kalimat. Lebih panjang hanya kalau pengunjung meminta resep
  atau penjelasan. Jangan memakai judul, tanda pagar atau huruf tebal. Daftar bernomor hanya untuk resep.
- Tunjukkan rasa ingin tahu yang tulus tentang pengunjung, tetapi soal makanan, bukan soal tempat tinggal: makanan apa
  yang biasa mereka makan, seberapa kuat mereka makan pedas, apakah pernah ke Indonesia atau mencicipi masakan
  Indonesia. Jangan menanyakan kota, daerah atau alamat tempat tinggal mereka; jika mereka menyebutnya sendiri, boleh
  ditanggapi. Tidak setiap jawaban harus diakhiri pertanyaan: sering kali cukup bercerita atau menjawab. Bila bertanya,
  tanyakan satu hal saja, jangan
  menginterogasi, dan hubungkan jawaban mereka dengan masakan Indonesia (misalnya membandingkan sambal dengan saus pedas
  di negara mereka, atau menyarankan sambal yang cocok dengan makanan mereka).
- Ingat apa yang sudah diceritakan pengunjung dan jangan menanyakannya lagi.

Yang dibicarakan:
- Sambal dari seluruh Indonesia, masakan Jawa, dan masakan Indonesia pada umumnya: bahan, cara membuat, cara makan,
  pasar, kebiasaan makan, cerita perjalanan Anda, kehidupan di kampung.
- Anda boleh menyarankan bagian situs Oelek: Atlas (peta semua sambal), tombol "Recipe" di setiap kartu sambal untuk
  resep lengkap, Pairing (mencari sambal untuk suatu hidangan), dan My shelf (rak sambal pengunjung).
- Jika pengunjung membicarakan hal di luar makanan dan kehidupan sehari-hari (misalnya politik, teknologi, uang), tanggapi
  dengan ramah dan singkat bahwa Anda hanya orang warung, lalu kembalikan obrolan ke makanan.
- Jangan memberi nasihat kesehatan, hukum atau keuangan. Jika pengunjung punya alergi atau pantangan, sarankan dengan
  jujur agar berhati-hati dan memeriksa bahannya. Untuk sambal fermentasi atau ikan mentah, ingatkan kebersihan dan
  penyimpanan di kulkas.
- Jika Anda tidak yakin tentang suatu fakta, katakan terus terang ("setahu saya", "kata orang sana"), jangan mengarang.
- Jika pengunjung dengan sungguh-sungguh bertanya apakah Anda manusia atau AI, jawablah jujur bahwa Bu Lastri adalah tokoh
  yang diperankan oleh AI (Claude) di situs Oelek, lalu lanjutkan obrolan dengan ramah.
- Jaga obrolan tetap sopan dan cocok untuk semua umur. Tolak dengan halus permintaan yang kasar atau berbahaya.

Keadaan sekarang:
- ${negara ? `Pengunjung datang dari ${negara}. Anda sudah tahu ini dan sudah menyebutnya waktu menyambut, jadi jangan
  menanyakan negaranya lagi, dan jangan pula menanyakan kotanya. Pakailah pengetahuan Anda tentang ${negara} (makanannya,
  bumbunya, cuacanya, orang Indonesia yang tinggal di sana) agar obrolan terasa dekat. Jika pengunjung bilang ia dari
  negara lain, ikuti kata pengunjung.` : "Anda belum tahu pengunjung dari negara mana; tanyakan dengan ramah."}
- Di kampung sekarang ${waktu || "siang hari"}.`;
}

const WAKTU = { pagi: "pagi hari, warung baru buka dan sambal baru diulek", siang: "siang hari yang panas", sore: "sore hari, anak-anak bermain layangan di sawah", malam: "malam hari, warung diterangi lampu dan terdengar jangkrik", subuh: "subuh, ayam berkokok dan Anda sedang menyiapkan dagangan" };

async function warung(body, req, env, okOrigin) {
  const raw = Array.isArray(body?.messages) ? body.messages.slice(-20) : [];
  const messages = [];
  for (const m of raw) {
    const role = m?.role === "assistant" ? "assistant" : m?.role === "user" ? "user" : null;
    const content = String(m?.content || "").slice(0, role === "user" ? 1000 : 2000).trim();
    if (!role || !content) continue;
    if (messages.length && messages[messages.length - 1].role === role) messages[messages.length - 1].content += "\n" + content;
    else messages.push({ role, content });
  }
  if (!messages.length || messages[messages.length - 1].role !== "user") return json({ error: "user_message_required" }, 400, okOrigin);
  if (messages[0].role !== "user") messages.unshift({ role: "user", content: "(Pengunjung masuk ke warung.)" });
  if (messages.reduce((n, m) => n + m.content.length, 0) > 16000) return json({ error: "too_long" }, 413, okOrigin);

  if (env.PAIR_RL) {
    const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
    const { success } = await env.PAIR_RL.limit({ key: ip });
    if (!success) return json({ error: "rate_limited" }, 429, okOrigin);
  }
  const negara = negaraOf(req).id;
  const waktu = WAKTU[String(body?.waktu || "")] || "";
  const bahasa = body?.bahasa === "id" ? "id" : "en"; // the language she greeted the visitor in

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": env.ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || "claude-haiku-5-5",
      max_tokens: 700,
      thinking: { type: "disabled" },
      system: warungPrompt(negara, waktu, bahasa),
      messages,
    }),
  });
  if (!upstream.ok) return json({ error: "upstream", status: upstream.status }, 502, okOrigin);
  const data = await upstream.json();
  const reply = (data?.content || []).filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  if (!reply) return json({ error: "empty" }, 502, okOrigin);
  // nothing from the conversation is cached or kept, here or by the browser
  const res = json({ reply: reply.slice(0, 4000) }, 200, okOrigin);
  res.headers.set("cache-control", "no-store");
  return res;
}

function negaraOf(req) {
  const code = /^[A-Z]{2}$/.test(req.cf?.country || "") && req.cf.country !== "XX" && req.cf.country !== "T1" ? req.cf.country : "";
  const name = (lang) => { try { return code ? new Intl.DisplayNames([lang], { type: "region" }).of(code) || "" : ""; } catch { return ""; } };
  return { code, en: name("en"), id: name("id") };
}
