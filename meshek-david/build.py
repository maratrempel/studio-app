#!/usr/bin/env python3
"""
בונה את עמודי ה-HTML הסטטיים מ-src/pages + src/partials.
שימוש: python3 build.py
כל עמוד מתחיל בבלוק מטא:
<!--
title: ...
description: ...
scripts: shop.js combobox.js
-->
"""
import pathlib, re

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / 'src'
header = (SRC / 'partials/header.html').read_text(encoding='utf-8')
footer = (SRC / 'partials/footer.html').read_text(encoding='utf-8')

TEMPLATE = """<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<meta name="description" content="{description}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:site_name" content="משק דוד">
<meta property="og:locale" content="he_IL">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600;700&family=Frank+Ruhl+Libre:wght@700;900&display=swap">
<link rel="stylesheet" href="assets/css/main.css">
</head>
<body class="page-{slug}">
{header}
<main id="main" tabindex="-1">
{body}
</main>
{footer}
<script src="assets/js/data.js"></script>
<script src="assets/js/store.js"></script>
<script src="assets/js/main.js"></script>
{scripts}
</body>
</html>
"""

for page in sorted((SRC / 'pages').glob('*.html')):
    raw = page.read_text(encoding='utf-8')
    m = re.match(r'\s*<!--(.*?)-->\s*', raw, re.S)
    meta = {}
    if m:
        for line in m.group(1).strip().splitlines():
            k, _, v = line.partition(':')
            meta[k.strip()] = v.strip()
        raw = raw[m.end():]
    scripts = '\n'.join(f'<script src="assets/js/{s}"></script>' for s in meta.get('scripts', '').split())
    html = TEMPLATE.format(
        title=meta.get('title', 'משק דוד'),
        description=meta.get('description', ''),
        slug=page.stem, header=header, body=raw.strip(), footer=footer, scripts=scripts)
    (ROOT / page.name).write_text(html, encoding='utf-8')
    print('built', page.name)
