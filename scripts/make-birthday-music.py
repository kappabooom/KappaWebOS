"""Render a local, newly synthesized instrumental Happy Birthday melody."""
import math, wave, struct
from pathlib import Path
rate=22050; beat=60/88
notes=[(67,.75),(67,.25),(69,1),(67,1),(72,1),(71,2),(0,.35),(67,.75),(67,.25),(69,1),(67,1),(74,1),(72,2),(0,.35),(67,.75),(67,.25),(79,1),(76,1),(72,1),(71,1),(69,1),(0,.35),(77,.75),(77,.25),(76,1),(72,1),(74,1),(72,2),(0,2)]
samples=[]
for midi,beats in notes:
 length=beats*beat
 for i in range(int(length*rate)):
  t=i/rate
  if midi:
   f=440*2**((midi-69)/12)
   env=min(1,t/.012)*math.exp(-2.5*t)*min(1,max(0,(length-t)/.08))
   tone=sum(a*math.sin(2*math.pi*f*h*t) for h,a in [(1,.75),(2,.18),(3,.055),(4,.015)])
   v=.36*env*tone
  else:v=0
  samples.append(v)
# Small room echo, with headroom retained.
for delay,gain in [(int(.13*rate),.12),(int(.27*rate),.06)]:
 for i in range(len(samples)-1,delay-1,-1):samples[i]+=samples[i-delay]*gain
out=Path(__file__).resolve().parents[1]/'app/media/happy-birthday.wav'
with wave.open(str(out),'wb') as w:
 w.setparams((1,2,rate,0,'NONE','not compressed'))
 w.writeframes(b''.join(struct.pack('<h',int(max(-1,min(1,v))*32767)) for v in samples))
print('Rendered',round(len(samples)/rate,2),'seconds; peak',round(max(abs(v) for v in samples),3))
