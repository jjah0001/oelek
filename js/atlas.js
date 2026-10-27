"use strict";
// Card grid with filters.
// ================= atlas: every sambal as a card =================
let fKind="all", fStyle="all", shown=36; const PAGE=36;
const provsUsed=[...new Set(ALL.map(x=>x.prov))];
Object.entries(PROV).filter(([c])=>provsUsed.includes(c)).sort((a,b)=>a[1][0].localeCompare(b[1][0])).forEach(([c,[n]])=>$("#provSel").append(el("option",{value:c,text:n})));
$("#provSel").append(el("option",{value:ACROSS,text:"Across Indonesia"}));
function cardFor(s){
  const full=s.kind==="full";
  const c=el("button",{class:"card",type:"button",onclick:()=>openSambal(s.id)});
  const art=el("span"); art.innerHTML=sambalArt(s);
  const top=el("div",{class:"top"}, el("span",{class:`tag ${full?"t-"+s.style:"t-list"}`,text:full?STYLE[s.style].en:"Listed"}));
  if(full){ const h=el("span"); h.innerHTML=chilis(s.heat); top.append(h); }
  c.append(art.firstChild, el("h3",{text:s.name}), el("span",{class:"reg",text:full?s.region:provName(s.prov)}), top);
  if(!full && s.note) c.append(el("span",{class:"ing",text:s.note}));
  const rating=el("span",{"data-rating-id":s.id});rating.append(ratingSummary(s.id,true));c.append(rating);
  const hot=on=>()=>markPin(s.id,on);
  c.addEventListener("mouseenter",hot(true)); c.addEventListener("mouseleave",hot(false));
  c.addEventListener("focus",hot(true)); c.addEventListener("blur",hot(false));
  return c;
}
function filtered(){
  const q=$("#q").value.trim().toLowerCase(), hv=$("#heatSel").value, pv=$("#provSel").value;
  const inHeat = h => hv==="0" ? true : hv.includes("-") ? (h>=+hv.split("-")[0] && h<=+hv.split("-")[1]) : h===+hv;
  return ALL.filter(s=>{
    const full=s.kind==="full";
    if(fKind!=="all" && s.kind!==fKind) return false;
    if(fStyle!=="all" && (!full || s.style!==fStyle)) return false;
    if(hv!=="0" && (!full || !inHeat(s.heat))) return false;
    if(pv && s.prov!==pv) return false;
    if(q){ const hay=(full?[s.name,...(s.aliases||[]),s.region,provName(s.prov),...s.ing,...s.serve]:[s.name,s.note,provName(s.prov)]).join(" ").toLowerCase(); if(!hay.includes(q)) return false; }
    return true;
  });
}
function renderGrid(reset=true){
  if(reset) shown=PAGE;
  const list=filtered();
  $("#empty").hidden = list.length>0;
  const pv=$("#provSel").value, where=pv?(pv===ACROSS?" made across Indonesia":` in ${provName(pv)}`):"";
  $("#count").textContent = `${list.length} sambal${list.length===1?"":"s"}${where}${list.length>shown?` · showing ${shown}`:""}`;
  $("#gridTitle").textContent = pv&&pv!==ACROSS ? `Sambals of ${provName(pv)}` : "Every sambal in the atlas";
  $("#allProv").hidden = !pv;
  $("#grid").replaceChildren(...list.slice(0,shown).map(cardFor));
  const more=$("#moreBtn"); more.hidden = list.length<=shown; more.textContent=`Show ${Math.min(PAGE,list.length-shown)} more`;
}
$("#moreBtn").addEventListener("click",()=>{ shown+=PAGE; renderGrid(false); });
document.querySelectorAll(".chip.kind").forEach(b=>b.addEventListener("click",()=>{
  fKind=b.dataset.k; document.querySelectorAll(".chip.kind").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); renderGrid();
}));
document.querySelectorAll(".chip.fam").forEach(b=>b.addEventListener("click",()=>{
  fStyle=b.dataset.f; document.querySelectorAll(".chip.fam").forEach(x=>x.setAttribute("aria-pressed",String(x===b))); renderGrid();
}));
["q","heatSel"].forEach(id=>$("#"+id).addEventListener(id==="q"?"input":"change",()=>renderGrid()));
// the map and the grid move together: picking a province zooms the map, zooming the map filters the grid
$("#provSel").addEventListener("change",()=>{
  const v=$("#provSel").value;
  if(v&&PROV[v]&&provStats[v]&&provStats[v].total) zoomTo(v);
  else if(zoomProv) zoomOut(); else renderGrid();
});
$("#allProv").addEventListener("click",()=>{ if(zoomProv) zoomOut(); else { $("#provSel").value=""; renderGrid(); } });
function syncGridToMap(code){ $("#provSel").value=code||""; renderGrid(); }
