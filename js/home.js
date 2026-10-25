"use strict";
// Sambal of the day and the families panel.
// ================= sambal of the day =================
const DAY = 864e5;
function localDayNumber(d){ return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()) - Date.UTC(2024,0,1))/DAY); }
let tdOffset = 0;
function renderToday(){
  const d = new Date(Date.now() + tdOffset*DAY);
  const n = localDayNumber(d);
  const s = S[((n*11)%S.length + S.length)%S.length];
  $("#tdArt").innerHTML = sambalArt(s);
  $("#tdName").textContent = s.name;
  $("#tdReg").textContent = s.region + " · " + STYLE[s.style].en;
  $("#tdNote").textContent = s.note;
  $("#tdHeat").innerHTML = chilis(s.heat);
  const lbl = tdOffset===0 ? "Today" : tdOffset===-1 ? "Yesterday" : tdOffset===1 ? "Tomorrow" : "";
  $("#tdDate").textContent = (lbl? lbl+" · " : "") + d.toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"});
  $("#tdOpen").onclick = () => openSambal(s.id);
}
$("#tdPrev").onclick=()=>{tdOffset--;renderToday();};
$("#tdNext").onclick=()=>{tdOffset++;renderToday();};

// ================= families =================
let fam = "raw";
function renderFam(){
  $("#famBtns").replaceChildren(...Object.entries(STYLE).map(([k,v])=>{
    const dot = el("span",{class:"dot"}); dot.style.background=v.color;
    return el("button",{type:"button","aria-pressed":String(k===fam),onclick:()=>{fam=k;renderFam();}}, dot, el("b",{text:v.label}), el("span",{text:v.sum}));
  }));
  const v = STYLE[fam]; const list = S.filter(s=>s.style===fam);
  $("#famBody").replaceChildren(
    el("h3",{text:v.label}), el("p",{class:"lede",text:v.body}),
    el("p",{class:"eyebrow",text:`Profiled in the atlas · ${list.length}`}),
    el("div",{class:"try"}, ...list.map(s=>el("button",{class:"pill",type:"button",text:s.name,onclick:()=>openSambal(s.id)})))
  );
}
