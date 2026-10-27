"use strict";
// Sambal of the day and the families panel.
// ================= sambal of the day =================
const DAY = 864e5;
function localDayNumber(d){ return Math.floor((Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()) - Date.UTC(2024,0,1))/DAY); }
let tdDay = null;
function renderToday(){
  const d = new Date();
  const n = localDayNumber(d); tdDay = n;
  const s = S[((n*11)%S.length + S.length)%S.length];
  $("#tdArt").innerHTML = sambalArt(s);
  $("#tdName").textContent = s.name;
  $("#tdReg").textContent = s.region + " · " + STYLE[s.style].en;
  $("#tdNote").textContent = s.note;
  $("#tdHeat").innerHTML = chilis(s.heat);
  $("#tdDate").textContent = "Today · " + d.toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short"});
  $("#tdOpen").onclick = () => openSambal(s.id);
}
// a page left open past midnight moves on to the new day's sambal
setInterval(()=>{ if(localDayNumber(new Date())!==tdDay) renderToday(); },6e4);

// ================= families =================
let fam = "raw";
function renderFam(){
  $("#famBtns").replaceChildren(...Object.entries(STYLE).map(([k,v])=>{
    const dot = el("span",{class:"dot"}); dot.style.background=v.color;
    return el("button",{type:"button","aria-pressed":String(k===fam),onclick:()=>{fam=k;renderFam();}}, dot, el("b",{text:v.label}), el("span",{text:v.sum}));
  }));
  const v = STYLE[fam]; const count = S.filter(s=>s.style===fam).length;
  $("#famBody").replaceChildren(
    el("h3",{text:v.label}), el("p",{class:"lede",text:v.body}),
    el("p",{class:"eyebrow",text:"Start with"}),
    el("div",{class:"try"}, ...v.examples.map(id=>el("button",{class:"pill",type:"button",text:byId[id].name,onclick:()=>openSambal(id)}))),
    el("button",{class:"btn ghost",type:"button",text:`Browse all ${count} ${v.en.toLowerCase()} sambals in the atlas →`,onclick:()=>{
      document.querySelector(`.chip.fam[data-f="${fam}"]`).click();
      go("peta"); document.querySelector(".atlas-head").scrollIntoView();
    }})
  );
}
