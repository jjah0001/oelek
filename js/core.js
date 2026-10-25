"use strict";
// DOM, SVG and storage helpers; the combined sambal index.
// ================= helpers =================
const $ = s => document.querySelector(s);
S.forEach(s=>s.kind="full");
const LISTED = L.map((l,i)=>({kind:"list",id:"l"+i,name:l[0],prov:l[1],note:l[2],src:[l[3]]}));
const ALL = [...S, ...LISTED];
const byId = Object.fromEntries(ALL.map(s=>[s.id,s]));
const el = (tag, attrs={}, ...kids) => { const e=document.createElement(tag); for(const[k,v] of Object.entries(attrs)){ if(k==="class") e.className=v; else if(k==="text") e.textContent=v; else if(k.startsWith("on")) e.addEventListener(k.slice(2),v); else e.setAttribute(k,v);} for(const k of kids) e.append(k); return e; };
const CHILI = '<path d="M4 19c6 1 12-3 14-11 .4-1.6 1.6-2.6 2.6-3-.6-1-1.8-1.5-3-1.2-1 .3-1.7 1.3-1.8 2.3C14.5 11 10 15 4 16.5c-1.4.4-1.4 2.3 0 2.5z"/>';
function chilis(n){ let h=""; for(let i=1;i<=5;i++) h+=`<svg viewBox="0 0 24 24" aria-hidden="true" class="${i<=n?'on':'off'}">${CHILI}</svg>`; return `<span class="chilis" role="img" aria-label="Heat ${n} of 5">${h}</span>`; }
const store = { get(k){ try{return localStorage.getItem(k);}catch(e){return null;} }, set(k,v){ try{localStorage.setItem(k,v);}catch(e){} } };
const NS="http://www.w3.org/2000/svg";
const sv=(tag,attrs={})=>{const e=document.createElementNS(NS,tag); for(const[k,v] of Object.entries(attrs)) e.setAttribute(k,v); return e;};
