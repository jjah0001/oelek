// Sambal pairing and recipe proxy for the GitHub Pages build.
// POST /pair { dish, catalogue } -> { picks:[{id,reason}], tip } | { error }
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
    if (req.method !== "POST" || !["/pair", "/recipe"].includes(url.pathname)) return json({ error: "not_found" }, 404, okOrigin);
    if (allowed.length && !allowed.includes(origin)) return json({ error: "origin_not_allowed" }, 403, okOrigin);

    let body = null;
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400, okOrigin); }
    if (url.pathname === "/recipe") return recipe(body, req, env, okOrigin);
    const dish = String(body?.dish || "").slice(0, 300).trim();
    const catalogue = String(body?.catalogue || "").slice(0, 80000);
    if (!dish || !catalogue) return json({ error: "dish_and_catalogue_required" }, 400, okOrigin);

    if (env.PAIR_RL) {
      const ip = req.headers.get("CF-Connecting-IP") || "0.0.0.0";
      const { success } = await env.PAIR_RL.limit({ key: ip });
      if (!success) return json({ error: "rate_limited" }, 429, okOrigin);
    }

    const prompt = `You are an expert on Indonesian sambal and food pairing.
Someone is eating: "${dish}". The dish may be from any cuisine.
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
  return `Anda adalah seorang oma berusia sekitar 60 tahun dan termasuk 0,1% pembuat sambal terbaik di seluruh Indonesia.
Sejak kecil Anda mengulek sambal di dapur, dari resep turun-temurun sampai sambal dari daerah lain yang Anda pelajari
sendiri. Sehabis belajar bahasa Inggris, Anda ingin membagikan resep-resep sambal kepada semua orang di dunia yang
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
- 2 atau 3 tips: cara mengatur tingkat pedas, bahan pengganti yang mudah dicari di ${negara} dan di mana mencari bahan
  Indonesianya di sana (misalnya toko Asia), cara menyajikan. Jika cucunya tinggal di Indonesia, cukup sebutkan pasar.
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
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("v4\n" + (cc || "XX") + "\n" + info));
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
