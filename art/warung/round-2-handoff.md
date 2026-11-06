# Bu Lastri — Round 2 artwork
7 November 2026. Built-in image generation; source prompts in PROMPTS.md.

## Status
18 selected PNG artwork sheets / plates for animator review. No website code, live assets, deployment or Git history was changed by this delivery. New files are confined to this delivery folder and its adjacent ZIP.

These are generated source artworks, NOT production-accepted animation exports. The brief's pixel-registration gate has NOT passed. No live-page test was run. PNG dimensions and real alpha were checked locally; each selected overlay contains transparent pixels.

## Inventory and frame order
Read left to right, then top to bottom.
- CH-01: four faces sheets, each 2x2: mouth closed, mouth open, closed eyes, half-closed eyes/open mouth. Laugh, sympathy, waduh and thinking. Full heads were generated rather than the requested face-only windows.
- CH-02: transitions 2x2: reach for pestle, release pestle, raise spoon, lower spoon.
- CH-03: night-a 2x2: master listen, listening tilt, glance, offer. Night-b 2x2: welcome, chat-grind, chat-grind speaking, chat-grind blinking. Covers requested six poses plus two speech/blink variants.
- CH-04: sambal stages 2x2: whole ingredients, coarse, smooth, smooth highlight variant. Contents only.
- CH-05: farewell 2x1: right-hand wave, nod.
- BG: day and night 1672x941. Duplicate cobek removed; cracker tin, senthir, clay tea pot and glasses added. No painted stove smoke or hanging sachets. Cat area left empty.
- AM-01: steam 4x2, eight source frames.
- AM-02: kucing day/night 4x2, eight source frames each.
- AM-03: cicak 3x3, still + six crawl candidates + two holds.
- AM-04: smoke 2x4, eight source frames.
- AM-05: sachet day/night 3x3, first six sway candidates + three hold candidates. Use a neutral cell as the separate BG-05 layer.

## Required animator preparation / known deviations
- Character sheets require extraction, scale matching, and registration to the approved master at 627x627, cobek foot (309,616), hair top y34. A 1254x1254 sheet does not establish those internal landmarks. Some row boundaries have insufficient gutter; use individual subject masks instead of blind grid cuts.
- Faces require cropping/warping into the 288x336 window at (196,24), landmark alignment and feathered skin masks. Hair is included in current art. Laugh/sympathy expression intensity remains subtle and needs art-direction review.
- Night poses are newly generated interpretations, not pixel-identical relights. Match them against the actual approved six day frames before use.
- Backgrounds share dimensions and composition, but exact edge registration is unverified. The senthir is on the counter rather than the requested post. Its placement and the tea/glasses still partly approach/overlap the protected x535..1137 zone; move them outside that zone during final plate assembly. The tin's left edge also needs checking against the x380 desktop crop.
- Gecko alpha retains a pale fringe and needs mask cleanup. Check all cutouts over both light and dark backgrounds for coloured edge contamination. Cat cells near sheet edges have limited margin.
- Steam may need lower opacity at final scale. Smoke is intentionally translucent (alpha peaks below255).
- Loop seams, anchors, frame timing and breathing/ear-twitch movement have not been verified in playback. The sheets are animation source frames, not finished seamless loop files.
- Optional bank calendar and cloth-covered rice basket were not added. Existing identity/wardrobe was preserved instead of redesigning hair or apron.

Exact decoded sizes and alpha ranges: image-inventory.json.

