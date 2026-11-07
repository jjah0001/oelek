# Bu Lastri Round 3 — image delivery
7 November 2026

## Delivered
- CH-06: bu-lastri-faces-laugh-v3.png and bu-lastri-faces-sympathy-v3.png. Each1254x1254 RGBA, 2x2 heads. Reading order: closed mouth, open mouth, closed eyes, spare. Stronger expressions checked beside the resting face at120px head height; see review/faces-at-120px.png.
- CH-07: 23 individual masks in masks/frame-01.png through frame-23.png, each627x627, 8-bit greyscale. White reveals replacement sambal; black protects everything else. Masks are derived from the CURRENT REGISTERED DAY atlas, not raw generated sheets. Hand/tool exclusions refined against every frame; approximately1–2px feather on food-side tool boundaries and hard rim boundary.
- CH-07 sheets: bu-lastri-sambal-masks-v3-a.png (frames1–8), -b (9–16), -c (17–23, final cell black). Each2568x1274, four columns/two rows, exactly20px internal gutters, no exterior gutter. Coordinates in mask-layout.json.
- CH-08: bu-lastri-night-chat-v3.png, four627x627 cells in a1254x1254 RGBA sheet, corresponding exactly in ORDER to frames6,7,8,9. Warm key from screen left, cool right fill. This is the complete chat-grind cycle, not unrelated single poses.
- Optional night ulek cycle10–17 was not requested as mandatory and is not included.

## Source and workflow
Registered source: GitHub origin/main commit773537f, img/bu-lastri-poses.webp; SHA256 in mask-layout.json. Its frame roles agree with AppendixA. Local working checkout was older; the live source was read separately without checking it out or running the website build.
Artwork: built-in image-generation tool, prompts in PROMPTS.md.
Masks: pixel-coordinate segmentation with explicit foreground hand/tool exclusions; no full-body redraw. These are technical greyscale coverage maps.
No website code, current live images, background plates, props or loops were modified. Nothing was deployed or pushed.

## QA and acceptance limits
- Confirmed PNG formats, alpha on artwork, all23 masks and exact mask dimensions/gutters.
- review/smooth-stage-check.png tests the accepted smooth-stage artwork through all23 masks. Fingers, hands and pestles remain visible; frame21's raised spoon remains untouched. This is a local composite, not a live-page screenshot.
- Frame6 source and mask are included separately for the animator's required alignment gate.
- Faces at120px clearly differ from the normal smile in local review. Their final fit still goes through the animator's existing face-registration pipeline.
- Night geometric check uses107–112 matched features per frame in the hand/bowl area. Median corresponding-feature displacement: frame6 0.74px, frame7 0.76px, frame8 0.90px, frame9 1.47px. These are diagnostic feature measurements, NOT proof of pixel-identical geometry. The generated night sheet needs final registration and playback acceptance, particularly frame9.
- Some small dark food specks and contact-edge pixels remain ambiguous in colour-based segmentation. Inspect the supplied full-resolution composites for any old-sambal fringe before final acceptance. Masks follow the visible food edge rather than covering the entire geometric bowl ellipse.
- Masks refer to the registered DAY source frames. If the production pipeline substitutes independently registered night poses1–5, transfer/recheck the masks for those substituted poses.
- This delivery has NOT passed the brief's live desktop/phone approval gates; the user's image-only scope was preserved. Do not treat local review as animator sign-off.

## Frame inventory
1 talk,2 listen,3 glance,4 offer,5 welcome;6–9 chat-grind;10–17 ulek stroke;18 reach,19 release,20 raise spoon,21 lower spoon;22 wave,23 nod.

