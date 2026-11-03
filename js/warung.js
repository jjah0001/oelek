"use strict";
// Warung: a chat with Bu Lastri, a sambal cook from the kampung, played by Claude (the oelek-pair Worker's /warung,
// or Claude directly inside claude.ai). Her persona is written in Indonesian in worker/worker.js (warungPrompt);
// the copy below is used only inside claude.ai and is kept in step with it.
// ================= warung =================
const WARUNG_PROXY = typeof PAIR_PROXY==="string" && PAIR_PROXY ? PAIR_PROXY.replace(/\/pair$/,"/warung") : "";
const WARUNG_KEY="oelek.warung.v1";
const WARUNG_IDEAS=["Hello! What is this place?","Which sambal should I try first?","What do Javanese people eat for breakfast?","Where did you learn to make sambal?","I can't handle much heat. What can I eat?","What should I order at your warung?"];
let warungLog=[], warungBusy=false, warungCtl=null, warungOpened=false;

function warungTime(){ // the kampung's hour: a previewed ?jam= or the visitor's own clock
  let h; try{ const q=parseFloat(new URLSearchParams(location.search).get("jam")); if(!isNaN(q)) h=q; }catch(e){}
  if(h===undefined){ const d=new Date(); h=d.getHours()+d.getMinutes()/60; }
  return h<5?"malam":h<6.5?"subuh":h<11?"pagi":h<15?"siang":h<18.3?"sore":"malam";
}
function warungGreeting(){
  return {
    subuh:"Oh! You're up early. Monggo (please, come in), sit down. The rooster beat you, but only just. I'm Bu Lastri. The rice is still steaming and I'm about to start the sambal. Where have you come from?",
    pagi:"Monggo, monggo (come in, come in)! Sit wherever you like. I'm Bu Lastri, this is my warung. I've just finished grinding today's sambal in the cobek. Where are you visiting from?",
    siang:"Monggo (come in)! Out of that sun, sit in the shade. I'm Bu Lastri. Would you like some cold es teh (iced sweet tea) while we talk? Where are you from?",
    sore:"Sugeng sonten (good afternoon)! Monggo, sit. I'm Bu Lastri. The children are flying kites over the sawah and the gorengan (fritters) are still warm. Where have you come from?",
    malam:"Sugeng dalu (good evening)! Monggo, come in, the lamp is still on. I'm Bu Lastri. Listen to the crickets... Have you eaten? Where are you visiting from?"
  }[warungTime()];
}
function warungPrompt(negara, waktu){ // the same persona as the Worker, for claude.ai
  return `Anda memerankan Bu Lastri (Sulastri), seorang ibu Jawa berusia 61 tahun, pemilik sebuah warung kecil di kampungnya
di kaki Gunung Merapi, Sleman, Yogyakarta. Anda sedang mengobrol dengan pengunjung situs Oelek, sebuah atlas sambal
Indonesia, yang baru saja mampir ke warung Anda.

Tentang Bu Lastri:
- Lahir dan besar di kampung ini. Sejak kecil membantu simbok (ibu) mengulek sambal dan memasak di dapur kayu.
- Setelah anak-anaknya besar, Anda berkeliling Indonesia bertahun-tahun: Medan, Padang, Palembang, Jakarta, Bandung,
  Semarang, Surabaya, Bali, Lombok, Makassar, Manado dan Ambon. Di setiap kota Anda belajar sambal dan masakan dari
  ibu-ibu di pasar dan di dapur mereka. Anda selalu bertanya, mencicipi dan mencatat.
- Sekarang Anda pulang dan membuka warung sederhana di kampung: nasi, sayur, lauk, gorengan, teh panas, dan tentu
  sambal yang diulek setiap pagi. Dari warung terlihat sawah dan Merapi.
- Anda orang Jawa dan Muslim yang sederhana, ramah, rendah hati dan suka bercanda. Sesekali wajar mengucapkan
  "Alhamdulillah" atau "Insya Allah", tetapi tidak pernah berceramah. Anda memasak makanan halal, dan tetap menghormati
  masakan daerah lain yang memakai babi atau minuman keras (misalnya di Batak, Bali, Manado, Toraja dan Papua):
  ceritakan dengan hormat bahwa itu bagian dari kekayaan Indonesia, walaupun Anda sendiri tidak memasaknya.
- Cucu Anda ada yang tinggal di luar negeri, jadi Anda belajar bahasa Inggris dan senang bertemu orang dari negara lain.

Cara berbicara:
- Jawablah dalam bahasa yang dipakai pengunjung. Jika pengunjung menulis dalam bahasa Inggris, jawablah dalam bahasa
  Inggris yang hangat dan sederhana. Selipkan sesekali kata Jawa atau Indonesia (misalnya "monggo", "nggih", "cobek",
  "ulek") dengan artinya di dalam kurung saat pertama dipakai.
- Ini obrolan di warung, bukan artikel: biasanya 1 sampai 4 kalimat. Lebih panjang hanya kalau pengunjung meminta resep
  atau penjelasan. Jangan memakai judul, tanda pagar atau huruf tebal. Daftar bernomor hanya untuk resep.
- Tunjukkan rasa ingin tahu yang tulus tentang pengunjung: dari negara dan kota mana, makanan apa yang biasa mereka
  makan, seberapa kuat mereka makan pedas, apakah pernah ke Indonesia. Tanyakan satu hal saja setiap kali, jangan
  menginterogasi, dan hubungkan jawaban mereka dengan masakan Indonesia (misalnya membandingkan sambal dengan saus pedas
  di negara mereka, atau menyarankan sambal yang cocok dengan makanan mereka).
- Ingat apa yang sudah diceritakan pengunjung dan jangan menanyakannya lagi.

Yang dibicarakan:
- Sambal dari seluruh Indonesia, masakan Jawa, dan masakan Indonesia pada umumnya: bahan, cara membuat, cara makan,
  pasar, kebiasaan makan, cerita perjalanan Anda, kehidupan di kampung.
- Anda boleh menyarankan bagian situs Oelek: Atlas (peta semua sambal), tombol "Recipe" di setiap kartu sambal untuk
  resep lengkap, Pairing (mencari sambal untuk suatu hidangan), dan My shelf (rak sambal pengunjung).
- Jika pengunjung membicarakan hal di luar makanan dan kehidupan sehari-hari (misalnya politik, teknologi, uang), tanggapi
  dengan ramah dan singkat bahwa Anda hanya orang warung, lalu kembalikan obrolan ke makanan.
- Jangan memberi nasihat kesehatan, hukum atau keuangan. Jika pengunjung punya alergi atau pantangan, sarankan dengan
  jujur agar berhati-hati dan memeriksa bahannya. Untuk sambal fermentasi atau ikan mentah, ingatkan kebersihan dan
  penyimpanan di kulkas.
- Jika Anda tidak yakin tentang suatu fakta, katakan terus terang ("setahu saya", "kata orang sana"), jangan mengarang.
- Jika pengunjung dengan sungguh-sungguh bertanya apakah Anda manusia atau AI, jawablah jujur bahwa Bu Lastri adalah tokoh
  yang diperankan oleh AI (Claude) di situs Oelek, lalu lanjutkan obrolan dengan ramah.
- Jaga obrolan tetap sopan dan cocok untuk semua umur. Tolak dengan halus permintaan yang kasar atau berbahaya.

Keadaan sekarang:
- Pengunjung tampaknya berasal dari ${negara || "negara yang belum diketahui"}${negara ? " (perkiraan dari koneksinya, bisa saja salah: tanyakan dengan wajar, jangan langsung menebak)" : ""}.
- Di kampung sekarang ${waktu || "siang hari"}.`;
}
const WARUNG_WAKTU={pagi:"pagi hari, warung baru buka dan sambal baru diulek",siang:"siang hari yang panas",sore:"sore hari, anak-anak bermain layangan di sawah",malam:"malam hari, warung diterangi lampu dan terdengar jangkrik",subuh:"subuh, ayam berkokok dan Anda sedang menyiapkan dagangan"};

const warungStore={
  get(){ try{ const v=JSON.parse(sessionStorage.getItem(WARUNG_KEY)||"null"); return Array.isArray(v)?v.filter(m=>m&&typeof m.content==="string"&&(m.role==="user"||m.role==="assistant")).slice(-40):null; }catch(e){ return null; } },
  set(v){ try{ sessionStorage.setItem(WARUNG_KEY,JSON.stringify(v.slice(-40))); }catch(e){} }
};
function omaSpeaking(on){ $("#omaBicara").hidden=!on; $("#omaDiam").hidden=on; }
function warungBubble(role,text){
  const b=el("div",{class:"wbubble "+(role==="user"?"wme":"wbu")});
  if(role!=="user") b.append(el("b",{class:"wname",text:"Bu Lastri"}));
  const p=el("p"); p.textContent=text; b.append(p);
  $("#warungLog").append(b); $("#warungLog").scrollTop=$("#warungLog").scrollHeight; return p;
}
// She "speaks" the reply: the text appears at talking pace while her talking picture shows.
function warungSay(text,instant){
  const p=warungBubble("assistant",instant?text:"");
  if(instant||matchMedia("(prefers-reduced-motion: reduce)").matches){ p.textContent=text; return Promise.resolve(); }
  omaSpeaking(true);
  return new Promise(res=>{
    let i=0; const step=()=>{ i=Math.min(text.length,i+2); p.textContent=text.slice(0,i); $("#warungLog").scrollTop=$("#warungLog").scrollHeight;
      if(i<text.length) setTimeout(step,28); else { omaSpeaking(false); res(); } };
    step();
  });
}
function warungIdeas(){
  const used=new Set(warungLog.filter(m=>m.role==="user").map(m=>m.content));
  const left=WARUNG_IDEAS.filter(t=>!used.has(t)).slice(0,warungLog.length>2?2:4);
  $("#warungIdeas").replaceChildren(...left.map(t=>el("button",{type:"button",class:"pill",text:t,onclick:()=>warungAsk(t)})));
}
function openWarung(){
  if(warungOpened) return; warungOpened=true;
  const saved=warungStore.get();
  if(saved&&saved.length){ warungLog=saved; for(const m of saved) m.role==="user"?warungBubble("user",m.content):warungSay(m.content,true); }
  else { const g=warungGreeting(); warungLog=[{role:"assistant",content:g}]; warungStore.set(warungLog); warungSay(g); }
  warungIdeas();
}
async function warungReply(){
  const waktu=warungTime(), msgs=warungLog.slice(-20);
  const sample=(typeof aiOff!=="undefined"&&aiOff)?null:await samplePromise;
  if(sample){
    try{
      const cc=typeof visitorCountry==="function"?visitorCountry():"";
      const prompt=warungPrompt(cc&&typeof countryName==="function"?countryName(cc,"id"):"",WARUNG_WAKTU[waktu])+
        "\n\nObrolan sejauh ini:\n"+msgs.map(m=>(m.role==="user"?"Pengunjung: ":"Bu Lastri: ")+m.content).join("\n")+
        '\n\nTulis balasan Bu Lastri berikutnya. Balas hanya dengan JSON dalam bentuk ini: {"reply":"..."}';
      const r=await sample.json(prompt,{signal:warungCtl.signal}); if(r&&r.reply) return String(r.reply);
    }catch(err){ if(!["not_granted","sampling_disabled","not_declared","capability_disabled","capability_removed"].includes(err&&err.code)) throw err; }
  }
  if(!WARUNG_PROXY) throw {code:"no_ai"};
  const res=await fetch(WARUNG_PROXY,{method:"POST",headers:{"content-type":"application/json"},signal:warungCtl.signal,body:JSON.stringify({messages:msgs,waktu})});
  if(res.status===429) throw {code:"rate_limited"};
  if(!res.ok) throw {code:"upstream"};
  const r=await res.json(); if(!r||!r.reply) throw {code:"empty"};
  return String(r.reply);
}
async function warungAsk(text){
  text=String(text||"").trim().slice(0,1000); if(!text||warungBusy) return;
  warungBusy=true; $("#warungSend").disabled=true; $("#warungInput").value=""; $("#warungIdeas").replaceChildren();
  warungBubble("user",text); warungLog.push({role:"user",content:text}); warungStore.set(warungLog);
  const wait=el("div",{class:"wbubble wbu wthinking"},el("b",{class:"wname",text:"Bu Lastri"}),el("p",{text:"…"})); $("#warungLog").append(wait); $("#warungLog").scrollTop=$("#warungLog").scrollHeight;
  warungCtl=new AbortController();
  try{
    const reply=await warungReply(); wait.remove();
    warungLog.push({role:"assistant",content:reply}); warungStore.set(warungLog);
    await warungSay(reply);
  }catch(err){
    wait.remove(); warungLog.pop(); warungStore.set(warungLog);
    const code=err&&(err.code||err.name);
    if(code!=="AbortError") warungBubble("note", code==="rate_limited"?"Bu Lastri is serving another table. Try again in a minute.":"Bu Lastri didn't catch that (the connection dropped). Try again in a moment.").parentNode.classList.add("wnote");
  }finally{ warungBusy=false; $("#warungSend").disabled=false; warungIdeas(); }
}
$("#warungForm").addEventListener("submit",e=>{ e.preventDefault(); warungAsk($("#warungInput").value); });
$("#warungInput").addEventListener("keydown",e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); warungAsk($("#warungInput").value); } });
$("#warungReset").addEventListener("click",()=>{ if(warungCtl) warungCtl.abort(); warungLog=[]; warungStore.set([]); $("#warungLog").replaceChildren(); omaSpeaking(false); warungOpened=false; openWarung(); });
