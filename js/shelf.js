"use strict";
// Browser-local collection. Imports are validated and merged, never executed.
const SHELF_KEY="oelek.shelf.v1";
const SHELF_STATUS={have:"On my shelf",wish:"Want to try",tried:"Tried before"};
let shelfItems={}, shelfSort="status", shelfStorageOK=true, shelfActive=null;
function cleanShelf(items){
  if(!items||typeof items!=="object"||Array.isArray(items)) throw Error("Invalid collection");
  const out={};
  for(const [id,e] of Object.entries(items)){
    if(!Object.hasOwn(byId,id)) continue;
    if(!e||!Object.hasOwn(SHELF_STATUS,e.status)||!(e.grams===null||typeof e.grams==="number"&&Number.isFinite(e.grams)&&e.grams>=0&&e.grams<=1000000)||!Number.isInteger(e.rating)||e.rating<0||e.rating>5||typeof e.note!=="string"||e.note.length>2000) throw Error("Invalid entry");
    out[id]={status:e.status,grams:e.grams,rating:e.rating,note:e.note};
  }
  return out;
}
try{const data=JSON.parse(localStorage.getItem(SHELF_KEY)||"null");if(data){if(data.version!==1)throw Error("Unknown version");shelfItems=cleanShelf(data.items);}}catch(e){shelfStorageOK=false;}
function shelfMessage(message){$("#shelfMessage").textContent=message;$("#shelfSaveMessage").textContent=message;}
function saveShelf(){
  try{localStorage.setItem(SHELF_KEY,JSON.stringify({version:1,items:shelfItems}));shelfStorageOK=true;}catch(e){shelfStorageOK=false;}
  renderShelf();
  if(!shelfStorageOK)shelfMessage("Browser storage is unavailable. Export your collection to keep these changes.");
}
function shelfButton(text,action,cls=""){return el("button",{type:"button",class:cls,text,onclick:action});}
function paintShelfControls(s){
  shelfActive=s;
  const host=$("#shelfControls"),entry=shelfItems[s.id];host.replaceChildren();
  const row=el("div",{class:"shelf-actions"});
  for(const [status,label] of Object.entries(SHELF_STATUS)){
    const button=shelfButton(status==="have"&&!entry?"Add to my shelf":label,()=>{
      shelfItems[s.id]={status,grams:entry?.grams??null,rating:entry?.rating||0,note:entry?.note||""};saveShelf();paintShelfControls(s);
      $("#shelfControls [data-status='"+status+"']").focus();
    });
    button.dataset.status=status;button.setAttribute("aria-pressed",String(entry?.status===status));
    if(status==="have")button.classList.add("shelf-primary");row.append(button);
  }
  host.append(row);
  if(entry){
    const fields=el("div",{class:"shelf-fields"});
    const grams=el("input",{type:"number",min:0,max:1000000,step:"any",placeholder:"Not recorded","aria-label":"Grams left"});grams.value=entry.grams??"";
    grams.addEventListener("input",()=>{if(!grams.checkValidity())return;entry.grams=grams.value===""?null:Number(grams.value);saveShelf();});
    const rating=el("select",{"aria-label":"Your rating"});
    for(let n=0;n<=5;n++)rating.append(el("option",{value:n,text:n?"★".repeat(n)+` · ${n}/5`:"Not rated yet"}));rating.value=entry.rating;
    rating.addEventListener("change",()=>{entry.rating=Number(rating.value);saveShelf();});
    if(entry.status==="have")fields.append(el("label",{text:"Grams left"},grams));
    fields.append(el("label",{text:"Private shelf rating"},rating));
    fields.append(shelfButton("Remove",()=>{delete shelfItems[s.id];saveShelf();paintShelfControls(s);$("#shelfControls button").focus();},"shelf-remove"));host.append(fields);
    const note=el("textarea",{maxlength:2000,rows:2,placeholder:"How it tasted, where you found it, what you ate it with…","aria-label":"Tasting notes"});note.value=entry.note;
    note.addEventListener("input",()=>{entry.note=note.value;saveShelf();});host.append(el("label",{text:"Tasting notes"},note));
  }
  host.append(el("p",{id:"shelfSaveMessage",class:"shelf-message",role:"status",text:shelfStorageOK?"Saved on this device and browser only. No sign-in or cloud sync.":"Browser storage is unavailable. Export your collection to keep changes."}));
}
function shelfJar(s,e){
  const jar=shelfButton("",()=>openSambal(s.id),"shelf-jar "+e.status);
  jar.setAttribute("aria-label",`${s.name} · ${SHELF_STATUS[e.status]}${e.rating?` · ${e.rating} of 5 stars`:""}`);
  // A consistent stoneware glaze: status is conveyed by shape, outline and text.
  jar.innerHTML=`<svg viewBox="0 0 100 118" aria-hidden="true"><ellipse cx="50" cy="110" rx="37" ry="4" fill="currentColor" opacity=".1"/><rect x="26" y="15" width="48" height="14" rx="5" fill="#716b60"/><ellipse cx="50" cy="15" rx="24" ry="5" fill="#969082"/><path d="M27 29Q17 33 17 46V98Q17 109 29 109H71Q83 109 83 98V46Q83 33 73 29Z" fill="${e.status==="wish"?"none":"#b6ac96"}" stroke="#817967" stroke-width="2" ${e.status==="wish"?'stroke-dasharray="4 3"':""}/><path d="M24 43V96" stroke="#fff" opacity=".25" stroke-width="4" stroke-linecap="round"/><rect x="27" y="48" width="46" height="40" rx="2" fill="#f4eddc" stroke="#a99b7e"/><path d="M43 62c5 2 10-1 13-7-1 10-6 17-15 16 4-2 5-5 2-9Z" fill="#716b60"/><path d="m55 56 3-4" stroke="#716b60" stroke-width="2"/><path d="M35 79H65" stroke="#b6ac96"/>${e.status==="tried"?'<circle cx="80" cy="39" r="10" fill="#f4eddc" stroke="#817967"/><path d="m75 39 3 3 6-7" fill="none" stroke="#716b60" stroke-width="2"/>':""}</svg>`;
  jar.append(el("span",{class:"shelf-jar-name",text:s.name.replace(/^Sambal\s+/i,"")}),el("span",{class:"shelf-jar-detail",text:e.status==="have"&&e.grams!==null?`${e.grams} g`:e.rating?"★".repeat(e.rating):SHELF_STATUS[e.status]}));return jar;
}
function renderShelf(){
  const entries=Object.entries(shelfItems).map(([id,e])=>({s:byId[id],e}));
  const have=entries.filter(x=>x.e.status==="have"),tasted=entries.filter(x=>x.e.status!=="wish");
  const provinces=[...new Set(tasted.map(x=>x.s.prov))].filter(p=>PROV[p]);
  const grams=have.reduce((n,x)=>n+(x.e.grams||0),0);
  $("#shelfCount").textContent=entries.length||"";
  $("#shelfStats").replaceChildren(...[[have.length,"jars on the shelf"],[grams.toLocaleString()+" g","recorded in stock"],[entries.filter(x=>x.e.status==="wish").length,"sambals to try"],[`${provinces.length} / ${Object.keys(PROV).filter(p=>ALL.some(s=>s.prov===p)).length}`,"provinces tasted"]].map(([value,label])=>el("div",{},el("strong",{text:value}),el("span",{text:label}))));
  const host=$("#shelfRows");host.replaceChildren();
  if(!entries.length)host.append(el("div",{class:"shelf-empty"},el("p",{class:"eyebrow",text:"A little space for something pedas"}),el("h3",{text:"Your first jar is waiting"}),el("p",{text:'Open a sambal in the Atlas and choose “Add to my shelf”, “Want to try” or “Tried before”.'}),shelfButton("Explore the sambal atlas →",()=>go("peta"))));
  else{
    const groups={};for(const x of entries){const key=shelfSort==="status"?x.e.status:x.s.prov;(groups[key]??=[]).push(x);}
    const keys=shelfSort==="status"?Object.keys(SHELF_STATUS):Object.keys(groups).sort((a,b)=>provName(a).localeCompare(provName(b)));
    for(const key of keys){const list=groups[key]||[];const row=el("div",{class:"shelf-row"});list.sort((a,b)=>a.s.name.localeCompare(b.s.name)).forEach(x=>row.append(shelfJar(x.s,x.e)));if(!list.length)row.append(el("p",{class:"shelf-row-empty",text:"A space for your next discovery."}));host.append(el("div",{class:"shelf-group"},el("h3",{text:shelfSort==="status"?SHELF_STATUS[key]:provName(key)},el("small",{text:list.length})),row));}
  }
  const map=$("#shelfMap");map.replaceChildren();for(const pts of Object.values(ISLANDS))map.append(sv("path",{d:smoothPath(pts),fill:"var(--land)",stroke:"var(--land-edge)","stroke-width":1}));
  const links=$("#shelfProvinces");links.replaceChildren();
  const browse=code=>{$("#provSel").value=code;$("#q").value="";$("#heatSel").value="0";document.querySelector('.chip.kind[data-k="all"]').click();document.querySelector('.chip.fam[data-f="all"]').click();go("peta");$("#grid").scrollIntoView({block:"start"});};
  for(const code of provinces){const [name,lon,lat]=PROV[code],[x,y]=px(lon,lat),count=tasted.filter(t=>t.s.prov===code).length;const mark=sv("g",{role:"button",tabindex:0,"aria-label":`${name}: ${count} tasted sambals`});mark.append(sv("circle",{cx:x,cy:y,r:11,fill:"var(--ink)"}));const label=sv("text",{x,y:y+4,"text-anchor":"middle",fill:"var(--surface)","font-size":11});label.textContent=count;mark.append(label);mark.addEventListener("click",()=>browse(code));mark.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();browse(code);}});map.append(mark);links.append(shelfButton(`${name} · ${count}`,()=>browse(code)));}
  if(!provinces.length)links.append(el("p",{class:"lede",text:"Your journey appears here as you add or try sambals."}));
}
$("#shelfSort").addEventListener("click",e=>{const b=e.target.closest("[data-sort]");if(!b)return;shelfSort=b.dataset.sort;$("#shelfSort").querySelectorAll("button").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));renderShelf();});
$("#shelfExport").addEventListener("click",()=>{const url=URL.createObjectURL(new Blob([JSON.stringify({app:"oelek",version:1,items:shelfItems},null,2)],{type:"application/json"}));const a=el("a",{href:url,download:"oelek-shelf.json"});a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
$("#shelfImport").addEventListener("click",()=>$("#shelfFile").click());
$("#shelfFile").addEventListener("change",async e=>{const file=e.target.files[0];if(!file)return;try{if(file.size>2000000)throw Error("Too large");const data=JSON.parse(await file.text());if(data.version!==1||data.app!=="oelek")throw Error("Wrong format");const incoming=cleanShelf(data.items);shelfItems={...shelfItems,...incoming};saveShelf();shelfMessage(shelfStorageOK?`Imported ${Object.keys(incoming).length} sambals. Matching entries were updated; your other jars were kept.`:"Imported into memory. Browser storage is unavailable; export to keep your collection.");}catch(err){shelfMessage("Could not import this file. Choose a valid Oelek shelf export (up to 2 MB). Your collection has not changed.");}finally{e.target.value="";}});
// Keep other tabs in sync without writing back and creating a storage loop.
window.addEventListener("storage",e=>{if(e.key!==SHELF_KEY)return;try{const data=JSON.parse(e.newValue||"null");if(data&&data.version!==1)return;shelfItems=data?cleanShelf(data.items):{};renderShelf();if(shelfActive&&dlg.open)paintShelfControls(shelfActive);}catch(err){}});
// Keep a status target available before any profile has opened.
$("#shelfControls").append(el("p",{id:"shelfSaveMessage",role:"status"}));
renderShelf();
