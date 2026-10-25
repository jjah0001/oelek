"use strict";
// Flavour radar and the sambal detail dialog.
// ================= radar =================
function radar(sets, size=280){
  const cx=150, cy=140, R=88, N=6;
  const ang=i=>-Math.PI/2+i*2*Math.PI/N;
  const P=(i,v)=>[cx+Math.cos(ang(i))*R*v/5, cy+Math.sin(ang(i))*R*v/5];
  let s=`<svg class="radar" viewBox="0 0 300 280" role="img" aria-label="Flavour profile: ${sets.map(x=>x.name+" "+DIMS.map((d,i)=>d[0]+" "+x.p[i].toFixed(1)).join(", ")).join("; ")}">`;
  for(let lv=1;lv<=5;lv++){ s+=`<polygon class="web" points="${DIMS.map((_,i)=>P(i,lv).map(v=>v.toFixed(1)).join(",")).join(" ")}"/>`; }
  DIMS.forEach((_,i)=>{ const [x,y]=P(i,5); s+=`<line class="axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; });
  for(const set of sets){ s+=`<polygon class="shape ${set.cls}" points="${set.p.map((v,i)=>P(i,Math.max(v,.25)).map(n=>n.toFixed(1)).join(",")).join(" ")}"/>`; }
  DIMS.forEach(([en,id],i)=>{ const [x,y]=P(i,6.25); s+=`<text class="lab" x="${x.toFixed(1)}" y="${y.toFixed(1)}">${en}<tspan class="sub" x="${x.toFixed(1)}" dy="13">${id}</tspan></text>`; });
  return s+"</svg>";
}

// ================= detail dialog =================
const dlg = $("#dlg");
function openSambal(id){
  const s = byId[id]; if(!s) return;
  const full = s.kind==="full";
  $("#dArt").innerHTML = sambalArt(s);
  $("#dStyle").textContent = full ? STYLE[s.style].label : "Listed sambal";
  $("#dName").textContent = s.name;
  $("#dReg").textContent = full ? s.region : provName(s.prov);
  $("#dHeat").innerHTML = full ? chilis(s.heat) : "";
  $("#dNote").textContent = full ? s.note : describeListed(s) + " This is a listed sambal: there is no full recipe profile or flavour chart yet.";
  const fill = (ul, arr) => ul.replaceChildren(...arr.map(t=>el("li",{text:t})));
  $("#dIngH").textContent = full ? "Into the cobek" : "Defining ingredient";
  fill($("#dIng"), full ? s.ing : [s.note||"Unrecorded"]);
  $("#dServeBox").hidden = !full; if(full) fill($("#dServe"), s.serve);
  $("#dSrc").replaceChildren(...s.src.map(k=>{ const i=srcInfo(k); return el("a",{href:i.u,target:"_blank",rel:"noopener",text:i.t}); }));
  $("#dArtNote").firstChild.textContent = full ? "Illustration drawn from the recipe, not a photograph. " : "Illustration drawn from the recorded ingredient, not a photograph. ";
  $("#dPhoto").href = "https://commons.wikimedia.org/w/index.php?search="+encodeURIComponent(s.name)+"&title=Special:MediaSearch&type=image";
  $("#dRadarBox").hidden = !full; $("#dRadar").innerHTML = full ? radar([{name:s.name,p:s.p,cls:"s-sambal"}]) : "";
  if (typeof dlg.showModal === "function") { try{ if(!dlg.open) dlg.showModal(); }catch(e){ dlg.setAttribute("open",""); } } else dlg.setAttribute("open","");
}
$("#dClose").addEventListener("click",()=>dlg.close());
dlg.addEventListener("click",e=>{ if(e.target===dlg) dlg.close(); });
