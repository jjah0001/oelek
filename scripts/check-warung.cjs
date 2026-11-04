const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

async function main(){
  let upstream, sent;
  const worker = {Response, Intl, URL, fetch: async (_url, options)=>{
    sent=JSON.parse(options.body);
    return new Response(JSON.stringify({content:[{type:'text',text:upstream}]}));
  }};
  vm.createContext(worker);
  vm.runInContext(fs.readFileSync('worker/worker.js','utf8').replace('export default {','const handler = {'),worker);
  async function reply(value){
    upstream=value;
    return vm.runInContext('warung({messages:[{role:"user",content:"How do I grind sambal?"}]},{headers:new Headers()}, {ANTHROPIC_MODEL:"existing-model"}, "*")',Object.assign(worker,{Headers}));
  }
  for(const movement of ['grind','gentle_grind','rest']){
    const res=await reply(JSON.stringify({reply:'Monggo!',movement}));
    assert.deepEqual(await res.json(),{reply:'Monggo!',movement});
    assert.equal(res.headers.get('cache-control'),'no-store');
    assert.equal(sent.model,'existing-model');
    assert.match(sent.system,/gentle_grind/);
  }
  assert.equal((await (await reply('{"reply":"Hello","movement":"bad-css"}')).json()).movement,'gentle_grind');
  assert.equal((await reply('not JSON')).status,502);
  assert.equal((await reply('{"reply":42}')).status,502);

  const nodes=new Map(), timers=[];
  function node(){return {dataset:{},classList:{add(){}},append(){},replaceChildren(){},addEventListener(){},remove(){}};}
  const context={sessionStorage:{removeItem(){}},$:key=>{if(!nodes.has(key))nodes.set(key,node());return nodes.get(key);},el:()=>node(),matchMedia:()=>({matches:false}),setTimeout:fn=>timers.push(fn)};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('js/warung.js','utf8'),context);
  const speech=vm.runInContext('warungSay("A warm welcome",false,"grind")',context);
  assert.equal(nodes.get('#warungCook').dataset.movement,'grind');
  while(timers.length)timers.shift()();
  await speech;
  assert.equal(nodes.get('#warungCook').dataset.movement,'rest');
  const old=vm.runInContext('warungSay("An old reply that is still typing",false,"grind")',context);
  const next=vm.runInContext('warungSay("New visit",false,"gentle_grind")',context);
  timers.shift()();
  assert.equal(nodes.get('#warungCook').dataset.movement,'gentle_grind');
  while(timers.length)timers.shift()();
  await Promise.all([old,next]);
  context.matchMedia=()=>({matches:true});
  await vm.runInContext('warungSay("Reduced motion",false,"grind")',context);
  assert.equal(nodes.get('#warungCook').dataset.movement,'rest');
  assert.equal(timers.length,0);
  assert.equal(vm.runInContext('warungResponse({reply:"Legacy response"}).movement',context),'gentle_grind');
  console.log('Warung: response validation, model preservation, movement lifecycle, interrupted speech and reduced motion passed.');
}
main().catch(err=>{console.error(err);process.exitCode=1;});
