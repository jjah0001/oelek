// Sambal pairing proxy for the GitHub Pages build.
// POST /pair { dish, catalogue } -> { picks:[{id,reason}], tip } | { error }
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
    if (req.method !== "POST" || url.pathname !== "/pair") return json({ error: "not_found" }, 404, okOrigin);
    if (allowed.length && !allowed.includes(origin)) return json({ error: "origin_not_allowed" }, 403, okOrigin);

    let body = null;
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400, okOrigin); }
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
