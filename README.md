# Oelek

An English atlas of Indonesian sambal: 257 fully profiled sambals across 35 provinces, each illustrated as a card, with a province map, sambal of the day, dish pairing, a spice primer and a "Which sambal are you?" quiz.

Plain HTML, CSS and JavaScript with no build step (fonts load from Google Fonts). Open `index.html` in a browser.

## Layout

```
index.html                 page markup; loads the scripts below in order
style.css
js/data/
  sambals.js               flavour axes (DIMS), the 34 core profiles (S) and families (STYLE)
  sambals-regional.js      the 207 regional profiles l0–l206, pushed onto S
  sambals-additional.js    16 further documented profiles, pushed onto S
  sources.js               citation keys and every linked source URL (SRC)
  provinces.js             province codes and names (PROV)
  spices.js                spice primer (SPICES)
  quiz.js                  quiz questions and weights (QUIZ)
  social-icons.js          brand marks for the share buttons (Simple Icons, CC0), as data URIs
js/
  core.js                  helpers and the combined index (ALL, byId)
  art.js                   procedural recipe illustrations
  dialog.js                flavour radar and the detail dialog
  home.js                  sambal of the day and families panel
  map.js                   province map
  atlas.js                 card grid and filters
  rempah.js                spice primer page
  pairing.js               dish pairing (Claude + keyword fallback)
  quiz.js                  personality quiz
  share.js                 share the quiz result as an image to social apps
  app.js                   hash routing and boot
  kampung.js               animated Merapi kampung backdrop and synthesised soundscape
worker/                    Cloudflare Worker that proxies pairing requests to Claude
build.js                   optional: inlines everything into dist/oelek.html
```

The scripts share globals and must load in the order listed in `index.html`: data first, then `core.js`, then the pages, then `app.js`. To add a sambal, append an object to `js/data/sambals-regional.js` and add any new source URL to `js/data/sources.js`.

`node build.js` produces a single self-contained `dist/oelek.html` for use as a claude.ai artifact, where pairing calls Claude directly.

## Notes

- **Dish pairing:** inside claude.ai the pairing asks Claude directly. Elsewhere, including GitHub Pages, it asks Claude through the `oelek-pair` Cloudflare Worker in `worker/`. If the Worker is busy or unavailable, the page falls back to its built-in keyword matcher.
- **Kampung backdrop:** behind every page is a village at the foot of Merapi that follows the visitor's clock (dawn mist, egrets, midday cicadas, afternoon kites, bats at dusk, fireflies and lava glow at night, afternoon rain on some wet-season days). The moon shows its real phase. The "Kampung sounds" button plays a soundscape synthesised in Web Audio: roosters, birds, cicadas, frogs, crickets, tokek, an owl, the night watch's kentongan striking the hour, and a neighbour's gamelan in the evening. Sound never starts on its own. Preview another hour with `?jam=21.5` and rain with `?hujan=1`.
- **Quiz results:** saved in the visitor's browser only.
- **Sharing a quiz result:** works like Tea Time. The result becomes a 1080×1350 image (sambal, persona, match, flavour radar and site link) that fits Instagram, Facebook, WeChat and WhatsApp. "Share my result" opens the phone's share menu, which reaches any installed app; there are also Save image, Copy image and Copy link buttons. One button per app covers Instagram, Facebook, WhatsApp, WeChat, Messenger, X, Threads, Telegram, LINE, Xiaohongshu, Weibo and TikTok. On a phone, the image is copied and the app opens ready to paste. On a computer, the image is copied or saved and the app's web share page opens where it has one. Brand marks are from Simple Icons (CC0); each brand's own guidelines apply.
- **Sources:** each sambal links to its source. Heat levels, flavour profiles, illustrations and persona texts are editorial.

## Profile coverage

All 207 formerly Listed entries now use the existing full-profile layout, initially bringing the atlas to 241 Profiled entries and 0 Listed entries. Each has representative ingredients, suggested pairings, a six-axis editorial flavour profile, a description and source links. Regional recipes vary; supporting seasonings are editorial reconstructions where a source records only a defining ingredient. Province-only records appear in the map panel without invented coordinates. Original catalogue IDs are preserved. The source spelling Picak corrects the old Pikak entry, which remains searchable as an alias. Duo Sale now uses dried small fish, correcting the original mango/coconut data.

## Live website

https://jjah0001.github.io/oelek/

GitHub Actions deploys `index.html`, `style.css` and `js/` to GitHub Pages on every push to `main`. The ingredient illustrations are drawn in code, so there are no image files. Dish pairing calls the Worker at `PAIR_PROXY` in `js/pairing.js`.

## Pairing proxy (Cloudflare Worker)

`worker/` holds a small Worker that forwards pairing requests to the Anthropic API. Your API key stays server-side, the Worker only accepts calls from `https://jjah0001.github.io`, and each IP is limited to 10 requests a minute.

```sh
cd worker
npm install
npx wrangler deploy                          # https://oelek-pair.<subdomain>.workers.dev
npx wrangler secret put ANTHROPIC_API_KEY    # once
```

If the URL changes, update `PAIR_PROXY` in `js/pairing.js`. To change the model, edit `ANTHROPIC_MODEL` in `worker/wrangler.toml`.

### My sambal shelf

Open any sambal profile to save it as **On my shelf**, **Want to try**, or
**Tried before**. The shelf includes neutral jar illustrations, status/province
grouping, optional grams remaining, personal ratings, tasting notes, and a
province journey map. There are no colour categories.

Collection data is stored only in this device's browser localStorage under
`oelek.shelf.v1`. No account, server storage, or automatic device sync is used.
Clearing site data removes the shelf. Export creates a JSON backup; Import
merges a valid Oelek backup, updating matching entries and preserving others.
Storage is specific to the site's origin: local previews and the deployed site
have separate shelves. If storage is blocked, changes remain in memory and the
interface prompts the user to export them.

## Community star ratings

Each profile has five tappable stars, a public average/count, a 5-to-1 breakdown,
and an option to change or remove your vote. Atlas cards show average ratings.
Community stars are independent of the **private shelf rating**: shelf imports,
notes, and private ratings are never uploaded automatically.

### Activate ratings (site owner only)

1. Use your existing [Supabase](https://supabase.com/dashboard) account/project
   from Tea Time, or create a project. Oelek uses separate `oelek_*` tables and
   does not modify Tea Time's data.
2. In the project's **SQL Editor**, run `supabase/schema.sql`. It creates the
   catalogue, ratings, private hourly counters, own-vote read policy, public
   aggregate view, and voting function. Re-running it preserves existing votes.
3. Enable **Authentication → Sign In / Providers → Allow anonymous sign-ins**.
4. Copy the project's URL and **publishable** API key (a legacy `anon` key also
   works). Never use a secret or `service_role` key in website configuration.
5. In the Oelek GitHub repository, **Settings → Secrets and variables → Actions
   → Variables**, add `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`.
6. Re-run the **Deploy Oelek** workflow or push to `main`.

Visitors don't create accounts or enter an email/password. On their first vote,
Supabase creates an anonymous session stored in this browser. The database
allows one vote per session per sambal and up to 60 changes/removals per hour;
the UI also has a four-second cooldown. Clearing site data or changing browser
creates a fresh identity, so this is not a guarantee of one vote per person.
Existing public votes remain in the database after browser data is cleared;
that browser can no longer manage those votes without its original session.

Only public vote totals can be read by everyone. Each session can read its own
votes and write only through the validated `oelek_rate` function. The shelf
continues using localStorage only, without cloud sync. Unconfigured/offline
ratings display an honest status instead of fake averages or local-only totals.

For a local preview, set the same environment variables and run
`node scripts/configure-ratings.js`, then `node build.js` for the standalone
copy. GitHub Pages generates its config from repository variables on deployment.
The Supabase browser SDK is loaded from a pinned CDN URL only when configured.

Setup references: https://supabase.com/docs/guides/auth/auth-anonymous and
https://supabase.com/docs/guides/getting-started/api-keys.

## Additional profiles

Sixteen source-linked profiles bring the current catalogue to 257. These are independently documented additions, not a reconstruction of the 257 entries in the UGM survey. Home-recipe locations are labelled as such; flavour scores and suggested pairings remain editorial. Existing IDs and card templates are unchanged.

For an existing Supabase project, run the **contents** of `supabase/additional-sambals.sql` in its SQL Editor to enable voting on the new profiles. This only registers their IDs and leaves votes untouched. Fresh installations can use the updated `supabase/schema.sql`.
