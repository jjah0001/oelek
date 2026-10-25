"use strict";
// Dish pairing: Claude (claude.ai or the oelek-pair Worker) with a keyword fallback.
// ================= pairing =================
const EXAMPLES=["Grilled snapper","Beef rendang","Fried chicken","Nasi goreng","Avocado toast","Roast pork belly","Tofu and vegetables","Fish tacos"];
$("#examples").replaceChildren(...EXAMPLES.map(t=>el("button",{type:"button",text:t,onclick:()=>{$("#dish").value=t; $("#askForm").requestSubmit();}})));
const samplePromise = (window.claude && typeof window.claude.use==="function") ? Promise.resolve(window.claude.use("sample")).catch(()=>null) : Promise.resolve(null);
// Outside claude.ai the page asks Claude through the oelek-pair Cloudflare Worker (see worker/).
const PAIR_PROXY = "https://oelek-pair.jjah0001-tea.workers.dev/pair";
let aiOff = false, ctl = null;
const RULES=[
 [/fish|seafood|snapper|prawn|shrimp|squid|tuna|salmon|crab|ikan|udang|cumi|oyster|mussel|scallop/,{matah:3,dabu:3,colo:3,acan:2,"asam-udeung":2}],
 [/grill|bbq|barbecue|bakar|charcoal|smok|roast|sate|satay|skewer/,{roa:3,cakalang:2,dabu:2,colo:2,terasi:2}],
 [/rendang|curry|gulai|coconut|santan|opor|creamy|rich|stew|braise/,{"lado-mudo":3,dabu:2,"asam-udeung":2,acan:2}],
 [/fried|goreng|crispy|chicken|ayam|schnitzel|nugget|katsu|fries/,{bawang:3,terasi:3,taliwang:2,bajak:2}],
 [/vegetable|salad|greens|spinach|sayur|kangkung|tofu|tahu|tempeh|tempe|vegan|vegetarian/,{pecel:3,plecing:2,cibiuk:2,tumpang:2,goang:1}],
 [/pork|babi|belly|ham|bacon|lamb|goat|duck/,{andaliman:3,embe:3,luat:2,matah:2}],
 [/beef|steak|burger|brisket|sapi|meat/,{luat:2,andaliman:2,balado:2,katokkon:2}],
 [/porridge|congee|bubur|soup|soto|broth|noodle|mie|ramen|pho/,{roa:3,cakalang:2,bawang:2,"teri-lado":1}],
 [/rice|nasi|fried rice/,{terasi:2,bajak:2,"teri-lado":2,roa:1}],
 [/egg|telur|toast|avocado|bread|sandwich|breakfast/,{balado:3,roa:2,dabu:2,bajak:1}],
 [/sweet|kid|child|mild|gentle|not spicy/,{bajak:3,pecel:3,petis:2}],
 [/taco|mexican|pizza|pasta|italian/,{dabu:3,matah:2,bawang:1}]
];
function localPairs(dish){
  const t=dish.toLowerCase(); const score={};
  for(const [re,add] of RULES) if(re.test(t)) for(const[k,v] of Object.entries(add)) score[k]=(score[k]||0)+v;
  for(const s of S) for(const w of s.serve) for(const word of w.toLowerCase().split(/[^a-z]+/)) if(word.length>3 && t.includes(word)) score[s.id]=(score[s.id]||0)+2;
  const ranked=Object.entries(score).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  for(const d of ["terasi","dabu","bajak"]) if(!ranked.includes(d)) ranked.push(d);
  const why={raw:"Fresh and sharp, it lifts the dish without weighing it down.",cooked:"Its deeper, fried flavour stands up to the dish and adds savouriness.",fermented:"Sour, pungent depth gives the dish a bold contrast."};
  return {picks:ranked.slice(0,3).map(id=>({id,reason:why[byId[id].style]+" Suggested alongside "+byId[id].serve.slice(0,2).join(" and ").toLowerCase()+"."})),
          tip:"Picked by the built-in matcher. Open each profile to see what goes in."};
}
function renderPicks(res, note){
  const valid=(res.picks||[]).filter(p=>p&&byId[p.id]).slice(0,3);
  $("#askStatus").textContent=note;
  if(!valid.length){ $("#picks").replaceChildren(el("p",{class:"tip",text:String(res.tip||"That doesn't look like a dish. Try naming something you'd eat.")})); return; }
  const nodes=valid.map(p=>{
    const s=byId[p.id]; const art=el("span"); art.innerHTML=sambalArt(s);
    const name=el("b"); name.append(el("button",{type:"button",text:s.name,onclick:()=>openSambal(s.id)}), ` · ${s.region}`);
    return el("div",{class:"pick"}, art.firstChild, name, el("p",{text:String(p.reason||"")}));
  });
  if(res.tip) nodes.push(el("p",{class:"tip",text:String(res.tip)}));
  $("#picks").replaceChildren(...nodes);
}
const catalogue = S.map(s=>`${s.id} | ${s.name} | ${s.region} | ${s.style}, heat ${s.heat}/5 | ${s.ing.join(", ")} | served with: ${s.serve.join(", ")}`).join("\n");
$("#askForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const dish=$("#dish").value.trim();
  if(!dish){ $("#askStatus").textContent="Type a dish or ingredient first."; $("#dish").focus(); return; }
  const sample = aiOff ? null : await samplePromise;
  if(!sample && !PAIR_PROXY){ renderPicks(localPairs(dish),"Suggested by the built-in matcher (AI isn't available in this view)."); return; }
  ctl=new AbortController();
  $("#askBtn").disabled=true; $("#stopBtn").hidden=false;
  $("#askStatus").textContent="Asking Claude…"; $("#picks").replaceChildren();
  const prompt=`You are an expert on Indonesian sambal and food pairing.
Someone is eating: "${dish.slice(0,300)}".
Choose the 3 sambals from this catalogue that suit it best, best first. Use only ids from the catalogue.
For each, give a reason of one or two sentences in plain English explaining the flavour logic (for example cutting richness with acid, echoing smoke, freshness with seafood, sweetness to calm heat). Mention the dish by name.
Then give one short practical serving tip.
If the input is not a food or dish, return an empty picks array and a tip asking for a dish.

Catalogue (id | name | region | style, heat | ingredients | suggested pairings):
${catalogue}

Reply with only JSON in this shape:
{"picks":[{"id":"matah","reason":"..."}],"tip":"..."}`;
  const viaProxy=async()=>{
    const r=await fetch(PAIR_PROXY,{method:"POST",headers:{"content-type":"application/json"},signal:ctl.signal,body:JSON.stringify({dish,catalogue})});
    if(r.status===429) throw {code:"rate_limited"};
    if(!r.ok) throw {code:"upstream",status:r.status};
    return await r.json();
  };
  const ask=async()=>{
    if(sample){
      try{ return await sample.json(prompt,{signal:ctl.signal}); }
      catch(err){
        if(!["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(err&&err.code)) throw err;
        aiOff=true;
      }
    }
    if(PAIR_PROXY) return await viaProxy();
    throw {code:"no_ai"};
  };
  try{
    const res=await ask();
    renderPicks(res||{}, "Suggested by Claude from the atlas.");
  }catch(err){
    const code=err&&(err.code||err.name);
    if(code==="cancelled"||code==="AbortError"){ $("#askStatus").textContent="Stopped."; }
    else if(code==="no_ai"){ renderPicks(localPairs(dish),"AI isn't enabled here, so the built-in matcher picked these."); }
    else if(code==="rate_limited"){ renderPicks(localPairs(dish),"Claude is busy right now; the built-in matcher picked these. Try AI again in a minute."); }
    else { renderPicks(localPairs(dish),"Claude couldn't answer this time, so the built-in matcher picked these."); }
  }finally{ $("#askBtn").disabled=false; $("#stopBtn").hidden=true; }
});
$("#stopBtn").addEventListener("click",()=>ctl&&ctl.abort());
