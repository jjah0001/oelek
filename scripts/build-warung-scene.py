#!/usr/bin/env python3
"""Builds the warung's scene: the day and night plates, the counter strips and the ambient loops.

Inputs, all in art/warung/ (kept out of the published site), from the round 2 artwork:
  warung-day-v2.webp, warung-night-v2.webp   1672 x 941 plates
  loop-steam-day-v2.webp     4x2 steam wisps (one set, day and night)
  loop-smoke-day-v2.webp     2x4 thin smoke over Merapi (one set, day and night)
  loop-kucing-day-v2.webp, loop-kucing-night-v2.webp   4x2 a sleeping cat breathing
  loop-cicak-night-v2.webp   3x3 still, six crawl frames, two holds
  loop-sachet-day-v2.webp, loop-sachet-night-v2.webp   3x3 a strip of kopi sachets swaying

Outputs:
  img/warung.webp, img/warung-malam.webp           the plates
  img/warung-meja.webp, img/warung-malam-meja.webp the counter strip (y 680..941) for each
  img/warung-loop-*.webp                           one horizontal strip of frames per loop
  js/data/warung-scene.js                          where each loop sits in the 1672 x 941 world, and its timing

  python3 scripts/build-warung-scene.py
"""
import json, os
import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, "art", "warung")
IMG = os.path.join(ROOT, "img")
W, H = 1672, 941
MEJA_Y = 680

def rgba(name): return Image.open(os.path.join(ART, name)).convert("RGBA")

# ---------------------------------------------------------------- plates and counter strips
for src, out in [("warung-day-v2.webp", "warung"), ("warung-night-v2.webp", "warung-malam")]:
    im = Image.open(os.path.join(ART, src)).convert("RGB")
    assert im.size == (W, H), im.size
    im.save(os.path.join(IMG, out + ".webp"), quality=82, method=6)
    strip = im.crop((0, MEJA_Y, W, H)).convert("RGBA")
    a = np.full((H - MEJA_Y, W), 255, np.uint8)
    a[:10] = np.linspace(0, 255, 10, dtype=np.uint8)[:, None]       # a soft top edge, as before
    strip.putalpha(Image.fromarray(a))
    strip.save(os.path.join(IMG, out + "-meja.webp"), quality=82, alpha_quality=90, method=6)

# ---------------------------------------------------------------- loops
def cells(name, cols, rows):
    im = rgba(name); w, h = im.size
    return [im.crop((c * w // cols, r * h // rows, (c + 1) * w // cols, (r + 1) * h // rows))
            for r in range(rows) for c in range(cols)]

def strip(frames, scale, out):
    """Crop every frame to the union of their opaque boxes (so the anchor stays put), scale, lay them in a row."""
    boxes = [f.getchannel("A").point(lambda v: 255 if v > 6 else 0).getbbox() for f in frames]
    x0 = min(b[0] for b in boxes); y0 = min(b[1] for b in boxes)
    x1 = max(b[2] for b in boxes); y1 = max(b[3] for b in boxes)
    pad = 4; x0, y0 = max(0, x0 - pad), max(0, y0 - pad); x1, y1 = x1 + pad, y1 + pad
    cw, ch = round((x1 - x0) * scale), round((y1 - y0) * scale)
    row = Image.new("RGBA", (cw * len(frames), ch), (0, 0, 0, 0))
    for i, f in enumerate(frames):
        row.paste(f.crop((x0, y0, x1, y1)).resize((cw, ch), Image.LANCZOS), (i * cw, 0))
    row.save(os.path.join(IMG, out + ".webp"), quality=86, alpha_quality=90, method=6)
    return cw, ch

def defringe_pale(f):
    """The gecko came with a pale halo: pull half-transparent edge pixels toward the body colour and thin them."""
    a = np.array(f).astype(np.float32)
    al = a[..., 3] / 255
    edge = (al > 0) & (al < 0.85)
    a[..., :3][edge] *= 0.6
    a[..., 3][edge] *= 0.7
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))

loops = []
def loop(key, frames, seq, scale, anchor, at, fps, when, **extra):
    """anchor: which point of the frame box sits at world point `at`: ("bottom"|"top"|"center")."""
    cw, ch = strip([frames[i] for i in seq], scale, "warung-loop-" + key)
    x, y = at
    left = x - cw / 2
    top = {"bottom": y - ch, "top": y, "center": y - ch / 2}[anchor]
    loops.append(dict(key=key, src="img/warung-loop-%s.webp" % key, n=len(seq), w=cw, h=ch,
                      x=round(left, 1), y=round(top, 1), fps=fps, when=when, **extra))

steam = cells("loop-steam-day-v2.webp", 4, 2)
loop("steam", steam, list(range(8)), 0.30, "bottom", (1182, 652), 6, "both", opacity=0.7)
smoke = cells("loop-smoke-day-v2.webp", 2, 4)
loop("smoke", smoke, list(range(8)), 0.32, "bottom", (764, 206), 4, "both", opacity=0.7)
for when, src in [("day", "loop-kucing-day-v2.webp"), ("night", "loop-kucing-night-v2.webp")]:
    cat = cells(src, 4, 2)
    loop("kucing-" + when, cat, [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1], 0.39, "bottom", (470, 868), 5, when)
for when, src in [("day", "loop-sachet-day-v2.webp"), ("night", "loop-sachet-night-v2.webp")]:
    sachet = cells(src, 3, 3)
    loop("sachet-" + when, sachet, [0, 1, 2, 1, 0, 4, 5, 4], 0.62, "top", (474, 128), 3, when)
cicak = [defringe_pale(f) for f in cells("loop-cicak-night-v2.webp", 3, 3)]
# still, crawl 1..6: the page holds the still frame and runs the crawl only while it moves along the beam
loop("cicak", cicak, [0, 1, 2, 3, 4, 5, 6], 0.24, "center", (430, 118), 12, "night", path=[[0, 0], [70, 0], [130, 0]])

with open(os.path.join(ROOT, "js", "data", "warung-scene.js"), "w") as f:
    f.write("// Generated by scripts/build-warung-scene.py: the warung's ambient loops, in 1672 x 941 world pixels.\n")
    f.write("// Each src is one row of n frames, w x h each, placed with its top-left at x,y. when: day, night or both.\n")
    f.write("const WARUNG_SCENE=" + json.dumps({"w": W, "h": H, "loops": loops}, separators=(",", ":")) + ";\n")
for l in loops: print(l["key"], l["n"], l["w"], l["h"], l["x"], l["y"])
