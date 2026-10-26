"use strict";
// Which sambal are you? quiz.
// ================= quiz =================
let qi=0, answers=[];
function renderQuiz(){
  const box=$("#quiz");
  if(qi>=QUIZ.length) return renderResult();
  const q=QUIZ[qi];
  const opts=el("div",{class:"opts"}, ...q.o.map(([t],i)=>el("button",{type:"button",text:t,onclick:()=>{answers[qi]=i; qi++; renderQuiz();}})));
  const foot=el("div",{class:"qfoot"});
  if(qi>0) foot.append(el("button",{class:"linkbtn",type:"button",text:"‹ Back",onclick:()=>{qi--;renderQuiz();}}));
  box.replaceChildren(el("div",{class:"qprog"}, ...QUIZ.map((_,i)=>el("i",{class:i<qi?"done":""}))), el("p",{class:"qnum",text:`QUESTION ${qi+1} OF ${QUIZ.length}`}), el("p",{class:"qtext",text:q.q}), opts, foot);
  if(qi>0) opts.querySelector("button").focus({preventScroll:true});
}
function computeProfile(ans){ const v=[0,0,0,0,0,0]; ans.forEach((a,i)=>QUIZ[i].o[a][1].forEach((x,j)=>v[j]+=x)); const max=Math.max(...v,1); return v.map(x=>x/max*5); }
function cos(a,b){ let d=0,na=0,nb=0; for(let i=0;i<a.length;i++){d+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i];} return d/Math.sqrt(na*nb||1); }
function renderResult(saved){
  const you = saved ? saved.p : computeProfile(answers);
  const ranked = S.map(s=>({s,c:cos(you,s.p) - Math.abs(you[0]-s.p[0])*0.03})).sort((a,b)=>b.c-a.c);
  const top=ranked[0].s;
  const pct=Math.round(Math.max(0,cos(you,top.p))*100);
  LAST_RESULT={top,you,pct};
  if(!saved) store.set("ulek.quiz",JSON.stringify({p:you}));
  const art=el("div"); art.innerHTML=sambalArt(top); art.firstChild.style.width="150px"; art.firstChild.style.height="150px";
  const rad=el("div"); rad.innerHTML=radar([{name:"You",p:you,cls:"s-you"},{name:top.name,p:top.p,cls:"s-cmp"}]);
  const key=el("div",{class:"keyrow"}); key.innerHTML=`<span><i style="background:var(--nila)"></i>You</span><span><i style="background:var(--chili)"></i>${top.name.replace("Sambal ","")}</span>`;
  $("#quiz").replaceChildren(el("div",{class:"result"},
    el("div",{class:"main"},
      el("p",{class:"eyebrow",text:`You are · ${pct}% match`}), el("h3",{text:top.name}), el("p",{class:"persona",text:top.persona[0]}),
      el("p",{text:`${top.persona[1]} ${top.region}, ${STYLE[top.style].en.toLowerCase()}, heat ${top.heat} of 5.`}),
      el("p",{class:"eyebrow",text:"Close relatives"}),
      el("div",{class:"near"}, ...ranked.slice(1,4).map(r=>el("button",{class:"pill",type:"button",text:r.s.name,onclick:()=>openSambal(r.s.id)}))),
      el("div",{class:"askrow"},
        el("button",{class:"btn",type:"button",text:"Open "+top.name,onclick:()=>openSambal(top.id)}),
        el("button",{class:"btn ghost",type:"button",text:"Take it again",onclick:()=>{qi=0;answers=[];renderQuiz();}})),
      sharePanel()),
    el("div",{class:"side"}, art.firstChild, rad.firstChild, key)
  ));
}
