#!/usr/bin/env python3
"""Build the local patched Helper using verified published native binaries.
Run after checking out the documented upstream revision and applying the patch.
No TV connection, installation, configuration or pairing occurs here.
"""
import argparse,hashlib,io,shutil,subprocess,sys,tarfile
from pathlib import Path
p=argparse.ArgumentParser(description=__doc__)
p.add_argument('--upstream-dir',required=True,type=Path)
p.add_argument('--baseline-ipk',required=True,type=Path)
p.add_argument('--ares-package',default='ares-package')
a=p.parse_args();r=a.upstream_dir.resolve();raw=a.baseline_ipk.read_bytes()
expected='52510c9115a518a05849f6618516b41886aea54b7f74ea4763ffeeaf63c03e7b'
if hashlib.sha256(raw).hexdigest()!=expected:sys.exit('Published Helper baseline checksum mismatch')
if raw[:8]!=b'!<arch>\n':sys.exit('Invalid IPK archive')
base=r/'build/birthday-helper';base.mkdir(parents=True,exist_ok=True)
for source,dest in [('native/app','app-input'),('native/service','service-input')]:
 d=base/dest
 if d.exists():shutil.rmtree(d)
 d.mkdir()
 for f in (r/source).iterdir():
  if f.suffix in ['.js','.json','.png']:shutil.copy2(f,d/f.name)
shutil.copytree(r/'native/app/vendor',base/'app-input/vendor')
shutil.copy2(r/'native/app/state-permissions.js',base/'service-input/state-permissions.js')
for src,dst in [('app-input','app'),('service-input','service')]:
 subprocess.run([sys.executable,'-m','scripts.helper_build','--input',str(base/src),'--output',str(base/dst)],cwd=r,check=True)
pos=8;found=set()
while pos<len(raw):
 h=raw[pos:pos+60];name=h[:16].decode().strip().rstrip('/');size=int(h[48:58]);body=raw[pos+60:pos+60+size];pos+=60+size+(size%2)
 if name.startswith('data.tar'):
  with tarfile.open(fileobj=io.BytesIO(body),mode='r:*') as t:
   for n in ['detach','relay','resume']:
    m=next(m for m in t.getmembers() if m.isfile() and m.name.endswith('/com.local.nativehome/'+n))
    f=base/'app'/n;f.write_bytes(t.extractfile(m).read());f.chmod(0o755);found.add(n)
if len(found)!=3:sys.exit('Published native components missing')
for n in ['app','service']:
 (base/n/'state').mkdir(exist_ok=True);(base/n/'state/.keep').touch()
(r/'dist').mkdir(exist_ok=True)
subprocess.run([a.ares_package,str(base/'app'),str(base/'service'),'-o',str(r/'dist')],cwd=r,check=True)
subprocess.run([sys.executable,'scripts/fix-package-data.py','dist/com.local.nativehome_0.6.21_arm.ipk'],cwd=r,check=True)
print('Built local Helper only. Nothing installed or activated.')
