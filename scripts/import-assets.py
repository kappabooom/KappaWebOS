#!/usr/bin/env python3
"""Import the user-provided ZIP locally. Private media stays gitignored."""
from pathlib import Path
import sys, zipfile, shutil
root = Path(__file__).resolve().parents[1]
if len(sys.argv) != 2:
    sys.exit('Usage: python3 scripts/import-assets.py /path/to/materials.zip')
private = root / 'private-assets'
private.mkdir(exist_ok=True)
with zipfile.ZipFile(sys.argv[1]) as archive:
    for name in ['design_reference_final.png', 'photo_01_disneyland.jpg', 'photo_02_restaurant.jpg', 'photo_03_birthday.jpg', 'CODEX_執行指令.md', 'README_開始使用.md']:
        (private / name).write_bytes(archive.read(name))
(root / 'app/private').mkdir(exist_ok=True)
shutil.copy(private / 'design_reference_final.png', root / 'app/private/couple-reference.png')
print('Imported locally. Private media is excluded from Git.')
