"""Builds transparent logo variants from RSSlogo.jpg (cream paper background -> alpha).

Light variants (navy + gold) for light backgrounds, "-light" variants (ivory + gold) for navy.
The source is upscaled first so edges stay smooth when the mark is shown large.
"""
import numpy as np
from PIL import Image, ImageFilter

SCALE = 3
src_img = Image.open("RSSlogo.jpg").convert("RGB")
src_img = src_img.resize((src_img.width * SCALE, src_img.height * SCALE), Image.LANCZOS)
src_img = src_img.filter(ImageFilter.MedianFilter(5))  # smooth out paper grain / jpeg noise
src = np.asarray(src_img).astype(float) / 255

BG_L, NAVY_L = 0.93, 0.17
lum = src.mean(axis=2)
warm = src[..., 0] - src[..., 2]  # gold is warm, navy and paper are not

def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)

a_ink = smoothstep(0.12, 0.85, (BG_L - lum) / (BG_L - NAVY_L))
a_gold = smoothstep(0.10, 0.28, warm)
alpha = np.maximum(a_ink, a_gold)
is_gold = (a_gold > a_ink)[..., None]

def build(ink, gold, name, box):
    rgb = np.where(is_gold, np.array(gold) / 255, np.array(ink) / 255)
    rgba = np.dstack([rgb * 255, alpha * 255]).astype("uint8")
    img = Image.fromarray(rgba, "RGBA").crop(tuple(v * SCALE for v in box))
    img.save(f"assets/img/{name}", optimize=True)

full_box = (130, 110, 515, 535)
mark_box = (165, 110, 475, 362)
NAVY, GOLD, IVORY, GOLD_LIGHT = (19, 35, 63), (176, 141, 87), (246, 241, 231), (212, 178, 118)

build(NAVY, GOLD, "logo-full.png", full_box)
build(NAVY, GOLD, "logo-mark.png", mark_box)
build(IVORY, GOLD_LIGHT, "logo-full-light.png", full_box)
build(IVORY, GOLD_LIGHT, "logo-mark-light.png", mark_box)
Image.open("RSSlogo.jpg").resize((180, 180), Image.LANCZOS).save("assets/img/favicon.png")
print("ok")
