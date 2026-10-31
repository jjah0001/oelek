"use strict";
// A home recipe for each sambal card, written by Claude on request (claude.ai or the oelek-pair Worker's /recipe).
// Each recipe is kept in this browser once written, and the Worker caches it for everyone for 30 days.
// ================= recipe =================
const RECIPE_PROXY = typeof PAIR_PROXY==="string" && PAIR_PROXY ? PAIR_PROXY.replace(/\/pair$/,"/recipe") : "";
let recipeCtl=null, recipeFor=null;
const recipeStore={
  get(id){ try{ return JSON.parse(localStorage.getItem("oelek.recipe2."+id)||"null"); }catch(e){ return null; } },
  set(id,v){ try{ localStorage.setItem("oelek.recipe2."+id,JSON.stringify(v)); }catch(e){} }
};
function recipeInfo(s){
  if(s.kind==="full") return [
    `Sambal: ${s.name}`, `Region: ${s.region}`, `Family: ${STYLE[s.style].en} (${s.style})`, `Heat: ${s.heat} of 5`,
    `Ingredients in the cobek: ${s.ing.join(", ")}`, `Eaten with: ${s.serve.join(", ")}`, `About it: ${s.note}`
  ].join("\n");
  return [`Sambal: ${s.name}`, `Province: ${provName(s.prov)}`, `What is recorded about it: ${describeListed(s)}`].join("\n");
}
function recipePrompt(info){
  return `You are a cook who grew up making sambal in Indonesia and now teaches it to home cooks abroad.
Write a home recipe, in plain English, for the sambal described here. Stay true to its region and to the
ingredients listed; do not add ingredients the tradition does not use. If the description is thin, write the
most common version and say so in the first tip.

${info}

Rules:
- Enough for a small bowl (about 4 people as a condiment). Metric amounts, with cups or spoons where natural.
- 6 to 12 ingredients, each with an amount; give the Indonesian name in the note where it helps (e.g. "terasi").
- 4 to 8 steps, each one or two sentences, in the order a cook does them: prep, roast or fry, grind in the cobek, season, rest.
- 2 or 3 tips: how to adjust the heat, substitutes outside Indonesia, serving.
- "keeps": how long this sambal keeps and how, judged from how it is made (raw and fresh sambals keep far less than
  cooked ones fried until the oil separates; fermented ones keep longest). Give "room" (at room temperature, covered),
  "fridge" (in a clean airtight jar) and "freezer" (or "not recommended"), each as a short span like "1 day" or
  "2 to 3 weeks", plus a "signs" sentence saying when to throw it out.
- If the sambal is fermented or uses raw or fermented fish or shrimp, durian, or fermented fruit, put one sentence of
  food-safety advice in "safety" (clean jars, refrigeration, when to discard); otherwise leave it empty.

Reply with only JSON in this shape:
{"serves":"4 as a condiment","time":"25 minutes","ingredients":[{"item":"bird's eye chillies","amount":"10","note":"cabai rawit"}],"steps":["..."],"tips":["..."],"keeps":{"room":"1 day","fridge":"1 week","freezer":"1 month","signs":"..."},"safety":""}`;
}
function renderRecipe(r){
  const box=$("#dRecipeBody");
  const meta=[r.serves&&("Serves "+String(r.serves).replace(/^serves\s*/i,"")), r.time].filter(Boolean).join(" · ");
  const ing=el("ul",{class:"recipe-ing"},...(r.ingredients||[]).map(x=>{ const li=el("li"); li.append(el("b",{text:String(x.amount||"")}),` ${x.item||""}`); if(x.note) li.append(el("small",{text:` (${x.note})`})); return li; }));
  const steps=el("ol",{class:"recipe-steps"},...(r.steps||[]).map(t=>el("li",{text:String(t)})));
  const kids=[];
  if(meta) kids.push(el("p",{class:"recipe-meta",text:meta}));
  kids.push(el("h5",{text:"You need"}),ing,el("h5",{text:"Method"}),steps);
  if(r.tips&&r.tips.length) kids.push(el("h5",{text:"Tips"}),el("ul",{class:"recipe-tips"},...r.tips.map(t=>el("li",{text:String(t)}))));
  const k=r.keeps;
  if(k&&(k.room||k.fridge||k.freezer)){ // how long it keeps
    const row=(lab,v)=>v?el("div",{},el("span",{text:lab}),el("b",{text:String(v)})):null;
    kids.push(el("h5",{text:"How long it keeps"}),el("div",{class:"recipe-keeps"},...[row("Room temperature",k.room),row("Fridge",k.fridge),row("Freezer",k.freezer)].filter(Boolean)));
    if(k.signs) kids.push(el("p",{class:"recipe-signs",text:String(k.signs)}));
  }
  if(r.safety) kids.push(el("p",{class:"tip recipe-safety",text:String(r.safety)}));
  kids.push(el("p",{class:"recipe-note",text:"Written by Claude from this card’s ingredients and notes. It is a starting point, not a tested family recipe: taste as you go."}));
  box.replaceChildren(...kids);
}
function paintRecipe(s){
  if(recipeCtl){ recipeCtl.abort(); recipeCtl=null; }
  recipeFor=s.id;
  const btn=$("#dRecipeBtn"), status=$("#dRecipeStatus"), box=$("#dRecipeBody");
  box.replaceChildren(); status.textContent="";
  const saved=recipeStore.get(s.id);
  if(saved){ btn.hidden=true; renderRecipe(saved); return; }
  btn.hidden=false; btn.disabled=false;
}
async function askRecipe(){
  const s=byId[recipeFor]; if(!s) return;
  const id=s.id, btn=$("#dRecipeBtn"), status=$("#dRecipeStatus");
  const sample = (typeof aiOff!=="undefined"&&aiOff) ? null : await samplePromise;
  if(!sample&&!RECIPE_PROXY){ status.textContent="AI isn't available in this view."; return; }
  recipeCtl=new AbortController(); const ctl=recipeCtl;
  btn.disabled=true; status.textContent="Claude is writing the recipe…";
  const info=recipeInfo(s);
  try{
    let r=null;
    if(sample){
      try{ r=await sample.json(recipePrompt(info),{signal:ctl.signal}); }
      catch(err){ if(!["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(err&&err.code)) throw err; }
    }
    if(!r&&RECIPE_PROXY){
      const res=await fetch(RECIPE_PROXY,{method:"POST",headers:{"content-type":"application/json"},signal:ctl.signal,body:JSON.stringify({id,info})});
      if(res.status===429) throw {code:"rate_limited"};
      if(!res.ok) throw {code:"upstream",status:res.status};
      r=await res.json();
    }
    if(!r||!Array.isArray(r.steps)||!r.steps.length) throw {code:"empty"};
    recipeStore.set(id,r);
    if(recipeFor!==id) return; // the visitor has moved on to another sambal
    btn.hidden=true; status.textContent=""; renderRecipe(r);
  }catch(err){
    if(recipeFor!==id) return;
    const code=err&&(err.code||err.name);
    btn.disabled=false;
    status.textContent = code==="AbortError"||code==="cancelled" ? "" :
      code==="rate_limited" ? "Claude is busy right now. Try again in a minute." :
      "Claude couldn't write the recipe this time. Try again in a moment.";
  }finally{ if(recipeCtl===ctl) recipeCtl=null; }
}
$("#dRecipeBtn").addEventListener("click",askRecipe);
$("#dRecipeJump").addEventListener("click",()=>{ $("#dRecipe").scrollIntoView({behavior:"smooth",block:"start"}); if(!$("#dRecipeBtn").hidden&&!$("#dRecipeBtn").disabled) askRecipe(); });
dlg.addEventListener("close",()=>{ if(recipeCtl){ recipeCtl.abort(); recipeCtl=null; } });
