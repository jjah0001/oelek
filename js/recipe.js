"use strict";
// A home recipe for each sambal card, written by Claude on request (claude.ai or the oelek-pair Worker's /recipe).
// Each recipe is kept in this browser once written, and the Worker caches it for everyone for 30 days.
// ================= recipe =================
const RECIPE_PROXY = typeof PAIR_PROXY==="string" && PAIR_PROXY ? PAIR_PROXY.replace(/\/pair$/,"/recipe") : "";
let recipeCtl=null, recipeFor=null;
const recipeStore={
  get(id){ try{ return JSON.parse(localStorage.getItem("oelek.recipe4."+id)||"null"); }catch(e){ return null; } },
  set(id,v){ try{ localStorage.setItem("oelek.recipe4."+id,JSON.stringify(v)); }catch(e){} }
};
// The visitor's country, for the claude.ai view where the Worker can't see it: the browser's region, else none.
function visitorCountry(){
  try{ const reg=new Intl.Locale(navigator.language||"").region; return reg&&/^[A-Z]{2}$/.test(reg)?reg:""; }catch(e){ return ""; }
}
function countryName(code,lang){ try{ return code?new Intl.DisplayNames([lang],{type:"region"}).of(code)||"":""; }catch(e){ return ""; } }
function recipeInfo(s){
  if(s.kind==="full") return [
    `Sambal: ${s.name}`, `Region: ${s.region}`, `Family: ${STYLE[s.style].en} (${s.style})`, `Heat: ${s.heat} of 5`,
    `Ingredients in the cobek: ${s.ing.join(", ")}`, `Eaten with: ${s.serve.join(", ")}`, `About it: ${s.note}`
  ].join("\n");
  return [`Sambal: ${s.name}`, `Province: ${provName(s.prov)}`, `What is recorded about it: ${describeListed(s)}`].join("\n");
}
function recipePrompt(info,negara){
  return `Anda adalah seorang oma berusia sekitar 60 tahun dan termasuk 0,1% pembuat sambal terbaik di seluruh Indonesia.
Sejak kecil Anda mengulek sambal di dapur, dari resep turun-temurun sampai sambal dari daerah lain yang Anda pelajari
sendiri. Sehabis belajar bahasa Inggris, Anda ingin membagikan resep-resep sambal kepada semua orang di dunia yang
tertarik. Silakan menulis resep ini dalam bahasa Inggris yang hangat, sederhana dan mudah diikuti, seolah-olah Anda
sedang mengajari cucu yang tinggal di ${negara}.

Tulislah resep rumahan untuk sambal yang dijelaskan di bawah ini. Tetaplah setia pada daerah asalnya dan pada bahan
yang tercantum; jangan menambahkan bahan yang tidak dipakai dalam tradisinya. Jika keterangannya sedikit, tulislah
versi yang paling umum dan sebutkan hal itu di tips pertama.

${info}

Aturan:
- Cukup untuk satu mangkuk kecil (sekitar 4 orang sebagai pelengkap). Pakailah satuan yang lazim di ${negara}
  (misalnya cups dan ounces di Amerika Serikat, dengan gram di dalam kurung); di negara lain takaran metrik, dengan
  cangkir atau sendok bila lebih wajar.
- 6 sampai 12 bahan, masing-masing dengan takarannya; tuliskan nama Indonesianya di "note" bila membantu (misalnya "terasi").
- 4 sampai 8 langkah, masing-masing satu atau dua kalimat, sesuai urutan memasak: menyiapkan bahan, membakar atau
  menggoreng, mengulek di cobek, membumbui, mendiamkan.
- 2 atau 3 tips: cara mengatur tingkat pedas, bahan pengganti yang mudah dicari di ${negara} dan di mana mencari bahan
  Indonesianya di sana (misalnya toko Asia), cara menyajikan. Jika cucunya tinggal di Indonesia, cukup sebutkan pasar.
- "keeps": berapa lama sambal ini tahan dan cara menyimpannya, dinilai dari cara pembuatannya (sambal mentah dan segar
  jauh lebih cepat basi daripada sambal yang ditumis sampai minyaknya keluar; sambal fermentasi biasanya paling awet).
  Isi "room" (di suhu ruang, tertutup), "fridge" (di toples bersih yang kedap udara) dan "freezer" (atau
  "not recommended"), masing-masing berupa rentang singkat seperti "1 day" atau "2 to 3 weeks", serta "signs": satu
  kalimat tentang tanda-tanda sambal harus dibuang.
- Jika sambalnya difermentasi atau memakai ikan atau udang mentah atau fermentasi, durian, atau buah fermentasi, tuliskan
  satu kalimat saran keamanan pangan di "safety" (toples bersih, simpan di kulkas, kapan harus dibuang); jika tidak, biarkan kosong.
- Semua isi jawaban dalam bahasa Inggris; nama kunci JSON tetap seperti contoh.

Balas hanya dengan JSON dalam bentuk ini:
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
  kids.push(el("p",{class:"recipe-note",text:(r.country?`Written for cooks in ${r.country}, where you seem to be. `:"")+"Written by Claude from this card’s ingredients and notes. It is a starting point, not a tested family recipe: taste as you go."}));
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
      try{ const cc=visitorCountry(); r=await sample.json(recipePrompt(info,countryName(cc,"id")||"luar negeri"),{signal:ctl.signal}); if(r&&cc) r.country=countryName(cc,"en"); }
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
