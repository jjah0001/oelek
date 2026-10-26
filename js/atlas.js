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
  $("#count").textContent = `${list.length} sambal${list.length===1?"":"s"}${list.length>shown?` · showing ${shown}`:""}`;
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
["q","heatSel","provSel"].forEach(id=>$("#"+id).addEventListener(id==="q"?"input":"change",()=>renderGrid()));
