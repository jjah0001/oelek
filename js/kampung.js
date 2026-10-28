"use strict";
// Kampung at the foot of Merapi, drawn behind every page and following the visitor's clock:
// roosters and mist at dawn, egrets over the sawah by day, cicadas at noon, kites in the
// afternoon, bats at dusk, then crickets, frogs, tokek, fireflies and Merapi's glow at night.
// Sound is synthesised in Web Audio (no audio files) and only plays after the visitor asks.
// Preview another hour with ?jam=21.5 and rain with ?hujan=1 (or ?hujan=0 for none).
(()=>{
const cv=document.getElementById("kampung");
if(!cv||!cv.getContext) return;
const cx=cv.getContext("2d");
const sky=document.createElement("canvas"), land=document.createElement("canvas");
const qs=new URLSearchParams(location.search);
const jamQ=parseFloat(qs.get("jam")), forced=isNaN(jamQ)?null:((jamQ%24)+24)%24, boot=Date.now();
const hourNow=()=>{ if(forced!==null) return (forced+(Date.now()-boot)/36e5)%24; const d=new Date(); return d.getHours()+d.getMinutes()/60+d.getSeconds()/3600; };

// ================= helpers =================
const rng=s=>()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
const rand=(a,b)=>a+Math.random()*(b-a);
const ss=x=>x<=0?0:x>=1?1:x*x*(3-2*x);
const bump=(h,a,b,c,d)=>ss((h-a)/(b-a))*(1-ss((h-c)/(d-c)));
const hex=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const rgb=(c,a=1)=>`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const TAU=Math.PI*2;

// ================= time of day =================
// Afternoon rain is likelier in the wet season (Nov–Mar); the same day always gets the same weather.
const today=new Date(), hq=qs.get("hujan");
const rainyDay=rng(today.getFullYear()*1000+today.getMonth()*40+today.getDate())()<[.7,.7,.6,.45,.2,.08,.05,.05,.1,.3,.55,.65][today.getMonth()];
const rainAt=h=>hq==="1"?1:hq==="0"||!rainyDay?0:bump(h,13.6,14.6,16.4,17.4);
function moods(h){
  const rain=rainAt(h);
  return {h,rain,
    day:bump(h,5.3,6.6,17.3,18.3),
    night:1-bump(h,4.8,5.9,18.1,19.3),
    dawn:bump(h,4.2,5.2,6.6,7.8),
    noon:bump(h,9.5,11.5,14.5,16),
    sore:bump(h,14.8,15.8,17.4,18.2)*(1-rain),
    dusk:bump(h,17.2,17.9,18.7,19.5),
    kitchen:bump(h,4.8,5.5,7.4,8.6)+bump(h,15.8,16.6,18.2,19)};
}
const PHASES=[[3.5,"Subuh","before dawn · roosters in the mist"],[5.3,"Fajar","sunrise over the sawah"],[7.5,"Pagi","morning · birdsong and the river"],[11,"Siang","midday · cicadas in the heat"],[15,"Sore","afternoon · kites over the fields"],[17.6,"Senja","dusk · bats and the first frogs"],[19.2,"Malam","night · crickets, tokek, kentongan"],[23,"Tengah malam","deep night · Merapi glows"]];
function phaseOf(h){ if(rainAt(h)>.3) return [0,"Hujan","rain on the roof · the frogs wake"]; let p=PHASES[PHASES.length-1]; for(const q of PHASES) if(h>=q[0]) p=q; return p; }

// sky top, sky bottom, Merbabu, Merapi, hills, sawah, foreground, mist
const KEYS=[
  [0,   "#04071a","#10183a","#121a36","#0d1430","#0a1026","#0b1424","#050912","#1a2244"],
  [4.4, "#070b26","#272a58","#1d2246","#151a3a","#10162e","#121a2e","#070a16","#2a2f5a"],
  [5.5, "#2c3a7a","#e8977a","#5a5486","#3c3a66","#2d3550","#3a4458","#141826","#b9a3b8"],
  [6.4, "#6f9fd6","#ffd09a","#8a94bc","#5b6684","#4a6650","#6c8a5a","#203522","#e6d6cc"],
  [8.5, "#4e97e2","#cfe7f4","#93aacb","#6b8399","#55784a","#7da452","#2c4a26","#e4eef2"],
  [12.5,"#3a8ae0","#dcf0fa","#a2b8d2","#7590a6","#5c8250","#8db458","#335428","#eef6f8"],
  [15.8,"#5c9ad6","#f2e2b4","#a0a6c0","#768296","#5a7848","#8ca24c","#30482a","#f2ead8"],
  [17.6,"#45579a","#ff9858","#86688c","#57496a","#3c4046","#6a6a3e","#221e1c","#f0b890"],
  [18.4,"#1f275a","#c85a68","#46385e","#2c2646","#1e2032","#2a2a36","#100e18","#6a5070"],
  [19.4,"#060a20","#172046","#141c3a","#0e1530","#0a1028","#0c1426","#060912","#1e2648"],
  [24,  "#04071a","#10183a","#121a36","#0d1430","#0a1026","#0b1424","#050912","#1a2244"],
].map(([h,...c])=>[h,c.map(hex)]);
function palette(h,rain){
  let i=0; while(KEYS[i+1][0]<=h) i++;
  const [a,A]=KEYS[i], [b,B]=KEYS[i+1], t=ss((h-a)/(b-a));
  const P=A.map((c,j)=>mix(c,B[j],t));
  if(rain) P.forEach((c,j)=>{ const g=(c[0]*.3+c[1]*.59+c[2]*.11)*.82; P[j]=mix(c,[g,g+2,g+8],rain*.7); });
  const [top,bot,far,mtn,hill,field,fg,mist]=P;
  return {top,bot,far,mtn,hill,field,fg,mist};
}
// Facing north towards Merapi from Yogyakarta, the sun and moon rise on the right.
const RISE=5.6, SET=17.75, SYN=29.530588853;
const moonAge=()=>(((Date.now()/864e5-10962.76)/SYN)%1+1)%1; // days since the 6 Jan 2000 new moon
function arc(hh){ const e=(hh-RISE)/(SET-RISE), up=Math.sin(Math.PI*e); return {x:W*(.93-.86*e), y:G.yH-up*(G.yH-H*.1), up}; }

// ================= sprites =================
function sprite(col,core){
  const s=document.createElement("canvas"); s.width=s.height=64;
  const c=s.getContext("2d"), g=c.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,rgb(col,1));
  if(core) g.addColorStop(core,rgb(col,.85)); else g.addColorStop(.25,rgb(col,.45));
  g.addColorStop(1,rgb(col,0));
  c.fillStyle=g; c.fillRect(0,0,64,64); return s;
}
const SP={fire:sprite([214,255,120]), lava:sprite([255,110,40]), warm:sprite([255,190,90])};

// ================= layout =================
let W=0,H=0,dpr=1,G=null,P=null,M=null,baseH=-1;
const ST={t:0,emit:0,clouds:[],puffs:[],lava:[],trail:[],flocks:[],bats:[],flies:[],drops:[],smoke:[],mist:[],shoot:null,flash:0};
function layout(){
  const w=cv.clientWidth, h=cv.clientHeight;
  if(!w||!h||(w===W&&h===H&&G)) return;
  W=w; H=h; dpr=Math.min(window.devicePixelRatio||1,1.5);
  for(const c of [cv,sky,land]){ c.width=Math.round(W*dpr); c.height=Math.round(H*dpr); }
  const R=rng(2930), r=(a,b)=>a+R()*(b-a);
  const yH=H*.64, px=W*.62, py=H*.19, hw=Math.max(W*.42,H*.5);
  const profile=(cx0,peak,half,shape)=>{ const pts=[]; let n=0; for(let x=-4;x<=W+8;x+=4){ n=n*.96+(R()-.5)*1.2; const d=Math.abs(x-cx0)/half; pts.push([x,Math.min(yH+2,shape(d,x)+n*d*H*.004)]); } return pts; };
  const mPts=profile(px,py,hw,(d,x)=>d<.03?py+H*.003*Math.sin(x*.7)*(x>px?1.6:1):py+(yH-py)*Math.min(1,Math.pow((d-.03)/1.25,x<px?.6:.66)));
  const bPts=profile(W*.2,H*.29,Math.max(W*.4,H*.45),d=>H*.29+(yH-H*.29)*Math.min(1,Math.pow(d/1.15,1.25)));
  const mY=x=>{ const i=Math.max(0,Math.min(mPts.length-1,Math.round((x+4)/4))); return mPts[i][1]; };
  const hY=x=>yH-H*.03+H*.012*Math.sin(x/W*6.3+1)+H*.007*Math.sin(x/W*15+2);
  const gullies=[]; for(let i=0;i<34;i++){ const side=R()<.5?-1:1, x0=px+side*hw*r(.01,.09), x1=px+side*hw*r(.15,.7), y1=mY(x1)+(yH-mY(x1))*r(.1,.8); gullies.push([x0,mY(x0)+2,(x0+x1)/2+side*r(-8,8),(mY(x0)+y1)/2+r(0,10),x1,y1]); }
  const trees=[]; for(let x=0;x<W;x+=r(5,16)) trees.push({x,y:hY(x)+2,r:H*r(.006,.014)});
  const palms=[]; for(let i=0;i<9;i++){ const x=r(0,W); palms.push({x,y:hY(x)+3,h:H*r(.04,.065),lean:r(-.15,.15)}); }
  const houses=[]; for(const c of [.12,.38,.72,.9]) for(let i=0,n=2+(R()*3|0);i<n;i++){ const x=W*c+r(-1,1)*W*.04, w=H*r(.022,.034); houses.push({x,y:hY(x)+H*.006,w,h:w*.45,joglo:R()<.35,lit:R()<.85}); }
  const yT=yH+H*.01, n=7, edges=[];
  for(let i=0;i<=n;i++){ const amp=H*.004*(1+i*1.2), f=r(.003,.008), ph=r(0,TAU), y0=yT+(H*.99-yT)*Math.pow(i/n,1.3), e=[]; for(let x=-8;x<=W+16;x+=8) e.push([x,y0+amp*Math.sin(x*f+ph)]); edges.push(e); }
  const stars=[]; for(let i=0;i<170;i++) stars.push({x:r(0,W),y:r(0,yH*.85),r:r(.6,1.7),b:r(.3,1),w:r(.5,2.5),ph:r(0,TAU)});
  const grass=[]; for(let x=0;x<W;x+=r(3,8)) grass.push({x,h:H*r(.012,.035),ph:r(0,TAU)});
  const kites=[[[200,36,36],[250,248,240]],[[240,186,40],[240,186,40]],[[40,92,200],[250,248,240]]].map(c=>{ const gx=W*r(.2,.8); return {ax:W*r(.15,.85),ay:H*r(.1,.3),c,ph:r(0,TAU),gx,gy:hY(gx)}; });
  G={yH,px,py,hw,mPts,bPts,mY,hY,gullies,trees,palms,houses,edges,stars,grass,kites,
     fgY:x=>H*.955+H*.012*Math.sin(x*.013+1.7)};
  ST.clouds=Array.from({length:10},()=>{ const s=H*rand(.03,.07); return {x:rand(-.2,1)*W,y:H*rand(.05,.38),s,v:rand(3,8),p:Array.from({length:5+(Math.random()*4|0)},()=>({dx:rand(-1.6,1.6)*s,dy:rand(-.35,.15)*s,r:s*rand(.6,1.1)}))}; });
  ST.mist=Array.from({length:12},(_,i)=>({x:rand(-.3,1)*W,y:i<7?yH+H*rand(-.05,.02):H*rand(.7,.95),w:W*rand(.3,.6),h:H*rand(.04,.09),v:rand(2,6)}));
  ST.flies=Array.from({length:45},()=>({x:rand(0,W),y:rand(yH+H*.02,H*.96),a:rand(0,TAU),w:rand(1.5,3.5),ph:rand(0,TAU)}));
  ST.drops=Array.from({length:180},()=>({x:rand(0,W),y:rand(0,H),l:rand(8,18),v:rand(500,800)}));
  ST.puffs=[]; ST.trail=[]; ST.lava=[]; ST.smoke=[]; ST.flocks=[]; ST.bats=[];
  baseH=-1;
}

// ================= static layers =================
function poly(c,pts){ c.beginPath(); c.moveTo(-10,H+10); for(const [x,y] of pts) c.lineTo(x,y); c.lineTo(W+10,H+10); c.closePath(); c.fill(); }
function drawMoon(c,x,y,r,age,ang,a){
  const f=(1-Math.cos(TAU*age))/2;
  c.save(); c.translate(x,y); c.rotate(ang);
  const halo=c.createRadialGradient(0,0,r,0,0,r*7); halo.addColorStop(0,`rgba(220,230,255,${.22*a*f})`); halo.addColorStop(1,"rgba(220,230,255,0)");
  c.fillStyle=halo; c.fillRect(-r*7,-r*7,r*14,r*14);
  c.fillStyle=`rgba(200,210,235,${.07*a})`; c.beginPath(); c.arc(0,0,r,0,TAU); c.fill();
  // lit limb faces +x (towards the sun); the terminator is a half-ellipse
  c.fillStyle=`rgba(246,244,228,${a})`; c.beginPath(); c.arc(0,0,r,-Math.PI/2,Math.PI/2);
  c.ellipse(0,0,Math.max(r*Math.abs(1-2*f),.01),r,0,Math.PI/2,-Math.PI/2,f<.5); c.fill(); c.restore();
}
function palm(c,x,y,hgt,lean,t,col){
  const tx=x+lean*hgt, ty=y-hgt;
  c.strokeStyle=col; c.lineCap="round"; c.lineWidth=Math.max(1,hgt*.03);
  c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+lean*hgt*.2,y-hgt*.55,tx,ty); c.stroke();
  c.lineWidth=Math.max(.7,hgt*.01); c.beginPath();
  for(let i=0;i<9;i++){
    const a=-Math.PI/2+(i-4)*.38+Math.sin(t*.9+i*1.3)*.05+Math.sin(t*.35)*.06, L=hgt*(.42+.08*Math.sin(i*2.1));
    const qx=tx+Math.cos(a)*L*.5, qy=ty+Math.sin(a)*L*.6-L*.05, ex=tx+Math.cos(a)*L, ey=ty+Math.sin(a)*L*.6+L*.5;
    c.moveTo(tx,ty); c.quadraticCurveTo(qx,qy,ex,ey);
    for(let k=1;k<12;k++){
      const u=k/12, v=1-u, bx=v*v*tx+2*v*u*qx+u*u*ex, by=v*v*ty+2*v*u*qy+u*u*ey;
      const dx=2*v*(qx-tx)+2*u*(ex-qx), dy=2*v*(qy-ty)+2*u*(ey-qy), n=Math.hypot(dx,dy)||1, ll=L*.17*(1-u*.6);
      c.moveTo(bx,by); c.lineTo(bx-dy/n*ll+dx/n*ll*.3,by+dx/n*ll+ll*.5);
      c.moveTo(bx,by); c.lineTo(bx+dy/n*ll+dx/n*ll*.3,by-dx/n*ll+ll*.5);
    }
  }
  c.stroke();
}
function bamboo(c,x,y,hgt,t,col){
  c.strokeStyle=col; c.fillStyle=col; c.lineCap="round";
  for(let i=0;i<7;i++){
    const bx=x+i*hgt*.014, lean=-.2+i*.09, sw=Math.sin(t*.7+i)*hgt*.015;
    const tx=bx+lean*hgt+sw, ty=y-hgt*(.8+.2*Math.sin(i*3.1)), qx=bx+lean*hgt*.2, qy=y-hgt*.6;
    c.lineWidth=Math.max(1.5,hgt*.009); c.beginPath(); c.moveTo(bx,y); c.quadraticCurveTo(qx,qy,tx,ty); c.stroke();
    c.beginPath();
    for(let k=0;k<11;k++){
      const u=.45+k*.05, v=1-u, lx=v*v*bx+2*v*u*qx+u*u*tx, ly=v*v*y+2*v*u*qy+u*u*ty, rx=hgt*.04;
      const ang=(k%2?.55:Math.PI-.55)+Math.sin(t*1.3+k+i)*.12;
      const ox=lx+Math.cos(ang)*rx, oy=ly+Math.sin(ang)*rx;
      c.moveTo(ox+Math.cos(ang)*rx,oy+Math.sin(ang)*rx); c.ellipse(ox,oy,rx,hgt*.006,ang,0,TAU);
    }
    c.fill();
  }
}
function renderBase(h){
  baseH=h; const m=M=moods(h); P=palette(h,m.rain);
  const cloudCol=m.rain?mix(P.top,[150,156,166],.5):mix(mix(P.bot,P.top,.25),[255,255,255],.25+m.day*.5);
  SP.cloud=sprite(cloudCol,.45); SP.mist=sprite(P.mist); SP.smoke=sprite(mix(cloudCol,[170,170,175],.4),.3);
  // sky
  let c=sky.getContext("2d"); c.setTransform(dpr,0,0,dpr,0,0);
  let g=c.createLinearGradient(0,0,0,G.yH); g.addColorStop(0,rgb(P.top)); g.addColorStop(1,rgb(P.bot));
  c.fillStyle=g; c.fillRect(0,0,W,H);
  const sun=arc(h), glow=(1-Math.min(1,Math.abs(sun.up)*3))*(1-m.rain*.7);
  if(glow>0){ g=c.createRadialGradient(sun.x,G.yH,0,sun.x,G.yH,W*.6); g.addColorStop(0,rgb(mix(P.bot,[255,200,140],.5),glow*.7)); g.addColorStop(1,rgb(P.bot,0)); c.fillStyle=g; c.fillRect(0,0,W,H); }
  if(sun.up>-.05){
    const sa=1-m.rain*.85, r=H*.022;
    g=c.createRadialGradient(sun.x,sun.y,r,sun.x,sun.y,H*.14); g.addColorStop(0,`rgba(255,240,205,${.5*sa})`); g.addColorStop(1,"rgba(255,240,205,0)");
    c.fillStyle=g; c.fillRect(0,0,W,H);
    c.fillStyle=rgb(mix([255,250,230],[255,160,80],1-ss(sun.up*3)),sa); c.beginPath(); c.arc(sun.x,sun.y,r,0,TAU); c.fill();
  }
  const age=moonAge(), mo=arc(((h-age*24)%24+24)%24);
  if(mo.up>-.05&&Math.abs(age-.5)<.47) drawMoon(c,mo.x,mo.y,H*.018,age,Math.atan2(sun.y-mo.y,sun.x-mo.x),(1-m.day*.7)*(1-m.rain*.85));
  // land
  c=land.getContext("2d"); c.setTransform(dpr,0,0,dpr,0,0); c.clearRect(0,0,W,H);
  c.fillStyle=rgb(P.far); poly(c,G.bPts);
  g=c.createLinearGradient(0,G.py,0,G.yH); g.addColorStop(0,rgb(P.mtn)); g.addColorStop(1,rgb(mix(P.mtn,P.mist,.3)));
  c.fillStyle=g; poly(c,G.mPts);
  // sunlit flank, then the lava gullies (kali) running down the face
  c.save(); c.beginPath(); c.moveTo(-10,H); for(const [x,y] of G.mPts) c.lineTo(x,y); c.lineTo(W+10,H); c.clip();
  const side=sun.x>G.px?1:-1, la=.12*m.day*(1-m.rain);
  g=c.createLinearGradient(G.px,0,G.px+side*G.hw,0); g.addColorStop(0,"rgba(255,236,210,0)"); g.addColorStop(.15,`rgba(255,236,210,${la})`); g.addColorStop(1,"rgba(255,236,210,0)");
  c.fillStyle=g; c.fillRect(0,0,W,H);
  c.lineWidth=1; c.strokeStyle=rgb(mix(P.mtn,[0,0,0],.25),.55); c.beginPath();
  for(const q of G.gullies){ c.moveTo(q[0],q[1]); c.quadraticCurveTo(q[2],q[3],q[4],q[5]); } c.stroke();
  c.strokeStyle=rgb(mix(P.mtn,[255,255,255],.12),.4); c.beginPath();
  for(const q of G.gullies){ c.moveTo(q[0]+1.5,q[1]); c.quadraticCurveTo(q[2]+1.5,q[3],q[4]+1.5,q[5]); } c.stroke();
  c.restore();
  g=c.createLinearGradient(0,G.yH-H*.12,0,G.yH); g.addColorStop(0,rgb(P.mist,0)); g.addColorStop(1,rgb(P.mist,.45));
  c.fillStyle=g; c.fillRect(0,G.yH-H*.12,W,H*.12);
  // hills with trees, palms and the kampung
  c.fillStyle=rgb(P.hill); c.beginPath(); c.moveTo(-10,H); for(let x=-10;x<=W+10;x+=6) c.lineTo(x,G.hY(x)); c.lineTo(W+10,H); c.fill();
  const tc=rgb(mix(P.hill,P.fg,.35));
  c.fillStyle=tc; c.beginPath(); for(const t of G.trees){ c.moveTo(t.x+t.r,t.y); c.arc(t.x,t.y,t.r,0,TAU); } c.fill();
  for(const p of G.palms) palm(c,p.x,p.y,p.h,p.lean,0,tc);
  const nightLit=ss((m.night-.2)/.6);
  for(const s of G.houses){
    const {x,y,w,h:hh}=s, top=y-hh;
    c.fillStyle=rgb(mix(P.hill,[214,196,160],.35*(1-m.night*.7))); c.fillRect(x-w/2,top,w,hh);
    c.fillStyle=rgb(mix(P.hill,[120,52,34],.45*(1-m.night*.6))); c.beginPath();
    if(s.joglo){ c.moveTo(x-w*.62,top); c.lineTo(x+w*.62,top); c.lineTo(x+w*.34,top-w*.16); c.lineTo(x+w*.2,top-w*.42); c.lineTo(x-w*.2,top-w*.42); c.lineTo(x-w*.34,top-w*.16); }
    else { c.moveTo(x-w*.62,top); c.lineTo(x+w*.62,top); c.lineTo(x+w*.28,top-w*.36); c.lineTo(x-w*.28,top-w*.36); }
    c.fill();
    const lit=s.lit?nightLit:0;
    c.fillStyle=lit?rgb(mix([40,30,20],[255,200,110],lit)):rgb(mix(P.hill,[0,0,0],.4));
    c.fillRect(x-w*.27,top+hh*.3,w*.14,hh*.4); c.fillRect(x+w*.13,top+hh*.3,w*.14,hh*.4);
    if(lit){ c.globalCompositeOperation="lighter"; c.globalAlpha=lit*.55; c.drawImage(SP.warm,x-w,top-w*.5,w*2,w*1.6); c.globalAlpha=1; c.globalCompositeOperation="source-over"; }
  }
  // sawah terraces, flooded enough to hold a little of the sky
  const E=G.edges;
  for(let i=0;i<E.length-1;i++){
    c.fillStyle=rgb(mix(mix(P.field,P.bot,.14+(i%2)*.1),P.fg,i/E.length*.55));
    c.beginPath(); for(const [x,y] of E[i]) c.lineTo(x,y); for(let k=E[i+1].length-1;k>=0;k--) c.lineTo(E[i+1][k][0],E[i+1][k][1]); c.fill();
    c.strokeStyle=rgb(mix(P.field,[255,255,230],.25),.35*(1-m.night*.6)); c.lineWidth=1+i*.4;
    c.beginPath(); for(const [x,y] of E[i]) c.lineTo(x,y); c.stroke();
  }
}

// ================= animation =================
function step(dt){
  const t=ST.t+=dt, m=M; if(!m) return;
  for(const c of ST.clouds){ c.x+=c.v*dt*(1+m.rain); if(c.x-c.s*2>W) c.x=-c.s*2.5; }
  for(const b of ST.mist){ b.x+=b.v*dt; if(b.x>W) b.x=-b.w; }
  // wedhus gembel: Merapi's plume drifting with the wind
  if((ST.emit-=dt)<=0){ ST.emit=.45; ST.puffs.push({x:G.px+rand(-3,3),y:G.py+2,vx:rand(3,6),vy:-rand(5,9),r:H*.006,a:0}); }
  for(const p of ST.puffs){ p.x+=p.vx*dt; p.y+=p.vy*dt; p.vx+=dt*.4; p.r+=dt*H*.0016; p.a+=dt/24; }
  ST.puffs=ST.puffs.filter(p=>p.a<1);
  // lava pijar: glowing rockfalls down the face at night
  if(m.night>.5&&!ST.lava.length&&Math.random()<dt/22){ const side=Math.random()<.6?1:-1; ST.lava.push({d:G.hw*.02,side,v:rand(5,10)*H/800,end:G.hw*rand(.12,.32)}); }
  for(const l of ST.lava){ l.d+=l.v*dt; l.v+=dt*H/400; ST.trail.push({x:G.px+l.side*l.d*.7+rand(-1,1),y:G.mY(G.px+l.side*l.d)+l.d*.12+rand(0,2),a:1}); }
  ST.lava=ST.lava.filter(l=>l.d<l.end);
  for(const p of ST.trail) p.a-=dt/7;
  ST.trail=ST.trail.filter(p=>p.a>0);
  // kitchen smoke from the pawon
  if(m.kitchen>.1&&Math.random()<dt*2.5){ const s=G.houses[Math.random()*G.houses.length|0]; ST.smoke.push({x:s.x+s.w*.15,y:s.y-s.h-s.w*.3,r:2,a:0,vx:rand(1,3)}); }
  for(const p of ST.smoke){ p.x+=p.vx*dt; p.y-=7*dt; p.r+=dt*1.6; p.a+=dt/10; }
  ST.smoke=ST.smoke.filter(p=>p.a<1);
  // kuntul: egrets crossing the sawah
  if(m.day>.6&&m.rain<.3&&ST.flocks.length<2&&Math.random()<dt/18){
    const dir=Math.random()<.5?1:-1, n=4+(Math.random()*6|0), s=H*rand(.007,.011);
    ST.flocks.push({x:dir>0?-80:W+80,y:G.yH-H*rand(.02,.2),dir,v:rand(28,45),s,b:Array.from({length:n},(_,i)=>({dx:-dir*i*rand(1.6,2.4)*s*1.3,dy:(i%2?1:-1)*Math.ceil(i/2)*s*rand(.8,1.3),ph:rand(0,TAU)}))});
  }
  for(const f of ST.flocks) f.x+=f.dir*f.v*dt;
  ST.flocks=ST.flocks.filter(f=>f.x>-W*.4&&f.x<W*1.4);
  // codot: bats at dusk
  const want=Math.round(m.dusk*9+(m.h>19&&m.h<20.5?m.night*2:0));
  if(ST.bats.length<want&&Math.random()<dt*2){ const dir=Math.random()<.5?1:-1; ST.bats.push({x:dir>0?-20:W+20,by:H*rand(.12,.5),v:dir*rand(40,80),ph:rand(0,TAU)}); }
  for(const b of ST.bats) b.x+=b.v*dt;
  ST.bats=ST.bats.filter(b=>b.x>-40&&b.x<W+40);
  for(const f of ST.flies){ f.a+=rand(-1,1)*dt*3; f.x=(f.x+Math.cos(f.a)*9*dt+W)%W; f.y+=Math.sin(f.a)*6*dt; if(f.y<G.yH||f.y>H) f.a+=Math.PI; }
  if(m.rain>0) for(const d of ST.drops){ d.y+=d.v*dt; d.x+=d.v*.12*dt; if(d.y>H){ d.y=-d.l; d.x=rand(-W*.1,W); } }
  if(ST.shoot){ ST.shoot.life+=dt; ST.shoot.x+=ST.shoot.vx*dt; ST.shoot.y+=ST.shoot.vy*dt; if(ST.shoot.life>.9) ST.shoot=null; }
  else if(m.night>.85&&!m.rain&&Math.random()<dt/50) ST.shoot={x:W*rand(.1,.9),y:H*rand(.05,.3),vx:rand(220,380)*(Math.random()<.5?1:-1),vy:rand(80,140),life:0};
  ST.flash=Math.max(0,ST.flash-dt*2.5);
  if(m.rain>.6&&Math.random()<dt/28){ ST.flash=1; onLightning(rand(1,4)); }
}
function draw(){
  const h=hourNow(); if(!M||Math.abs(h-baseH)>.004) renderBase(h);
  const m=M, t=ST.t;
  cx.setTransform(1,0,0,1,0,0); cx.globalAlpha=1; cx.globalCompositeOperation="source-over";
  cx.drawImage(sky,0,0);
  cx.setTransform(dpr,0,0,dpr,0,0);
  const sa=m.night*(1-m.rain);
  if(sa>.02){
    cx.fillStyle="#fff";
    for(const s of G.stars){ cx.globalAlpha=sa*s.b*(.55+.45*Math.sin(t*s.w+s.ph)); cx.fillRect(s.x,s.y,s.r,s.r); }
    const s=ST.shoot;
    if(s){ cx.globalAlpha=Math.sin(Math.PI*s.life/.9)*sa; cx.strokeStyle="#fff"; cx.lineWidth=1.2; cx.beginPath(); cx.moveTo(s.x,s.y); cx.lineTo(s.x-s.vx*.09,s.y-s.vy*.09); cx.stroke(); }
  }
  cx.globalAlpha=m.rain?.9:.45+.4*m.day;
  for(let i=0,n=Math.round(4+m.rain*6);i<n;i++){ const c=ST.clouds[i]; for(const p of c.p) cx.drawImage(SP.cloud,c.x+p.dx-p.r,c.y+p.dy-p.r,p.r*2,p.r*2); }
  for(const p of ST.puffs){ cx.globalAlpha=Math.min(1,p.a*12)*(1-p.a)*.6; cx.drawImage(SP.smoke,p.x-p.r,p.y-p.r,p.r*2,p.r*2); }
  cx.setTransform(1,0,0,1,0,0); cx.globalAlpha=1; cx.drawImage(land,0,0); cx.setTransform(dpr,0,0,dpr,0,0);
  if(m.night>.05){
    cx.globalCompositeOperation="lighter";
    const R=H*.06; cx.globalAlpha=m.night*(.5+.08*Math.sin(t*1.3)+.05*Math.sin(t*3.7));
    cx.drawImage(SP.lava,G.px-R,G.py-R*.7,R*2,R*2);
    const r=Math.max(2,H*.004);
    for(const p of ST.trail){ cx.globalAlpha=p.a*m.night; cx.drawImage(SP.lava,p.x-r,p.y-r,r*2,r*2); }
    cx.globalCompositeOperation="source-over";
  }
  cx.globalAlpha=Math.min(1,m.dawn+m.night*.4+m.rain*.5+.12)*.5;
  for(const b of ST.mist) cx.drawImage(SP.mist,b.x,b.y-b.h/2,b.w,b.h);
  for(const p of ST.smoke){ cx.globalAlpha=Math.min(1,p.a*8)*(1-p.a)*.35; cx.drawImage(SP.smoke,p.x-p.r,p.y-p.r,p.r*2,p.r*2); }
  // layangan: kites flown from the fields after school
  if(m.sore>.02){
    for(const k of G.kites){
      const x=k.ax+Math.sin(t*.35+k.ph)*W*.02, y=k.ay+Math.sin(t*.8+k.ph)*H*.01, s=H*.018;
      cx.globalAlpha=m.sore*.5; cx.strokeStyle=rgb(P.fg); cx.lineWidth=.6;
      cx.beginPath(); cx.moveTo(x,y+s*.3); cx.quadraticCurveTo((x+k.gx)/2,Math.max(y,k.gy)-H*.02,k.gx,k.gy); cx.stroke();
      cx.globalAlpha=m.sore; cx.save(); cx.translate(x,y); cx.rotate(Math.sin(t*1.2+k.ph)*.18);
      cx.fillStyle=rgb(mix(k.c[0],P.hill,.2)); cx.beginPath(); cx.moveTo(0,-s); cx.lineTo(-s*.75,0); cx.lineTo(0,s*1.2); cx.fill();
      cx.fillStyle=rgb(mix(k.c[1],P.hill,.2)); cx.beginPath(); cx.moveTo(0,-s); cx.lineTo(s*.75,0); cx.lineTo(0,s*1.2); cx.fill();
      cx.strokeStyle=rgb(mix(k.c[0],P.fg,.4)); cx.lineWidth=1; cx.beginPath();
      cx.moveTo(0,s*1.2); for(let i=1;i<=8;i++) cx.lineTo(Math.sin(t*4+i*.9+k.ph)*s*.25,s*1.2+i*s*.35); cx.stroke();
      cx.restore();
    }
  }
  if(ST.flocks.length){
    cx.globalAlpha=.9; cx.strokeStyle=rgb(mix([250,250,245],P.bot,.25)); cx.lineWidth=1.4; cx.beginPath();
    for(const f of ST.flocks) for(const b of f.b){
      const x=f.x+b.dx, y=f.y+b.dy+Math.sin(t*1.5+b.ph)*2, s=f.s, w=Math.sin(t*5+b.ph)*s*.6;
      cx.moveTo(x-s,y-w); cx.quadraticCurveTo(x-s*.4,y-w*.2-s*.15,x,y); cx.quadraticCurveTo(x+s*.4,y-w*.2-s*.15,x+s,y-w);
    }
    cx.stroke();
  }
  if(ST.bats.length){
    cx.globalAlpha=.85; cx.strokeStyle="#140f19"; cx.lineWidth=1.6; cx.beginPath();
    for(const b of ST.bats){
      const x=b.x, y=b.by+Math.sin(t*2.2+b.ph)*H*.03+Math.sin(t*7+b.ph)*3, s=5, w=Math.sin(t*16+b.ph)*s;
      cx.moveTo(x-s,y-w); cx.lineTo(x-s*.4,y-w*.3+1); cx.lineTo(x,y); cx.lineTo(x+s*.4,y-w*.3+1); cx.lineTo(x+s,y-w);
    }
    cx.stroke();
  }
  // kunang-kunang
  const fa=m.night*(1-m.rain*.8);
  if(fa>.05){
    cx.globalCompositeOperation="lighter"; const r=Math.max(4,H*.007);
    for(const f of ST.flies){ const b=Math.pow(Math.max(0,Math.sin(t*f.w+f.ph)),4); if(b<.02) continue; cx.globalAlpha=fa*b; cx.drawImage(SP.fire,f.x-r,f.y-r,r*2,r*2); }
    cx.globalCompositeOperation="source-over";
  }
  // foreground: bamboo clump, a coconut palm and grass, all moving in the breeze
  cx.globalAlpha=1; const fg=rgb(P.fg);
  cx.fillStyle=fg; cx.beginPath(); cx.moveTo(-10,H+10); for(let x=-10;x<=W+10;x+=8) cx.lineTo(x,G.fgY(x)); cx.lineTo(W+10,H+10); cx.fill();
  bamboo(cx,-W*.01,H+4,Math.min(H*.6,W*.5),t,fg);
  palm(cx,W*.9,H+6,Math.min(H*.6,W*.42),-.18,t,fg);
  cx.strokeStyle=fg; cx.lineWidth=1.4; cx.beginPath();
  const wind=Math.sin(t*.6)*.5+.5;
  for(const g of G.grass){ const by=G.fgY(g.x)+2, sw=(Math.sin(t*1.8+g.ph+g.x*.01)*.5+wind)*g.h*.35; cx.moveTo(g.x,by); cx.quadraticCurveTo(g.x+sw*.4,by-g.h*.6,g.x+sw,by-g.h); }
  cx.stroke();
  if(m.rain>.02){
    cx.globalAlpha=.35*m.rain; cx.strokeStyle="#c8d2e1"; cx.lineWidth=1; cx.beginPath();
    for(const d of ST.drops){ cx.moveTo(d.x,d.y); cx.lineTo(d.x+d.l*.12,d.y+d.l); }
    cx.stroke();
  }
  if(ST.flash>0){ cx.globalAlpha=ST.flash*.35*(ST.flash>.6||ST.flash<.3?1:.3); cx.fillStyle="#e8ecff"; cx.fillRect(0,0,W,H); }
  cx.globalAlpha=1;
}

const still=matchMedia("(prefers-reduced-motion: reduce)");
let raf=0,last=0,idle=0;
function frame(ts){
  raf=requestAnimationFrame(frame);
  if(ts-last<32) return; // ~30 fps is plenty for a backdrop
  step(Math.min(.1,(ts-last)/1000)); last=ts; draw();
}
function run(){
  cancelAnimationFrame(raf); clearInterval(idle); layout();
  if(!G) return;
  if(document.hidden) return;
  if(still.matches){ draw(); idle=setInterval(draw,6e4); }
  else { last=performance.now(); raf=requestAnimationFrame(frame); }
}
let rz=0;
addEventListener("resize",()=>{ clearTimeout(rz); rz=setTimeout(()=>{ layout(); if(still.matches) draw(); },150); });
document.addEventListener("visibilitychange",run);
still.addEventListener?.("change",run);

// ================= sound =================
// Everything below is synthesised: oscillators and filtered noise through a valley-sized reverb.
const A={ctx:null,on:false,next:{},gust:.5};
const O=(type,f)=>{ const o=A.ctx.createOscillator(); o.type=type; o.frequency.value=f; return o; };
const Fl=(type,f,q=1)=>{ const b=A.ctx.createBiquadFilter(); b.type=type; b.frequency.value=f; b.Q.value=q; return b; };
const Gn=(v=0)=>{ const g=A.ctx.createGain(); g.gain.value=v; return g; };
const Nz=()=>{ const s=A.ctx.createBufferSource(); s.buffer=A.noise; s.loop=true; return s; };
const chain=(...n)=>{ for(let i=0;i<n.length-1;i++) n[i].connect(n[i+1]); return n[n.length-1]; };
const run1=(src,t,dur)=>{ if(src.buffer) src.start(t,Math.random()*1.5); else src.start(t); src.stop(t+dur+.05); };
function env(p,t,a,v,hold,rel){ p.setValueAtTime(0,t); p.linearRampToValueAtTime(v,t+a); p.setValueAtTime(v,t+a+hold); p.exponentialRampToValueAtTime(1e-4,t+a+hold+rel); }
function mkBus(pan,wet,lp){
  const ac=A.ctx, g=Gn(1); let n=g;
  if(lp){ const f=Fl("lowpass",lp,.5); n.connect(f); n=f; }
  if(ac.createStereoPanner){ const p=ac.createStereoPanner(); p.pan.value=pan; n.connect(p); n=p; }
  n.connect(A.out); const s=Gn(wet); n.connect(s); s.connect(A.wet); return g;
}
const busFor=far=>{ const L=far?A.far:A.near; return L[Math.random()*L.length|0]; };

function rooster(t,far){
  const o=O("sawtooth",500), f1=Fl("bandpass",1300,3), f2=Fl("bandpass",2700,4), g=Gn(), v=O("sine",9), vg=Gn(14), vol=far?.12:.22;
  o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(busFor(far)); chain(v,vg,o.frequency);
  const fr=o.frequency, gp=g.gain; gp.setValueAtTime(0,t);
  for(const [s,d,a,b] of [[0,.12,480,620],[.18,.12,560,680],[.36,.14,620,720],[.56,.95,700,760]]){
    fr.setValueAtTime(a,t+s);
    if(d>.5){ fr.linearRampToValueAtTime(b+80,t+s+.22); fr.linearRampToValueAtTime(b,t+s+.6); fr.exponentialRampToValueAtTime(420,t+s+d); }
    else fr.linearRampToValueAtTime(b,t+s+d);
    gp.setValueAtTime(0,t+s); gp.linearRampToValueAtTime(vol,t+s+.02); gp.setValueAtTime(vol,t+s+d-.05); gp.linearRampToValueAtTime(0,t+s+d);
  }
  run1(o,t,1.6); run1(v,t,1.6);
  if(!far&&Math.random()<.6) rooster(t+rand(2,4),true); // a neighbour's rooster answers
}
function chirp(t){ // kutilang, emprit: short warbled notes that arch, not long swoops (those read as a laser)
  const out=busFor(Math.random()<.4), base=rand(2600,3800); let s=t;
  for(let i=0,n=3+(Math.random()*5|0);i<n;i++){
    const d=rand(.05,.12), f0=base*rand(.92,1.1), o=O("sine",f0), g=Gn(), w=O("sine",rand(35,70)), wg=Gn(f0*rand(.03,.06));
    chain(w,wg,o.frequency);
    o.frequency.setValueAtTime(f0*.95,s); o.frequency.linearRampToValueAtTime(f0*rand(1.03,1.1),s+d*.4); o.frequency.linearRampToValueAtTime(f0*rand(.96,1),s+d);
    env(g.gain,s,.015,rand(.02,.04),d*.35,d*.5); chain(o,g,out); run1(o,s,d+.05); run1(w,s,d+.05); s+=d+rand(.03,.12);
  }
}
function dove(t){ // perkutut: "hur … ketek … kung"
  const out=busFor(true);
  for(let r=0,reps=2+(Math.random()*2|0);r<reps;r++){
    const s0=t+r*1.8, o=O("sine",560), g=Gn(), tr=O("sine",22), tg=Gn(0);
    chain(o,g,Fl("lowpass",1400),out); chain(tr,tg,g.gain);
    for(const [s,d,a,b] of [[0,.16,520,560],[.42,.34,600,560],[.95,.6,640,520]]){
      o.frequency.setValueAtTime(a,s0+s); o.frequency.linearRampToValueAtTime(b,s0+s+d);
      g.gain.setValueAtTime(0,s0+s); g.gain.linearRampToValueAtTime(.1,s0+s+.04); g.gain.setValueAtTime(.1,s0+s+d-.06); g.gain.linearRampToValueAtTime(0,s0+s+d);
    }
    tg.gain.setValueAtTime(.06,s0+.42); tg.gain.setValueAtTime(0,s0+.76);
    run1(o,s0,1.6); run1(tr,s0,1.6);
  }
}
function cicada(t){ // tonggeret swelling in the trees: kept up the hillside, a shimmer in the heat rather than a buzz in your ear
  const sore=moods(hourNow()).sore>.3, n=Nz(), bp=Fl("bandpass",3600,3.5), am=Gn(.75), l=O("sine",rand(90,140)), lg=Gn(.25), g=Gn(),
    dur=rand(6,12), peak=rand(4000,4600), v=sore?rand(.05,.08):rand(.1,.15), sw=Math.min(3.5,dur/3);
  chain(l,lg,am.gain); chain(n,bp,am,g,busFor(Math.random()<.75));
  bp.frequency.setValueAtTime(3500,t); bp.frequency.linearRampToValueAtTime(peak,t+sw); bp.frequency.setValueAtTime(peak,t+dur-sw); bp.frequency.linearRampToValueAtTime(3300,t+dur);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(v,t+sw); g.gain.setValueAtTime(v,t+dur-sw); g.gain.linearRampToValueAtTime(0,t+dur);
  run1(n,t,dur); run1(l,t,dur);
}
// Pitch swoops and square-wave buzz read as electronic; real croaks are a buzzy source through a throat formant, pulsed softly.
function frog(t){ // kodok sawah: hollow "kung" (bangkong) and rasping "orek" (katak sawah)
  const fr=A.frogs[Math.random()*A.frogs.length|0];
  for(let i=0,reps=1+(Math.random()*3|0);i<reps;i++){
    const s=t+i*rand(.24,.36);
    if(fr.type===0){
      const o=O("triangle",fr.f), g=Gn(), bp=Fl("bandpass",fr.f*2.2,2.5), g2=Gn(.5);
      o.frequency.setValueAtTime(fr.f*1.06,s); o.frequency.exponentialRampToValueAtTime(fr.f,s+.05);
      chain(o,Fl("lowpass",fr.f*3,.7),g,fr.bus); chain(o,bp,g2,g); env(g.gain,s,.02,.09,.03,.14); run1(o,s,.3);
    } else {
      const o=O("sawtooth",fr.f), am=O("sine",rand(45,65)), ag=Gn(.5), mg=Gn(.5), g=Gn();
      chain(am,ag,mg.gain); chain(o,Fl("bandpass",fr.f*2.5,3),Fl("lowpass",1800),mg,g,fr.bus); env(g.gain,s,.025,.07,.1,.1); run1(o,s,.3); run1(am,s,.3);
    }
  }
}
function syl(t,f0,f1,d,v,type,bpf,out,grit=0){ // grit pulses the voice ~70×/s for a throaty edge
  const o=O(type,f0), g=Gn(), m=Gn(1-grit/2), q=O("sine",rand(60,80)), qg=Gn(grit/2);
  o.frequency.setValueAtTime(f0,t); o.frequency.exponentialRampToValueAtTime(f1,t+d);
  chain(q,qg,m.gain); chain(o,Fl("bandpass",bpf,1.5),m,g,out); env(g.gain,t,.015,v,d*.4,d*.6); run1(o,t,d+.05); run1(q,t,d+.05);
}
function tokek(t){ // a throaty warm-up, then "to-KEK" a handful of times, slowing down
  const out=busFor(Math.random()<.7), r=Nz(), ra=Gn(.5), rl=O("sine",38), rlg=Gn(.5), rg=Gn();
  chain(rl,rlg,ra.gain); chain(r,Fl("bandpass",700,4),ra,rg,out); env(rg.gain,t,.08,.25,.3,.15); run1(r,t,.6); run1(rl,t,.6);
  let s=t+1;
  for(let i=0,n=4+(Math.random()*5|0);i<n;i++){
    const v=i>n-3?.6:1;
    syl(s,380,330,.09,.3*v,"triangle",900,out,.4);
    syl(s+.17,560,480,.15,.35*v,"triangle",1100,out,.6);
    s+=1.1+i*.08;
  }
}
function owl(t){ // burung hantu calling across the valley
  const out=A.far[Math.random()*5|0], o=O("sine",370), g=Gn(), v=O("sine",4), vg=Gn(3), n=Nz(), ng=Gn(.25);
  chain(v,vg,o.frequency); chain(o,Fl("lowpass",600),g,out); chain(n,Fl("bandpass",380,6),ng,g); // a little breath through the "hoo"
  g.gain.setValueAtTime(0,t);
  for(const [s,d] of [[0,.32],[.75,.16],[1,.7]]){
    o.frequency.setValueAtTime(380,t+s); o.frequency.linearRampToValueAtTime(345,t+s+d);
    g.gain.setValueAtTime(0,t+s); g.gain.linearRampToValueAtTime(.1,t+s+.1); g.gain.setValueAtTime(.1,t+s+d*.55); g.gain.linearRampToValueAtTime(0,t+s+d);
  }
  run1(o,t,2); run1(v,t,2); run1(n,t,2);
}
function drip(t){ // the kali over the stones
  const o=O("sine",1), g=Gn(), f=rand(700,1400);
  o.frequency.setValueAtTime(f,t); o.frequency.exponentialRampToValueAtTime(f*2.2,t+.04);
  chain(o,Fl("lowpass",1600),g,A.near[Math.random()<.7?0:1]); env(g.gain,t,.004,rand(.006,.016),0,.06); run1(o,t,.1);
}
function knock(t,v,out){ // bamboo kentongan: a hollow wooden "tok"; a broadband crack in reverb sounds like a gunshot
  const f=rand(430,470), o=O("triangle",f), o2=O("sine",f*2.3), g=Gn(), g2=Gn(.18), n=Nz(), gc=Gn();
  o.frequency.setValueAtTime(f*1.06,t); o.frequency.exponentialRampToValueAtTime(f,t+.03);
  chain(o2,g2,g); chain(o,Fl("lowpass",1400),g,out); env(g.gain,t,.006,v,.01,.16);
  chain(n,Fl("bandpass",f*2,6),gc,out); env(gc.gain,t,.004,v*1.2,0,.05);
  run1(o,t,.25); run1(o2,t,.25); run1(n,t,.08);
}
// The night watch strikes the hour on the kentongan; in between, a patrol passes.
function kentongan(t,count){
  const out=A.kent[Math.random()*A.kent.length|0];
  if(count) for(let i=0;i<count;i++) knock(t+i*1.25,.22,out);
  else for(const s of [0,.3,.6,1.6,1.9,2.2,3.4]) knock(t+s,.18,out);
}
// A neighbour's gamelan rehearsing a slendro piece; gong at the turn of each cycle.
const SLENDRO={1:1,2:1.1487,3:1.3195,5:1.5157,6:1.7411};
const BALUNGAN="21262126353265325653212635321216".split("");
function bar(t,f,v,dec,out,parts=[[1,1],[2.76,.32],[5.4,.1]]){
  for(const [r,a] of parts){ const o=O("sine",f*r), g=Gn(); env(g.gain,t,.004,v*a,0,dec/Math.sqrt(r)); chain(o,g,out); run1(o,t,dec+.1); }
}
function gong(t,out){ for(const [f,v] of [[62,.3],[63.3,.26],[124.5,.08],[187,.03]]){ const o=O("sine",f), g=Gn(); env(g.gain,t,.04,v,.2,7); chain(o,g,out); run1(o,t,7.5); } }
function gamelan(t){
  if(A.gamUntil>t) return;
  const out=A.gam, beat=.8, f0=268; let s=t;
  for(let r=0,rounds=2+(Math.random()*2|0);r<rounds;r++) BALUNGAN.forEach((d,i)=>{
    const f=f0*SLENDRO[d];
    if(i===0) gong(s,out);
    bar(s,f,.12,1.6,out); bar(s+beat/2,f*2,.04,.8,out);
    if(i%4===3) bar(s,f/2,.09,3,out,[[1,1],[2,.2],[3.1,.05]]);
    s+=beat;
  });
  gong(s,out); A.gamUntil=s+8;
}
// Sapi in the kandang at feeding and milking time: a low "mmm-ooo" that opens out and sags.
// A sawtooth through a lowpass that opens (the closed "mm") then a mouth formant, with a slow wobble.
function sapi(t,far){
  const f0=rand(105,140), dur=rand(1.4,2.4), vol=far?.07:.13, out=busFor(far);
  // a slow, slight waver (a fast one turns the moo into a goat's bleat) and a second lowpass so it stays dark, not buzzy
  const o=O("sawtooth",f0), wob=O("sine",rand(2,3.5)), wg=Gn(f0*.005), lp=Fl("lowpass",300,1.2), bp=Fl("bandpass",rand(550,700),3), bg=Gn(.7), g=Gn(), dark=Fl("lowpass",1700,.5);
  chain(wob,wg,o.frequency); chain(o,lp,g); chain(lp,bp,bg,g); chain(g,dark,out);
  const fr=o.frequency;
  fr.setValueAtTime(f0*.9,t); fr.linearRampToValueAtTime(f0*1.12,t+dur*.3); fr.linearRampToValueAtTime(f0*1.05,t+dur*.65); fr.exponentialRampToValueAtTime(f0*.78,t+dur);
  lp.frequency.setValueAtTime(260,t); lp.frequency.linearRampToValueAtTime(1300,t+dur*.35); lp.frequency.setValueAtTime(1300,t+dur*.6); lp.frequency.linearRampToValueAtTime(500,t+dur);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol*.5,t+.12); g.gain.linearRampToValueAtTime(vol,t+dur*.35); g.gain.setValueAtTime(vol,t+dur*.7); g.gain.linearRampToValueAtTime(0,t+dur);
  run1(o,t,dur); run1(wob,t,dur);
  if(!far&&Math.random()<.35) sapi(t+dur+rand(1.5,4),true); // a cow in the next kandang answers
}
// Ploughing with sapi: the pecut is cracked in the air as a signal, far off across the sawah, and the cow lows back.
function crack(t){
  const out=busFor(true);
  const sw=Nz(), swf=Fl("bandpass",900,1.5), swg=Gn(); chain(sw,swf,swg,out); // the swish
  swf.frequency.setValueAtTime(600,t); swf.frequency.exponentialRampToValueAtTime(3200,t+.16);
  swg.gain.setValueAtTime(0,t); swg.gain.linearRampToValueAtTime(.05,t+.12); swg.gain.linearRampToValueAtTime(0,t+.17); run1(sw,t,.2);
  const c=t+.17;
  for(const [dt,v] of [[0,.42],[.012,.18]]){ // the crack, with a quick second snap of the tip
    const n=Nz(), hp=Fl("highpass",1600,.7), g=Gn(); chain(n,hp,g,out);
    g.gain.setValueAtTime(0,c+dt); g.gain.linearRampToValueAtTime(v,c+dt+.001); g.gain.exponentialRampToValueAtTime(1e-4,c+dt+.045); run1(n,c+dt,.06);
  }
}
function pecut(t){
  crack(t);
  if(Math.random()<.5) crack(t+rand(1.2,2.2)); // often cracked twice
  if(Math.random()<.6) sapi(t+rand(2.5,4),true);
}
function thunder(t){
  const n=Nz(), g=Gn(), n2=Nz(), g2=Gn(), out=A.far[2];
  chain(n,Fl("lowpass",140,.7),g,out); chain(n2,Fl("bandpass",500,.8),g2,out);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.8,t+.25); g.gain.linearRampToValueAtTime(.4,t+.8); g.gain.linearRampToValueAtTime(.6,t+1.3); g.gain.exponentialRampToValueAtTime(1e-4,t+6);
  env(g2.gain,t,.01,.3,.1,.6); run1(n,t,6.2); run1(n2,t,1);
}
function onLightning(delay){ if(A.on) thunder(A.ctx.currentTime+delay); }

const EV={
  rooster:{gap:[6,16], w:m=>m.dawn+.06*m.day, fn:t=>rooster(t,false)},
  bird:   {gap:[1.5,5], w:m=>(m.dawn*.8+m.day*.6)*(1-m.rain*.8), fn:chirp},
  dove:   {gap:[14,32], w:m=>(m.dawn*.6+m.day*.4)*(1-m.rain), fn:dove},
  cicada: {gap:[4,10], w:m=>Math.max(m.noon,m.sore*.7)*(1-m.rain), fn:cicada},
  frog:   {gap:[.4,1.6], w:m=>Math.min(1,m.night*.9+m.dusk*.5+m.rain*.6), fn:frog},
  tokek:  {gap:[60,150], w:m=>m.night, fn:tokek},
  owl:    {gap:[40,90], w:m=>m.night*(1-m.rain), fn:owl},
  drip:   {gap:[.3,1.5], w:m=>.5+m.rain*.5, fn:drip},
  ronda:  {gap:[400,900], w:m=>m.h>=21||m.h<3.5?1:0, fn:t=>kentongan(t,0)},
  gamelan:{gap:[60,180], w:m=>bump(m.h,19,19.5,21.8,22.4), fn:gamelan},
  sapi:   {gap:[25,70], w:m=>(m.dawn*.7+bump(m.h,6.5,7.2,10,11.5)*.6+m.sore*.35)*(1-m.rain*.7), fn:t=>sapi(t,Math.random()<.4)},
  pecut:  {gap:[120,300], w:m=>bump(m.h,6.3,7,10.5,11.5)*(1-m.rain), fn:pecut},
};
function initAudio(){
  const C=window.AudioContext||window.webkitAudioContext; if(!C) return false;
  const ac=A.ctx=new C(), sr=ac.sampleRate;
  A.out=Gn(0); const comp=ac.createDynamicsCompressor(); comp.threshold.value=-18; comp.ratio.value=4; chain(A.out,comp,ac.destination);
  const len=sr*3.2|0, ir=ac.createBuffer(2,len,sr);
  // Outdoors the air soaks up the highs first, so the tail darkens as it decays; a bright white-noise tail hisses behind every chirp.
  for(let ch=0;ch<2;ch++){ const d=ir.getChannelData(ch); let y=0; for(let i=0;i<len;i++){ const k=i/len, c=.5*Math.pow(.06,k); y+=c*((Math.random()*2-1)-y); d[i]=y*Math.sqrt((2-c)/c)*Math.pow(1-k,3.2); } }
  const conv=ac.createConvolver(); conv.buffer=ir; A.wet=Gn(.8); chain(A.wet,conv,A.out);
  A.noise=ac.createBuffer(1,sr*2,sr); const nd=A.noise.getChannelData(0); for(let i=0;i<nd.length;i++) nd[i]=Math.random()*2-1;
  A.near=[-.7,-.3,0,.3,.7].map(p=>mkBus(p,.25));
  A.far=[-.8,-.4,0,.4,.8].map(p=>mkBus(p,.9,3000));
  A.gam=mkBus(.35,1,2400);
  A.kent=[-.6,.5].map(p=>mkBus(p,.4,2500)); // drier than A.far so the knock doesn't boom down the valley
  const bed=(f,gain,bus)=>{ const n=Nz(), g=Gn(0); chain(n,...f,g,bus); n.start(0,Math.random()*1.5); return g; };
  A.wind=bed([Fl("lowpass",450,.3)],0,A.near[2]);
  A.leaves=bed([Fl("bandpass",3500,.6)],0,A.near[4]);
  A.stream=bed([Fl("bandpass",700,.8)],0,A.near[0]);
  A.bubble=bed([Fl("bandpass",1800,6)],0,A.near[0]);
  A.rainHi=bed([Fl("highpass",800),Fl("lowpass",7000)],0,A.near[2]);
  A.rainLo=bed([Fl("lowpass",300)],0,A.near[2]);
  // jangkrik: each cricket is a tone pulsed ~30×/s, gated into chirps. Hard square gates click like a machine,
  // so the pulses are rounded and the gate low-passed; most sit out in the sawah, and each one rests now and then.
  A.crk=Array.from({length:6},(_,i)=>{
    const o=O("sine",rand(4300,5000)), a=Gn(.5), p=O("sine",rand(26,34)), pg=Gn(.5), b=Gn(.5), c=O("square",rand(1.3,2.2)), cl=Fl("lowpass",12,.5), cg=Gn(.5), v=Gn(0);
    chain(p,pg,a.gain); chain(c,cl,cg,b.gain); chain(o,a,b,v,i<2?A.near[i*4]:A.far[i-1]);
    o.start(); p.start(); c.start(); v.lvl=i<2?rand(.005,.01):rand(.012,.022); v.on=Math.random()<.75; return v;
  });
  A.frogs=Array.from({length:7},(_,i)=>({type:i<4?0:1,f:i<4?rand(190,260):rand(300,420),bus:busFor(Math.random()<.7)}));
  return true;
}
function tick(){
  const now=A.ctx.currentTime, m=moods(hourNow()), set=(g,v,tc)=>g.gain.setTargetAtTime(v,now,tc);
  if(Math.random()<.05) A.gust=rand(.3,1);
  set(A.wind,(.04+.06*A.gust)*(1+m.rain),2);
  set(A.leaves,.015*A.gust*(1-m.night*.5),2);
  set(A.stream,.05,3); set(A.bubble,rand(.004,.03),.05);
  set(A.rainHi,.12*m.rain,3); set(A.rainLo,.2*m.rain,3);
  for(const v of A.crk){ if(Math.random()<.004) v.on=!v.on; set(v,v.on*v.lvl*Math.min(1,m.night+m.dusk*.4)*(1-m.rain*.5),4); }
  for(const [k,e] of Object.entries(EV)){
    if(now<A.next[k]) continue;
    A.next[k]=now+rand(...e.gap);
    const w=e.w(m); if(w>0&&Math.random()<w) e.fn(now+.05+Math.random()*.3);
  }
  const hr=Math.floor(m.h);
  if(A.hr!==undefined&&hr!==A.hr&&(hr>=20||hr<=4)) kentongan(now+1,hr%12||12);
  A.hr=hr;
}
const btn=document.getElementById("suara"), cap=document.getElementById("suaraJam");
const pref={ get(){ try{return localStorage.getItem("oelek.suara");}catch(e){return null;} }, set(v){ try{localStorage.setItem("oelek.suara",v);}catch(e){} } };
function setSound(on){
  if(on){
    if(!A.ctx&&!initAudio()) return;
    A.ctx.resume(); clearTimeout(A.sus);
    const now=A.ctx.currentTime, p=A.out.gain;
    (p.cancelAndHoldAtTime||p.cancelScheduledValues).call(p,now); p.setTargetAtTime(.9,now,1);
    // something soon after switching on, then the natural rhythm
    for(const [k,e] of Object.entries(EV)) A.next[k]=now+rand(.5,Math.min(e.gap[1],8));
    clearInterval(A.iv); A.iv=setInterval(tick,200); tick();
  } else if(A.ctx){
    const now=A.ctx.currentTime, p=A.out.gain;
    (p.cancelAndHoldAtTime||p.cancelScheduledValues).call(p,now); p.setTargetAtTime(0,now,.25);
    clearInterval(A.iv); A.sus=setTimeout(()=>A.ctx.suspend(),1200);
  }
  A.on=on; if(btn) btn.setAttribute("aria-pressed",String(on)); pref.set(on?"1":"0");
}
if(btn){
  let woke=false; // the tap that unlocked audio shouldn't also switch it off
  btn.addEventListener("click",()=>{ if(woke){ woke=false; return; } setSound(!A.on); });
  // Sound is on by default and starts with the page. Browsers block audio until the visitor
  // interacts, so if the page is still silent it starts on their first tap, click or key press.
  // Switching it off is remembered.
  if(pref.get()!=="0"){
    setSound(true);
    if(A.ctx&&A.ctx.state!=="running"){
      const evs=["pointerdown","touchend","keydown","click"];
      const wake=e=>{
        if(!A.on||!A.ctx){ evs.forEach(t=>removeEventListener(t,wake,true)); return; }
        A.ctx.resume().then(()=>{ if(A.ctx.state==="running") evs.forEach(t=>removeEventListener(t,wake,true)); });
        if(e.type==="pointerdown"&&e.target.closest?.("#suara")) woke=true;
      };
      evs.forEach(t=>addEventListener(t,wake,true));
    }
  }
}
// The button shows only the time of day, not what can be heard.
const TIME_OF_DAY=[[3.5,"Subuh","before dawn"],[5.3,"Fajar","sunrise"],[7.5,"Pagi","morning"],[11,"Siang","midday"],[15,"Sore","afternoon"],[17.6,"Senja","dusk"],[19.2,"Malam","night"],[23,"Tengah malam","midnight"]];
function caption(){ if(!cap) return; const h=hourNow(); let p=TIME_OF_DAY[TIME_OF_DAY.length-1]; for(const q of TIME_OF_DAY) if(h>=q[0]) p=q; cap.textContent=p[1]+" · "+p[2]; }
caption(); setInterval(caption,3e4);

run();
})();
