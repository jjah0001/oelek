"use strict";
// Public stars are opt-in; shelf data and notes never leave the browser.
const publicRatings={mode:"loading",client:null,totals:{},mine:{},busy:false,lastVote:0,active:null,message:""};
const RATING_WORDS=["","Not for me","It's OK","Good","Very good","Outstanding"];
function ratingStars(value){
  const stars=el("span",{class:"rating-stars","aria-hidden":"true"});
  for(let i=1;i<=5;i++){const star=el("span",{text:"★"});star.style.setProperty("--fill",Math.max(0,Math.min(1,value-i+1))*100+"%");stars.append(star);}return stars;
}
function ratingSummary(id,compact=false){
  const a=publicRatings.totals[id],host=el("span",{class:compact?"rating-badge":"rating-summary"});
  if(publicRatings.mode!=="ready")return host;
  if(!a?.n){if(!compact)host.textContent="Not rated yet";return host;}
  host.setAttribute("aria-label",`${a.avg.toFixed(1)} out of 5 from ${a.n} ratings`);
  host.append(ratingStars(a.avg),el("b",{text:a.avg.toFixed(1)}),el("span",{text:`${a.n} rating${a.n===1?"":"s"}`}));return host;
}
function refreshRatingUI(){
  document.querySelectorAll("[data-rating-id]").forEach(host=>host.replaceChildren(ratingSummary(host.dataset.ratingId,true)));
  if(publicRatings.active)paintPublicRatings(publicRatings.active);
}
function paintPublicRatings(s){
  publicRatings.active=s;
  $("#dRatingSummary").replaceChildren(ratingSummary(s.id));
  const host=$("#publicRatings");host.replaceChildren(el("h4",{text:"Rating"}));
  if(publicRatings.mode!=="ready"){
    host.append(el("p",{class:"rating-note",text:publicRatings.mode==="loading"?"Loading community ratings…":publicRatings.mode==="unconfigured"?"Community ratings are not connected yet. You can still keep a private rating on your shelf.":"Community ratings couldn't load. Your private shelf is still available."}));
    if(publicRatings.mode==="error")host.append(shelfButton("Try again",initPublicRatings));return;
  }
  const a=publicRatings.totals[s.id],mine=publicRatings.mine[s.id]||0;
  if(a?.n){
    host.append(ratingSummary(s.id));const bars=el("div",{class:"rating-bars","aria-label":"Rating distribution"});
    for(let n=5;n>=1;n--){const track=el("span",{class:"rating-track"});const fill=el("span");fill.style.width=(a.distribution[n-1]/a.n*100)+"%";track.append(fill);bars.append(el("div",{"aria-label":`${n} stars: ${a.distribution[n-1]} ratings`},el("span",{text:n+" ★"}),track,el("span",{text:a.distribution[n-1]})));}host.append(bars);
  }else host.append(el("p",{class:"rating-note",text:"Nobody has rated this sambal yet."}));
  const row=el("div",{class:"rating-yours"},el("span",{text:mine?"Your rating":"Tried it? Rate it"}));
  const group=el("div",{class:"rating-buttons",role:"group","aria-label":"Rate this sambal"});
  for(let n=1;n<=5;n++){
    const b=shelfButton("★",()=>submitPublicRating(s,n));b.className=n<=mine?"selected":"";
    b.setAttribute("aria-label",`${n} star${n===1?"":"s"} · ${RATING_WORDS[n]}`);b.setAttribute("aria-pressed",String(n===mine));b.dataset.stars=n;b.disabled=publicRatings.busy;group.append(b);
  }row.append(group);if(mine){const remove=shelfButton("Remove my rating",()=>submitPublicRating(s,0),"rating-remove");remove.disabled=publicRatings.busy;row.append(remove);}host.append(row);
  host.append(el("p",{class:"rating-note",text:"Shared publicly as stars only. No sign-up. One vote per anonymous browser session; choose another star to change it."}));
  host.append(el("p",{class:"rating-note",role:"status",text:publicRatings.busy?"Saving your rating…":publicRatings.message|| (mine?RATING_WORDS[mine]:"")}));
}
async function loadRatingTotals(){
  const {data,error}=await publicRatings.client.from("oelek_rating_totals").select("sambal_id,n,avg_stars,s1,s2,s3,s4,s5");if(error)throw error;
  const totals={};for(const row of data||[]){if(!Object.hasOwn(byId,row.sambal_id))continue;totals[row.sambal_id]={n:Number(row.n),avg:Number(row.avg_stars),distribution:[row.s1,row.s2,row.s3,row.s4,row.s5].map(Number)};}publicRatings.totals=totals;
}
async function loadOwnRatings(){
  const {data:{session},error}=await publicRatings.client.auth.getSession();if(error)throw error;
  if(!session){publicRatings.mine={};return;}
  const response=await publicRatings.client.from("oelek_ratings").select("sambal_id,stars").eq("user_id",session.user.id);if(response.error)throw response.error;
  publicRatings.mine=Object.fromEntries((response.data||[]).map(r=>[r.sambal_id,r.stars]));
}
let ratingsSDKPromise;
function loadRatingsSDK(){
  if(window.supabase)return Promise.resolve();
  if(!ratingsSDKPromise)ratingsSDKPromise=new Promise((resolve,reject)=>{
    const script=document.createElement("script");let timer=setTimeout(()=>finish(Error("SDK timeout")),15000);
    function finish(error){clearTimeout(timer);script.onload=script.onerror=null;if(error){script.remove();ratingsSDKPromise=null;reject(error);}else resolve();}
    script.src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js";script.onload=()=>finish();script.onerror=()=>finish(Error("SDK failed to load"));document.head.append(script);
  });return ratingsSDKPromise;
}
async function initPublicRatings(){
  publicRatings.mode="loading";refreshRatingUI();
  if(!RATINGS_CONFIG.supabaseUrl||!RATINGS_CONFIG.supabasePublishableKey){publicRatings.mode="unconfigured";refreshRatingUI();return;}
  try{
    await loadRatingsSDK();
    if(!publicRatings.client)publicRatings.client=window.supabase.createClient(RATINGS_CONFIG.supabaseUrl,RATINGS_CONFIG.supabasePublishableKey,{auth:{persistSession:true,autoRefreshToken:true,storageKey:"oelek.ratings.session"},global:{fetch:(url,options)=>fetch(url,{...options,signal:AbortSignal.timeout(15000)})}});
    await Promise.all([loadRatingTotals(),loadOwnRatings()]);publicRatings.mode="ready";
  }catch(e){publicRatings.mode="error";}
  refreshRatingUI();
}
async function submitPublicRating(s,stars){
  if(publicRatings.busy||publicRatings.mode!=="ready"||stars===(publicRatings.mine[s.id]||0))return;
  if(Date.now()-publicRatings.lastVote<4000){publicRatings.message="One moment, then try again.";paintPublicRatings(s);return;}
  publicRatings.busy=true;publicRatings.lastVote=Date.now();publicRatings.message="";paintPublicRatings(s);
  let saved=false;
  try{
    let {data:{session},error}=await publicRatings.client.auth.getSession();if(error)throw error;
    if(!session){const result=await publicRatings.client.auth.signInAnonymously();if(result.error)throw result.error;session=result.data.session;}
    if(!session)throw Error("No anonymous session");
    const result=await publicRatings.client.rpc("oelek_rate",{p_sambal:s.id,p_stars:stars});if(result.error)throw result.error;
    saved=true;
    if(stars)publicRatings.mine[s.id]=stars;else delete publicRatings.mine[s.id];
    publicRatings.message=stars?"Thank you. Your rating was saved.":"Your public rating was removed.";
    // Shelf ratings are private and independent: never publish them automatically.
    await loadRatingTotals();
  }catch(e){publicRatings.message=saved?"Your rating was saved, but the latest totals couldn't load. Reopen this page to refresh them.":/Too many ratings/.test(e.message||"")?"You've reached the hourly rating limit. Please try again later.":"Your rating couldn't be saved. Please try again. Your private shelf has not changed.";}
  finally{publicRatings.busy=false;refreshRatingUI();if(dlg.open&&publicRatings.active?.id===s.id){const focus=$("#publicRatings [data-stars='"+(stars||1)+"']");focus?.focus();}}
}
initPublicRatings();
