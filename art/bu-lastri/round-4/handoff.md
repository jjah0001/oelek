# Round 4 complete night ulek artwork

CH-09: all eight lamp-lit frames, 10–17, delivered in playing order.

## Deliverables

- `bu-lastri-night-ulek-v4.png`: 2508 x 1254 RGBA PNG; 4 columns x 2 rows; 627 square cells; no gutters. Top row 10–13, bottom row 14–17.
- `frames/`: eight individual 627 x 627 transparent PNGs.
- `review/eight-frames.png`: side-by-side dark-background review.
- `review/chat-and-loop-wrap.png`: accepted Round 3 chat, frame 17, frame 10 from left to right.
- `review/loop-5fps.gif` and `loop-10fps.gif`: independent looping previews on navy (GIF colour quantization is not part of the PNG artwork).
- `review/mask-contact-check.png`: unchanged Round 3 mask overlays plus hand/mortar crops, order 10–17.
- `review/displacement.json`: measured alignment and apron colour samples.
- Prompt records: exact prompts and source paths for the built-in imagegen tool.

## Source and production

Registered day atlas `img/bu-lastri-poses.webp` at commit `50e3300`.
SHA-256 `b1b7c173d938d22375ad471357715d0e15e0d262323f04472b2d2649ece8a1c3`.
Phase-1 frames 10 and 14 are unchanged. The remaining six were relit from their own day frames with frame 10 as lighting reference. Generated artwork was uniformly resized to 627 square and assembled without warping, registration shifts or colour correction. Real alpha preserved. No existing masks or website files changed.

## Alignment check (CH-09.4)

Same method as Round 3: SIFT feature matching, ratio 0.7, hand/mortar region x140:500 y430:615, median Euclidean feature displacement. No geometric correction applied.

| Frame | Matches | Median displacement (px) | <=1 px |
|---|---:|---:|---|
| 10 | 100 | 0.9771 | Pass |
| 11 | 123 | 0.7792 | Pass |
| 12 | 99 | 0.7185 | Pass |
| 13 | 137 | 0.5711 | Pass |
| 14 | 111 | 0.6844 | Pass |
| 15 | 98 | 0.8023 | Pass |
| 16 | 100 | 0.6863 | Pass |
| 17 | 136 | 0.8671 | Pass |

All eight pass this numerical test. Median feature displacement is not a guarantee that every contact-edge pixel is identical. Frame 10 is near the limit.

## Lighting and review limits

Visual inspection of the strip and loop-wrap comparison shows consistent warm screen-left key and cool screen-right fill, downward eyes and closed mouths. Mask overlays retain fingers and pestles in front. The ulek frames have somewhat stronger hair highlights than the Round 3 chat reference.

A fixed apron region (x285:415, y280:440) has mean luminance from 124.97 to 134.95 / 255 across frames. Frame 14 is darkest; its moving arm also changes this sample. Frame 17 to 10 differs by 3.11 / 255 in that region. These are diagnostic samples, not proof of flicker-free motion. Inspect the included 5 and 10 fps loops and the actual page before final acceptance.

The user authorized phase 2 after receiving phase 1. Live page, mobile/desktop playback and actual whole/coarse/smooth-stage integration have not been tested here. Final CH-09 acceptance remains with the animator. No website edits, commit, push or deployment performed.
