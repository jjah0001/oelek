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
  paintShelfControls(s);
  paintPublicRatings(s);
  $("#dArt").innerHTML = sambalArt(s);
  $("#dStyle").textContent = STYLE[s.style].label;
  $("#dName").textContent = s.name;
  $("#dReg").textContent = s.region;
  $("#dHeat").innerHTML = chilis(s.heat);
  $("#dNote").textContent = s.note;
  const fill = (ul, arr) => ul.replaceChildren(...arr.map(t=>el("li",{text:t})));
  fill($("#dIng"), s.ing);
  fill($("#dServe"), s.serve);
  $("#dSrc").replaceChildren(...s.src.map(k=>{ const i=srcInfo(k); return el("a",{href:i.u,target:"_blank",rel:"noopener",text:i.t}); }));
    $("#dPhoto").href = "https://commons.wikimedia.org/w/index.php?search="+encodeURIComponent(s.name)+"&title=Special:MediaSearch&type=image";
  $("#dRadar").innerHTML = radar([{name:s.name,p:s.p,cls:"s-sambal"}]);
  if (typeof paintRecipe === "function") paintRecipe(s);
  if (typeof dlg.showModal === "function") { try{ if(!dlg.open) dlg.showModal(); }catch(e){ dlg.setAttribute("open",""); } } else dlg.setAttribute("open","");
}
$("#dClose").addEventListener("click",()=>dlg.close());
dlg.addEventListener("click",e=>{ if(e.target===dlg) dlg.close(); });
