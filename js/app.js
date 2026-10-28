"use strict";
// Hash routing and boot.
// ================= pages =================
const VIEWS=["beranda","peta","shelf","rempah","padanan","kuis"];
function go(v,push=true){
  if(v==="kenal"){ go("beranda",push); $("#kenal").scrollIntoView(); return; } // old "What is sambal" links
  if(!VIEWS.includes(v)) v="beranda";
  for(const k of VIEWS) $("#"+k).hidden=k!==v;
  if(v==="shelf") renderShelf();
  document.body.dataset.view=v; // the kampung backdrop shows through more on the home page
  document.querySelectorAll(".bar [data-view]").forEach(a=>{if(a.dataset.view===v&&v!=="beranda")a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  if(push){try{history.replaceState(null,"","#"+v)}catch(e){}}
  window.scrollTo({top:0});
}
document.querySelectorAll(".bar [data-view]").forEach(a=>a.addEventListener("click",e=>{e.preventDefault();go(a.dataset.view)}));
function routeFromHash(){
  let h="";try{h=location.hash.slice(1)}catch(e){}
  go(h==="top"?"beranda":h,false);
}
window.addEventListener("hashchange",routeFromHash);

// ================= boot =================
$("#stAll").textContent=S.length+L.length;
$("#stFull").textContent=S.length;
$("#stProv").textContent=Object.values(provStats).filter(s=>s.total).length;
$("#cAll").textContent=ALL.length; $("#cFull").textContent=S.length; $("#cList").textContent=L.length;
$("#srcList").replaceChildren(...Object.entries(SRC).filter(([key])=>!key.startsWith("http")).map(([,s])=>el("li",{},el("a",{href:s.u,target:"_blank",rel:"noopener",text:s.t}))));
renderToday(); renderFam(); drawMap(); renderProv(null); renderGrid();
// The quiz always starts fresh: results are not kept between visits. Clear any result an older version saved.
try{ localStorage.removeItem("ulek.quiz"); }catch(e){}
renderQuiz();
routeFromHash();
