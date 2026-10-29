#!/usr/bin/env python3
from pathlib import Path
root = Path(__file__).resolve().parents[1]
p = root / 'app/apps.js'
if not p.exists():
    p.write_text('window.TV_APPS = { apps: [], inputs: [] };\n')
print('Ready. python3 -m http.server 8000 --bind 127.0.0.1 --directory app')

import shutil
config = root / 'app/birthday-config.js'
if not config.exists():
    shutil.copy(root / 'app/birthday-config.example.js', config)

# Deterministic shared music is generated locally, not committed as a binary.
import runpy
if not (root / "app/media/happy-birthday.wav").exists():
    runpy.run_path(str(root / "scripts/make-birthday-music.py"))
