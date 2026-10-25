"use strict";
// Province map.
// ================= map =================
const ISLANDS = {
 sumatra:[[95.3,5.6],[97.5,5.2],[98.7,3.8],[100.3,2.2],[101.4,1.7],[103.0,1.0],[104.0,0.2],[103.6,-0.9],[104.5,-1.9],[105.8,-3.0],[105.9,-5.8],[104.6,-5.9],[103.5,-4.9],[102.3,-4.0],[101.0,-2.6],[100.3,-1.0],[99.0,0.5],[98.8,1.7],[97.6,2.8],[96.1,4.1],[95.2,5.2]],
 java:[[105.2,-6.8],[106.0,-5.9],[107.0,-6.0],[108.3,-6.3],[109.0,-6.8],[110.4,-6.9],[111.0,-6.4],[112.0,-6.9],[112.7,-7.2],[113.9,-7.7],[114.5,-8.0],[114.4,-8.7],[113.0,-8.4],[111.0,-8.2],[110.0,-8.1],[108.5,-7.8],[107.5,-7.6],[106.4,-7.4],[105.5,-7.0]],
 madura:[[112.7,-7.0],[114.1,-6.9],[114.0,-7.2],[112.8,-7.2]],
 bali:[[114.45,-8.1],[115.2,-8.05],[115.7,-8.4],[115.2,-8.8],[114.6,-8.4]],
 lombok:[[115.85,-8.25],[116.4,-8.2],[116.7,-8.5],[116.5,-8.9],[115.95,-8.8]],
 sumbawa:[[116.8,-8.5],[117.6,-8.2],[118.3,-8.3],[119.1,-8.4],[119.0,-8.8],[118.0,-8.9],[117.0,-9.0]],
 flores:[[119.8,-8.5],[121.0,-8.4],[122.3,-8.2],[123.0,-8.3],[122.6,-8.7],[121.2,-8.9],[120.0,-8.8]],
 sumba:[[119.0,-9.4],[120.2,-9.4],[120.8,-10.1],[119.6,-9.9]],
 timor:[[123.5,-10.2],[124.4,-9.4],[125.3,-8.9],[127.0,-8.4],[126.6,-8.7],[125.4,-9.5],[124.2,-10.3],[123.6,-10.4]],
 rote:[[122.9,-10.7],[123.4,-10.6],[123.2,-10.9]],
 borneo:[[116.9,7.0],[118.6,5.8],[119.2,5.1],[118.0,4.3],[117.6,3.2],[118.0,2.0],[118.8,1.1],[117.8,0.8],[117.5,-0.5],[116.6,-1.4],[116.3,-2.6],[116.0,-3.6],[114.6,-4.1],[113.0,-3.2],[111.7,-3.0],[110.2,-2.9],[110.0,-1.6],[109.1,-0.5],[109.0,1.0],[109.6,1.9],[110.4,1.7],[111.3,2.2],[113.0,3.2],[114.0,4.5],[115.4,5.3],[116.0,6.2]],
 sulawesi:[[125.2,1.5],[124.2,0.9],[122.5,1.0],[121.0,1.2],[120.0,0.9],[119.8,0.0],[119.7,-1.0],[119.3,-2.5],[118.8,-3.2],[119.6,-3.8],[119.4,-5.2],[119.6,-5.6],[120.4,-5.5],[120.3,-4.0],[120.4,-2.9],[121.1,-3.3],[121.1,-4.2],[121.8,-4.8],[122.7,-4.6],[123.1,-4.2],[122.4,-3.4],[121.8,-2.7],[121.6,-1.9],[122.8,-1.4],[123.4,-0.9],[122.4,-0.8],[121.0,-0.7],[120.4,-0.2],[120.6,0.4],[122.0,0.4],[123.5,0.4],[124.6,0.6]],
 halmahera:[[127.8,2.2],[128.2,1.5],[128.7,1.3],[128.0,0.8],[128.9,0.4],[128.2,0.0],[127.9,-0.8],[127.5,0.0],[127.4,1.0]],
 ternate:[[127.25,0.85],[127.45,0.85],[127.4,0.7],[127.25,0.7]],
 seram:[[128.0,-2.8],[129.5,-2.8],[130.9,-3.4],[129.6,-3.5],[128.2,-3.4]],
 ambon:[[127.95,-3.55],[128.35,-3.55],[128.2,-3.8]],
 buru:[[126.0,-3.1],[127.1,-3.2],[127.0,-3.8],[126.1,-3.6]],
 papua:[[130.9,-0.8],[131.3,-0.6],[132.5,-0.4],[133.8,-0.7],[134.1,-1.2],[134.0,-2.5],[135.3,-3.3],[136.5,-2.2],[137.8,-1.5],[139.0,-2.0],[140.7,-2.6],[141.0,-2.6],[141.0,-9.1],[140.2,-8.3],[138.8,-8.2],[138.0,-7.0],[137.6,-5.2],[136.0,-4.6],[134.6,-4.0],[133.5,-3.9],[132.8,-4.1],[132.0,-3.0],[133.2,-2.8],[132.2,-2.5],[131.9,-1.6],[131.2,-1.4]],
 bangka:[[105.1,-1.6],[106.0,-1.8],[106.8,-3.0],[105.8,-2.9]],
 belitung:[[107.6,-2.6],[108.3,-2.7],[108.2,-3.2],[107.6,-3.1]],
 bintan:[[104.2,1.2],[104.7,1.15],[104.6,0.9],[104.3,0.9]]
};
const K=20, LON0=94.5, LAT0=7.6, VBW=940, VBH=380;
const px = (lon,lat)=>[ (lon-LON0)*K, (LAT0-lat)*K ];
function smoothPath(pts){
  const P = pts.map(([a,b])=>px(a,b)); const n=P.length; let d=`M${P[0][0].toFixed(1)},${P[0][1].toFixed(1)}`;
  for(let i=0;i<n;i++){
    const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n], t=.18;
    d+=`C${(p1[0]+(p2[0]-p0[0])*t).toFixed(1)},${(p1[1]+(p2[1]-p0[1])*t).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])*t).toFixed(1)},${(p2[1]-(p3[1]-p1[1])*t).toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d+"Z";
}
// per-province counts by family (listed entries have unknown family)
const provStats = {};
for(const c of Object.keys(PROV)) provStats[c]={raw:0,cooked:0,fermented:0,unknown:0,total:0};
for(const s of S){ if(!provStats[s.prov]) continue; provStats[s.prov][s.style]++; provStats[s.prov].total++; }
for(const l of L){ if(!provStats[l[1]]) continue; provStats[l[1]].unknown++; provStats[l[1]].total++; }

function arc(cx,cy,R,r,a0,a1){
  if(a1-a0>=Math.PI*2-1e-6) a1=a0+Math.PI*2-1e-4;
  const large=(a1-a0)>Math.PI?1:0;
  const p=(rad,a)=>[cx+Math.cos(a)*rad,cy+Math.sin(a)*rad].map(v=>v.toFixed(2)).join(",");
  return `M${p(R,a0)}A${R},${R} 0 ${large} 1 ${p(R,a1)}L${p(r,a1)}A${r},${r} 0 ${large} 0 ${p(r,a0)}Z`;
}
let mapSvg, gBub, gMk, gLbl, view={x:0,y:0,w:VBW}, zoomProv=null, anim=0;
function drawMap(){
  mapSvg=$("#map");
  const g=sv("g");
  const [ex1,ey]=px(94.5,0),[ex2]=px(141.5,0);
  g.append(sv("line",{x1:ex1,y1:ey,x2:ex2,y2:ey,class:"grat"}));
  for(let lon=100;lon<=140;lon+=10){ const [x]=px(lon,0); g.append(sv("line",{x1:x,y1:0,x2:x,y2:VBH,class:"grat"})); }
  mapSvg.append(g);
  for(const pts of Object.values(ISLANDS)) mapSvg.append(sv("path",{d:smoothPath(pts),class:"land"}));
  gLbl=sv("g"); mapSvg.append(gLbl);
  [["Sumatra",101.6,-1.9],["Java",109.6,-9.3],["Kalimantan",113.2,1.2],["Sulawesi",121.2,-6.6],["Maluku",130.0,-1.4],["Papua",137.5,-4.3],["Nusa Tenggara",120.8,-11.3]].forEach(([t,lon,lat])=>{
    const [x,y]=px(lon,lat); const e=sv("text",{x,y,class:"maplbl","text-anchor":"middle","data-fs":"11"}); e.textContent=t; gLbl.append(e);
  });
  // bubbles with simple collision relaxation
  gBub=sv("g"); mapSvg.append(gBub);
  const B=Object.entries(PROV).filter(([c])=>provStats[c].total>0).map(([c,[name,lon,lat]])=>{
    const [x,y]=px(lon,lat); const t=provStats[c].total; return {c,name,ox:x,oy:y,x,y,r:6+2.6*Math.sqrt(t)};
  });
  for(let it=0;it<200;it++){
    for(let i=0;i<B.length;i++) for(let j=i+1;j<B.length;j++){
      const a=B[i],b=B[j]; let dx=b.x-a.x, dy=b.y-a.y; const d=Math.hypot(dx,dy)||.01, need=a.r+b.r+2;
      if(d<need){ const push=(need-d)/2; dx/=d; dy/=d; a.x-=dx*push; a.y-=dy*push; b.x+=dx*push; b.y+=dy*push; }
    }
    for(const b of B){ b.x+=(b.ox-b.x)*.02; b.y+=(b.oy-b.y)*.02; }
  }
  for(const b of B){
    const st=provStats[b.c];
    const grp=sv("g",{class:"bub",tabindex:"0",role:"button","aria-label":`${b.name}: ${st.total} sambals`});
    const tt=sv("title"); tt.textContent=`${b.name} · ${st.total} sambals`; grp.append(tt);
    if(Math.hypot(b.x-b.ox,b.y-b.oy)>3){ grp.append(sv("line",{x1:b.ox,y1:b.oy,x2:b.x,y2:b.y,class:"lead"})); grp.append(sv("circle",{cx:b.ox,cy:b.oy,r:1.8,fill:"var(--muted)"})); }
    let a=-Math.PI/2; const tot=st.total;
    for(const k of ["raw","cooked","fermented","unknown"]){ if(!st[k]) continue; const a1=a+st[k]/tot*Math.PI*2;
      const at={d:arc(b.x,b.y,b.r,b.r-4,a,a1)}; if(k==="unknown") at.fill="var(--muted)"; else at.class="seg-"+k;
      const seg=sv("path",at); if(k==="unknown") seg.setAttribute("opacity",".35"); grp.append(seg); a=a1; }
    grp.append(sv("circle",{cx:b.x,cy:b.y,r:b.r-4,class:"hole"}));
    const tx=sv("text",{x:b.x,y:b.y}); tx.textContent=st.total; grp.append(tx);
    grp.addEventListener("click",()=>zoomTo(b.c));
    grp.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();zoomTo(b.c);} });
    gBub.append(grp);
  }
  // markers for profiled sambals (shown when zoomed)
  gMk=sv("g",{visibility:"hidden"}); mapSvg.append(gMk);
  for(const s of S){
    if(!Number.isFinite(s.lon) || !Number.isFinite(s.lat)) continue;
    const [x,y]=px(s.lon,s.lat);
    const m=sv("g",{class:"mk "+s.style,tabindex:"-1",role:"button","aria-label":`${s.name}, ${s.region}`,"data-id":s.id,"data-x":x,"data-y":y});
    m.append(sv("circle",{class:"halo",cx:x,cy:y}), sv("circle",{class:"core",cx:x,cy:y}));
    const t=sv("text",{x,y}); t.textContent=s.name.replace("Sambal ",""); m.append(t);
    m.addEventListener("click",()=>openSambal(s.id));
    m.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){e.preventDefault();openSambal(s.id);} });
    gMk.append(m);
  }
  setView(view);
}
// paths fix: arc fill attr undefined guard
function setView(v){
  view=v; const h=v.w*VBH/VBW;
  mapSvg.setAttribute("viewBox",`${v.x.toFixed(2)} ${v.y.toFixed(2)} ${v.w.toFixed(2)} ${h.toFixed(2)}`);
  const k=v.w/VBW;
  gLbl.querySelectorAll("text").forEach(t=>t.setAttribute("font-size",(11*k).toFixed(2)));
  gMk.querySelectorAll(".mk").forEach(m=>{
    const x=+m.dataset.x, y=+m.dataset.y;
    m.querySelector(".halo").setAttribute("r",(11*k).toFixed(2));
    const c=m.querySelector(".core"); c.setAttribute("r",(5.5*k).toFixed(2)); c.setAttribute("stroke-width",(2*k).toFixed(2));
    const t=m.querySelector("text"); t.setAttribute("x",(x+9*k).toFixed(2)); t.setAttribute("y",(y+4*k).toFixed(2));
    t.setAttribute("font-size",(11*k).toFixed(2)); t.setAttribute("stroke-width",(3*k).toFixed(2));
  });
}
function animateTo(target, after){
  cancelAnimationFrame(anim);
  const from={...view}, t0=performance.now(), dur=matchMedia("(prefers-reduced-motion: reduce)").matches?1:550;
  const step=now=>{ const t=Math.min(1,(now-t0)/dur), e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
    setView({x:from.x+(target.x-from.x)*e,y:from.y+(target.y-from.y)*e,w:from.w+(target.w-from.w)*e});
    if(t<1) anim=requestAnimationFrame(step); else after&&after(); };
  anim=requestAnimationFrame(step);
}
function zoomTo(code){
  zoomProv=code; const [,lon,lat,w]=PROV[code]; const [x,y]=px(lon,lat); const h=w*VBH/VBW;
  gBub.setAttribute("visibility","hidden"); gMk.setAttribute("visibility","visible");
  gMk.querySelectorAll(".mk").forEach(m=>m.setAttribute("tabindex","0"));
  $("#mapBack").hidden=false;
  animateTo({x:x-w/2,y:y-h/2,w});
  renderProv(code);
}
function zoomOut(){
  zoomProv=null; $("#mapBack").hidden=true;
  gMk.querySelectorAll(".mk").forEach(m=>m.setAttribute("tabindex","-1"));
  animateTo({x:0,y:0,w:VBW},()=>{ gBub.setAttribute("visibility","visible"); gMk.setAttribute("visibility","hidden"); });
  renderProv(null);
}
$("#mapBack").addEventListener("click",zoomOut);
function famBar(st){
  const bar=el("div",{class:"bar2"});
  for(const k of ["raw","cooked","fermented","unknown"]){ if(!st[k]) continue; const i=el("i"); i.style.width=(st[k]/st.total*100)+"%"; i.style.background=k==="unknown"?"var(--line)":`var(--${k})`; i.title=`${k}: ${st[k]}`; bar.append(i); }
  return bar;
}
function renderProv(code){
  const P=$("#provPanel");
  if(!code){
    const top=Object.entries(provStats).sort((a,b)=>b[1].total-a[1].total).slice(0,6);
    P.replaceChildren(el("p",{class:"eyebrow",text:"Tap a ring to explore a province"}),
      el("p",{class:"lede",text:`Most recorded: ${top.map(([c,s])=>`${PROV[c][0]} (${s.total})`).join(", ")}. Java and Sumatra lead, as both surveys found.`}),
      el("div",{class:"try"},...top.map(([c])=>el("button",{class:"pill",type:"button",text:PROV[c][0],onclick:()=>{zoomTo(c); $("#peta").scrollIntoView({block:"start"});}}))));
    return;
  }
  const st=provStats[code], full=S.filter(s=>s.prov===code), list=L.filter(l=>l[1]===code);
  P.replaceChildren(
    el("p",{class:"eyebrow",text:`${st.total} sambals recorded`}),
    el("h3",{text:PROV[code][0]}), famBar(st),
    full.length?el("div",{class:"try"},...full.map(s=>{ const dot=el("i"); dot.style.background=`var(--${s.style})`; return el("button",{class:"pill",type:"button",onclick:()=>openSambal(s.id)},dot,s.name); })):el("span"),
    list.length?el("ul",{},...LISTED.filter(l=>l.prov===code).map(l=>el("li",{},el("button",{type:"button",text:l.name,onclick:()=>openSambal(l.id)}),el("span",{text:l.note||"No further detail recorded"})))):el("span")
  );
}
