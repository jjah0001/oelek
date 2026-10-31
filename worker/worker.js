// Sambal pairing and recipe proxy for the GitHub Pages build.
// POST /pair { dish, catalogue } -> { picks:[{id,reason}], tip } | { error }
// POST /recipe { id, info } -> { serves, time, ingredients:[{item,amount,note}], steps:[], tips:[], keeps:{room,fridge,freezer,signs}, safety } | { error }
//   Recipes are cached at the edge for 30 days per sambal and description, so each one is written once.
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

function recipePrompt(info) {
  return `You are a cook who grew up making sambal in Indonesia and now teaches it to home cooks abroad.
Write a home recipe, in plain English, for the sambal described here. Stay true to its region and to the
ingredients listed; do not add ingredients the tradition does not use. If the description is thin, write the
most common version and say so in the first tip.

${info}

Rules:
- Enough for a small bowl (about 4 people as a condiment). Metric amounts, with cups or spoons where natural.
- 6 to 12 ingredients, each with an amount; give the Indonesian name in the note where it helps (e.g. "terasi").
- 4 to 8 steps, each one or two sentences, in the order a cook does them: prep, roast or fry, grind in the cobek, season, rest.
- 2 or 3 tips: how to adjust the heat, substitutes outside Indonesia, serving.
- "keeps": how long this sambal keeps and how, judged from how it is made (raw and fresh sambals keep far less than
  cooked ones fried until the oil separates; fermented ones keep longest). Give "room" (at room temperature, covered),
  "fridge" (in a clean airtight jar) and "freezer" (or "not recommended"), each as a short span like "1 day" or
  "2 to 3 weeks", plus a "signs" sentence saying when to throw it out.
- If the sambal is fermented or uses raw or fermented fish or shrimp, durian, or fermented fruit, put one sentence of
  food-safety advice in "safety" (clean jars, refrigeration, when to discard); otherwise leave it empty.

Reply with only JSON in this shape:
{"serves":"4 as a condiment","time":"25 minutes","ingredients":[{"item":"bird's eye chillies","amount":"10","note":"cabai rawit"}],"steps":["..."],"tips":["..."],"keeps":{"room":"1 day","fridge":"1 week","freezer":"1 month","signs":"..."},"safety":""}`;
}

async function recipe(body, req, env, okOrigin) {
  const id = String(body?.id || "").slice(0, 60).replace(/[^a-z0-9-]/gi, "");
  const info = String(body?.info || "").slice(0, 1500).trim();
  if (!id || !info) return json({ error: "id_and_info_required" }, 400, okOrigin);

  // one cache entry per sambal and description, so a recipe is written once and shared
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode("v2\n" + info));
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
  const out = await askClaude(env, recipePrompt(info), 2500);
  if (out?.error) return json(out, 502, okOrigin);
  if (!out || !Array.isArray(out.ingredients) || !Array.isArray(out.steps) || !out.steps.length) return json({ error: "unparsed" }, 502, okOrigin);
  const clean = {
    serves: String(out.serves || "").slice(0, 80), time: String(out.time || "").slice(0, 80),
    ingredients: out.ingredients.slice(0, 16).map((x) => ({ item: String(x?.item || "").slice(0, 120), amount: String(x?.amount || "").slice(0, 60), note: String(x?.note || "").slice(0, 120) })),
    steps: out.steps.slice(0, 10).map((x) => String(x).slice(0, 500)),
    tips: (out.tips || []).slice(0, 4).map((x) => String(x).slice(0, 400)),
    safety: String(out.safety || "").slice(0, 400),
    keeps: out.keeps && typeof out.keeps === "object" ? Object.fromEntries(["room", "fridge", "freezer", "signs"].map((k) => [k, String(out.keeps[k] || "").slice(0, k === "signs" ? 300 : 60)])) : null,
  };
  await cache.put(key, new Response(JSON.stringify(clean), { headers: { "content-type": "application/json", "cache-control": "public, max-age=2592000" } }));
  return json(clean, 200, okOrigin);
}
