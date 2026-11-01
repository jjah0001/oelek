"use strict";
// Hash routing and boot.
// ================= pages =================
const VIEWS=["beranda","peta","shelf","rempah","padanan","kuis","tentang"];
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
$("#stProv").textContent=Object.entries(provStats).filter(([c,s])=>s.total&&c!==ACROSS).length;
$("#cAll").textContent=ALL.length; $("#cFull").textContent=S.length; $("#cList").textContent=L.length;
$("#srcList").replaceChildren(...Object.entries(SRC).filter(([key])=>!key.startsWith("http")).map(([,s])=>el("li",{},el("a",{href:s.u,target:"_blank",rel:"noopener",text:s.t}))));
renderToday(); renderFam(); drawMap(); renderProv(null); renderGrid();
// The quiz always starts fresh: results are not kept between visits. Clear any result an older version saved.
try{ localStorage.removeItem("ulek.quiz"); }catch(e){}
renderQuiz();
// ================= moments =================
// About us lists every moment the kampung can show; each opens the home page at that day and hour.
$("#moments").replaceChildren(...MOMENT_GROUPS.map(([g,title,blurb])=>el("div",{class:"moment-group"},
  el("h4",{text:title}), el("p",{class:"moment-blurb",text:blurb}),
  el("div",{class:"moment-list"},...MOMENTS.filter(x=>x[0]===g).map(([,en,id,q,desc])=>{
    const a=el("a",{class:"moment",href:"?"+q+"#beranda"}); a.append(el("b",{text:en}),el("i",{text:id}),el("span",{text:desc})); return a; })))));
// While a moment is being previewed, say which one and offer the way back to the visitor's own time.
(()=>{ let qs; try{ qs=new URLSearchParams(location.search); }catch(e){ return; }
  if(!["jam","tgl","hujan"].some(k=>qs.has(k))) return;
  const key=[...qs].filter(([k])=>["jam","tgl","hujan"].includes(k)).map(([k,v])=>k+"="+v).sort().join("&");
  const hit=MOMENTS.find(x=>x[3].split("&").sort().join("&")===key);
  $("#previewText").textContent=hit?`Visiting: ${hit[1]} (${hit[2]})`:"Visiting another time in the kampung";
  $("#previewBack").href=location.pathname+(location.hash||"");
  $("#preview").hidden=false;
  // "Just the kampung": fade the page away to watch the moment, tap again (or Esc) to bring it back
  const peek=on=>{ document.body.classList.toggle("peek",on); $("#previewPeek").setAttribute("aria-pressed",String(on)); $("#previewPeek").textContent=on?"Show page":"Just the kampung"; };
  $("#previewPeek").addEventListener("click",()=>peek(!document.body.classList.contains("peek")));
  addEventListener("keydown",e=>{ if(e.key==="Escape"&&document.body.classList.contains("peek")) peek(false); });
})();
routeFromHash();
