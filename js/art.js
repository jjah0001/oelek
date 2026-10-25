"use strict";
// Procedural recipe illustrations.
// ================= recipe illustrations =================
// Top-down cobek; base colour and toppings follow each recipe.
const LOOK = {
 "asam-udeung":{b:"#d6452f",t:{shrimp:5,gchili:4,chili:3,shallot:3,bilimbi:4,leaf:2}},
 andaliman:{b:"#c2341f",t:{pepper:14,garlic:3,chili:3,lime:1}},
 "lado-mudo":{b:"#6f9a3b",oil:1,t:{gtomato:4,gchili:5,shallot:3,anchovy:3}},
 balado:{b:"#c8301f",oil:1,smooth:1,t:{chili:3,shallot:3,tomato:3}},
 "teri-lado":{b:"#b33b22",oil:1,t:{anchovy:15,chili:3}},
 tempoyak:{b:"#d4a65f",t:{cream:5,chili:5,shallot:3,anchovy:2,grass:2}},
 rusip:{b:"#9c6d4a",t:{anchovy:11,chili:4,shallot:3,lime:1}},
 cencalok:{b:"#c99486",t:{tinyshrimp:14,chili:4,shallot:3,lime:1}},
 seruit:{b:"#b65a32",t:{fish:7,cream:3,mango:3,leaf:3}},
 bajak:{b:"#8e2a1a",oil:1,smooth:1,t:{chili:2,fshallot:4}},
 terasi:{b:"#a93224",t:{chili:4,terasi:4,garlic:2,lime:1}},
 cibiuk:{b:"#7aa043",t:{gtomato:4,gchili:5,leaf:6,shallot:2}},
 goang:{b:"#cf3b22",t:{garlic:5,chili:4,kencur:3}},
 kecombrang:{b:"#c33a2c",t:{flower:6,chili:3,shallot:2,leaf:2}},
 tumpang:{b:"#a2733f",smooth:1,t:{tempeh:8,chili:4,leaf:2}},
 pecel:{b:"#9a5a2e",smooth:1,t:{peanut:9,chili:2,leaf:2}},
 petis:{b:"#2e211c",smooth:1,t:{peanut:6,chili:4}},
 bawang:{b:"#d5401f",oil:1,t:{garlic:6,chili:6,shallot:2}},
 matah:{b:"#e9b949",pile:1,t:{shallotThin:34,chiliThin:20,grassThin:16,leafStrip:16}},
 embe:{b:"#c96a2c",oil:1,t:{fshallot:16,chili:4}},
 bongkot:{b:"#c94a3a",t:{stem:6,shallot:5,chili:4,lime:1}},
 plecing:{b:"#d23a20",smooth:1,t:{tomato:4,chili:5,lime:1}},
 taliwang:{b:"#b12816",oil:1,smooth:1,t:{garlic:3,chili:2}},
 luat:{b:"#c8452a",t:{leaf:7,chili:6,lime:2}},
 acan:{b:"#a8442a",t:{gmango:5,chili:5,shallot:2,terasi:2}},
 gami:{b:"#b53a24",oil:1,t:{shrimp:3,fish:4,tomato:3,shallot:3}},
 mandai:{b:"#a9762f",t:{mandai:8,chili:4,shallot:2}},
 roa:{b:"#7a3a1f",oil:1,t:{fish:13,chili:4}},
 cakalang:{b:"#8b4426",oil:1,t:{fish:11,chili:4,shallot:2}},
 dabu:{b:"#d9603e",pile:1,t:{tomato:11,shallotThin:12,chiliThin:12,leaf:3}},
 tauco:{b:"#8a5a2a",smooth:1,t:{soy:9,chili:4,lime:1}},
 katokkon:{b:"#d8341a",t:{katokkon:6,chili:2}},
 kenari:{b:"#c46a3e",t:{nut:8,chili:3}},
 colo:{b:"#5a2a1a",pile:1,t:{tomato:8,shallotThin:12,chiliThin:12}}
};
function rng(seed){ let h=2166136261; for(const c of seed) h=Math.imul(h^c.charCodeAt(0),16777619); return ()=>{ h+=0x6D2B79F5; let t=h; t=Math.imul(t^t>>>15,t|1); t^=t+Math.imul(t^t>>>7,t|61); return ((t^t>>>14)>>>0)/4294967296; }; }
function shade(hex,amt){ const n=parseInt(hex.slice(1),16); let r=n>>16,g=n>>8&255,b=n&255; const f=v=>Math.max(0,Math.min(255,Math.round(v+amt))); return "#"+((1<<24)|(f(r)<<16)|(f(g)<<8)|f(b)).toString(16).slice(1); }
const TOP = {
 shallot:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="7" ry="6" fill="none" stroke="#b5587e" stroke-width="2.4"/><ellipse rx="4" ry="3.4" fill="none" stroke="#e6b8cc" stroke-width="1.6"/></g>`,
 chili:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="4.6" fill="none" stroke="#d8261a" stroke-width="2.6"/><circle cx="-1" cy="0.5" r="0.9" fill="#f5dc8e"/><circle cx="1.2" cy="-0.8" r="0.9" fill="#f5dc8e"/></g>`,
 gchili:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="4.6" fill="none" stroke="#3f8c2f" stroke-width="2.6"/><circle cx="0" cy="0" r="1" fill="#e9efc2"/></g>`,
 katokkon:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-6 0c0-5 12-5 12 0s-12 5-12 0z" fill="#f04a1e" stroke="#9e1d0b" stroke-width="1"/><path d="M5 0h4" stroke="#3f7a2a" stroke-width="2"/></g>`,
 lime:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-10 0a10 10 0 0 1 20 0z" fill="#cfe26a" stroke="#5f8f1f" stroke-width="2"/><path d="M0 0L-6 -6M0 0L0 -8M0 0L6 -6" stroke="#f3f8cf" stroke-width="1"/></g>`,
 leaf:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="9" ry="4" fill="#3e7d30"/><path d="M-8 0h16" stroke="#7eb35e" stroke-width=".8"/></g>`,
 tomato:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4.5" y="-4" width="9" height="8" rx="2" fill="#e2432b"/><rect x="-2.5" y="-2" width="5" height="4" rx="1" fill="#f48a62"/></g>`,
 gtomato:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4.5" y="-4" width="9" height="8" rx="2" fill="#93c04d"/><rect x="-2.5" y="-2" width="5" height="4" rx="1" fill="#c7df8a"/></g>`,
 bilimbi:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="5" ry="3.4" fill="#bcd66a" stroke="#86a83a" stroke-width="1"/></g>`,
 fish:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-6 0q3-3 7-1t5 1q-4 3-8 2t-4-2z" fill="#9a5a30"/><path d="M-3 0h5" stroke="#c99060" stroke-width=".8"/></g>`,
 peanut:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="4.4" ry="3.2" fill="#c98a4a"/><ellipse cx="-1" cy="-1" rx="1.6" ry="1" fill="#e2b077"/></g>`,
 nut:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="5.5" ry="3.4" fill="#e1c294"/><path d="M-4 0h8" stroke="#b8925a" stroke-width=".8"/></g>`,
 garlic:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="4.2" ry="3.2" fill="#f3ead0" stroke="#d6c79c" stroke-width=".8"/></g>`,
 grass:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="3.8" fill="#eef3c8" stroke="#b9c779" stroke-width="1.4"/><circle r="1.2" fill="#d7e2a0"/></g>`,
 shrimp:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-5 3a6 6 0 1 1 9 -3" fill="none" stroke="#f08a6b" stroke-width="4" stroke-linecap="round"/><path d="M-5 3a6 6 0 1 1 9 -3" fill="none" stroke="#fbc0a6" stroke-width="1" stroke-dasharray="2 2"/></g>`,
 tinyshrimp:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-2.5 1.5a3 3 0 1 1 4.5 -1.5" fill="none" stroke="#f3a08a" stroke-width="2" stroke-linecap="round"/></g>`,
 cream:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-7 0q2-6 8-4t5 5q-3 5-8 3t-5-4z" fill="#f0dea0" opacity=".95"/></g>`,
 anchovy:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="7" ry="1.6" fill="#ddd5c2"/><circle cx="5.5" cy="0" r=".8" fill="#333"/></g>`,
 terasi:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-3" y="-2.5" width="6" height="5" rx="1" fill="#5c3a2a"/></g>`,
 tempeh:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4" y="-3" width="8" height="6" rx="1" fill="#d9c38c"/><circle cx="-1.5" cy="0" r=".8" fill="#b89d5e"/><circle cx="1.5" cy="1" r=".8" fill="#b89d5e"/></g>`,
 flower:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="6" ry="2.6" fill="#e8577f"/><ellipse rx="2.6" ry="6" fill="#f07a9a"/><circle r="1.6" fill="#fbd0dc"/></g>`,
 stem:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="4.4" fill="#f4d6dc" stroke="#d9668a" stroke-width="1.6"/></g>`,
 mango:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-6" y="-2" width="12" height="4" rx="1.5" fill="#f2c14e"/></g>`,
 gmango:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-6" y="-2" width="12" height="4" rx="1.5" fill="#c4d86a"/><rect x="-6" y="-2" width="12" height="1.2" rx=".6" fill="#6f9a2a"/></g>`,
 fshallot:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-4 0q2-3 4-1t4 0" fill="none" stroke="#a85a1c" stroke-width="2.2" stroke-linecap="round"/></g>`,
 pepper:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="1.9" fill="#5c6a30"/><circle cx="3" cy="1.5" r="1.7" fill="#7a5a30"/><circle cx="1" cy="-2.6" r="1.6" fill="#4f5c28"/></g>`,
 kencur:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="4.4" fill="#f4ecd2" stroke="#b49a6a" stroke-width="1.2"/></g>`,
 mandai:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-6" y="-2" width="12" height="4" rx="2" fill="#d6ac5e"/></g>`,
 shallotThin:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-6 1a6 6 0 1 1 12 0" fill="none" stroke="#c4618c" stroke-width="1.7" stroke-linecap="round"/><path d="M-3.8 1a3.8 3.8 0 1 1 7.6 0" fill="none" stroke="#f0cadb" stroke-width="1.1" stroke-linecap="round"/></g>`,
 chiliThin:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="3.2" fill="none" stroke="#e0281c" stroke-width="1.9"/><circle cx=".7" cy="0" r=".7" fill="#f6e2a0"/></g>`,
 grassThin:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="3" fill="#f3f6d6" stroke="#bfcb7f" stroke-width="1.1"/><circle r=".9" fill="#dde6aa"/></g>`,
 leafStrip:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-7 0q7 -1.5 14 0" fill="none" stroke="#3f7d2c" stroke-width="1.5" stroke-linecap="round"/></g>`,
 soy:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="3.6" ry="2.8" fill="#caa05a"/></g>`
};
Object.assign(TOP,{
 eggplant:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="6" ry="4.6" fill="#efe3c4" stroke="#5b2f63" stroke-width="1.8"/><circle cx="-1.5" cy="0" r=".6" fill="#c9b78a"/><circle cx="1.5" cy=".8" r=".6" fill="#c9b78a"/></g>`,
 bean:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="6" ry="2.6" fill="#7fae3e"/><ellipse cx="-1" rx="2.4" ry="1.2" fill="#a9cf6e"/></g>`,
 coconut:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-5 -1h10M-3 2h7" stroke="#f6f1e2" stroke-width="1.6" stroke-linecap="round"/></g>`,
 tofu:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4.5" y="-4.5" width="9" height="9" rx="1.5" fill="#e9c27a"/><rect x="-2.5" y="-2.5" width="5" height="5" rx="1" fill="#f6e7c4"/></g>`,
 squid:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="4.6" fill="none" stroke="#f3e6dc" stroke-width="2.4"/><circle r="4.6" fill="none" stroke="#c98a7a" stroke-width=".7"/></g>`,
 meat:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-5" y="-3.5" width="10" height="7" rx="2.5" fill="#6e3524"/><path d="M-3 -1h6" stroke="#9a5a44" stroke-width="1"/></g>`,
 potato:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-4" y="-4" width="8" height="8" rx="2" fill="#e8c46a"/><rect x="-2" y="-2" width="3" height="3" rx="1" fill="#f6dc94"/></g>`,
 clam:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-6 2q6 -12 12 0z" fill="#d7c3a4" stroke="#8f7656" stroke-width="1"/><path d="M-3 1l3 -6M3 1l-3 -6" stroke="#a88f6c" stroke-width=".7"/></g>`,
 roe:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="1.6" fill="#f59a3c"/><circle cx="3" cy="1" r="1.5" fill="#f7a94e"/><circle cx="1" cy="-2.6" r="1.5" fill="#f08a2e"/><circle cx="-2.4" cy="-1.4" r="1.4" fill="#f7a94e"/></g>`,
 pea:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="2.6" fill="#4d7a2a"/><circle cx="-.8" cy="-.8" r=".8" fill="#86b35a"/></g>`,
 cucumber:(x,y,r)=>`<g transform="translate(${x} ${y})"><circle r="5" fill="#dfeec0" stroke="#3f7a2a" stroke-width="1.6"/><circle r="2" fill="#c9e09a"/></g>`,
 berry:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0 5c-5 -2 -5 -8 0 -9c5 1 5 7 0 9z" fill="#e2384a"/><circle cx="-1" cy="-1" r=".5" fill="#fbe08a"/><circle cx="1.4" cy="1" r=".5" fill="#fbe08a"/></g>`,
 mushroom:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-6 0q6 -9 12 0z" fill="#d8cdbb"/><rect x="-1.5" y="0" width="3" height="5" rx="1" fill="#efe7da"/></g>`,
 tamarind:(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-5 0q2 -5 6 -3t4 4q-3 4 -6 2t-4 -3z" fill="#5a2f1b"/></g>`
});
// keyword → toppings and base colour for sambals that only have a name and a defining ingredient
const KW = [
 [/rebon|ebi|cencalok|cincalok|cencaluk|sabu|dried shrimp/,"tinyshrimp",9],[/shrimp|udang|prawn/,"shrimp",4],
 [/anchov|teri|bilis|pliek|gerang/,"anchovy",10],[/squid|cumi|sotong/,"squid",6],[/clam|shellfish|lokan|kepah|tudai|cockle/,"clam",5],
 [/roe|telur ikan/,"roe",6],[/fish|ikan|sagela|tongkol|tuna|catfish|eel|belut|wader|peda|keumamah|lingkung|buras|bakasang|salabance|lengkong|piriak|kaluku/,"fish",8],
 [/beef|meat|sapi|daging|bone|tulang|krecek|skin|liver|hati|gizzard/,"meat",6],[/potato|kentang|jicama|bengkoang|jackfruit|megono/,"potato",6],
 [/eggplant|terong|terung|tuung/,"eggplant",5],[/bean|petai|jengkol|buncis|tolo|bitter|pare|pegheau|melon/,"bean",6],
 [/peanut|kacang/,"peanut",9],[/candlenut|kemiri|muncang|kenari|nut/,"nut",7],[/coconut|kelapa|nyuh|jenggot|nio|santan|asam u\\b|sager/,"coconut",12],
 [/lemongrass|serai|sereh|sere\\b/,"grass",7],[/torch ginger|kecombrang|honje|lucung|bongkot/,"flower",5],
 [/basil|kemangi|leaf|leaves|daun|melinjo|pegaga|suna|chive|lokio|kucai|woku/,"leaf",6],
 [/mango|mangga|macang|kweni|bacang|ramania|binjai|gandaria|pencit|kemang|fruit|buah/,"gmango",6],[/pineapple|nanas|papaya|pepaya/,"mango",6],
 [/strawberr|stroberi/,"berry",6],[/turkey berry|rimbang|leunca|nightshade/,"pea",10],[/mushroom|jamur/,"mushroom",6],
 [/cucumber|doco/,"cucumber",4],[/tomato|tomat/,"tomato",5],[/bilimbi|belimbing|carambola/,"bilimbi",5],
 [/durian|tempoyak/,"cream",5],[/tempeh|tempe|oncom/,"tempeh",7],[/tofu|tahu/,"tofu",5],
 [/ginger|jahe|kencur|cikur|turmeric|kunyit/,"kencur",4],[/tamarind|asam|asem|jokjok|cacapan/,"tamarind",4],
 [/garlic|bawang|onion|shallot/,"garlic",5],[/clove|cengkeh/,"pepper",8],[/lime|limau|jeruk|citrus|parado/,"lime",1]
];
const BASES = [
 [/hitam|black|petis|kecap|soy|kluwak|kluwek|tauco/,"#3a2318"],[/hijau|ijo|green|mudo|kemangi|cikur|honje|pegaga|daun/,"#6f9a3b"],
 [/coconut|kelapa|nyuh|santan|kunyit|turmeric|jenggot|nio|lingkung|sager/,"#d9a253"],[/durian|tempoyak/,"#d4a65f"],
 [/peanut|kacang|tempe|tumpang|oncom/,"#9a5a2e"],[/goreng|fried|bajak|hancur|campur/,"#9b2b1a"],[/tomat|tomato|matah|dabu|colo/,"#d9472c"]
];
function autoLook(s){
  const txt=(s.name+" "+(s.note||"")).toLowerCase(); const t={}; let n=0;
  for(const [re,k,c] of KW){ if(re.test(txt) && !t[k] && n<4){ t[k]=c; n++; } }
  let b="#c2341f"; for(const [re,col] of BASES) if(re.test(txt)){ b=col; break; }
  const green=b==="#6f9a3b";
  t[green?"gchili":"chili"]=(t[green?"gchili":"chili"]||0)+5; t.shallot=(t.shallot||0)+2;
  return {b,t,smooth:/goreng|fried|hitam|petis|kecap|tauco|kacang/.test(txt)?1:0,oil:/goreng|fried|hitam|sere tabia|geprek/.test(txt)?1:0};
}
// short, general explanations of defining ingredients, used to describe listed sambals
const GLOSS = [
 [/tempoyak|durian/,"Tempoyak is durian flesh salted and fermented until sour and pungent."],
 [/rebon|cencalok|cincalok|cencaluk/,"Rebon are tiny shrimp; fermented with salt they become cencalok, pink and pungent."],
 [/sabu/,"Rebon are tiny shrimp, often dried and pounded into sambal."],
 [/bakasang/,"Bakasang is a salty fermented fish paste from eastern Indonesia."],
 [/jengkol/,"Jengkol is a pungent, chewy bean much loved in western Indonesia."],
 [/petai/,"Petai, the stink bean, is green and garlicky, eaten raw or fried."],
 [/oncom/,"Oncom is a West Javanese ferment made from the by-products of tofu or peanut pressing."],
 [/leunca|nightshade/,"Leunca are small green nightshade berries eaten raw by Sundanese cooks; they pop and taste faintly bitter."],
 [/rimbang|turkey berry/,"Rimbang, the turkey berry, is a pea-sized, bitter green berry."],
 [/gandaria|ramania|plum mango/,"Gandaria, also called ramania, is a small sour mango relative."],
 [/kweni/,"Kweni is a fragrant, fibrous mango variety."],
 [/binjai/,"Binjai is a sour wild mango of Kalimantan and Sumatra."],
 [/macang|bacang|kemang|white mango/,"Macang, bacang and kemang are aromatic, sour mango relatives that ripen seasonally."],
 [/unripe mango|young mango|pencit|mangga/,"Unripe mango makes a sambal crisp and sharply sour."],
 [/bilimbi|belimbing wuluh/,"Belimbing wuluh, the bilimbi, is one of the sourest fruits in the archipelago."],
 [/carambola|belimbing/,"Star fruit gives a juicy, mild sourness."],
 [/terung dayak|sour eggplant|terung asam/,"Terung asam is a round, sour eggplant from Kalimantan and Riau, used like a fruit."],
 [/eggplant|terong|tuung/,"Eggplant softens and soaks up the chilli."],
 [/melinjo/,"Melinjo is the tree behind emping crackers; its leaves and skins are also eaten."],
 [/suna|garlic chive|chive|lokio/,"Chives give an oniony, green bite."],
 [/torch ginger|kecombrang|honje|lucung|bongkot/,"Torch ginger (kecombrang, honje or lucung) is a pink flower with a floral, sour perfume."],
 [/kluwak|kluwek/,"Kluwak is the black, fermented seed that colours rawon; it is earthy and bitter-sweet."],
 [/petis/,"Petis is a thick, black, sweet paste reduced from shrimp or fish stock."],
 [/tauco/,"Tauco is a salty fermented soybean paste."],
 [/tapai|fermented cassava/,"Tapai is cassava fermented until sweet, sour and slightly alcoholic."],
 [/peda/,"Peda is half-fermented salted mackerel, a north-coast Javanese speciality."],
 [/candlenut|kemiri|muncang/,"Candlenut, called muncang in Sundanese, thickens and enriches sambal; it is always cooked."],
 [/kenari/,"Kenari is the canarium nut of Maluku, creamy and rich."],
 [/coconut milk|santan/,"Coconut milk turns the sambal rich and mellow."],
 [/coconut|kelapa|nyuh/,"Grated coconut, often toasted, adds sweetness and texture."],
 [/peanut|kacang/,"Fried peanuts make it thick, nutty and gentle."],
 [/anchov|teri|bilis/,"Small anchovies, usually fried crisp, add salt and crunch."],
 [/shrimp|udang/,"Shrimp give it sweetness and depth."],
 [/smoked/,"Smoked fish gives the sambal a deep, smoky savour."],
 [/catfish|eel|belut|fish|ikan|sagela|tongkol|tuna|snakehead/,"Fish gives the sambal body and a savoury depth."],
 [/squid|cumi/,"Squid is fried and tossed through the chilli."],
 [/clam|shellfish|lokan|kepah|tudai/,"Shellfish make it briny and sweet."],
 [/beef|meat|sapi|daging|bone|tulang/,"Meat makes it a sambal you can eat as a main dish."],
 [/skin|krecek/,"Krecek is crisp dried cow skin that softens in the sauce."],
 [/liver|hati|gizzard/,"Liver and gizzard are simmered in a red chilli sauce."],
 [/tempeh|tempe/,"Tempeh adds a nutty, fermented body."],
 [/tofu|tahu/,"Tofu soaks up the chilli."],
 [/potato|kentang/,"Fried potato cubes are coated in the chilli."],
 [/jackfruit/,"Young jackfruit is chopped and cooked into it."],
 [/pineapple|nanas/,"Pineapple brings juicy sweetness and acid."],
 [/papaya|pepaya/,"Papaya adds sweetness and soft texture."],
 [/strawberr/,"Strawberries from the highlands give a fruity, sour twist."],
 [/bitter melon|bitter gourd|pare|pegheau/,"Bitter melon adds a clean bitterness."],
 [/mushroom|jamur/,"Mushrooms give it an earthy, meaty texture."],
 [/jicama|bengkoang/,"Jicama adds crisp, watery sweetness."],
 [/tamarind|asam|asem/,"Tamarind gives it a fruity sourness."],
 [/kencur|cikur/,"Kencur, aromatic ginger, gives a fresh, camphor-like lift."],
 [/ginger|jahe/,"Ginger adds warmth and bite."],
 [/turmeric|kunyit/,"Turmeric colours it golden and adds an earthy note."],
 [/lemongrass|serai|sereh/,"Lemongrass gives a citrusy perfume."],
 [/basil|kemangi/,"Kemangi, lemon basil, adds a fresh, citrus-herb lift."],
 [/clove|cengkeh/,"Clove, the spice of North Maluku, gives a warm, numbing note."],
 [/lime|limau|jeruk/,"Local lime keeps it bright and sour."],
 [/sweet soy|kecap/,"Sweet soy sauce makes it glossy, dark and sweet."],
 [/salt/,"With so few ingredients, the chilli itself carries the flavour."],
 [/raw/,"Nothing is cooked, so the chilli stays sharp and fresh."]
];
function describeListed(s){
  const where = s.prov===ACROSS ? "made across Indonesia" : `recorded in ${PROV[s.prov][0]}`;
  const parts = (s.note||"").split(";").map(x=>x.trim()).filter(Boolean);
  // a note like "Banyuwangi; eggplant" carries a place first, then the ingredient
  let place="", ing=s.note||"";
  if(parts.length>1){ place=parts[0]; ing=parts.slice(1).join("; "); }
  else if(parts.length===1 && /^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(parts[0]) && !GLOSS.some(([re])=>re.test(parts[0].toLowerCase()))){ place=parts[0]; ing=""; }
  let txt = `${s.name} is a sambal ${where}${place?`, from ${place}`:""}.`;
  if(ing) txt += ` Its source names ${ing.charAt(0).toLowerCase()+ing.slice(1)} as what sets it apart.`;
  const seen=new Set(); const glosses=[];
  const hay=(s.name+" "+ing).toLowerCase();
  for(const [re,g] of GLOSS){ if(re.test(hay) && !seen.has(g) && glosses.length<1){ glosses.push(g); seen.add(g); } }
  if(glosses.length) txt += " "+glosses.join(" ");
  if(!ing && !glosses.length) txt += " Its source records the name and place but no recipe details.";
  return txt;
}
let artN=0;
function sambalArt(s, label){
  const L=LOOK[s.id]||(s._look||(s._look=autoLook(s))); const R=rng(s.id+s.name); const n=++artN;
  const base=L.b, dark=shade(base,-35), light=shade(base,30);
  let g=`<svg viewBox="0 0 200 200" class="art" role="img" aria-label="${label?label:"Illustration of "+s.name}">`;
  g+=`<defs><radialGradient id="st${n}" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#8a847b"/><stop offset="1" stop-color="#58524b"/></radialGradient>`+
     `<radialGradient id="bw${n}" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#4d4842"/><stop offset="1" stop-color="#3a3530"/></radialGradient>`+
     `<radialGradient id="sb${n}" cx="45%" cy="40%" r="60%"><stop offset="0" stop-color="${light}"/><stop offset=".7" stop-color="${base}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs>`;
  g+=`<circle cx="100" cy="104" r="95" fill="#00000022"/><circle cx="100" cy="100" r="94" fill="url(#st${n})"/>`;
  for(let i=0;i<46;i++){ const a=R()*Math.PI*2, d=78+R()*14; g+=`<circle cx="${(100+Math.cos(a)*d).toFixed(1)}" cy="${(100+Math.sin(a)*d).toFixed(1)}" r="${(0.6+R()*1.3).toFixed(1)}" fill="${R()<.5?"#a39d93":"#3f3a35"}"/>`; }
  g+=`<circle cx="100" cy="100" r="76" fill="url(#bw${n})"/>`;
  // sambal blob
  const pts=[], rad=L.thin?60:58;
  for(let i=0;i<14;i++){ const a=i/14*Math.PI*2; const d=rad+(R()-.5)*10; pts.push([100+Math.cos(a)*d,100+Math.sin(a)*d]); }
  let d=`M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for(let i=0;i<pts.length;i++){ const p=pts[(i+1)%pts.length], q=pts[i]; const mx=(q[0]+p[0])/2, my=(q[1]+p[1])/2; d+=`Q${q[0].toFixed(1)},${q[1].toFixed(1)} ${mx.toFixed(1)},${my.toFixed(1)}`; }
  if(L.pile){
    g+=`<path d="${d}Z" fill="${base}" opacity=".42"/><path d="${d}Z" fill="none" stroke="${light}" stroke-width="1.5" opacity=".5"/>`;
    g+=`<ellipse cx="80" cy="76" rx="30" ry="12" fill="#fff6c8" opacity=".22" transform="rotate(-25 80 76)"/><ellipse cx="128" cy="128" rx="12" ry="5" fill="#fff6c8" opacity=".18"/>`;
  } else g+=`<path d="${d}Z" fill="url(#sb${n})" ${L.thin?'opacity=".85"':''}/>`;
  // texture
  const tex=L.pile?0:L.smooth?40:90;
  for(let i=0;i<tex;i++){ const a=R()*Math.PI*2, rr=Math.sqrt(R())*52; const s2=L.smooth?(0.6+R()*1.2):(0.8+R()*2.2);
    g+=`<circle cx="${(100+Math.cos(a)*rr).toFixed(1)}" cy="${(100+Math.sin(a)*rr).toFixed(1)}" r="${s2.toFixed(1)}" fill="${R()<.5?dark:light}" opacity="${L.smooth?.5:.7}"/>`; }
  if(L.oil) g+=`<ellipse cx="82" cy="78" rx="26" ry="12" fill="#ffd27a" opacity=".22" transform="rotate(-25 82 78)"/><ellipse cx="124" cy="126" rx="10" ry="5" fill="#ffd27a" opacity=".18"/>`;
  // toppings
  const items=[]; for(const[k,c] of Object.entries(L.t)) for(let i=0;i<c;i++) items.push(k);
  items.sort(()=>R()-.5);
  for(const k of items){ const a=R()*Math.PI*2, rr=Math.sqrt(R())*(L.pile?50:46); g+=TOP[k]((100+Math.cos(a)*rr).toFixed(1),(100+Math.sin(a)*rr).toFixed(1),Math.round(R()*360)); }
  g+=`<ellipse cx="72" cy="58" rx="26" ry="9" fill="#ffffff" opacity=".08" transform="rotate(-30 72 58)"/>`;
  // ulekan (pestle) resting on the rim
  g+=`<g transform="rotate(-38 160 150)"><rect x="118" y="141" width="82" height="20" rx="10" fill="#6a645c"/><rect x="118" y="141" width="82" height="7" rx="3.5" fill="#8f897f"/><ellipse cx="124" cy="151" rx="11" ry="12" fill="#77716a"/></g>`;
  return g+`</svg>`;
}
