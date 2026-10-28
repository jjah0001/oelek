"use strict";
// Kampung at the foot of Merapi, drawn behind every page and following the visitor's clock:
// roosters and mist at dawn, egrets over the sawah by day, cicadas at noon, kites in the
// afternoon, bats at dusk, then crickets, frogs, tokek, fireflies and Merapi's glow at night.
// Sound is synthesised in Web Audio (no audio files) and only plays after the visitor asks.
// Holidays bring their own kampung: flags all August, tirakatan and lomba for the 17th, sahur patrols
// and ngabuburit in Ramadan, malam takbiran and Lebaran, the qurban animals of Idul Adha, Sekaten's
// gamelan before Maulid and the silence of malam 1 Suro; the gereja, pura and klenteng keep Natal and
// Paskah, Nyepi and Waisak, Imlek and Cap Go Meh, and everyone sees in the new year (dates in js/data/hari-besar.js).
// Preview another hour with ?jam=21.5, another day with ?tgl=2027-03-09 and rain with ?hujan=1 (or ?hujan=0).
(()=>{
const cv=document.getElementById("kampung");
if(!cv||!cv.getContext) return;
const cx=cv.getContext("2d");
const sky=document.createElement("canvas"), land=document.createElement("canvas");
const qs=new URLSearchParams(location.search);
const jamQ=parseFloat(qs.get("jam")), forced=isNaN(jamQ)?null:((jamQ%24)+24)%24, boot=Date.now();
const tglQ=/^\d{4}-\d{2}-\d{2}$/.test(qs.get("tgl")||"")?qs.get("tgl"):null;
// The kampung's own moment: the visitor's clock, or a previewed day and hour that then runs on in real time.
function kNow(){
  if(forced===null&&!tglQ) return new Date();
  const now=new Date(), base=tglQ?new Date(tglQ+"T00:00:00"):new Date(now); base.setHours(0,0,0,0);
  const h0=forced!==null?forced:(now.getHours()+now.getMinutes()/60+now.getSeconds()/3600)-(Date.now()-boot)/36e5;
  return new Date(base.getTime()+(h0*36e5+(Date.now()-boot)));
}
const hourNow=()=>{ const d=kNow(); return d.getHours()+d.getMinutes()/60+d.getSeconds()/3600; };

// ================= hari besar =================
const HB=[...(typeof HARI_BESAR!=="undefined"?HARI_BESAR:[]),...(typeof HARI_RAYA!=="undefined"?HARI_RAYA:[])].map(([k,s])=>{ const [y,m,d]=s.split("-").map(Number); return [k,Date.UTC(y,m-1,d)/864e5]; });
const dayNum=d=>Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/864e5;
function festAt(d){
  const n=dayNum(d), h=d.getHours()+d.getMinutes()/60, mo=d.getMonth(), dt=d.getDate(), wd=d.getDay();
  const off=k=>{ let b=null; for(const [t,v] of HB) if(t===k){ const x=n-v; if(b===null||Math.abs(x)<Math.abs(b)) b=x; } return b; };
  const R=off("ramadan"), Fi=off("fitri"), Ad=off("adha"), Su=off("suro"), Ma=off("maulid"), is=(v,a,b)=>v!==null&&v>=a&&v<=b;
  const F={h,ramadan:is(R,0,31)&&is(Fi,-31,-1)};
  F.sahur=F.ramadan&&h>=2.5&&h<3.75;                       // patrols wake the kampung for sahur
  F.ngabuburit=F.ramadan&&h>=15.8&&h<17.6;                 // waiting for buka: everyone out on the road
  F.malamRamadan=F.ramadan&&h>=18.3&&h<21.5;               // kids with petasan after buka and tarawih
  F.takbiranFitri=(Fi===-1&&h>=18.6)||(Fi===0&&h<1);
  F.takbiranAdha=(Ad===-1&&h>=18.6)||(Ad===0&&h<1);
  F.takbiran=F.takbiranFitri||F.takbiranAdha;
  F.salatId=(Fi===0||Ad===0)&&h>=5.5&&h<7.7;               // the walk to the lapangan
  F.lebaran=is(Fi,0,2)&&h>=7.7&&h<21;                      // silaturahmi: motorbikes and the odd petasan
  F.ketupat=is(Fi,0,7);                                    // until Bakda Kupat, a week after Lebaran
  F.ternak=is(Ad,-6,0)&&!(Ad===0&&h>=9);                   // qurban animals tethered by the houses
  F.sate=is(Ad,0,3)&&h>=9&&h<21;                           // and the smoke of sate afterwards
  F.sekaten=is(Ma,-7,-1)&&h>=8&&h<23.5&&!((wd===4&&h>=18)||(wd===5&&h<13)); // silent Thursday night to Friday prayer
  F.suro=(Su===-1&&h>=18)||(Su===0&&h<4);                  // malam 1 Suro: the kampung keeps quiet
  F.tapaBisu=F.suro&&(h>=23||h<1.5);                       // a silent walk with torches
  F.agustus=mo===7;
  F.tirakatan=mo===7&&dt===16&&h>=18.5;
  F.lomba=mo===7&&dt===17&&h>=7.5&&h<17;
  F.idDay=Fi===0||Ad===0; F.sirineDay=mo===7&&dt===17;
  // Natal: stars and lights from mid-December to Epiphany; candles to the misa on the 24th; bells.
  const Im=off("imlek"), Ny=off("nyepi"), Pa=off("paskah"), Wa=off("waisak");
  F.natalan=(mo===11&&dt>=15)||(mo===0&&dt<=6);
  F.misaNatal=mo===11&&dt===24&&h>=21&&h<23.6;
  F.natal=(mo===11&&(dt===25||(dt===24&&h>=18)));
  // Paskah: no bells from Kamis Putih evening until the Gloria of the Easter Vigil; candles that night.
  F.lilinPaskah=Pa===-1&&h>=19&&h<22.5;
  F.loncengDiam=(Pa===-3&&h>=18)||Pa===-2||(Pa===-1&&h<20.3);
  F.paskah=Pa===0;
  // Nyepi: the ogoh-ogoh parade on the evening of Pengerupukan; on the day the Hindu houses by the pura stay dark.
  F.ogoh=Ny===-1&&h>=18.3&&h<22.5;
  F.nyepi=(Ny===0&&h>=6)||(Ny===1&&h<6);
  // Waisak: lanterns rising from Borobudur, away to the west, on the full-moon night.
  F.waisak=Wa===0&&h>=19.5;
  F.waisakDay=Wa===0;
  // Imlek: red lanterns for the fifteen days to Cap Go Meh; fireworks at midnight; barongsai by day.
  F.lampion=is(Im,-1,14);
  F.malamImlek=(Im===-1&&h>=23.3)||(Im===0&&h<.7);
  F.barongsai=(Im===0&&h>=9&&h<17)||(Im===14&&h>=18.5&&h<22.5);
  F.imlek=Im===0;
  // Tahun Baru: fireworks and terompet around midnight.
  F.tahunBaru=(mo===11&&dt===31&&h>=23.6)||(mo===0&&dt===1&&h<.7);
  F.fireworks=F.takbiran||F.malamImlek||F.tahunBaru;
  return F;
}
let FEST=festAt(kNow());

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
const today=kNow(), hq=qs.get("hujan");
const rainyDay=rng(today.getFullYear()*1000+today.getMonth()*40+today.getDate())()<(FEST.imlek?.9:[.7,.7,.6,.45,.2,.08,.05,.05,.1,.3,.55,.65][today.getMonth()]); // rain on Imlek brings rezeki
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
const moonAge=()=>(((kNow().getTime()/864e5-10962.76)/SYN)%1+1)%1; // days since the 6 Jan 2000 new moon
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
const SP={fire:sprite([214,255,120]), lava:sprite([255,110,40]), warm:sprite([255,190,90]), obor:sprite([255,170,60],.2),
  lamp:[sprite([255,70,50],.25),sprite([255,210,70],.25),sprite([120,230,120],.25),sprite([255,140,200],.25)]};

// ================= layout =================
let W=0,H=0,dpr=1,G=null,P=null,M=null,baseH=-1;
const ST={t:0,emit:0,fcheck:0,fw:[],pops:[],lamp:[],clouds:[],puffs:[],lava:[],trail:[],flocks:[],bats:[],flies:[],drops:[],smoke:[],mist:[],shoot:null,flash:0};
function layout(){
  const w=cv.clientWidth, h=cv.clientHeight;
  if(!w||!h||(w===W&&h===H&&G)) return;
  W=w; H=h; dpr=Math.min(window.devicePixelRatio||1,1.5);
  for(const c of [cv,sky,land]){ c.width=Math.round(W*dpr); c.height=Math.round(H*dpr); }
  const R=rng(2930), r=(a,b)=>a+R()*(b-a);
  // on wide screens the peak sits right of the hero card so Merapi's summit, plume and glow stay in view
  const yH=H*.64, px=W*(W>900?.74:.6), py=H*.19, hw=Math.max(W*.42,H*.5);
  const profile=(cx0,peak,half,shape)=>{ const pts=[]; let n=0; for(let x=-4;x<=W+8;x+=4){ n=n*.96+(R()-.5)*1.2; const d=Math.abs(x-cx0)/half; pts.push([x,Math.min(yH+2,shape(d,x)+n*d*H*.004)]); } return pts; };
  const mPts=profile(px,py,hw,(d,x)=>d<.03?py+H*.003*Math.sin(x*.7)*(x>px?1.6:1):py+(yH-py)*Math.min(1,Math.pow((d-.03)/1.25,x<px?.6:.66)));
  const bPts=profile(W*.2,H*.29,Math.max(W*.4,H*.45),d=>H*.29+(yH-H*.29)*Math.min(1,Math.pow(d/1.15,1.25)));
  const mY=x=>{ const i=Math.max(0,Math.min(mPts.length-1,Math.round((x+4)/4))); return mPts[i][1]; };
  const hY=x=>yH-H*.03+H*.012*Math.sin(x/W*6.3+1)+H*.007*Math.sin(x/W*15+2);
  // kali (lava gullies): radial but broken, each starting and ending at its own height and meandering,
  // so the cone doesn't read as a tent held up by ropes
  const gullies=[]; for(let i=0;i<30;i++){
    const side=R()<.5?-1:1, b=r(.05,.9), s0=r(.04,.42), s1=Math.min(.96,s0+r(.12,.42)), ph=r(0,TAU), fq=r(5,11), pts=[];
    for(let k=0;k<=16;k++){ const s=s0+(s1-s0)*k/16, x=px+side*hw*b*Math.pow(s,.92)+Math.sin(s*fq+ph)*hw*.014*s, y=py+(yH-py)*s; if(y>mY(x)+2) pts.push([x,y]); }
    if(pts.length>4) gullies.push({pts,w:r(.5,1.2),side});
  }
  const trees=[]; for(let x=0;x<W;x+=r(5,16)) trees.push({x,y:hY(x)+2,r:H*r(.006,.014)});
  const palms=[]; for(let i=0;i<9;i++){ const x=r(0,W); palms.push({x,y:hY(x)+3,h:H*r(.04,.065),lean:r(-.15,.15)}); }
  const houses=[]; for(const c of [.12,.38,.72,.88]) for(let i=0,n=2+(R()*3|0);i<n;i++){ const x=W*c+r(-1,1)*W*.04, w=H*r(.026,.04); houses.push({x,y:hY(x)+H*.006,w,h:w*.45,joglo:R()<.35,lit:R()<.85}); }
  const yT=yH+H*.01, n=7, edges=[];
  for(let i=0;i<=n;i++){ const amp=H*.004*(1+i*1.2), f=r(.003,.008), ph=r(0,TAU), y0=yT+(H*.99-yT)*Math.pow(i/n,1.3), e=[]; for(let x=-8;x<=W+16;x+=8) e.push([x,y0+amp*Math.sin(x*f+ph)]); edges.push(e); }
  // sawah plots: each terrace is split by pematang into plots at different stages of the season
  const plots=edges.slice(0,-1).map((_,i)=>{ const row=[]; let slL=0; for(let x=-8;x<W+16;){ const w=W*r(.12,.32)*(1+i*.12), q=R(), sl=r(-1,1)*H*.012*(1+i*.3); row.push({x0:x,x1:x+w,type:q<.16?0:q<.36?1:q<.9?2:3,slL,sl}); slL=sl; x+=w; } return row; });
  const eY=(i,x)=>{ const e=edges[i]; return e[Math.max(0,Math.min(e.length-1,Math.round((x+8)/8)))][1]; };
  const mid=(i,x)=>(eY(i,x)+eY(i+1,x))/2;
  const figs={gubuk:{x:W*.7,y:mid(3,W*.7)},orang:{x:W*.6,y:mid(4,W*.6)},tani:[{x:W*.79,y:mid(4,W*.79)},{x:W*.835,y:mid(5,W*.835)}]};
  const masjid={x:W*.955,y:hY(W*.955)+H*.008,w:H*.055};
  const gereja={x:W*.255,y:hY(W*.255)+H*.008,w:H*.046}, klenteng={x:W*.505,y:hY(W*.505)+H*.008,w:H*.042}, pura={x:W*.6,y:hY(W*.6)+H*.008,w:H*.04};
  // bamboo leaves, fixed once so they only sway
  const bam=Array.from({length:7},()=>Array.from({length:20},(_,k)=>Array.from({length:3},(_,j)=>({u:.34+k*.033+r(-.01,.01),side:(k+j)%2?1:-1,a:r(.25,.9),L:r(.055,.095)}))));
  const stars=[]; for(let i=0;i<170;i++) stars.push({x:r(0,W),y:r(0,yH*.85),r:r(.6,1.7),b:r(.3,1),w:r(.5,2.5),ph:r(0,TAU)});
  const grass=[]; for(let x=0;x<W;x+=r(3,8)) grass.push({x,h:H*r(.012,.035),ph:r(0,TAU)});
  const kites=[[[200,36,36],[250,248,240]],[[240,186,40],[240,186,40]],[[40,92,200],[250,248,240]]].map(c=>{ const gx=W*r(.2,.8); return {ax:W*r(.15,.85),ay:H*r(.1,.3),c,ph:r(0,TAU),gx,gy:hY(gx)}; });
  G={yH,px,py,hw,mPts,bPts,mY,hY,gullies,trees,palms,houses,edges,plots,eY,figs,masjid,gereja,klenteng,pura,bam,stars,grass,kites,
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
function palm(c,x,y,hgt,lean,t,col,nuts){
  const tx=x+lean*hgt, ty=y-hgt;
  c.strokeStyle=col; c.fillStyle=col; c.lineCap="round"; c.lineWidth=Math.max(1,hgt*.032);
  c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+lean*hgt*.2,y-hgt*.55,tx,ty); c.stroke();
  if(nuts) for(const [dx,dy] of [[-.03,.035],[.025,.04],[0,.06]]){ c.beginPath(); c.arc(tx+dx*hgt,ty+dy*hgt,hgt*.022,0,TAU); c.fill(); }
  const fine=hgt>60, nl=fine?20:9;
  c.lineWidth=Math.max(.7,hgt*(fine?.006:.01)); c.beginPath();
  for(let i=0;i<11;i++){
    const a=-Math.PI/2+(i-5)*.33+Math.sin(t*.9+i*1.3)*.05+Math.sin(t*.35)*.06, L=hgt*(.44+.08*Math.sin(i*2.1));
    const qx=tx+Math.cos(a)*L*.5, qy=ty+Math.sin(a)*L*.6-L*.05, ex=tx+Math.cos(a)*L, ey=ty+Math.sin(a)*L*.6+L*.55;
    c.moveTo(tx,ty); c.quadraticCurveTo(qx,qy,ex,ey);
    // leaflets hang from the rib, longest in the middle of the frond, drooping more towards its tip
    for(let k=1;k<nl;k++){
      const u=k/nl, v=1-u, bx=v*v*tx+2*v*u*qx+u*u*ex, by=v*v*ty+2*v*u*qy+u*u*ey;
      const dx=2*v*(qx-tx)+2*u*(ex-qx), dy=2*v*(qy-ty)+2*u*(ey-qy), n=Math.hypot(dx,dy)||1, ll=L*.2*Math.sin(Math.PI*(.15+u*.85))*(1-u*.35), dr=.6+u*.6;
      c.moveTo(bx,by); c.quadraticCurveTo(bx-dy/n*ll*.6,by+dx/n*ll*.6,bx-dy/n*ll*.7+dx/n*ll*.25,by+dx/n*ll*.7+ll*dr);
      c.moveTo(bx,by); c.quadraticCurveTo(bx+dy/n*ll*.6,by-dx/n*ll*.6,bx+dy/n*ll*.7+dx/n*ll*.25,by-dx/n*ll*.7+ll*dr);
    }
  }
  c.stroke();
}
function bamboo(c,x,y,hgt,t,col){
  c.strokeStyle=col; c.fillStyle=col; c.lineCap="round";
  const leaves=new Path2D();
  for(let i=0;i<7;i++){
    const bx=x+i*hgt*.016, lean=-.2+i*.09, sw=Math.sin(t*.7+i)*hgt*.015;
    const tx=bx+lean*hgt+sw, ty=y-hgt*(.8+.2*Math.sin(i*3.1)), qx=bx+lean*hgt*.2, qy=y-hgt*.6;
    const at=u=>{ const v=1-u; return [v*v*bx+2*v*u*qx+u*u*tx, v*v*y+2*v*u*qy+u*u*ty]; };
    c.lineWidth=Math.max(1.6,hgt*.011); c.beginPath(); c.moveTo(bx,y); c.quadraticCurveTo(qx,qy,tx,ty); c.stroke();
    // ruas: the nodes along the culm
    c.lineWidth=Math.max(1,hgt*.004); c.beginPath();
    for(let k=1;k<14;k++){ const [nx,ny]=at(k/14), w=hgt*.012*(1-k/20); c.moveTo(nx-w,ny); c.lineTo(nx+w,ny); } c.stroke();
    // narrow leaves in drooping fans from each upper node, fluttering
    for(const node of G.bam[i]) for(const lf of node){
      const [lx,ly]=at(lf.u), L=hgt*lf.L, ang=lf.side>0?lf.a:Math.PI-lf.a, fl=Math.sin(t*1.6+lf.u*20+i)*.14;
      const a=ang+fl*lf.side, ex=lx+Math.cos(a)*L, ey=ly+Math.sin(a)*L*.5+L*.5, nx=-(ey-ly), ny=ex-lx, nn=Math.hypot(nx,ny)||1, w=L*.11;
      const mx=(lx+ex)/2, my=(ly+ey)/2-L*.12;
      leaves.moveTo(lx,ly); leaves.quadraticCurveTo(mx+nx/nn*w,my+ny/nn*w,ex,ey); leaves.quadraticCurveTo(mx-nx/nn*w,my-ny/nn*w,lx,ly);
    }
  }
  c.fill(leaves);
}
function renderBase(h){
  baseH=h; const m=M=moods(h); P=palette(h,m.rain);
  // after dark the page follows the kampung into its night colours, so a pale veil never sits over a dark sky
  const malam=m.night>.55; if(malam!==ST.malam){ ST.malam=malam; document.documentElement.setAttribute("data-kampung",malam?"malam":"siang"); }
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
  // gullies fade in and out along their length; the lit lip sits on the sun's side
  const gd=mix(P.mtn,[0,0,0],.3), gl=mix(P.mtn,[255,255,255],.14), lip=side*1.3;
  for(const q of G.gullies){
    const n=q.pts.length; c.lineWidth=q.w;
    for(let k=1;k<n;k++){
      const a=Math.sin(Math.PI*k/n), [x0,y0]=q.pts[k-1], [x1,y1]=q.pts[k];
      c.strokeStyle=rgb(gd,.5*a); c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.stroke();
      c.strokeStyle=rgb(gl,.32*a*(1-m.night*.7)); c.beginPath(); c.moveTo(x0+lip,y0); c.lineTo(x1+lip,y1); c.stroke();
    }
  }
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
  masjid(c,G.masjid,m,nightLit);
  drawGereja(c,G.gereja,m,nightLit); drawKlenteng(c,G.klenteng,m,nightLit); drawPura(c,G.pura,m,FEST.nyepi?0:nightLit);
  sawah(c,m);
}
// Sawah: plots flooded for planting (holding the sky), young rice, full green rice and a few turning gold,
// with rows of padi, pematang between the plots, a gubuk, an orang-orangan sawah and farmers in caping.
function sawah(c,m){
  const E=G.edges, sky=mix(P.top,P.bot,.6), dayish=1-m.night*.75;
  const tone=[mix(P.field,sky,.38), mix(P.field,sky,.18), mix(P.field,P.bot,.06), mix(P.field,[200,170,70],.3*dayish)];
  for(let i=0;i<E.length-1;i++){
    const depth=i/E.length*.55, path=new Path2D();
    for(const [x,y] of E[i]) path.lineTo(x,y); for(let k=E[i+1].length-1;k>=0;k--) path.lineTo(E[i+1][k][0],E[i+1][k][1]); path.closePath();
    c.save(); c.clip(path);
    const top=Math.min(...E[i].map(e=>e[1]))-4, bot=Math.max(...E[i+1].map(e=>e[1]))+4, rows=2+i, sp=3+i*1.7, th=1.3+i*.95;
    for(const pl of G.plots[i]){
      c.fillStyle=rgb(mix(tone[pl.type],P.fg,depth)); c.beginPath(); c.moveTo(pl.x0,top); c.lineTo(pl.x1,top); c.lineTo(pl.x1+pl.sl,bot); c.lineTo(pl.x0+pl.slL,bot); c.fill();
      if(pl.type===0){ // still water: a few streaks of reflected sky
        c.strokeStyle=rgb(mix(sky,[255,255,255],.35),.35*dayish); c.lineWidth=1; c.beginPath();
        for(let x=pl.x0+sp*3;x<pl.x1;x+=sp*7){ const y=G.eY(i,x)+(G.eY(i+1,x)-G.eY(i,x))*((x*.37)%1); c.moveTo(x,y); c.lineTo(x+sp*2.5,y); } c.stroke();
        continue;
      }
      // rows of padi, sparser when young
      const step=pl.type===1?sp*1.8:sp, h=pl.type===1?th*.6:th, col=pl.type===3?mix(tone[3],[120,90,20],.35):mix(tone[pl.type],[18,48,14],.32);
      c.strokeStyle=rgb(mix(col,P.fg,depth),.55+.25*dayish); c.lineWidth=Math.max(.7,i*.28); c.beginPath();
      for(let j=0;j<rows;j++) for(let x=pl.x0+step*.5+(j%2)*step*.5;x<pl.x1;x+=step){
        const y0=G.eY(i,x), y=y0+(G.eY(i+1,x)-y0)*((j+.8)/(rows+.6));
        c.moveTo(x,y); c.lineTo(x-h*.25,y-h); c.moveTo(x,y); c.lineTo(x+h*.25,y-h*.9);
      }
      c.stroke();
    }
    // pematang between plots
    c.strokeStyle=rgb(mix(P.field,[236,226,190],.3),.4*dayish+.1); c.lineWidth=1+i*.35; c.beginPath();
    for(const pl of G.plots[i]){ c.moveTo(pl.x1,top); c.lineTo(pl.x1+pl.sl,bot); } c.stroke();
    c.restore();
    c.strokeStyle=rgb(mix(P.field,[255,255,230],.25),.35*(1-m.night*.6)); c.lineWidth=1+i*.4;
    c.beginPath(); for(const [x,y] of E[i]) c.lineTo(x,y); c.stroke();
  }
  const ink=rgb(mix(mix(P.hill,P.fg,.5),[0,0,0],.15)), F=G.figs;
  gubuk(c,F.gubuk.x,F.gubuk.y,H*.05,ink,m);
  orang(c,F.orang.x,F.orang.y,H*.045,ink);
  // farmers work the cool hours, not the midday heat, the rain or the dark
  const work=(bump(m.h,6,6.8,10.6,11.4)+bump(m.h,14.6,15.2,17,17.6))*(1-m.rain);
  if(work>.5) F.tani.forEach((f,i)=>tani(c,f.x,f.y,H*(.04+i*.008),ink,i));
}
function caping(c,x,y,w){ c.beginPath(); c.moveTo(x-w,y); c.lineTo(x,y-w*.55); c.lineTo(x+w,y); c.closePath(); c.fill(); }
function gubuk(c,x,y,s,col,m){ // a hut on stilts for watching the birds off the padi
  c.fillStyle=col; c.strokeStyle=col; c.lineWidth=Math.max(1,s*.05);
  c.beginPath(); for(const dx of [-.42,-.14,.14,.42]){ c.moveTo(x+dx*s,y); c.lineTo(x+dx*s,y-s*.5); } c.stroke();
  c.fillRect(x-s*.5,y-s*.52,s,s*.06);
  c.beginPath(); c.moveTo(x-s*.7,y-s*.6); c.lineTo(x,y-s*1.05); c.lineTo(x+s*.7,y-s*.6); c.lineTo(x+s*.55,y-s*.55); c.lineTo(x-s*.55,y-s*.55); c.fill();
  // strings of tin cans and plastic strung from the hut to scare the emprit
  c.lineWidth=.6; c.beginPath(); c.moveTo(x+s*.5,y-s*.5); c.quadraticCurveTo(x+s*1.6,y-s*.3,x+s*2.6,y-s*.45); c.stroke();
}
function orang(c,x,y,s,col){ // orang-orangan sawah
  c.strokeStyle=col; c.fillStyle=col; c.lineWidth=Math.max(1,s*.05);
  c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-s); c.moveTo(x-s*.38,y-s*.72); c.lineTo(x+s*.38,y-s*.68); c.stroke();
  c.beginPath(); c.moveTo(x-s*.2,y-s*.78); c.lineTo(x+s*.2,y-s*.78); c.lineTo(x+s*.26,y-s*.4); c.lineTo(x-s*.26,y-s*.4); c.fill();
  c.beginPath(); c.arc(x,y-s*.9,s*.09,0,TAU); c.fill(); caping(c,x,y-s*.96,s*.24);
}
function tani(c,x,y,s,col,pose){ // a farmer bent over the rice, caping on
  c.strokeStyle=col; c.fillStyle=col; c.lineCap="round"; c.lineWidth=Math.max(1.2,s*.12);
  const hx=x+s*(pose?-.38:.38), hy=y-s*.62;
  c.beginPath(); c.moveTo(x-s*.12,y); c.lineTo(x,y-s*.5); c.lineTo(x+s*.12,y); // legs
  c.moveTo(x,y-s*.5); c.quadraticCurveTo(x+(hx-x)*.4,y-s*.85,hx,hy); // back
  c.moveTo(hx-(hx-x)*.2,hy+s*.02); c.lineTo(hx+(hx-x)*.1,y-s*.12); c.stroke(); // arm reaching to the padi
  caping(c,hx+(hx-x)*.1,hy-s*.02,s*.24);
}
function glowAt(c,x,y,w,lit,col){ if(!lit) return; c.globalCompositeOperation="lighter"; c.globalAlpha=lit*.5; c.drawImage(col||SP.warm,x-w,y-w*.4,w*2,w*1.4); c.globalAlpha=1; c.globalCompositeOperation="source-over"; }
function drawGereja(c,q,m,lit){ // a small kampung church: whitewashed, a steep roof and a bell tower with a cross
  const {x,y,w}=q, h=w*.5, top=y-h, wall=rgb(mix(P.hill,[232,228,214],.5*(1-m.night*.7))), roof=rgb(mix(P.hill,[150,62,40],.45*(1-m.night*.6)));
  c.fillStyle=wall; c.fillRect(x-w/2,top,w*.78,h);
  c.fillStyle=roof; c.beginPath(); c.moveTo(x-w*.58,top); c.lineTo(x+w*.36,top); c.lineTo(x-w*.11,top-w*.36); c.fill();
  const tx=x+w*.36, tw=w*.22, th=w*.95; c.fillStyle=wall; c.fillRect(tx-tw/2,y-th,tw,th);
  c.fillStyle=roof; c.beginPath(); c.moveTo(tx-tw*.65,y-th); c.lineTo(tx+tw*.65,y-th); c.lineTo(tx,y-th-w*.3); c.fill();
  c.strokeStyle=rgb(mix(P.hill,[246,240,220],.6*(1-m.night*.6))); c.lineWidth=Math.max(1,w*.03); c.beginPath();
  c.moveTo(tx,y-th-w*.3); c.lineTo(tx,y-th-w*.52); c.moveTo(tx-w*.07,y-th-w*.44); c.lineTo(tx+w*.07,y-th-w*.44); c.stroke();
  c.fillStyle=lit?rgb(mix([40,30,20],[255,214,140],lit)):rgb(mix(P.hill,[0,0,0],.4));
  for(const dx of [-.36,-.18,0]){ c.beginPath(); c.moveTo(x+dx*w-w*.04,top+h*.75); c.lineTo(x+dx*w-w*.04,top+h*.35); c.arc(x+dx*w,top+h*.35,w*.04,Math.PI,0); c.lineTo(x+dx*w+w*.04,top+h*.75); c.fill(); }
  glowAt(c,x-w*.1,top,w,lit);
}
function drawKlenteng(c,q,m,lit){ // a klenteng: red walls and pillars, a roof with swallowtail ridge ends
  const {x,y,w}=q, h=w*.44, top=y-h, dk=1-m.night*.65;
  c.fillStyle=rgb(mix(P.hill,[176,44,36],.55*dk)); c.fillRect(x-w/2,top,w,h);
  c.fillStyle=rgb(mix(P.hill,[90,54,40],.5*dk)); c.beginPath();
  c.moveTo(x-w*.62,top); c.lineTo(x+w*.62,top); c.lineTo(x+w*.5,top-w*.2); c.lineTo(x-w*.5,top-w*.2); c.fill();
  c.strokeStyle=rgb(mix(P.hill,[200,150,60],.5*dk)); c.lineWidth=Math.max(1,w*.035); c.beginPath(); // the ridge sweeping up at both ends
  c.moveTo(x-w*.62,top-w*.32); c.quadraticCurveTo(x-w*.48,top-w*.18,x,top-w*.21); c.quadraticCurveTo(x+w*.48,top-w*.18,x+w*.62,top-w*.32); c.stroke();
  c.fillStyle=lit?rgb(mix([40,24,16],[255,190,110],lit)):rgb(mix(P.hill,[0,0,0],.45)); c.fillRect(x-w*.12,top+h*.35,w*.24,h*.65);
  glowAt(c,x,top,w*.9,lit);
}
function drawPura(c,q,m,lit){ // a small pura: a split gate (candi bentar) and a meru shrine behind it
  const {x,y,w}=q, dk=1-m.night*.65, stone=rgb(mix(P.hill,[120,110,100],.5*dk)), brick=rgb(mix(P.hill,[170,92,62],.45*dk));
  c.fillStyle=rgb(mix(P.hill,[60,52,48],.5*dk)); // meru: stacked roofs
  for(let i=0;i<5;i++){ const ww=w*(.34-i*.05), yy=y-w*.32-i*w*.13; c.beginPath(); c.moveTo(x+w*.3-ww,yy); c.lineTo(x+w*.3+ww,yy); c.lineTo(x+w*.3+ww*.6,yy-w*.1); c.lineTo(x+w*.3-ww*.6,yy-w*.1); c.fill(); }
  c.fillRect(x+w*.28,y-w*.34,w*.04,w*.34);
  for(const sd of [-1,1]){ const gx=x-w*.12+sd*w*.1; c.fillStyle=brick; c.beginPath(); // candi bentar halves, stepped
    c.moveTo(gx,y); c.lineTo(gx,y-w*.75); c.lineTo(gx+sd*w*.05,y-w*.75); c.lineTo(gx+sd*w*.05,y-w*.62); c.lineTo(gx+sd*w*.12,y-w*.62); c.lineTo(gx+sd*w*.12,y-w*.45); c.lineTo(gx+sd*w*.2,y-w*.45); c.lineTo(gx+sd*w*.2,y); c.fill();
    c.fillStyle=stone; c.fillRect(gx+(sd<0?-w*.2:0),y-w*.06,w*.2,w*.06); }
  glowAt(c,x+w*.2,y-w*.4,w*.7,lit*.8);
}
function masjid(c,q,m,lit){ // a village masjid with a three-tier tajug roof and mustaka
  const {x,y,w}=q, h=w*.42, top=y-h;
  c.fillStyle=rgb(mix(P.hill,[226,222,206],.45*(1-m.night*.7))); c.fillRect(x-w/2,top,w,h);
  c.fillStyle=rgb(mix(P.hill,[70,82,74],.5*(1-m.night*.6)));
  const tier=(w0,w1,y0,y1)=>{ c.beginPath(); c.moveTo(x-w0,y0); c.lineTo(x+w0,y0); c.lineTo(x+w1,y1); c.lineTo(x-w1,y1); c.fill(); };
  tier(w*.66,w*.36,top,top-w*.2); tier(w*.4,w*.2,top-w*.24,top-w*.38); tier(w*.24,w*.02,top-w*.42,top-w*.6);
  c.fillRect(x-w*.012,top-w*.72,w*.024,w*.13); c.beginPath(); c.arc(x,top-w*.62,w*.035,0,TAU); c.fill();
  c.fillStyle=lit?rgb(mix([40,30,20],[255,226,150],lit)):rgb(mix(P.hill,[0,0,0],.4));
  for(const dx of [-.3,-.1,.1,.3]) c.fillRect(x+dx*w-w*.04,top+h*.3,w*.08,h*.45);
  if(lit){ c.globalCompositeOperation="lighter"; c.globalAlpha=lit*.5; c.drawImage(SP.warm,x-w,top-w*.4,w*2,w*1.4); c.globalAlpha=1; c.globalCompositeOperation="source-over"; }
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
  if((ST.fcheck-=dt)<=0){ ST.fcheck=1; FEST=festAt(kNow()); }
  const F=FEST;
  if((m.kitchen>.1||F.sate)&&Math.random()<dt*(F.sate?6:2.5)){ const s=G.houses[Math.random()*G.houses.length|0]; ST.smoke.push({x:s.x+s.w*.15,y:s.y-s.h-s.w*.3,r:2,a:0,vx:rand(1,3)}); }
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
  // kembang api over the kampung on malam takbiran
  if(F.fireworks&&!m.rain&&ST.fw.length<(F.tahunBaru?9:5)&&Math.random()<dt/(F.tahunBaru?1:2.6)){ const x=W*rand(.08,.97); ST.fw.push({x,y:G.hY(x),ty:H*rand(.1,.34),t:0,c:[[255,90,70],[255,215,90],[120,230,140],[140,180,255],[255,150,220]][Math.random()*5|0],parts:null}); onFirework(0,x); }
  for(const f of ST.fw){
    f.t+=dt;
    if(!f.parts&&f.t>1.1){ f.parts=Array.from({length:60},(_,i)=>{ const a=i/60*TAU+rand(-.05,.05), v=H*rand(.07,.13); return {x:f.x,y:f.ty,vx:Math.cos(a)*v,vy:Math.sin(a)*v}; }); f.bt=0; onFirework(1,f.x); }
    if(f.parts){ f.bt+=dt; for(const q of f.parts){ q.x+=q.vx*dt; q.y+=q.vy*dt; q.vx*=1-dt*1.2; q.vy=q.vy*(1-dt*1.2)+H*.04*dt; } }
  }
  ST.fw=ST.fw.filter(f=>!f.parts||f.bt<2);
  // petasan: a flash on the road, sometimes a whole renteng
  const popR=F.takbiran||F.malamImlek||F.tahunBaru?1.8:F.malamRamadan?14:F.lebaran?30:F.tirakatan?70:0;
  // Waisak lanterns: released at Borobudur, beyond the hills to the west, drifting up and away
  const newLamp=y=>({x:W*rand(-.02,.14)+(G.yH-y)*rand(.05,.25),y,vx:rand(3,10)*W/1440,vy:-rand(12,20)*H/900,ph:rand(0,TAU),s:rand(.7,1.2)});
  if(F.waisak&&!m.rain&&!ST.lamp.length) for(let i=0;i<45;i++) ST.lamp.push(newLamp(G.yH-Math.pow(Math.random(),.8)*G.yH*.95)); // already in the sky when the page opens
  if(F.waisak&&!m.rain&&ST.lamp.length<80&&Math.random()<dt*4) ST.lamp.push(newLamp(G.yH-H*.01));
  for(const l of ST.lamp){ l.x+=l.vx*dt+Math.sin(ST.t*.4+l.ph)*.15; l.y+=l.vy*dt; }
  ST.lamp=ST.lamp.filter(l=>l.y>-20);
  if(popR&&!m.rain&&Math.random()<dt/popR){ const x=W*rand(.04,.96), n=Math.random()<.3?8+(Math.random()*16|0):1; ST.pops.push({x,y:G.hY(x)+H*rand(.01,.03),life:0,n,k:0}); onPop(n,x); }
  for(const p of ST.pops) p.life+=dt;
  ST.pops=ST.pops.filter(p=>p.life<p.n*.1+.3);
  ST.flash=Math.max(0,ST.flash-dt*2.5);
  if(m.rain>.6&&Math.random()<dt/28){ ST.flash=1; onLightning(rand(1,4)); }
}
// ================= hari besar: drawing =================
const night=m=>Math.min(1,m.night*.85);
function bendera(x,y,s,t,m,ph){ // a merah putih on a bamboo pole, waving
  const dk=night(m)*.75, red=rgb(mix([206,32,41],P.hill,dk)), white=rgb(mix([246,244,236],P.hill,dk));
  cx.strokeStyle=rgb(mix([120,96,60],P.hill,dk)); cx.lineWidth=Math.max(.8,s*.06); cx.beginPath(); cx.moveTo(x,y); cx.lineTo(x,y-s*1.6); cx.stroke();
  const fw=s*.9, fh=s*.6, top=y-s*1.6, seg=6;
  for(const [col,y0,y1] of [[red,0,.5],[white,.5,1]]){
    cx.fillStyle=col; cx.beginPath();
    for(let i=0;i<=seg;i++){ const u=i/seg, w=Math.sin(t*5+ph-u*3)*fh*.12*u; cx.lineTo(x+u*fw,top+y0*fh+w); }
    for(let i=seg;i>=0;i--){ const u=i/seg, w=Math.sin(t*5+ph-u*3)*fh*.12*u; cx.lineTo(x+u*fw,top+y1*fh+w); }
    cx.fill();
  }
}
function umbul(x,y,hgt,t,m,i){ // umbul-umbul: a tall arched bamboo with a long cloth hanging from its tip
  const dk=night(m)*.75, sw=Math.sin(t*.8+i)*hgt*.03, tx=x+hgt*.22+sw, ty=y-hgt;
  cx.strokeStyle=rgb(mix([140,112,64],P.hill,dk)); cx.lineWidth=Math.max(1,hgt*.02); cx.beginPath(); cx.moveTo(x,y); cx.quadraticCurveTo(x+hgt*.02,y-hgt*.7,tx,ty); cx.stroke();
  const cols=[[206,32,41],[246,244,236]], L=hgt*.62, wdt=hgt*.07;
  for(let k=0;k<2;k++){ cx.fillStyle=rgb(mix(cols[k],P.hill,dk)); cx.beginPath();
    for(let j=0;j<=8;j++){ const u=j/8, wv=Math.sin(t*3+i+u*4)*wdt*.5*u; cx.lineTo(tx+wv+(k?wdt*.5:0)-u*hgt*.04,ty+u*L); }
    for(let j=8;j>=0;j--){ const u=j/8, wv=Math.sin(t*3+i+u*4)*wdt*.5*u; cx.lineTo(tx+wv+(k?wdt:wdt*.5)-u*hgt*.04,ty+u*L); }
    cx.fill(); }
}
function ketupat(x,y,s,m,t,ph){ // ketupat of young janur hung under the eaves
  const sw=Math.sin(t*1.5+ph)*s*.15;
  cx.strokeStyle=rgb(mix([90,80,40],P.hill,night(m)*.7)); cx.lineWidth=.6; cx.beginPath(); cx.moveTo(x,y); cx.lineTo(x+sw,y+s*.8); cx.stroke();
  const cy=y+s*1.3, k=x+sw; cx.fillStyle=rgb(mix([226,214,96],P.hill,night(m)*.75)); cx.beginPath();
  cx.moveTo(k,cy-s*.5); cx.lineTo(k+s*.42,cy); cx.lineTo(k,cy+s*.5); cx.lineTo(k-s*.42,cy); cx.fill();
  cx.strokeStyle=rgb(mix([150,140,50],P.hill,night(m)*.75)); cx.lineWidth=.7; cx.beginPath(); cx.moveTo(k-s*.21,cy-s*.25); cx.lineTo(k+s*.21,cy+s*.25); cx.moveTo(k+s*.21,cy-s*.25); cx.lineTo(k-s*.21,cy+s*.25); cx.stroke();
  cx.beginPath(); cx.moveTo(k,cy+s*.5); cx.lineTo(k+s*.1,cy+s*.85); cx.stroke(); // the janur tail
}
function hewan(x,y,s,goat,col,t,ph){ // a goat or a cow tethered for qurban, grazing now and then
  const bob=Math.max(0,Math.sin(t*.7+ph))*s*.18, L=goat?s:s*1.5, bh=goat?s*.42:s*.6;
  cx.fillStyle=col; cx.strokeStyle=col; cx.lineWidth=Math.max(1,s*.1);
  cx.beginPath(); cx.ellipse(x,y-s*.55,L*.5,bh*.5,0,0,TAU); cx.fill();
  cx.beginPath(); for(const dx of [-.35,-.2,.2,.35]){ cx.moveTo(x+dx*L,y-s*.4); cx.lineTo(x+dx*L,y); } cx.stroke();
  const hx=x+L*.55, hy=y-s*.75+bob; cx.beginPath(); cx.moveTo(x+L*.38,y-s*.62); cx.lineTo(hx,hy); cx.stroke();
  cx.beginPath(); cx.ellipse(hx+s*.08,hy+s*.04,s*.16,s*.1,.5,0,TAU); cx.fill();
  if(goat){ cx.beginPath(); cx.moveTo(hx,hy-s*.05); cx.quadraticCurveTo(hx-s*.1,hy-s*.3,hx-s*.25,hy-s*.25); cx.stroke(); }
}
function lampionMerah(x,y,s,m,t,ph){ // a red lantern with a gold tassel
  const sw=Math.sin(t*1.3+ph)*s*.12, lx=x+sw, ly=y+s*.9;
  cx.strokeStyle=rgb(mix([60,30,20],P.hill,night(m)*.6)); cx.lineWidth=.6; cx.beginPath(); cx.moveTo(x,y); cx.lineTo(lx,ly-s*.5); cx.stroke();
  cx.fillStyle=rgb(mix([214,30,30],P.hill,night(m)*.35)); cx.beginPath(); cx.ellipse(lx,ly,s*.5,s*.42,0,0,TAU); cx.fill();
  cx.fillStyle=rgb([220,170,60]); cx.fillRect(lx-s*.25,ly-s*.5,s*.5,s*.1); cx.fillRect(lx-s*.25,ly+s*.4,s*.5,s*.1);
  cx.strokeStyle=rgb([220,170,60]); cx.beginPath(); cx.moveTo(lx,ly+s*.5); cx.lineTo(lx,ly+s*.85); cx.stroke();
  const lit=ss((m.night-.2)/.6); if(lit){ cx.globalCompositeOperation="lighter"; cx.globalAlpha=lit*.7; const r=s*1.3; cx.drawImage(SP.lamp[0],lx-r,ly-r,r*2,r*2); cx.globalCompositeOperation="source-over"; cx.globalAlpha=1; }
}
function bintang(x,y,r,a){ cx.beginPath(); for(let i=0;i<10;i++){ const rr=i%2?r*.42:r, an=-Math.PI/2+i*Math.PI/5; cx.lineTo(x+Math.cos(an)*rr,y+Math.sin(an)*rr); } cx.closePath(); cx.globalAlpha=a; cx.fill(); cx.globalAlpha=1; }
function ogoh(x,y,s,t,i){ // an ogoh-ogoh: a huge raksasa with wild hair and raised arms, carried on a bamboo frame
  const bob=Math.sin(t*3+i)*s*.05, sway=Math.sin(t*1.7+i)*.08;
  cx.save(); cx.translate(x,y-s*.1+bob); cx.rotate(sway);
  cx.fillStyle="#1a1014"; cx.strokeStyle="#1a1014"; cx.lineWidth=Math.max(1.2,s*.06);
  cx.fillRect(-s*.45,-s*.12,s*.9,s*.08); // the bamboo bearers' frame
  cx.beginPath(); cx.moveTo(-s*.28,-s*.12); cx.quadraticCurveTo(-s*.38,-s*.6,-s*.18,-s*.85); cx.lineTo(s*.18,-s*.85); cx.quadraticCurveTo(s*.38,-s*.6,s*.28,-s*.12); cx.fill(); // body
  cx.beginPath(); cx.arc(0,-s*1,s*.2,0,TAU); cx.fill(); // head
  for(let k=0;k<9;k++){ const a=-Math.PI+k*Math.PI/8, L=s*(.28+.06*Math.sin(k*2.3+t*2)); cx.beginPath(); cx.moveTo(0,-s); cx.lineTo(Math.cos(a)*L,-s+Math.sin(a)*L-s*.04); cx.stroke(); } // gimbal hair
  cx.beginPath(); cx.moveTo(-s*.18,-s*.75); cx.lineTo(-s*.5,-s*1.05); cx.lineTo(-s*.46,-s*1.25); cx.moveTo(s*.18,-s*.75); cx.lineTo(s*.52,-s*.95); cx.lineTo(s*.62,-s*1.15); cx.stroke(); // arms, claws up
  cx.fillStyle="#ff6040"; cx.beginPath(); cx.arc(-s*.07,-s*1.02,s*.035,0,TAU); cx.arc(s*.07,-s*1.02,s*.035,0,TAU); cx.fill(); // glowing eyes
  cx.restore();
}
function festHill(m,t){
  const F=FEST;
  const nl=ss((m.night-.2)/.6);
  if(F.natalan){ // a star on the gereja and fairy lights on the houses nearby
    const g=G.gereja, tx=g.x-g.w*.11, ty=g.y-g.w*.5-g.w*.36-g.w*.1; // on the gable over the door
    cx.fillStyle=rgb(mix([255,226,120],P.hill,(1-nl)*.3)); bintang(tx,ty,g.w*.12,.95);
    if(nl){ cx.globalCompositeOperation="lighter"; cx.globalAlpha=nl*.8; const r=g.w*.5; cx.drawImage(SP.warm,tx-r,ty-r,r*2,r*2); cx.globalCompositeOperation="source-over"; cx.globalAlpha=1; }
    for(const h of G.houses.filter(h=>Math.abs(h.x-g.x)<W*.2).slice(0,4)){ // lights along the eaves, twinkling
      for(let k=0;k<7;k++){ const lx=h.x-h.w*.55+k*h.w*.18, ly=h.y-h.h-Math.sin(k/6*Math.PI)*h.w*.04, on=.5+.5*Math.sin(t*3+k*1.7+h.x);
        cx.globalCompositeOperation="lighter"; cx.globalAlpha=(.25+nl*.75)*on; cx.drawImage(SP.lamp[k%4],lx-3,ly-3,6,6); } }
    cx.globalCompositeOperation="source-over"; cx.globalAlpha=1;
  }
  if(F.lampion){ // red lanterns at the klenteng and the Chinese houses of the kampung
    const k=G.klenteng; for(const dx of [-.42,-.14,.14,.42]) lampionMerah(k.x+dx*k.w,k.y-k.w*.44,k.w*.14,m,t,dx*9);
    G.houses.filter((_,i)=>i%5===2).forEach((h,i)=>lampionMerah(h.x,h.y-h.h,h.w*.16,m,t,i));
  }
  if(F.nyepi){ // penjor bending over the pura
    const p=G.pura; cx.strokeStyle=rgb(mix([210,190,120],P.hill,night(m)*.7)); cx.lineWidth=Math.max(1,p.w*.04);
    for(const dx of [-.5,.5]){ const bx=p.x-p.w*.12+dx*p.w; cx.beginPath(); cx.moveTo(bx,p.y); cx.quadraticCurveTo(bx,p.y-p.w*1.4,bx+p.w*.45,p.y-p.w*1.25); cx.stroke(); }
  }
  if(F.agustus){
    G.houses.forEach((h,i)=>bendera(h.x+h.w*.55,h.y-h.h-h.w*.2,h.w*.38,t,m,i));
    [.03,.18,.3,.45,.58,.83,.97].forEach((u,i)=>{ const x=W*u; umbul(x,G.hY(x)+H*.014,H*.1,t,m,i); });
  }
  if(F.ketupat) G.houses.forEach((h,i)=>{ ketupat(h.x-h.w*.36,h.y-h.h,h.w*.24,m,t,i); ketupat(h.x+h.w*.36,h.y-h.h,h.w*.24,m,t,i+2); });
  if(F.ternak){
    const dk=night(m)*.8;
    [[.34,1,[236,232,220]],[.36,1,[120,84,52]],[.41,1,[236,232,220]],[.68,0,[200,176,150]],[.7,1,[60,50,44]],[.75,1,[236,232,220]],[.86,0,[150,110,80]]].forEach(([u,goat,c],i)=>{
      const x=W*u; hewan(x,G.hY(x)+H*.022,H*(goat?.019:.024),goat,rgb(mix(c,P.hill,dk)),t,i); });
  }
  if(F.lomba){ // panjat pinang in the lapangan, with the crowd around it
    const x=W*.8, y=G.eY(5,x)+H*.01, hgt=H*.15, ink=rgb(mix(P.fg,[0,0,0],.1));
    cx.strokeStyle=rgb(mix([150,112,70],P.field,.2)); cx.lineWidth=Math.max(2,H*.005); cx.beginPath(); cx.moveTo(x,y); cx.lineTo(x,y-hgt); cx.stroke();
    cx.strokeStyle=rgb([120,90,50]); cx.lineWidth=Math.max(1,H*.002); cx.beginPath(); cx.ellipse(x,y-hgt*.96,hgt*.13,hgt*.03,0,0,TAU); cx.stroke();
    const prize=[[220,40,40],[40,120,220],[240,190,40],[60,170,90],[250,250,250]];
    for(let i=0;i<9;i++){ const a=i/9*TAU, px=x+Math.cos(a)*hgt*.13, py=y-hgt*.96+Math.sin(a)*hgt*.03, sw=Math.sin(t*2+i)*hgt*.01;
      cx.strokeStyle=ink; cx.lineWidth=.6; cx.beginPath(); cx.moveTo(px,py); cx.lineTo(px+sw,py+hgt*.08); cx.stroke();
      cx.fillStyle=rgb(prize[i%5]); cx.fillRect(px+sw-hgt*.012,py+hgt*.08,hgt*.024,hgt*.035); }
    bendera(x,y-hgt*.98,hgt*.12,t,m,0);
    // a tower of climbers, slipping and trying again
    const climb=(Math.sin(t*.25)*.5+.5)*.35; cx.fillStyle=ink; cx.strokeStyle=ink; cx.lineWidth=Math.max(1.2,H*.003);
    for(let k=0;k<4;k++){ const by=y-k*hgt*.15-(k===3?climb*hgt:0), bx=x+(k%2?1:-1)*hgt*.025;
      cx.beginPath(); cx.moveTo(bx,by); cx.lineTo(bx,by-hgt*.1); cx.stroke(); cx.beginPath(); cx.arc(bx,by-hgt*.12,hgt*.02,0,TAU); cx.fill(); }
    for(let i=0;i<26;i++){ const a=i*2.4, r=hgt*(.25+(i%5)*.07), px=x+Math.cos(a)*r*1.6, py=y+Math.sin(a)*r*.12+H*.005, jump=Math.max(0,Math.sin(t*3+i*1.7))*H*.004;
      cx.fillStyle=rgb(mix(prize[i%5],P.fg,.45)); cx.fillRect(px-H*.003,py-H*.016-jump,H*.006,H*.011); cx.fillStyle=ink; cx.beginPath(); cx.arc(px,py-H*.019-jump,H*.003,0,TAU); cx.fill(); }
  }
}
// lights and walkers moving along the road below the kampung
function train(n,speed,dir,gap,draw1,start=.45){
  const span=n*gap, road=x=>G.hY(x)+H*.017, L=W+span*1.2, base=((ST.t*speed+start*L)%L+L)%L; // already part-way along when the page opens
  for(let i=0;i<n;i++){ let x=base-i*gap; x=((x%L)+L)%L-span*.6; if(dir<0) x=W-x; draw1(x,road(x),i); }
}
function obor(x,y,a,t,i,spr){
  const fl=.75+.25*Math.sin(t*13+i*2.1)*Math.sin(t*7.3+i), r=Math.max(5,H*.013)*fl;
  cx.globalAlpha=a; cx.drawImage(spr||SP.obor,x-r,y-H*.02-r,r*2,r*2);
}
function festRoad(m,t){
  const F=FEST;
  cx.globalCompositeOperation="lighter";
  if(F.takbiran) train(30,W/90,1,W*.022,(x,y,i)=>obor(x,y,.9,t,i,i%3===0?SP.obor:SP.lamp[i%4]));
  if(F.sahur) train(7,W/40,-1,W*.02,(x,y,i)=>obor(x,y,.85,t,i));
  if(F.tapaBisu) train(36,W/420,1,W*.016,(x,y,i)=>obor(x,y,.5,t,i));
  if(F.misaNatal||F.lilinPaskah){ // candles gathering at the gereja
    const g=G.gereja; for(let i=0;i<(F.lilinPaskah?40:24);i++){ const a=i*2.39, r=g.w*(.4+(i%7)*.12); obor(g.x+Math.cos(a)*r*1.4,g.y+H*.004+Math.sin(a)*r*.12,.55,t,i,SP.warm); } }
  if(F.ogoh) train(26,W/140,-1,W*.018,(x,y,i)=>obor(x,y,.9,t,i));
  if(F.tirakatan) for(let i=0;i<18;i++){ const x=W*(i+.5)/18; obor(x,G.hY(x)+H*.017,.85,t,i); }
  for(const p of ST.pops){ const k=Math.min(p.n-1,Math.floor(p.life/.1)), f=1-(p.life-k*.1)/.12; if(f>0){ cx.globalAlpha=f; const r=H*.012; cx.drawImage(SP.warm,p.x+k*2-r,p.y-r,r*2,r*2); } }
  cx.globalCompositeOperation="source-over"; cx.globalAlpha=1;
  if(F.ogoh) train(26,W/140,-1,W*.018,(x,y,i)=>{ if(i%8===3) ogoh(x,y,H*.05,t,i); });
  if(F.salatId){ // the kampung walking to the lapangan in its best clothes
    const cols=[[250,250,246],[250,250,246],[230,230,220],[60,110,90],[120,60,90],[200,170,110]];
    train(46,W/160,1,W*.013,(x,y,i)=>{ const c=rgb(mix(cols[i%6],P.hill,.15)), s=H*.012*(i%4?1:.75), bob=Math.abs(Math.sin(t*4+i))*s*.08;
      cx.fillStyle=c; cx.fillRect(x-s*.22,y-s-bob,s*.44,s*.8); cx.beginPath(); cx.arc(x,y-s*1.15-bob,s*.16,0,TAU); cx.fill(); });
  }
}
const FWS={}; const fwSprite=c=>FWS[c]||(FWS[c]=sprite(c,.35));
function fireworks(){
  cx.globalCompositeOperation="lighter";
  for(const f of ST.fw){
    if(!f.parts){ const u=Math.min(1,f.t/1.1), y=f.y+(f.ty-f.y)*(1-Math.pow(1-u,2)); cx.globalAlpha=.9; cx.fillStyle="#ffe6b0"; cx.fillRect(f.x-1,y,2,4); cx.globalAlpha=.3; cx.fillRect(f.x-.5,y+4,1,H*.03); continue; }
    const a=Math.max(0,1-f.bt/2), spr=fwSprite(f.c), r=Math.max(3,H*.006);
    for(const q of f.parts){ cx.globalAlpha=a*(.55+.45*Math.random()); cx.drawImage(spr,q.x-r,q.y-r,r*2,r*2); }
    if(f.bt<.25){ cx.globalAlpha=(1-f.bt/.25)*.5; const r=H*.06; cx.drawImage(SP.warm,f.x-r,f.ty-r,r*2,r*2); }
  }
  cx.globalCompositeOperation="source-over"; cx.globalAlpha=1;
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
  if(ST.fw.length) fireworks();

  cx.setTransform(1,0,0,1,0,0); cx.globalAlpha=1; cx.drawImage(land,0,0); cx.setTransform(dpr,0,0,dpr,0,0);
  festHill(m,t);
  if(ST.lamp.length){ cx.globalCompositeOperation="lighter"; for(const l of ST.lamp){ const r=Math.max(3,H*.0055)*l.s*(1-Math.max(0,(G.yH-l.y)/G.yH)*.65), fl=.75+.25*Math.sin(ST.t*6+l.ph); cx.globalAlpha=.9*fl; cx.drawImage(SP.obor,l.x-r,l.y-r,r*2,r*2); } cx.globalCompositeOperation="source-over"; cx.globalAlpha=1; }
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
  festRoad(m,t);
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
  palm(cx,W*.9,H+6,Math.min(H*.6,W*.42),-.18,t,fg,true);
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

// Every kampung rooster has its own voice: pitch, how long it holds the last note, how it breaks.
const ROOSTERS=[{p:1,hold:.95,gap:.18,brk:0},{p:.86,hold:1.25,gap:.2,brk:.4},{p:1.14,hold:.7,gap:.15,brk:0},{p:.94,hold:1.1,gap:.24,brk:.7}];
function rooster(t,far,who){
  const R=ROOSTERS[who??(Math.random()*ROOSTERS.length|0)], k=R.p*rand(.97,1.03);
  const o=O("sawtooth",500*k), f1=Fl("bandpass",1300*k,3), f2=Fl("bandpass",2700*k,4), g=Gn(), v=O("sine",rand(7,10)), vg=Gn(14*k), vol=(far?.1:.18)*rand(.8,1.1);
  o.connect(f1); o.connect(f2); f1.connect(g); f2.connect(g); g.connect(busFor(far)); chain(v,vg,o.frequency);
  const fr=o.frequency, gp=g.gain; gp.setValueAtTime(0,t);
  const syl=[[0,.12,480,620],[R.gap,.12,560,680],[R.gap*2,.14,620,720],[R.gap*3+.02,R.hold,700,760]];
  for(const [s,d,a,b] of syl){
    fr.setValueAtTime(a*k,t+s);
    if(d>.5){ fr.linearRampToValueAtTime((b+80)*k,t+s+.22); fr.linearRampToValueAtTime(b*k,t+s+.6);
      if(R.brk) fr.linearRampToValueAtTime(b*k*(1+R.brk*.25),t+s+.66); // a voice that cracks on the long note
      fr.exponentialRampToValueAtTime(420*k,t+s+d); }
    else fr.linearRampToValueAtTime(b*k,t+s+d);
    gp.setValueAtTime(0,t+s); gp.linearRampToValueAtTime(vol,t+s+.02); gp.setValueAtTime(vol,t+s+d-.05); gp.linearRampToValueAtTime(0,t+s+d);
  }
  const end=R.gap*3+R.hold+.2; run1(o,t,end); run1(v,t,end);
  if(!far&&Math.random()<.5) rooster(t+end+rand(1.5,5),true,(ROOSTERS.indexOf(R)+1+(Math.random()*3|0))%ROOSTERS.length); // a neighbour answers
}
// Morning birds. Kutilang: a bright, liquid phrase of a few notes that jump about.
function kutilang(t){
  const out=busFor(Math.random()<.35), base=rand(1500,2100); let s=t;
  const tune=Array.from({length:3+(Math.random()*4|0)},()=>[1,1.25,1.5,1.33,1.12,1.68][Math.random()*6|0]);
  for(const r of tune){
    const d=rand(.07,.16), f=base*r, o=O("sine",f), o2=O("sine",f*2), g=Gn(), g2=Gn(.18);
    o.frequency.setValueAtTime(f*.9,s); o.frequency.linearRampToValueAtTime(f*1.04,s+d*.3); o.frequency.linearRampToValueAtTime(f,s+d);
    o2.frequency.setValueAtTime(f*1.8,s); o2.frequency.linearRampToValueAtTime(f*2.08,s+d*.3);
    chain(o2,g2,g); env(g.gain,s,.012,rand(.045,.07),d*.4,d*.5); chain(o,g,out); run1(o,s,d+.05); run1(o2,s,d+.05); s+=d+rand(.03,.09);
  }
}
// Prenjak: a fast, dry "cet-cet-cet-cet" trill, often answered.
function prenjak(t,again=true){
  const out=busFor(Math.random()<.5), f=rand(4200,5200), n=8+(Math.random()*14|0), gap=rand(.055,.08);
  for(let i=0;i<n;i++){ const s=t+i*gap, o=O("triangle",f), g=Gn();
    o.frequency.setValueAtTime(f*1.08,s); o.frequency.exponentialRampToValueAtTime(f*.86,s+.025);
    env(g.gain,s,.003,.08*(1-i/n*.4),.005,.02); chain(o,Fl("bandpass",f,2),g,out); run1(o,s,.05); }
  if(again&&Math.random()<.5) prenjak(t+n*gap+rand(.3,1),false);
}
// Burung gereja (sparrows) chattering in the eaves: loose "cip"s from a few birds at once.
function gereja(t){
  for(let b=0,nb=2+(Math.random()*3|0);b<nb;b++){ const out=busFor(Math.random()<.3); let s=t+rand(0,.6);
    for(let i=0,n=3+(Math.random()*7|0);i<n;i++){ const f=rand(3200,4600), d=rand(.04,.08), o=O("sine",f), g=Gn();
      o.frequency.setValueAtTime(f*1.1,s); o.frequency.exponentialRampToValueAtTime(f*.8,s+d);
      env(g.gain,s,.006,rand(.025,.045),d*.2,d*.6); chain(o,g,out); run1(o,s,d+.05); s+=d+rand(.05,.35); } }
}
function chirp(t){ // emprit in the padi: short warbled notes that arch
  const out=busFor(Math.random()<.4), base=rand(2600,3800); let s=t;
  for(let i=0,n=3+(Math.random()*5|0);i<n;i++){
    const d=rand(.05,.12), f0=base*rand(.92,1.1), o=O("sine",f0), g=Gn(), w=O("sine",rand(35,70)), wg=Gn(f0*rand(.03,.06));
    chain(w,wg,o.frequency);
    o.frequency.setValueAtTime(f0*.95,s); o.frequency.linearRampToValueAtTime(f0*rand(1.03,1.1),s+d*.4); o.frequency.linearRampToValueAtTime(f0*rand(.96,1),s+d);
    env(g.gain,s,.015,rand(.06,.09),d*.35,d*.5); chain(o,g,out); run1(o,s,d+.05); run1(w,s,d+.05); s+=d+rand(.03,.12);
  }
}
function dove(t){ // perkutut: "hur … ketek … kung"
  const out=busFor(true);
  for(let r=0,reps=2+(Math.random()*2|0);r<reps;r++){
    const s0=t+r*1.8, o=O("sine",560), g=Gn(), tr=O("sine",22), tg=Gn(0);
    chain(o,g,Fl("lowpass",1400),out); chain(tr,tg,g.gain);
    for(const [s,d,a,b] of [[0,.16,520,560],[.42,.34,600,560],[.95,.6,640,520]]){
      o.frequency.setValueAtTime(a,s0+s); o.frequency.linearRampToValueAtTime(b,s0+s+d);
      g.gain.setValueAtTime(0,s0+s); g.gain.linearRampToValueAtTime(.06,s0+s+.04); g.gain.setValueAtTime(.06,s0+s+d-.06); g.gain.linearRampToValueAtTime(0,s0+s+d);
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
    g.gain.setValueAtTime(0,t+s); g.gain.linearRampToValueAtTime(.06,t+s+.1); g.gain.setValueAtTime(.06,t+s+d*.55); g.gain.linearRampToValueAtTime(0,t+s+d);
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
// A neighbour's gamelan rehearsing a slendro piece across the fields: soft and far, never the same twice.
// The balungan is picked from a few pieces, the kendhang leads, the bonang anticipates, and the last
// round slows down into the gong (suwuk), as a real rehearsal does.
const SLENDRO={1:1,2:1.1487,3:1.3195,5:1.5157,6:1.7411};
const PIECES=["21262126353265325653212635321216","53235321653221656532123565321653","66356532225322165352165311236532"].map(p=>p.split(""));
function bar(t,f,v,dec,out,parts=[[1,1],[2.76,.32],[5.4,.1]]){
  for(const [r,a] of parts){ const o=O("sine",f*r), g=Gn(); env(g.gain,t,.004,v*a,0,dec/Math.sqrt(r)); chain(o,g,out); run1(o,t,dec+.1); }
}
function gong(t,out,v=.11){ for(const [f,a] of [[62,1],[63.3,.85],[124.5,.25],[187,.1]]){ const o=O("sine",f), g=Gn(); env(g.gain,t,.05,v*a,.2,7); chain(o,g,out); run1(o,t,7.5); } }
function kendhang(t,out,low){ // "dhung" (low, the pitch falling) or "tak" (a dry slap)
  const f=low?rand(95,110):rand(380,440), o=O("sine",f), g=Gn();
  o.frequency.setValueAtTime(f*(low?1.5:1.1),t); o.frequency.exponentialRampToValueAtTime(f,t+(low?.07:.02));
  env(g.gain,t,.004,low?.08:.035,.01,low?.28:.07); chain(o,g,out); run1(o,t,.4);
}
function gamelan(t){
  if(A.gamUntil>t) return;
  const out=A.gam, f0=268*rand(.98,1.02), notes=PIECES[Math.random()*PIECES.length|0], rounds=2+(Math.random()*2|0);
  let s=t, beat=rand(.7,.85);
  for(let r=0;r<rounds;r++) notes.forEach((d,i)=>{
    const last=r===rounds-1, f=f0*SLENDRO[d], j=()=>rand(-.012,.012);
    if(last) beat*=1+.018; // slowing into the final gong
    if(i===0) gong(s,out,r?.09:.11);
    bar(s+j(),f,.035,1.6,out); // saron
    if(Math.random()<.85) bar(s+beat/2+j(),f*2,.016,.8,out); // peking
    if(i%4===3) bar(s,f/2,.04,3,out,[[1,1],[2,.2],[3.1,.05]]); // kenong on the gatra
    if(i%4===1&&Math.random()<.6) bar(s+j(),f/2,.025,2.4,out,[[1,1],[2.1,.2]]); // kempul
    const nx=notes[(i+1)%notes.length]; if(Math.random()<.35) bar(s+beat*.75+j(),f0*SLENDRO[nx]*2,.012,.6,out); // bonang anticipating the next note
    if(i%2===1) kendhang(s+j(),out,i%4===3); else if(Math.random()<.3) kendhang(s+beat/2+j(),out,false);
    s+=beat;
  });
  gong(s,out,.12); A.gamUntil=s+8;
}
// Bedug at the langgar before the call to prayer: slow strokes that quicken, then a few to close.
function bedug(t){
  const out=A.far[1+(Math.random()*3|0)];
  const hits=[0,1.6,3,4.2,5.2,6,6.6,7.1,7.5,7.85,8.15,8.4,8.62,8.82,9,9.6,10.6,11.8];
  for(const h of hits){
    const s=t+h, f=rand(58,64), o=O("sine",f), g=Gn(), n=Nz(), ng=Gn();
    o.frequency.setValueAtTime(f*1.35,s); o.frequency.exponentialRampToValueAtTime(f,s+.09);
    env(g.gain,s,.006,.1,.05,1.1); chain(o,g,out); run1(o,s,1.3);
    chain(n,Fl("lowpass",380,.7),ng,out); env(ng.gain,s,.003,.04,0,.08); run1(n,s,.15);
  }
}
// Kampung life: a motorbike passing on the road, the tukang bakso's "tok-tok", the sapu lidi in the yard,
// hens clucking, bats squeaking at dusk, and the hum of sendaren on the kites.
function motor(t){
  const dur=rand(7,11), f=rand(70,95), dir=Math.random()<.5?1:-1, vol=rand(.025,.04);
  const o=O("sawtooth",f), o2=O("square",f*.5), g=Gn(), g2=Gn(.35), lp=Fl("lowpass",700,.8), pan=A.ctx.createStereoPanner?A.ctx.createStereoPanner():null;
  chain(o2,g2,lp); chain(o,lp,g); const end=pan?(g.connect(pan),pan):g; end.connect(A.far[2]);
  const mid=t+dur*rand(.4,.6);
  o.frequency.setValueAtTime(f*1.06,t); o.frequency.setValueAtTime(f*1.06,mid-.4); o.frequency.linearRampToValueAtTime(f*.93,mid+.5); o.frequency.linearRampToValueAtTime(f*.9,t+dur);
  o2.frequency.setValueAtTime(f*.53,t); o2.frequency.setValueAtTime(f*.53,mid-.4); o2.frequency.linearRampToValueAtTime(f*.465,mid+.5);
  lp.frequency.setValueAtTime(400,t); lp.frequency.linearRampToValueAtTime(1400,mid); lp.frequency.linearRampToValueAtTime(400,t+dur);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,mid); g.gain.linearRampToValueAtTime(0,t+dur);
  if(pan){ pan.pan.setValueAtTime(-.8*dir,t); pan.pan.linearRampToValueAtTime(.8*dir,t+dur); }
  run1(o,t,dur); run1(o2,t,dur);
}
function bakso(t){ // the mangkok struck with a spoon as the cart goes by: "tok-tok ... tok-tok-tok"
  const out=busFor(true), groups=4+(Math.random()*5|0);
  for(let gI=0;gI<groups;gI++){ const s0=t+gI*rand(1.8,2.6), v=.08*Math.sin(Math.PI*(gI+.5)/groups);
    for(let k=0,n=2+(Math.random()<.4?1:0);k<n;k++){ const s=s0+k*.22, f=rand(1050,1150), o=O("triangle",f), o2=O("sine",f*2.6), g=Gn(), g2=Gn(.25);
      chain(o2,g2,g); chain(o,Fl("bandpass",f,4),g,out); env(g.gain,s,.002,v,.005,.09); run1(o,s,.15); run1(o2,s,.15); } }
}
function sapu(t){ // sapu lidi sweeping the yard in the cool of the morning
  const out=A.near[Math.random()<.5?1:3], n=8+(Math.random()*10|0); let s=t;
  for(let i=0;i<n;i++){ const d=rand(.18,.3), src=Nz(), bp=Fl("bandpass",rand(3000,4500),.8), g=Gn();
    bp.frequency.setValueAtTime(bp.frequency.value*1.2,s); bp.frequency.linearRampToValueAtTime(bp.frequency.value*.8,s+d);
    g.gain.setValueAtTime(0,s); g.gain.linearRampToValueAtTime(.08,s+d*.3); g.gain.linearRampToValueAtTime(0,s+d);
    chain(src,bp,g,out); run1(src,s,d); s+=d+rand(.3,.5); if(Math.random()<.12) s+=rand(1,2.5); }
}
function petok(t){ // a hen: "petok-petok-petok … petoook"
  const out=busFor(Math.random()<.5), f=rand(420,520); let s=t;
  for(let i=0,n=3+(Math.random()*4|0);i<=n;i++){
    const long=i===n, d=long?rand(.3,.45):rand(.06,.09), o=O("sawtooth",f), g=Gn();
    o.frequency.setValueAtTime(f*(long?.9:1),s); o.frequency.linearRampToValueAtTime(f*(long?1.35:1.1),s+d*.6); o.frequency.linearRampToValueAtTime(f*(long?1.2:1),s+d);
    chain(o,Fl("bandpass",1250,3),Fl("lowpass",2600),g,out); env(g.gain,s,.008,long?.13:.11,d*.4,d*.5); run1(o,s,d+.05);
    s+=d+(long?0:rand(.12,.25)); if(i===n-1) s+=rand(.1,.25);
  }
}
function codot(t){ // bats squabbling as they leave for the fruit trees
  const out=busFor(Math.random()<.6); let s=t;
  for(let i=0,n=2+(Math.random()*5|0);i<n;i++){ const f=rand(2600,3800), d=rand(.03,.06), o=O("sawtooth",f), g=Gn();
    o.frequency.setValueAtTime(f*1.2,s); o.frequency.exponentialRampToValueAtTime(f*.75,s+d);
    chain(o,Fl("bandpass",f,5),g,out); env(g.gain,s,.003,.1,.005,d); run1(o,s,d+.05); s+=d+rand(.05,.18); }
}
function genteng(t){ // a drop on the roof tiles under the rain
  const f=rand(2200,4800), o=O("sine",f), g=Gn();
  o.frequency.setValueAtTime(f,t); o.frequency.exponentialRampToValueAtTime(f*.6,t+.02);
  chain(o,g,A.near[Math.random()*5|0]); env(g.gain,t,.001,rand(.006,.02),0,.03); run1(o,t,.06);
}
function talang(t){ // water dripping off the gutter into a puddle, almost in rhythm
  const f=rand(520,760), o=O("sine",f), g=Gn();
  o.frequency.setValueAtTime(f,t); o.frequency.exponentialRampToValueAtTime(f*2.4,t+.05);
  chain(o,Fl("lowpass",1800),g,A.near[3]); env(g.gain,t,.003,.05,0,.09); run1(o,t,.12);
}
// Sapi in the kandang at feeding and milking time: a low "mmm-ooo" that opens out and sags.
// A sawtooth through a lowpass that opens (the closed "mm") then a mouth formant, with a slow wobble.
function sapi(t,far){
  const f0=rand(105,140), dur=rand(1.4,2.4), vol=far?.05:.09, out=busFor(far);
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
// Kambing in the kandang behind the house, waiting for cut grass: "mbeee", with the quaver of a goat's voice.
// A closed "m" opening into a bright "eee"; the quaver is a fast wobble in loudness and a little in pitch.
function kambing(t,far,again=true){
  const f0=rand(320,440), dur=rand(.55,1.05), vol=far?.045:.08, out=busFor(far);
  const o=O("sawtooth",f0), lp=Fl("lowpass",400,1), f1=Fl("bandpass",rand(900,1100),4), f2=Fl("bandpass",rand(2200,2600),5), g1=Gn(3.2), g2=Gn(2), g=Gn(),
    am=O("sine",rand(6.5,8.5)), ag=Gn(.45), mg=Gn(.55), pv=O("sine",rand(6.5,8.5)), pg=Gn(f0*.02);
  chain(pv,pg,o.frequency); chain(am,ag,mg.gain);
  chain(o,lp,f1,g1,mg); chain(lp,f2,g2,mg); chain(mg,g,out);
  const fr=o.frequency; fr.setValueAtTime(f0*.92,t); fr.linearRampToValueAtTime(f0*1.04,t+dur*.25); fr.linearRampToValueAtTime(f0*.9,t+dur);
  lp.frequency.setValueAtTime(400,t); lp.frequency.linearRampToValueAtTime(3200,t+.12); lp.frequency.setValueAtTime(3200,t+dur*.7); lp.frequency.linearRampToValueAtTime(1500,t+dur);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(vol,t+.08); g.gain.setValueAtTime(vol,t+dur*.65); g.gain.linearRampToValueAtTime(0,t+dur);
  run1(o,t,dur); run1(am,t,dur); run1(pv,t,dur);
  if(again&&Math.random()<.45) kambing(t+dur+rand(.4,1.2),far||Math.random()<.5,false); // one more bleat, often from another goat
}
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

// ================= hari besar: sound =================
const panFor=x=>Math.max(-.9,Math.min(.9,(x/(W||1))*1.8-.9));
const panBus=pan=>A.far[Math.max(0,Math.min(4,Math.round((pan+.8)/.4)))]; // the nearest far bus, so no nodes pile up
function pop1(t,out,v){ // one petasan: a sharp crack with a little body
  const n=Nz(), hp=Fl("bandpass",rand(1500,2600),.8), g=Gn(), o=O("sine",rand(90,130)), og=Gn();
  chain(n,hp,g,out); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(v,t+.002); g.gain.exponentialRampToValueAtTime(1e-4,t+.07); run1(n,t,.09);
  o.frequency.setValueAtTime(160,t); o.frequency.exponentialRampToValueAtTime(60,t+.08); chain(o,og,out); env(og.gain,t,.002,v*.5,0,.1); run1(o,t,.14);
}
function onPop(n,x){
  if(!A.on) return; const t=A.ctx.currentTime+rand(.05,.25), out=panBus(panFor(x)), v=n>1?.07:.12;
  for(let i=0;i<n;i++) pop1(t+i*rand(.05,.13),out,v*rand(.6,1));
}
function onFirework(stage,x){
  if(!A.on) return; const t=A.ctx.currentTime, out=panBus(panFor(x));
  if(stage===0){ // the whistle of the climbing rocket
    const o=O("sine",900), g=Gn(); o.frequency.setValueAtTime(900,t); o.frequency.exponentialRampToValueAtTime(2600,t+1.05);
    chain(o,g,out); env(g.gain,t,.05,.012,.8,.2); run1(o,t,1.1);
  } else { // the burst, heard a moment later, then the crackle as it falls
    const d=t+rand(.35,.6), n=Nz(), g=Gn(), o=O("sine",70), og=Gn();
    chain(n,Fl("lowpass",900,.7),g,out); env(g.gain,d,.004,.16,.02,.6); run1(n,d,.8);
    o.frequency.setValueAtTime(110,d); o.frequency.exponentialRampToValueAtTime(45,d+.3); chain(o,og,out); env(og.gain,d,.004,.12,0,.4); run1(o,d,.5);
    for(let i=0;i<18;i++){ const c=d+.25+rand(0,1.2), cn=Nz(), cg=Gn(); chain(cn,Fl("highpass",3000),cg,out); env(cg.gain,c,.001,rand(.01,.03),0,.012); run1(cn,c,.03); }
  }
}
// The crowd: a murmur for tirakatan and the lomba, cheers, the referee's whistle and applause.
function cheer(t){
  const out=busFor(true), n=Nz(), n2=Nz(), g=Gn(), d=rand(1.4,2.6);
  chain(n,Fl("bandpass",rand(700,900),1.1),g); chain(n2,Fl("bandpass",rand(1800,2300),1.6),g); chain(g,Fl("lowpass",3200),out);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.16,t+.18); g.gain.setValueAtTime(.14,t+d*.4); g.gain.exponentialRampToValueAtTime(1e-4,t+d); run1(n,t,d); run1(n2,t,d);
}
function peluit(t){
  const out=busFor(true), f=rand(2700,3200);
  for(const [s,d] of Math.random()<.5?[[0,.12],[.2,.12],[.42,.6]]:[[0,.5]]){
    const o=O("sine",f), fm=O("sine",rand(26,34)), fg=Gn(f*.06), g=Gn(); chain(fm,fg,o.frequency);
    chain(o,g,out); env(g.gain,t+s,.01,.05,d-.03,.03); run1(o,t+s,d); run1(fm,t+s,d);
  }
}
function tepuk(t){
  const out=busFor(true), d=rand(2,3.5);
  for(let i=0;i<90;i++){ const s=t+Math.pow(Math.random(),1.6)*d, n=Nz(), g=Gn(); chain(n,Fl("bandpass",rand(1200,3500),1.2),g,out); env(g.gain,s,.001,rand(.06,.14)*(1-(s-t)/d*.6),0,.02); run1(n,s,.03); }
}
function sirine(t){ // 10:00 on the 17th: the siren for the moment of the Proklamasi, far off in town
  const out=A.far[3], o=O("sawtooth",380), o2=O("sine",380), w=O("sine",.18), wg=Gn(25), g=Gn(), dur=60;
  chain(w,wg,o.frequency); chain(w,wg,o2.frequency); chain(o,Fl("bandpass",1100,1.4),g); chain(o2,g); chain(g,Fl("lowpass",1800),out);
  for(const x of [o,o2]){ x.frequency.setValueAtTime(380,t); x.frequency.linearRampToValueAtTime(820,t+5); x.frequency.setValueAtTime(820,t+dur-6); x.frequency.linearRampToValueAtTime(300,t+dur); }
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.035,t+5); g.gain.setValueAtTime(.035,t+dur-6); g.gain.linearRampToValueAtTime(0,t+dur);
  run1(o,t,dur); run1(o2,t,dur); run1(w,t,dur);
}
// Patrol sahur: a band of kentongan, a bedug on a cart and a water galon, coming down the road and going past.
function thump(t,f,v,out){ const o=O("sine",f), g=Gn(); o.frequency.setValueAtTime(f*1.6,t); o.frequency.exponentialRampToValueAtTime(f,t+.06); chain(o,g,out); env(g.gain,t,.004,v,.02,.3); run1(o,t,.4); }
function sahurPatrol(t){
  const ac=A.ctx, dur=rand(40,60), dir=Math.random()<.5?1:-1, g=Gn(0), lp=Fl("lowpass",600,.6); let out=g;
  chain(g,lp); if(ac.createStereoPanner){ const p=ac.createStereoPanner(); lp.connect(p); p.pan.setValueAtTime(-.85*dir,t); p.pan.linearRampToValueAtTime(.85*dir,t+dur); p.connect(A.out); const w=Gn(.4); p.connect(w); w.connect(A.wet); } else lp.connect(A.out);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(1,t+dur*.5); g.gain.linearRampToValueAtTime(0,t+dur);
  lp.frequency.setValueAtTime(500,t); lp.frequency.linearRampToValueAtTime(3500,t+dur*.5); lp.frequency.linearRampToValueAtTime(500,t+dur);
  const step=.24, pat="K.k.Kkk.K.k.KkK.", drum="B..b..B.B..b..b.";
  for(let s=t,i=0;s<t+dur;s+=step,i++){ const c=pat[i%16], d=drum[i%16], j=rand(-.01,.01);
    if(c!==".") knock(s+j,c==="K"?.14:.09,out);
    if(d==="B") thump(s+j,rand(62,70),.16,out); else if(d==="b") thump(s+j,rand(150,170),.09,out); }
}
// Takbiran: bedug from every langgar at once, in the quick rolling rhythm of the night before Lebaran.
function bedugTalu(t){
  const out=A.far[Math.random()*5|0], pats=["x.x.xxx.x.x.xxx.","x..x..x.xxxx.x..","xx.xx.x.xx.xx.x."], pat=pats[Math.random()*3|0], step=rand(.2,.26), rep=1+(Math.random()*2|0), f=rand(56,66);
  for(let r=0;r<rep;r++) for(let i=0;i<16;i++) if(pat[i]==="x"){ const s=t+(r*16+i)*step; thump(s,f,.11,out); }
}
// Bedug for buka puasa: longer, and the kampung's langgar answering one another.
function bedugBuka(t){ bedug(t); bedug(t+rand(2,4)); }
// Lonceng gereja: a bronze bell (hum, prime, minor third, fifth, nominal and the shimmer above), swung so
// each stroke lands a little unevenly; "joyful" rings two bells against each other for a feast.
function bell(t,f,v,out){
  for(const [r,a,d] of [[.5,.5,7],[1,1,5],[1.19,.45,3.5],[1.5,.3,2.5],[2,.55,2.2],[2.52,.2,1.4],[3.01,.12,1]]){ const o=O("sine",f*r*rand(.998,1.002)), g=Gn(); env(g.gain,t,.003,v*a,0,d); chain(o,g,out); run1(o,t,d+.1); }
  const n=Nz(), ng=Gn(); chain(n,Fl("bandpass",f*4,3),ng,out); env(ng.gain,t,.001,v*.25,0,.03); run1(n,t,.05); // the clapper's strike
}
function lonceng(t,joyful){
  const out=A.far[1], f1=rand(330,350), f2=f1*1.26, n=joyful?34:16; let s=t;
  for(let i=0;i<n;i++){ bell(s,i%2&&joyful?f2:f1,.045,out); s+=(joyful?1.05:1.9)*rand(.94,1.06); }
}
// Baleganjur for the ogoh-ogoh: kendang, ceng-ceng, reyong and a gong, marching past.
function baleganjur(t){
  const ac=A.ctx, dur=rand(35,50), dir=Math.random()<.5?1:-1, g=Gn(0), lp=Fl("lowpass",800,.6);
  chain(g,lp); if(ac.createStereoPanner){ const p=ac.createStereoPanner(); lp.connect(p); p.pan.setValueAtTime(.85*dir,t); p.pan.linearRampToValueAtTime(-.85*dir,t+dur); p.connect(A.out); const w=Gn(.5); p.connect(w); w.connect(A.wet); } else lp.connect(A.out);
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(1,t+dur*.5); g.gain.linearRampToValueAtTime(0,t+dur);
  lp.frequency.setValueAtTime(600,t); lp.frequency.linearRampToValueAtTime(5000,t+dur*.5); lp.frequency.linearRampToValueAtTime(600,t+dur);
  const step=.13, ceng="x.xx.xx.x.xx.xxx", kend="D..t.D.tD..t.Dtt", rey=[1,1.2,1.33,1.5,1.2,1.33,1,1.5];
  for(let s=t,i=0;s<t+dur;s+=step,i++){
    if(ceng[i%16]==="x"){ const n=Nz(), cg=Gn(); chain(n,Fl("highpass",4500),cg,g); env(cg.gain,s,.001,.05,.01,.07); run1(n,s,.1); }
    const k=kend[i%16]; if(k==="D") thump(s,rand(85,100),.14,g); else if(k==="t") kendhang(s,g,false);
    if(i%2===0) bar(s,520*rey[(i/2|0)%8],.03,.4,g,[[1,1],[2.4,.3]]);
    if(i%32===0) gong(s,g,.12);
  }
}
// Genta from the vihara at Borobudur on Waisak night, far to the west.
function genta(t){
  const out=A.far[0], f=rand(380,420);
  for(let k=0;k<3;k++){ const s=t+k*rand(5,8); for(const [r,a] of [[1,1],[2.71,.4],[5.1,.15]]){ const o=O("sine",f*r), w=O("sine",rand(3,5)), wg=Gn(f*r*.003), g=Gn(); chain(w,wg,o.frequency); env(g.gain,s,.01,.04*a,0,9/Math.sqrt(r)); chain(o,g,out); run1(o,s,9); run1(w,s,9); } }
}
// Barongsai from the town for Imlek and Cap Go Meh: the big tambur, cymbals and a gong.
function barongsai(t){
  const out=A.far[3+(Math.random()<.5?0:1)], dur=rand(18,30), step=.16;
  const pat=Math.random()<.5?"D.d.D.ddD.d.DdD.":"D..dD..dD.ddD.d.";
  for(let s=t,i=0;s<t+dur;s+=step,i++){
    const c=pat[i%16], acc=1+.25*Math.sin(i*.15);
    if(c==="D") thump(s,rand(70,80),.14*acc,out); else if(c==="d") thump(s,rand(120,140),.08*acc,out);
    if(i%4===0){ const n=Nz(), cg=Gn(); chain(n,Fl("bandpass",rand(5000,6500),.7),cg,out); env(cg.gain,s,.002,.05,.04,.35); run1(n,s,.45); } // cymbals
    if(i%8===4) bar(s,rand(250,270),.035,.8,out,[[1,1],[2.2,.4],[3.1,.15]]); // gong kecil
  }
}
// Terompet tahun baru: paper trumpets, buzzy and a little off pitch, blown by every kid on the road.
function terompet(t){
  const out=busFor(Math.random()<.6), f=rand(330,520);
  for(let i=0,n=1+(Math.random()*3|0);i<n;i++){ const s=t+i*rand(.3,.6), d=i===n-1?rand(.6,1.4):rand(.15,.3), o=O("sawtooth",f), g=Gn();
    o.frequency.setValueAtTime(f*.96,s); o.frequency.linearRampToValueAtTime(f*rand(1,1.03),s+.06); o.frequency.linearRampToValueAtTime(f*.97,s+d);
    chain(o,Fl("bandpass",f*3,1.2),Fl("lowpass",3200),g,out); env(g.gain,s,.02,.08,d*.8,.05); run1(o,s,d+.1); }
}
// Sekaten: the great pelog gamelan, slow and loud, with the bedug among the instruments.
const PELOG={1:1,2:1.105,3:1.2,4:1.4,5:1.5,6:1.6,7:1.82};
const SEKATEN=["35323532653221265356535676532132","66536653212165323235323556532165"].map(p=>p.split(""));
function sekaten(t){
  if(A.gamUntil>t) return;
  const out=A.gam, f0=230, notes=SEKATEN[Math.random()*2|0], beat=rand(1.5,1.8), rounds=2; let s=t;
  for(let r=0;r<rounds;r++) notes.forEach((d,i)=>{
    const f=f0*PELOG[d], nx=f0*PELOG[notes[(i+1)%notes.length]];
    if(i===0) gong(s,out,.13);
    bar(s,f,.05,2.6,out); bar(s,f/2,.04,3.5,out,[[1,1],[2,.25],[3,.08]]); // demung and slenthem
    for(let k=0;k<4;k++) bar(s+k*beat/4,k%2?nx*2:f*2,.022,.9,out,[[1,1],[3.9,.12]]); // the bonang's loud pipilan
    if(i%8===7) thump(s,rand(58,64),.12,out); // bedug in the gamelan
    if(i%4===3) bar(s,f/2,.04,4,out,[[1,1],[2,.2]]);
    s+=beat;
  });
  gong(s,out,.14); A.gamUntil=s+30;
}

const EV={
  rooster:{gap:[14,38], w:m=>m.dawn+bump(m.h,3.2,3.8,4.6,5)*.5+.05*m.day, fn:t=>rooster(t,false)},
  kutilang:{gap:[3,9], w:m=>(m.dawn*.6+bump(m.h,5.5,6.2,9.5,11)+m.day*.3+m.sore*.4)*(1-m.rain*.85), fn:kutilang},
  prenjak:{gap:[8,20], w:m=>(bump(m.h,5.5,6.2,10,11.5)*.8+m.sore*.5)*(1-m.rain*.8), fn:t=>prenjak(t)},
  gereja: {gap:[6,16], w:m=>(m.dawn*.5+m.day*.6)*(1-m.rain*.7), fn:gereja},
  bird:   {gap:[3,8], w:m=>(m.day*.5+m.dawn*.4)*(1-m.rain*.8), fn:chirp},
  dove:   {gap:[14,32], w:m=>(m.dawn*.6+m.day*.4)*(1-m.rain), fn:dove},
  petok:  {gap:[25,70], w:m=>(m.day*.45+m.dusk*.8)*(1-m.rain*.6), fn:petok},
  cicada: {gap:[4,10], w:m=>Math.max(m.noon,m.sore*.7)*(1-m.rain), fn:cicada},
  codot:  {gap:[3,9], w:m=>m.dusk*(1-m.rain), fn:codot},
  frog:   {gap:[.4,1.6], w:m=>Math.min(1,m.night*.9+m.dusk*.5+m.rain*.6), fn:frog},
  tokek:  {gap:[60,150], w:m=>m.night, fn:tokek},
  owl:    {gap:[40,90], w:m=>m.night*(1-m.rain), fn:owl},
  drip:   {gap:[.3,1.5], w:m=>.5+m.rain*.5, fn:drip},
  genteng:{gap:[.05,.15], w:m=>m.rain, fn:t=>{ for(let i=0,n=1+(Math.random()*3|0);i<n;i++) genteng(t+Math.random()*.2); }},
  talang: {gap:[.55,.85], w:m=>m.rain>.3?1:0, fn:talang},
  ronda:  {gap:[400,900], w:m=>(m.h>=21||m.h<3.5)&&!m.F.suro?1:0, fn:t=>kentongan(t,0)},
  gamelan:{gap:[90,240], w:m=>m.F.suro||m.F.ramadan||m.F.sekaten||m.F.takbiran||m.F.ogoh||m.F.natal||m.F.waisak?0:bump(m.h,19.3,19.8,21.8,22.4)*.7*(1-m.rain), fn:gamelan},
  sekaten:{gap:[20,90], w:m=>m.F.sekaten?.8:0, fn:sekaten},
  sapi:   {gap:[25,70], w:m=>m.F.ternak?.9:(m.dawn*.7+bump(m.h,6.5,7.2,10,11.5)*.6+m.sore*.35)*(1-m.rain*.7), fn:t=>sapi(t,Math.random()<.4)},
  pecut:  {gap:[120,300], w:m=>bump(m.h,6.3,7,10.5,11.5)*(1-m.rain), fn:pecut},
  kambing2:{gap:[8,25], w:m=>m.F.ternak?.8:0, fn:t=>kambing(t,Math.random()<.5)},
  kambing:{gap:[35,90], w:m=>m.F.ternak?1:(bump(m.h,5.6,6.5,9,10.5)*.7+m.sore*.6)*(1-m.rain*.8), fn:t=>kambing(t,Math.random()<.5)},
  sapu:   {gap:[40,110], w:m=>bump(m.h,5.4,5.9,8,9)*(1-m.rain), fn:sapu},
  motor:  {gap:[45,140], w:m=>m.F.suro?0:bump(m.h,5.5,6.5,21,22.5)*.6, fn:motor},
  motor2: {gap:[12,40], w:m=>m.F.ngabuburit||m.F.lebaran?.8:0, fn:motor},           // ngabuburit and silaturahmi
  bakso:  {gap:[120,360], w:m=>m.F.suro?0:bump(m.h,15.5,16.2,21,21.8)*.8, fn:bakso},
  sahur:  {gap:[90,240], w:m=>m.F.sahur?1:0, fn:sahurPatrol},
  talu:   {gap:[2,5], w:m=>m.F.takbiran?.9:0, fn:bedugTalu},
  baleganjur:{gap:[50,120], w:m=>m.F.ogoh?1:0, fn:baleganjur},
  genta:  {gap:[25,60], w:m=>m.F.waisak?.9:0, fn:genta},
  barongsai:{gap:[40,100], w:m=>m.F.barongsai?.9:0, fn:barongsai},
  terompet:{gap:[1,4], w:m=>m.F.tahunBaru?.9:0, fn:terompet},
  cheer:  {gap:[6,20], w:m=>m.F.lomba?.9:0, fn:cheer},
  peluit: {gap:[10,30], w:m=>m.F.lomba?.8:0, fn:peluit},
  tepuk:  {gap:[18,45], w:m=>m.F.lomba||m.F.tirakatan?.7:0, fn:tepuk},
};
// Bedug from the langgar a few minutes before each prayer (times for Yogyakarta, give or take a few minutes through the year).
const BEDUG=[3.95,11.55,14.85,17.6,18.75];
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
  A.gam=mkBus(.45,1.2,1700); // across the fields: dark and mostly reverb
  A.kent=[-.6,.5].map(p=>mkBus(p,.4,2500)); // drier than A.far so the knock doesn't boom down the valley
  const bed=(f,gain,bus)=>{ const n=Nz(), g=Gn(0); chain(n,...f,g,bus); n.start(0,Math.random()*1.5); return g; };
  A.wind=bed([Fl("lowpass",450,.3)],0,A.near[2]);
  A.leaves=bed([Fl("bandpass",3500,.6)],0,A.near[4]);
  A.stream=bed([Fl("bandpass",700,.8)],0,A.near[0]);
  A.bubble=bed([Fl("bandpass",1800,6)],0,A.near[0]);
  A.rainHi=bed([Fl("highpass",800),Fl("lowpass",7000)],0,A.near[2]);
  A.rainLo=bed([Fl("lowpass",300)],0,A.near[2]);
  A.rainSw=1;
  // jangkrik: each cricket is a tone pulsed ~30×/s, gated into chirps. Hard square gates click like a machine,
  // so the pulses are rounded and the gate low-passed; most sit out in the sawah. Each one's pitch drifts slowly
  // with the night air and each rests often, so the band never settles into a steady whine.
  A.crk=Array.from({length:6},(_,i)=>{
    const o=O("sine",rand(4100,5100)), dr=O("sine",rand(.02,.07)), dg=Gn(rand(60,140)), a=Gn(.5), p=O("sine",rand(24,36)), pg=Gn(.5), b=Gn(.5), c=O("square",rand(1.1,2.6)), cl=Fl("lowpass",12,.5), cg=Gn(.5), v=Gn(0);
    chain(dr,dg,o.frequency); chain(p,pg,a.gain); chain(c,cl,cg,b.gain); chain(o,a,b,v,i<2?A.near[i*4]:A.far[i-1]);
    o.start(); dr.start(); p.start(); c.start(); v.lvl=i<2?rand(.004,.008):rand(.01,.018); v.on=Math.random()<.6; return v;
  });
  // sendaren: the bamboo hummers bound to the big kites, droning with every gust
  A.send=[[rand(170,190),-.5],[rand(225,250),.4]].map(([f,pan])=>{
    const o=O("sawtooth",f), g=Gn(0), out=A.far[pan<0?1:3]; chain(o,Fl("bandpass",f*3.2,3),g,out); const o2=O("sawtooth",f*1.01); chain(o2,Fl("bandpass",f*6.5,4),g); o.start(); o2.start(); g.f=f; g.o=[o,o2]; return g;
  });
  // the crowd's murmur: noise through a few moving vowel formants
  A.crowd=Gn(0); A.crowdF=[450,1150,2400].map((f,i)=>{ const n=Nz(), b=Fl("bandpass",f,1.6+i), g=Gn(.3); chain(n,b,g,A.crowd); n.start(0,Math.random()*1.5); return {b,g,f}; });
  chain(A.crowd,Fl("lowpass",2600),A.far[2]);
  A.frogs=Array.from({length:7},(_,i)=>({type:i<4?0:1,f:i<4?rand(190,260):rand(300,420),bus:busFor(Math.random()<.7)}));
  return true;
}
function tick(){
  const now=A.ctx.currentTime, m=moods(hourNow()), set=(g,v,tc)=>g.gain.setTargetAtTime(v,now,tc);
  const F=m.F=FEST;
  set(A.crowd,F.tirakatan||F.lomba?.06:F.takbiran?.025:0,2);
  for(const c of A.crowdF){ c.g.gain.setTargetAtTime(rand(.05,.5),now,.06); c.b.frequency.setTargetAtTime(c.f*rand(.8,1.25),now,.08); }
  if(Math.random()<.05) A.gust=rand(.3,1);
  A.rainSw=Math.max(.55,Math.min(1.35,A.rainSw+rand(-.06,.06))); // showers come in waves
  set(A.wind,(.04+.06*A.gust)*(1+m.rain),2);
  set(A.leaves,.015*A.gust*(1-m.night*.5),2);
  set(A.stream,.05,3); set(A.bubble,rand(.004,.03),.05);
  set(A.rainHi,.12*m.rain*A.rainSw,2); set(A.rainLo,.2*m.rain*A.rainSw,2);
  for(const v of A.crk){ if(Math.random()<.012) v.on=!v.on; set(v,v.on*v.lvl*Math.min(1,m.night+m.dusk*.4)*(1-m.rain*.5),4); }
  for(const g of A.send){ set(g,.022*m.sore*(1-m.rain)*Math.pow(A.gust,1.5),1.2); g.o.forEach((o,i)=>o.frequency.setTargetAtTime(g.f*(i?1.01:1)*(.94+.12*A.gust),now,1.5)); }
  if(m.rain>.4&&Math.random()<m.rain*.1) frog(now+Math.random()*.2); // the frogs swell with the rain
  for(const [k,e] of Object.entries(EV)){
    if(now<A.next[k]) continue;
    A.next[k]=now+rand(...e.gap);
    const w=e.w(m); if(w>0&&Math.random()<w) e.fn(now+.05+Math.random()*.3);
  }
  const crossed=b=>A.lastH!==undefined&&((A.lastH<b&&m.h>=b)||(A.lastH>m.h&&(b>A.lastH||b<=m.h)));
  for(const b of BEDUG) if(crossed(b)) (F.ramadan&&b===17.6?bedugBuka:bedug)(now+.5);
  if(F.idDay&&crossed(5.75)) bedug(now+.5); // before salat Id
  if(F.sirineDay&&crossed(10)) sirine(now+.2);
  // gereja bells: every Sunday before the morning misa, Christmas Eve and morning, the Easter Vigil's Gloria and Easter morning
  const sunday=kNow().getDay()===0;
  if(!F.loncengDiam){
    if(sunday&&crossed(6.25)) lonceng(now+.3,F.paskah);
    if(F.natal&&(crossed(21.85)||crossed(23.97)||crossed(6.6))) lonceng(now+.3,true);
    if(F.paskah&&crossed(8.75)) lonceng(now+.3,true);
    if(F.lilinPaskah&&crossed(20.32)) lonceng(now+.3,true);
  }
  A.lastH=m.h;
  const hr=Math.floor(m.h);
  if(A.hr!==undefined&&hr!==A.hr&&(hr>=20||hr<=4)&&!F.suro) kentongan(now+1,hr%12||12);
  A.hr=hr;
}
const btn=document.getElementById("suara");
const pref={ get(){ try{return localStorage.getItem("oelek.kampung");}catch(e){return null;} }, set(v){ try{localStorage.setItem("oelek.kampung",v);}catch(e){} } };
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
run();
})();
