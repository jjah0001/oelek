#!/usr/bin/env python3
"""Builds Bu Lastri's warung sprites from the artist's sheets.

Inputs, all in art/bu-lastri/ (kept out of the published site):
  art/bu-lastri/oma-ngobrol.webp       2x2 talking sheet; frame 1 is the master face
  art/bu-lastri/bu-lastri-blink-v1.webp        half-closed and closed eye patches
  art/bu-lastri/bu-lastri-grind-chat-v1.webp   2x2 grinding while looking at the visitor
  art/bu-lastri/bu-lastri-grind-cycle-v1.webp  4x2 one concentrating ulek stroke
  art/bu-lastri/bu-lastri-listen-offer-v1.webp 2x2 listen, glance, offer, greet
  round 2 (art/bu-lastri/*-v2.webp, see art/warung/round-2-handoff.md):
  bu-lastri-transitions-v2.webp    2x2 reach for the ulekan, let it go, raise the spoon, lower it
  bu-lastri-farewell-v2.webp       2x1 a small wave, a nod
  bu-lastri-night-a-v2.webp        2x2 lit by the senthir: talk, listen, glance, offer
  bu-lastri-night-b-v2.webp        2x2 welcome, then chat-grind (single frames, not used: chat is a moving grind)
  bu-lastri-faces-<feel>-v2.webp   2x2 heads for laugh, sympathy, waduh, thinking:
                                   mouth closed, mouth open, eyes closed, (half-closed, not used)
  round 3 (see art/bu-lastri/round-3/handoff.md):
  bu-lastri-faces-<feel>-v3.webp   stronger laugh and sympathy heads; they replace the v2 ones
  bu-lastri-night-chat-v3.webp     2x2 the four chat-grind frames lit by the senthir, already registered
  bu-lastri-sambal-masks-v3-*.png  one greyscale mask per frame (white where sambal shows), laid out as in
                                   round-3/mask-layout.json, drawn on the registered day frames
  bu-lastri-sambal-stages-v2.webp  2x2 the cobek's contents: whole, coarse, smooth, (glossy, not used)

Outputs:
  img/bu-lastri-poses.webp   every full pose, registered to one camera
  img/bu-lastri-face.webp    eye and mouth overlays, fitted to each pose's face
  img/bu-lastri-feel.webp    reaction faces (laugh, sympathy, waduh, thinking), fitted to each pose's face
  img/bu-lastri-sambal.webp  the bowl's contents at each stage, cut to each frame's mask
  img/bu-lastri-*-malam.webp the same four at night: her lamp-lit frames, and the rest graded to match them
  js/data/bu-lastri.js       frame tables for js/warung.js

Generated frames drift a little in scale and position, so every frame is
registered to the master by the cobek (which sits still on the counter), and
each face is then located with ECC so the blink and mouth patches land on it.

  pip install opencv-python-headless pillow numpy
  python3 scripts/build-bu-lastri.py
"""
import json, os
import numpy as np, cv2
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, "art", "bu-lastri")
S = 627                      # one frame, in the talking sheet's cell pixels
FACE = (196, 24, 288, 336)   # x, y, w, h of the overlay window inside a frame

def load(p): return np.array(Image.open(p).convert("RGBA"))

def components(im, n):
    """The n largest opaque islands of a sheet, in reading order."""
    a = (im[..., 3] > 8).astype(np.uint8)
    m = cv2.dilate(a, np.ones((9, 9), np.uint8))
    _, lab, st, _ = cv2.connectedComponentsWithStats(m)
    out = []
    for i in list(np.argsort(-st[1:, 4])[:n] + 1):
        x, y, w, h = st[i, :4]
        sub = im[y:y + h, x:x + w].copy()
        sub[..., 3] = sub[..., 3] * (lab[y:y + h, x:x + w] == i)
        out.append(((x, y), sub))
    out.sort(key=lambda t: (round(t[0][1] / (im.shape[0] / 3)), t[0][0]))
    return out

def split_rows(im, n_per_row):
    """Split where figures in neighbouring rows touch, then take islands per row."""
    H, W = im.shape[:2]
    rows = (im[H // 2 - 80:H // 2 + 80, :, 3] > 8).sum(1)
    cut = H // 2 - 80 + int(np.argmin(rows))
    top, bot = im.copy(), im.copy(); top[cut:] = 0; bot[:cut] = 0
    return components(top, n_per_row) + components(bot, n_per_row)

# ---------------------------------------------------------------- register by cobek
ngobrol = load(os.path.join(ART, "oma-ngobrol.webp"))
ref = ngobrol[0:S, 0:S]
refm = (ref[..., 3] > 128).astype(np.float32)
_ys = np.where(refm.sum(1) > 0)[0]; RBOT, RTOP = _ys.max(), _ys.min()
BAND = slice(int(RBOT - 0.17 * (RBOT - RTOP)), S)        # the cobek below its rim

def place(sub, s, tx, ty):
    return cv2.warpAffine(sub, np.float32([[s, 0, tx], [0, s, ty]]), (S, S),
                          flags=cv2.INTER_LINEAR, borderValue=(0, 0, 0, 0))

def iou(sub, s, tx, ty):
    m = (place(sub[..., 3], s, tx, ty) > 128).astype(np.float32)
    A, B = m[BAND], refm[BAND]
    return (A * B).sum() / max(1, ((A + B) > 0).sum())

def fit_bowl(sub):
    a = sub[..., 3] > 128; bot = np.where(a.sum(1) > 0)[0].max()
    c = np.where(a[bot - 6:bot + 1].sum(0) > 0)[0]; cx = (c.min() + c.max()) / 2
    rc = np.where(refm[RBOT - 6:RBOT + 1].sum(0) > 0)[0]; rcx = (rc.min() + rc.max()) / 2
    best = (-1,)
    for s in np.arange(0.5, 1.5, 0.02):
        tx0, ty0 = rcx - s * cx, RBOT - s * bot
        for dx in range(-24, 25, 6):
            for dy in range(-12, 13, 4):
                v = iou(sub, s, tx0 + dx, ty0 + dy)
                if v > best[0]: best = (v, s, tx0 + dx, ty0 + dy)
    for ds, dt in [(0.01, 3), (0.004, 1), (0.002, 0.5)]:
        better = True
        while better:
            better = False; _, s, tx, ty = best
            for c in [(s + ds, tx, ty), (s - ds, tx, ty), (s, tx + dt, ty), (s, tx - dt, ty), (s, tx, ty + dt), (s, tx, ty - dt)]:
                v = iou(sub, *c)
                if v > best[0] + 1e-5: best = (v,) + c; better = True
    return best[1:]

def defringe(im):
    """Give half-transparent edge pixels the colour of the figure, not the generator's backdrop."""
    a = im[..., 3].astype(np.float32) / 255
    solid = (a > 0.9).astype(np.float32)
    rgb = im[..., :3].astype(np.float32)
    num = cv2.GaussianBlur(rgb * solid[..., None], (0, 0), 2.5)
    den = cv2.GaussianBlur(solid, (0, 0), 2.5)[..., None] + 1e-4
    edge = ((a > 0) & (a < 0.9))[..., None]
    out = im.copy(); out[..., :3] = np.where(edge, np.clip(num / den, 0, 255), rgb).astype(np.uint8)
    return out

frames = {}   # name -> registered RGBA frame
for k, (xy, sub) in enumerate(components(ngobrol, 4)):
    frames[f"ngobrol{k}"] = place(sub, *fit_bowl(sub))
for name, file, n, splitter in [
    ("chat", "bu-lastri-grind-chat-v1.webp", 4, components),
    ("cycle", "bu-lastri-grind-cycle-v1.webp", 8, components),
    ("act", "bu-lastri-listen-offer-v1.webp", 2, split_rows),
    ("tr", "bu-lastri-transitions-v2.webp", 2, split_rows),
    ("fw", "bu-lastri-farewell-v2.webp", 2, components),
    ("na", "bu-lastri-night-a-v2.webp", 2, split_rows),
    ("nb", "bu-lastri-night-b-v2.webp", 2, split_rows),
]:
    im = load(os.path.join(ART, file))
    for k, (xy, sub) in enumerate(splitter(im, n)):
        s, tx, ty = fit_bowl(sub)
        frames[f"{name}{k}"] = place(sub, s, tx, ty)
# Night chat-grind: drawn on the registered chat frames, so the cells are used as they are.
_nc = load(os.path.join(ART, "bu-lastri-night-chat-v3.webp"))
for k in range(4):
    r, q = divmod(k, 2); frames[f"nc{k}"] = _nc[r * S:(r + 1) * S, q * S:(q + 1) * S].copy()
# The acting sheet draws her lower behind the cobek than the talking sheet does,
# so lift it part way: the head pops less and the cobek still sits on the counter.
for k in range(4):
    frames[f"act{k}"] = np.roll(frames[f"act{k}"], -14, axis=0)
frames = {k: defringe(v) for k, v in frames.items()}
ref = frames["ngobrol0"]

# ---------------------------------------------------------------- find each face
def gray(im):
    a = im[..., 3:4].astype(np.float32) / 255
    rgb = im[..., :3].astype(np.float32) * a + 128 * (1 - a)
    return cv2.GaussianBlur(cv2.cvtColor(rgb.astype(np.uint8), cv2.COLOR_RGB2GRAY).astype(np.float32) / 255, (0, 0), 1.0)

CRIT = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 400, 1e-7)
_top = np.where(ref[..., 3].sum(1) > 0)[0].min()
FBOX = (262, 400, _top + 50, _top + 200)

def face_warp(T):
    """2x3 map from master-face coordinates to T's coordinates."""
    x0, x1, y0, y1 = FBOX; c = ((x0 + x1) / 2, (y0 + y1) / 2); best = (-1,)
    g2 = gray(T)
    for ang in (-12, -8, -5, -2, 0, 2, 5, 8, 12):
        for sc in (0.94, 0.97, 1.0, 1.03, 1.06):
            R = cv2.getRotationMatrix2D(c, ang, sc)
            g1 = gray(cv2.warpAffine(ref, R, (S, S)))[y0:y1, x0:x1]
            r = cv2.matchTemplate(g2[:400, 100:520], g1, cv2.TM_CCOEFF_NORMED)
            _, v, _, ml = cv2.minMaxLoc(r)
            if v > best[0]: best = (v, R, ml[0] + 100 - x0, ml[1] - y0)
    _, R, dx, dy = best
    W = (np.array([[1, 0, dx], [0, 1, dy], [0, 0, 1]]) @ np.vstack([R, [0, 0, 1]]))[:2].astype(np.float32)
    mask = np.zeros((S, S), np.uint8); mask[y0:y1, x0:x1] = 1
    for mode in (cv2.MOTION_EUCLIDEAN, cv2.MOTION_AFFINE):
        try: _, W = cv2.findTransformECC(gray(ref), g2, W, mode, CRIT, mask, 5)
        except cv2.error: pass
    return W

warps = {k: (np.float32([[1, 0, 0], [0, 1, 0]]) if k == "ngobrol0" else face_warp(v)) for k, v in frames.items()}

# eye patches -> master face
blink = load(os.path.join(ART, "bu-lastri-blink-v1.webp"))
eye_src = [sub for _, sub in components(blink, 2)]
eyes_ref = []
for p in eye_src:
    s = 55 / 348  # eye spacing on the master face / in the patch: the starting guess
    M = np.float32([[s, 0, 270], [0, s, 105]])
    m = (p[..., 3] > 230).astype(np.uint8); ys = np.where(m.sum(1) > 0)[0]; h = ys.max() - ys.min()
    m[int(ys.min() + h * 0.36):int(ys.min() + h * 0.66)] = 0        # the lids differ: match brows and nose
    try:
        _, Wi = cv2.findTransformECC(gray(ref), gray(cv2.GaussianBlur(p, (0, 0), 3)), cv2.invertAffineTransform(M), cv2.MOTION_AFFINE, CRIT, m, 5)
        M = cv2.invertAffineTransform(Wi)
    except cv2.error: pass
    w = cv2.warpAffine(p, M, (S, S), flags=cv2.INTER_AREA, borderValue=(0, 0, 0, 0)).astype(np.float32)
    w[..., :3] = cv2.GaussianBlur(w[..., :3], (0, 0), 0.6)
    eyes_ref.append(w)
# mouth patches -> master face, from the talking sheet's other three frames
mouths_ref = [cv2.warpAffine(frames[f"ngobrol{k}"], warps[f"ngobrol{k}"], (S, S), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP,
                             borderValue=(0, 0, 0, 0)).astype(np.float32) for k in (1, 2, 3)]
EYES = [((310, 143), (25, 14)), ((365, 136), (25, 14))]
MOUTH = [((347, 191), (44, 27))]

def ellipse_mask(W, shapes, feather):
    m = np.zeros((S, S), np.float32)
    for (x, y), (rx, ry) in shapes:
        cx, cy = W @ np.array([x, y, 1.0])
        cv2.ellipse(m, (int(cx), int(cy)), (rx, ry), 0, 0, 360, 1, -1)
    return np.clip(cv2.GaussianBlur(m, (0, 0), feather) * 1.6, 0, 1)

def overlay(patch_ref, name, mask, match=True, F=None, Wp=None):
    """patch_ref (in master-face coordinates) laid onto frame `name` of F (default: the day frames)."""
    F = frames if F is None else F; Wp = warps if Wp is None else Wp
    base = F[name].astype(np.float32)
    p = cv2.warpAffine(patch_ref, Wp[name], (S, S), borderValue=(0, 0, 0, 0))
    rgb = p[..., :3].copy(); w = mask > 0.5
    if match and w.any():
        for c in range(3):
            pm, ps = rgb[..., c][w].mean(), rgb[..., c][w].std() + 1e-3
            bm, bs = base[..., c][w].mean(), base[..., c][w].std() + 1e-3
            rgb[..., c] = (rgb[..., c] - pm) * (0.5 + 0.5 * bs / ps) + bm
    o = np.zeros((S, S, 4), np.uint8)
    o[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    o[..., 3] = (mask * (p[..., 3] / 255) * (base[..., 3] / 255) * 255).astype(np.uint8)
    return o

# ---------------------------------------------------------------- reaction faces -> master face
# Each feeling is a sheet of four heads. Every head is registered to the master face with ECC on the
# nose, cheeks and hairline (the eyes and mouth are what changes), then only the inner face is used.
FEELS = ["laugh", "sympathy", "waduh", "thinking"]
FEEL_VARIANTS = [0, 1, 2]          # mouth closed, mouth open, eyes closed
INNER = [((338, 160), (92, 84))]   # brows, eyes, nose and mouth; not the hair or the jaw line
def head_to_master(h):
    a = h[..., 3] > 128; ys, xs = np.where(a)
    hw = xs.max() - xs.min(); mt = refm.copy()
    rys = np.where(ref[..., 3].sum(1) > 0)[0]; rtop = rys.min()
    rxs = np.where(ref[rtop + 80, :, 3] > 128)[0]; rw = rxs.max() - rxs.min()
    s = rw / (hw * 0.86)                                   # the head sheet includes the bun, the master row does not
    tx = (rxs.min() + rxs.max()) / 2 - s * (xs.min() + xs.max()) / 2; ty = rtop - s * ys.min()
    M = np.float32([[s, 0, tx], [0, s, ty]])
    m = np.zeros((S, S), np.uint8); x0, x1, y0, y1 = FBOX; m[y0:y1, x0:x1] = 1
    m[118:162, 280:400] = 0; m[172:215, 300:395] = 0       # leave out the eyes and the mouth
    mh = cv2.warpAffine(m, M, (h.shape[1], h.shape[0]), flags=cv2.INTER_NEAREST | cv2.WARP_INVERSE_MAP)
    try:
        _, Wi = cv2.findTransformECC(gray(ref), gray(cv2.GaussianBlur(h, (0, 0), 1.2)), cv2.invertAffineTransform(M),
                                     cv2.MOTION_AFFINE, CRIT, mh, 5)
        M = cv2.invertAffineTransform(Wi)
    except cv2.error as e: print("feel ECC failed, using the size guess", e)
    return cv2.warpAffine(h, M, (S, S), flags=cv2.INTER_AREA, borderValue=(0, 0, 0, 0)).astype(np.float32)
feels_ref = {}
def _feel_sheet(feel):   # the newest round of each feeling
    for v in ("v3", "v2"):
        p = os.path.join(ART, f"bu-lastri-faces-{feel}-{v}.webp")
        if os.path.exists(p): return p
for feel in FEELS:
    heads = [sub for _, sub in components(load(os.path.join(ART, _feel_sheet(feel))), 4)]
    feels_ref[feel] = [head_to_master(heads[i]) for i in FEEL_VARIANTS]

# ---------------------------------------------------------------- night frames
# Her lamp-lit frames replace the five poses they were drawn for; every other frame is graded to match
# them: warm on the side of the senthir (screen left), cooler on the other.
NIGHT = {"ngobrol0": "na0", "act0": "na1", "act1": "na2", "act2": "na3", "act3": "nb0", **{f"chat{k}": f"nc{k}" for k in range(4)}}
def halves(im):
    a = im[..., 3] > 200; x = np.arange(S)[None, :].repeat(S, 0); mid = np.median(x[a])
    out = []
    for side in (x < mid, x >= mid):
        px = im[..., :3][a & side].astype(np.float32); out.append((px.mean(0), px.std(0) + 1e-3))
    return out
gain = [[], []]
for d, n in list(NIGHT.items())[:5]:   # the round 2 pairs set the grade; it has not changed since
    for k, ((dm, ds), (nm, ns)) in enumerate(zip(halves(frames[d]), halves(frames[n]))):
        gain[k].append((ns / ds, nm - ns / ds * dm))
gain = [(np.mean([g[0] for g in G], 0), np.mean([g[1] for g in G], 0)) for G in gain]
def grade(im):
    a = im[..., 3] > 0; x = np.arange(S)[None, :].repeat(S, 0)
    mid = np.median(x[im[..., 3] > 200]); t = np.clip((x - mid) / 160 + 0.5, 0, 1)[..., None]
    rgb = im[..., :3].astype(np.float32)
    left = rgb * gain[0][0] + gain[0][1]; right = rgb * gain[1][0] + gain[1][1]
    out = im.copy(); out[..., :3] = np.clip(left * (1 - t) + right * t, 0, 255).astype(np.uint8)
    return out

# ---------------------------------------------------------------- atlases
POSES = (["ngobrol0", "act0", "act1", "act2", "act3"] + [f"chat{k}" for k in range(4)] + [f"cycle{k}" for k in range(8)]
         + ["tr0", "tr1", "tr2", "tr3", "fw0", "fw1"])
ROLE = {"talk": [0], "listen": [1], "glance": [2], "offer": [3], "greet": [4], "chat": list(range(5, 9)), "cycle": list(range(9, 17)),
        "reach": [17], "release": [18], "raise": [19], "lower": [20], "wave": [21], "nod": [22]}
WITH_EYES = ["ngobrol0", "act0", "act1", "act3"] + [f"chat{k}" for k in range(4)] + ["fw0", "fw1"]   # the cycle looks down: no blink needed
WITH_MOUTH = ["ngobrol0", "act3"] + [f"chat{k}" for k in range(4)] + [f"cycle{k}" for k in range(8)] + ["fw0", "fw1"]
WITH_FEEL = ["ngobrol0", "act0", "act2", "act3"] + [f"chat{k}" for k in range(4)] + ["fw0", "fw1"]  # the poses where she faces the visitor

def atlas(cells, cols, w, h):
    rows = -(-len(cells) // cols)
    out = np.zeros((rows * h, cols * w, 4), np.uint8)
    for i, c in enumerate(cells):
        r, q = divmod(i, cols); out[r * h:(r + 1) * h, q * w:(q + 1) * w] = c
    return out, rows

fx, fy, fw, fh = FACE
def _inside(o):
    a = o[..., 3].copy(); a[fy:fy + fh, fx:fx + fw] = 0
    assert a.max() < 8, "an overlay reaches outside the FACE window; widen FACE"

# the reaction faces only cover the inner face: a smaller window than FACE keeps their atlas light
_u = np.zeros((S, S), np.float32)
for n in WITH_FEEL:
    for Wp in (warps, {k: warps[NIGHT.get(k, k)] for k in POSES}): _u = np.maximum(_u, ellipse_mask(Wp[n], INNER, 9))
_ys, _xs = np.where(_u > 0.02); ex, ey = int(_xs.min()) - 2, int(_ys.min()) - 2; ew, eh = int(_xs.max()) - ex + 3, int(_ys.max()) - ey + 3
night_frames = {n: (frames[NIGHT[n]] if n in NIGHT else grade(frames[n])) for n in POSES}
night_warps = {n: (warps[NIGHT[n]] if n in NIGHT else warps[n]) for n in POSES}

# ---------------------------------------------------------------- sambal stages
# The stage patches are fitted once to the bowl's contents, then cut by each frame's mask, so her fingers, the
# ulekan and the spoon stay in front. Only a band across the bowl changes: that band is what the atlas holds.
_layout = json.load(open(os.path.join(ART, "round-3", "mask-layout.json")))
_sheets = {}
SMASK = {}
for e in _layout["frames"]:
    sh = _sheets.setdefault(e["sheet"], np.array(Image.open(os.path.join(ART, e["sheet"])).convert("L")))
    SMASK[POSES[e["frame"] - 1]] = cv2.GaussianBlur(sh[e["y"]:e["y"] + S, e["x"]:e["x"] + S].astype(np.float32) / 255, (0, 0), 0.7)   # soften the pixel steps
assert len(SMASK) == len(POSES)
_u = np.max([m for m in SMASK.values()], 0)
_cnt = max(cv2.findContours((_u > 0.5).astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[0], key=cv2.contourArea)
(_bx, _by), (_bw, _bh), _ang = cv2.fitEllipse(_cnt)
_bw, _bh = max(_bw, _bh) * 1.04, min(_bw, _bh) * 1.12      # a little past the food's edge, so no old sambal shows at the rim
STAGES = [sub for _, sub in components(load(os.path.join(ART, "bu-lastri-sambal-stages-v2.webp")), 4)][:3]   # whole, coarse, smooth
def _stage_patch(st):
    a = st[..., 3] > 128; ys, xs = np.where(a); x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    M = np.float32([[_bw / (x1 - x0), 0, 0], [0, _bh / (y1 - y0), 0]])
    M[0, 2] = _bx - M[0, 0] * (x0 + x1) / 2; M[1, 2] = _by - M[1, 1] * (y0 + y1) / 2
    return cv2.warpAffine(st, M, (S, S), flags=cv2.INTER_AREA, borderValue=(0, 0, 0, 0)).astype(np.float32)
stage_ref = [_stage_patch(st) for st in STAGES]
# light the patches like the frame: the smooth stage against the sambal already drawn in the master frame
_w = SMASK["ngobrol0"] > 0.9
SGAIN = ref[..., :3][_w].astype(np.float32).mean(0) / (stage_ref[2][..., :3][_w].mean(0) + 1e-3)
_ys, _xs = np.where(_u > 0.02)
sx, sy = int(_xs.min()) - 2, int(_ys.min()) - 2; sw, sh = int(_xs.max()) - sx + 3, int(_ys.max()) - sy + 3

def sambal(F, night):
    """Each stage cut to each frame's mask: stage * len(POSES) + pose index in the sambal atlas."""
    cells = []
    for st in stage_ref:
        for name in POSES:
            m = SMASK[name] * (st[..., 3] / 255)
            o = np.zeros((S, S, 4), np.float32); o[..., :3] = st[..., :3] * SGAIN; o[..., 3] = m * 255
            o = np.clip(o, 0, 255).astype(np.uint8)
            if night: o = grade_like(o, F[name])
            cells.append(o[sy:sy + sh, sx:sx + sw])
    return cells

def grade_like(o, night_frame):
    """Night: grade the patch, then match it to the sambal that the night frame itself shows under the mask."""
    g = grade(o); w = o[..., 3] > 230
    rgb = g[..., :3].astype(np.float32)
    if w.sum() > 50:
        nm = night_frame[..., :3][w].astype(np.float32).mean(0); gm = rgb[w].mean(0)
        rgb = rgb * (0.5 + 0.5 * nm / (gm + 1e-3))
    g[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8); return g

def faces(F, Wp):
    """Blink and mouth overlays, and the reaction faces, for one set of frames. Same indices day and night."""
    face_cells, eyes_idx, mouth_idx, feel_cells, feel_idx = [], {}, {}, [], {}
    for i, name in enumerate(POSES):
        if name in WITH_EYES:
            em = ellipse_mask(Wp[name], EYES, 4); eyes_idx[i] = []
            for e in eyes_ref:
                o = overlay(e, name, em, F=F, Wp=Wp); _inside(o)
                eyes_idx[i].append(len(face_cells)); face_cells.append(o[fy:fy + fh, fx:fx + fw])
        if name in WITH_MOUTH:
            mm = ellipse_mask(Wp[name], MOUTH, 5); mouth_idx[i] = []
            for m in mouths_ref:
                # the master's own mouths need no colour matching by day; at night they do
                o = overlay(m, name, mm, match=not (name == "ngobrol0" and F is frames), F=F, Wp=Wp); _inside(o)
                mouth_idx[i].append(len(face_cells)); face_cells.append(o[fy:fy + fh, fx:fx + fw])
        if name in WITH_FEEL:
            fm = ellipse_mask(Wp[name], INNER, 9); feel_idx[i] = {}
            for feel in FEELS:
                feel_idx[i][feel] = []
                for v in feels_ref[feel]:
                    o = overlay(v, name, fm, F=F, Wp=Wp); _inside(o)
                    feel_idx[i][feel].append(len(feel_cells)); feel_cells.append(o[ey:ey + eh, ex:ex + ew])
    return face_cells, eyes_idx, mouth_idx, feel_cells, feel_idx

def save(arr, name, q=84):
    Image.fromarray(arr).save(os.path.join(ROOT, "img", name), quality=q, alpha_quality=90, method=6)

for suffix, F, Wp in [("", frames, warps), ("-malam", night_frames, night_warps)]:
    face_cells, eyes_idx, mouth_idx, feel_cells, feel_idx = faces(F, Wp)
    poses_img, prow = atlas([F[n] for n in POSES], 6, S, S)
    face_img, frow = atlas(face_cells, 8, fw, fh)
    feel_img, erow = atlas(feel_cells, 8, ew, eh)
    save(poses_img, f"bu-lastri-poses{suffix}.webp"); save(face_img, f"bu-lastri-face{suffix}.webp", 86)
    save(feel_img, f"bu-lastri-feel{suffix}.webp", 80)
    sambal_img, srow = atlas(sambal(F, suffix == "-malam"), 8, sw, sh)
    save(sambal_img, f"bu-lastri-sambal{suffix}.webp", 82)
    print(suffix or "day", "poses", poses_img.shape, "face cells", len(face_cells), "feel cells", len(feel_cells))

data = {"size": S, "poses": {"cols": 6, "rows": prow, "count": len(POSES)}, "face": {"cols": 8, "rows": frow, "x": fx, "y": fy, "w": fw, "h": fh},
        "feelGrid": {"cols": 8, "rows": erow, "x": ex, "y": ey, "w": ew, "h": eh},
        "sambal": {"cols": 8, "rows": srow, "x": sx, "y": sy, "w": sw, "h": sh, "stages": len(stage_ref)}, "role": ROLE, "eyes": eyes_idx, "mouth": mouth_idx, "feel": feel_idx}
with open(os.path.join(ROOT, "js", "data", "bu-lastri.js"), "w") as f:
    f.write("// Generated by scripts/build-bu-lastri.py: Bu Lastri's frame tables for js/warung.js.\n")
    f.write("// poses: grid of full frames; face: grid of eye/mouth overlays, placed at x,y,w,h inside a frame.\n")
    f.write("// role: frames per pose; eyes[pose] = [half-closed, closed]; mouth[pose] = three open shapes;\n")
    f.write("// feel[pose][laugh|sympathy|waduh|thinking] = [mouth closed, mouth open, eyes closed] in the feelGrid atlas.\n")
    f.write("// sambal: the bowl's contents, cell stage * poses + pose (stages: whole, coarse, smooth).\n")
    f.write("// The -malam atlases use the same indices.\n")
    f.write("const BU_LASTRI=" + json.dumps(data, separators=(",", ":")) + ";\n")
