"use strict";
// Share the "Which sambal are you?" result as an image, to any social app.
// Works like Tea Time: a 1080×1350 card (fits Instagram, Facebook, WeChat, WhatsApp),
// the phone's share menu, Save / Copy image, and one button per app.
// ================= share =================
let LAST_RESULT=null;                 // {top, you, pct}; set by renderResult in quiz.js
const SITE_URL="https://jjah0001.github.io/oelek/";
const QUIZ_URL=SITE_URL+"#kuis";
const CARD_C={paper:"#EEF0E6",card:"#F9FAF4",ink:"#1B2140",ink2:"#5A6075",rule:"#D3D7C6",chili:"#C3301D",nila:"#2E3672",soga:"#7A4A26",
  raw:"#4A6E3A",cooked:"#7A4A26",fermented:"#2E3672"};

// ---------- little toast for share feedback ----------
let toastT=0;
function toast(msg){
  let t=$("#toast"); if(!t){ t=el("div",{id:"toast",class:"toast",role:"status","aria-live":"polite"}); document.body.append(t); }
  t.textContent=msg; t.classList.add("on"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("on"),3800);
}

// ---------- the result card ----------
function wrapLines(ctx,text,maxW){ const words=String(text).split(/\s+/); const lines=[]; let cur="";
  for(const w of words){ const t=cur?cur+" "+w:w; if(ctx.measureText(t).width>maxW&&cur){lines.push(cur);cur=w}else cur=t } if(cur) lines.push(cur); return lines; }
function rrect(ctx,x,y,w,h,r){ ctx.beginPath(); ctx.moveTo(x+r,y); ctx.arcTo(x+w,y,x+w,y+h,r); ctx.arcTo(x+w,y+h,x,y+h,r); ctx.arcTo(x,y+h,x,y,r); ctx.arcTo(x,y,x+w,y,r); ctx.closePath(); }
function artImage(s){ // the cobek illustration, drawn into the canvas from its SVG
  const svg=sambalArt(s).replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" ');
  return new Promise((ok,no)=>{ const im=new Image(); im.onload=()=>ok(im); im.onerror=no; im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg); });
}
function kawungRow(x,y0,w,col){ // the batik strip from the site, as a band
  x.save(); x.fillStyle=col; x.globalAlpha=.28;
  for(let cx=12;cx<w;cx+=24){ x.beginPath(); x.ellipse(cx,y0-6,4,6,0,0,Math.PI*2); x.ellipse(cx,y0+6,4,6,0,0,Math.PI*2); x.ellipse(cx-6,y0,6,4,0,0,Math.PI*2); x.ellipse(cx+6,y0,6,4,0,0,Math.PI*2); x.fill(); }
  x.restore();
}
async function renderResultCard(){
  const R=LAST_RESULT; if(!R) throw new Error("no result");
  const top=R.top, fam=CARD_C[top.style]||CARD_C.chili;
  const serif='"Gloock",Georgia,serif', sans='"Figtree",system-ui,sans-serif', mono='"IBM Plex Mono",ui-monospace,monospace';
  try{ await Promise.all([document.fonts.load(`80px ${serif}`,"Aa"),document.fonts.load(`600 30px ${sans}`,"Aa"),document.fonts.load(`30px ${sans}`,"Aa"),document.fonts.load(`500 22px ${mono}`,"Aa")]); }catch(e){}
  const img=await artImage(top).catch(()=>null);
  const W=1080,H=1350,c=document.createElement("canvas"); c.width=W; c.height=H; const x=c.getContext("2d");
  x.fillStyle=CARD_C.paper; x.fillRect(0,0,W,H);
  rrect(x,40,40,W-80,H-80,28); x.fillStyle=CARD_C.card; x.fill(); x.lineWidth=2; x.strokeStyle=CARD_C.rule; x.stroke();
  x.save(); rrect(x,40,40,W-80,H-80,28); x.clip(); kawungRow(x,62,W,CARD_C.soga); x.restore();
  const L=100;
  // brand
  x.textBaseline="alphabetic"; x.textAlign="left";
  x.fillStyle=CARD_C.ink; x.font=`52px ${serif}`; x.fillText("Oelek",L,150); const bw=x.measureText("Oelek").width;
  x.fillStyle=CARD_C.chili; x.fillText(".",L+bw,150);
  x.fillStyle=CARD_C.ink2; x.font=`500 22px ${mono}`; x.textAlign="right"; x.fillText("WHICH SAMBAL ARE YOU?",W-L,146); x.textAlign="left";
  // illustration
  const iy=190, is=300, ix=W-L-is+10;
  if(img) x.drawImage(img,ix,iy,is,is);
  // kicker, name, persona
  const tw=ix-L-30;
  x.fillStyle=CARD_C.chili; x.font=`500 24px ${mono}`; x.fillText("I AM",L,250);
  x.fillStyle=CARD_C.ink; let y=250, size=84; x.font=`${size}px ${serif}`;
  let lines=wrapLines(x,top.name,tw); while(lines.length>3&&size>56){ size-=6; x.font=`${size}px ${serif}`; lines=wrapLines(x,top.name,tw); }
  for(const ln of lines){ y+=size*1.02; x.fillText(ln,L,y); }
  x.fillStyle=CARD_C.chili; x.font=`40px ${serif}`; y+=60;
  for(const ln of wrapLines(x,top.persona[0],tw)){ x.fillText(ln,L,y); y+=48; }
  y=Math.max(y+8,iy+is+40);
  x.fillStyle=CARD_C.ink2; x.font=`31px ${sans}`;
  for(const ln of wrapLines(x,top.persona[1],W-L*2)){ x.fillText(ln,L,y); y+=44; }
  // facts strip: region · family · heat · match
  y+=18; const bh=96;
  rrect(x,L,y,W-L*2,bh,18); x.fillStyle=fam+"16"; x.fill(); x.lineWidth=2; x.strokeStyle=fam; x.stroke();
  x.fillStyle=CARD_C.ink; x.font=`600 28px ${sans}`;
  let reg=top.region; const regMax=W-L*2-56-330; while(x.measureText(reg).width>regMax&&reg.length>6) reg=reg.slice(0,-2).trimEnd()+"…";
  x.fillText(reg,L+28,y+42);
  x.fillStyle=CARD_C.ink2; x.font=`26px ${sans}`;
  x.fillText(`${STYLE[top.style].en} sambal · heat ${top.heat} of 5`,L+28,y+76);
  const pill=`${R.pct}% match`; x.font=`600 28px ${sans}`; const pw=x.measureText(pill).width+40;
  rrect(x,W-L-28-pw,y+bh/2-26,pw,52,26); x.fillStyle=fam; x.fill(); x.fillStyle="#fff"; x.textAlign="center"; x.fillText(pill,W-L-28-pw/2,y+bh/2+10); x.textAlign="left";
  // flavour radar: the sambal against your answers
  const rtop=y+bh+24, rsize=Math.min(H-210-rtop,470), rc=W/2, rcy=rtop+rsize/2, Rr=rsize/2-58, n=DIMS.length;
  const pt=(i,v)=>{ const a=-Math.PI/2+i*2*Math.PI/n; return [rc+Math.cos(a)*Rr*v/5, rcy+Math.sin(a)*Rr*v/5]; };
  x.strokeStyle=CARD_C.rule; x.lineWidth=1.5;
  for(const lv of [1,2,3,4,5]){ x.beginPath(); DIMS.forEach((_,i)=>{ const [p,q]=pt(i,lv); i?x.lineTo(p,q):x.moveTo(p,q); }); x.closePath(); x.stroke(); }
  x.fillStyle=CARD_C.ink2; x.font=`500 24px ${sans}`; x.textAlign="center"; x.textBaseline="middle";
  DIMS.forEach(([en],i)=>{ const [p,q]=pt(i,5); x.beginPath(); x.moveTo(rc,rcy); x.lineTo(p,q); x.stroke(); const [lx,ly]=pt(i,6.2); x.fillText(en,lx,ly); });
  const poly=(f,fill,stroke,dash)=>{ x.beginPath(); f.forEach((v,i)=>{ const [p,q]=pt(i,Math.max(.2,v)); i?x.lineTo(p,q):x.moveTo(p,q); }); x.closePath();
    x.fillStyle=fill; x.fill(); x.setLineDash(dash||[]); x.strokeStyle=stroke; x.lineWidth=4; x.stroke(); x.setLineDash([]); };
  poly(top.p,CARD_C.chili+"33",CARD_C.chili); poly(R.you,CARD_C.nila+"1f",CARD_C.nila,[12,8]);
  x.textBaseline="alphabetic";
  // legend and footer
  const ly2=H-162; x.font=`26px ${sans}`; x.textAlign="left";
  const short=top.name.replace(/^Sambal(ado)?\s+/i,"");
  const leg=[[CARD_C.chili,short.length>22?"My sambal":short,false],[CARD_C.nila,"My answers",true]];
  let lw=0; const widths=leg.map(([,t])=>{ const w=x.measureText(t).width+64; lw+=w; return w; }); let lx2=W/2-lw/2;
  leg.forEach(([col,t,d],i)=>{ x.strokeStyle=col; x.lineWidth=5; x.setLineDash(d?[10,6]:[]); x.beginPath(); x.moveTo(lx2,ly2-9); x.lineTo(lx2+34,ly2-9); x.stroke(); x.setLineDash([]); x.fillStyle=CARD_C.ink2; x.fillText(t,lx2+44,ly2); lx2+=widths[i]; });
  x.fillStyle=CARD_C.ink; x.font=`600 28px ${sans}`; x.textAlign="center"; x.fillText("Which sambal are you?",W/2,H-112);
  x.fillStyle=CARD_C.ink2; x.font=`24px ${sans}`; x.fillText(SITE_URL.replace(/^https:\/\//,"").replace(/\/$/,""),W/2,H-78);
  return await new Promise((ok,no)=>c.toBlob(b=>b?ok(b):no(new Error("toBlob")),"image/png"));
}

// ---------- destinations ----------
// Brand marks are in js/data/social-icons.js (Simple Icons, CC0). Same set as Tea Time.
const SOCIALS=[
 {k:"instagram",n:"Instagram",icon:"instagram",hex:"FF0069"},
 {k:"facebook",n:"Facebook",icon:"facebook",hex:"0866FF",web:(u,t)=>`https://www.facebook.com/sharer/sharer.php?u=${u}`},
 {k:"whatsapp",n:"WhatsApp",icon:"whatsapp",hex:"25D366",web:(u,t)=>`https://wa.me/?text=${t}`},
 {k:"wechat",n:"WeChat",icon:"wechat",hex:"07C160",paste:true},
 {k:"messenger",n:"Messenger",icon:"messenger",hex:"0866FF",paste:true},
 {k:"x",n:"X",icon:"x",hex:"000000",web:(u,t)=>`https://x.com/intent/post?text=${t}`},
 {k:"threads",n:"Threads",icon:"threads",hex:"000000",web:(u,t)=>`https://www.threads.net/intent/post?text=${t}`},
 {k:"telegram",n:"Telegram",icon:"telegram",hex:"26A5E4",web:(u,t)=>`https://t.me/share/url?url=${u}&text=${t}`},
 {k:"line",n:"LINE",icon:"line",hex:"00C300",web:(u,t)=>`https://social-plugins.line.me/lineit/share?url=${u}`},
 {k:"xiaohongshu",n:"小红书",icon:"xiaohongshu",hex:"FF2442"},
 {k:"weibo",n:"Weibo",icon:"sinaweibo",hex:"E6162D",web:(u,t)=>`https://service.weibo.com/share/share.php?url=${u}&title=${t}`},
 {k:"tiktok",n:"TikTok",icon:"tiktok",hex:"000000"}
];
// Phones: tapping an app goes straight to that app. The image is copied first (a browser can only hand an
// image to another app through the general share menu), then the app opens with the caption filled in where it can.
const APP_LINK={
 instagram:()=>"instagram://camera",
 facebook:(u,t)=>`https://www.facebook.com/sharer/sharer.php?u=${u}`,
 whatsapp:(u,t)=>`whatsapp://send?text=${t}`,
 wechat:()=>"weixin://",
 messenger:(u,t)=>`fb-messenger://share/?link=${u}`,
 x:(u,t)=>`https://x.com/intent/post?text=${t}`,
 threads:(u,t)=>`https://www.threads.net/intent/post?text=${t}`,
 telegram:(u,t)=>`tg://msg_url?url=${u}&text=${t}`,
 line:(u,t)=>`https://line.me/R/share?text=${t}`,
 xiaohongshu:()=>"xhsdiscover://",
 weibo:(u,t)=>`sinaweibo://sendweibo?content=${t}`,
 tiktok:()=>"snssdk1233://"
};

// ---------- actions ----------
let CARD_BLOB=null, CARD_FOR=null;
function prepCard(){ const key=LAST_RESULT&&(LAST_RESULT.top.id+"|"+LAST_RESULT.you.map(v=>v.toFixed(2)).join(","));
  if(CARD_BLOB&&CARD_FOR===key) return Promise.resolve(CARD_BLOB);
  return renderResultCard().then(b=>{ CARD_BLOB=b; CARD_FOR=key; return b; }); }
const isPhone=()=>/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)||(navigator.maxTouchPoints>1&&/Macintosh/.test(navigator.userAgent));
const fileName=()=>"my-sambal-"+LAST_RESULT.top.id+".png";
const shareText=()=>`I'm ${LAST_RESULT.top.name}: ${LAST_RESULT.top.persona[0]}. Which sambal are you? ${QUIZ_URL}`;
function saveBlob(blob,name){ const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),4000); }
async function copyBlob(blobP){ // pass the promise straight in, so Safari still counts it as part of the tap
  if(!(window.ClipboardItem&&navigator.clipboard&&navigator.clipboard.write)) return false;
  try{ await navigator.clipboard.write([new ClipboardItem({"image/png":blobP})]); return true; }catch(e){
    try{ await navigator.clipboard.write([new ClipboardItem({"image/png":await blobP})]); return true; }catch(e2){ return false; } } }
async function shareTo(k,btn){
  const o=SOCIALS.find(s=>s.k===k); if(!o||!LAST_RESULT) return;
  const name=fileName(), text=shareText(), U=encodeURIComponent(QUIZ_URL), T=encodeURIComponent(text);
  const blobP=prepCard();
  btn.disabled=true;
  try{
    if(isPhone()){
      const copied=await copyBlob(blobP);
      if(!copied){ // no clipboard: fall back to the share menu, which can carry the image
        const blob=await blobP, file=new File([blob],name,{type:"image/png"});
        let ok=false; try{ ok=!!(navigator.canShare&&navigator.canShare({files:[file]})); }catch(e){}
        if(ok){ toast(`Choose ${o.n} in the share menu`); try{ await navigator.share({files:[file],title:"Which sambal are you?",text}); }catch(e){} return; }
        saveBlob(blob,name);
      }
      let left=false; const away=()=>{ left=true; }; document.addEventListener("visibilitychange",away,{once:true}); window.addEventListener("pagehide",away,{once:true});
      toast(copied?`Image copied. Opening ${o.n}: paste it in`:`Image saved. Opening ${o.n}`);
      location.href=APP_LINK[k](U,T);
      setTimeout(()=>{ if(!left&&document.visibilityState==="visible") toast(`${o.n} didn't open. Is it installed? Try "Share my result" instead.`); },2500);
      return;
    }
    // computers: copy (or save) the image, then open the app's web share page where there is one
    const copied=await copyBlob(blobP), blob=await blobP;
    if(!copied||(!o.web&&!o.paste)) saveBlob(blob,name);
    if(o.web){ window.open(o.web(U,T),"_blank","noopener,width=640,height=640");
      toast(copied?`Image copied. Paste it into your ${o.n} post`:`Image saved. Add it to your ${o.n} post`); }
    else if(o.paste&&copied) toast(`Image copied. Paste it into a ${o.n} chat`);
    else toast(`Image saved. Open ${o.n} and post it from your photos`);
  }catch(e){ console.warn(e); toast("Couldn't make the image. Try again in a moment."); }
  finally{ btn.disabled=false; }
}
async function shareResult(how,btn){
  if(btn) btn.disabled=true;
  try{
    const blob=await prepCard(), name=fileName(), text=shareText();
    if(how==="share"){
      const file=new File([blob],name,{type:"image/png"});
      let ok=false; try{ ok=!!(navigator.canShare&&navigator.canShare({files:[file]})); }catch(e){}
      if(ok){ try{ await navigator.share({files:[file],title:"Which sambal are you?",text}); return; }catch(e){ if(e&&e.name==="AbortError") return; } }
      how="save";
    }
    if(how==="copy"){ await navigator.clipboard.write([new ClipboardItem({"image/png":blob})]); toast("Image copied. Paste it into your chat or post"); return; }
    if(how==="link"){ try{ await navigator.clipboard.writeText(text); toast("Caption and link copied"); }catch(e){ toast(text); } return; }
    saveBlob(blob,name);
    toast("Image saved. Post it from Instagram, Facebook, WeChat or WhatsApp");
  }catch(e){ console.warn(e); toast("Couldn't make the image. Try again in a moment."); }
  finally{ if(btn) btn.disabled=false; }
}

// ---------- the share panel under a result ----------
function sharePanel(){
  const icon='<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5v8.5M4.8 4.6 8 1.5l3.2 3.1M3 8.5v5h10v-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const main=el("button",{class:"btn share",type:"button"}); main.innerHTML=icon+"Share my result"; main.addEventListener("click",()=>shareResult("share",main));
  const row=el("div",{class:"sharerow"}, main);
  const save=el("button",{class:"btn ghost small",type:"button",text:"Save image"}); save.addEventListener("click",()=>shareResult("save",save)); row.append(save);
  if(window.ClipboardItem&&navigator.clipboard&&navigator.clipboard.write){ const cp=el("button",{class:"btn ghost small",type:"button",text:"Copy image"}); cp.addEventListener("click",()=>shareResult("copy",cp)); row.append(cp); }
  const ln=el("button",{class:"btn ghost small",type:"button",text:"Copy link"}); ln.addEventListener("click",()=>shareResult("link",ln)); row.append(ln);
  const socials=el("div",{class:"socials",role:"group","aria-label":"Share your result to"});
  for(const o of SOCIALS){
    const b=el("button",{class:"soc",type:"button","aria-label":"Share to "+o.n});
    const i=el("i"); i.style.setProperty("--bc","#"+o.hex); i.style.setProperty("--ic",`url("${SOCIAL_ICONS[o.icon]}")`);
    b.append(i, el("span",{text:o.n})); b.addEventListener("click",()=>shareTo(o.k,b)); socials.append(b);
  }
  const canFiles=(()=>{ try{ return !!(navigator.canShare&&navigator.canShare({files:[new File([""],"t.png",{type:"image/png"})]})); }catch(e){ return false; } })();
  const note=el("p",{class:"sharenote",text: canFiles
    ? "Tap an app: your result image is copied and the app opens, ready for you to paste it in. \"Share my result\" opens your phone's share menu for any other app."
    : "On a computer, tapping an app copies or saves the image and opens that app's share page where it has one; paste or upload the image there. On a phone, the image is copied and the app opens so you can paste it in."});
  CARD_BLOB=null; setTimeout(()=>{ prepCard().catch(()=>{}); },400); // have the image ready before the first tap
  return el("div",{class:"sharebox"}, el("p",{class:"eyebrow",text:"Share your sambal"}), row, el("p",{class:"sociallab",text:"Share to"}), socials, note);
}
