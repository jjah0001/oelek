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
  // Claude only writes her words, as plain text; no JSON or movement is asked for.
  const ok=await reply('Nasi pecel, Mas! Monggo dicoba sambalnya.');
  assert.deepEqual(await ok.json(),{reply:'Nasi pecel, Mas! Monggo dicoba sambalnya.'});
  assert.equal(ok.headers.get('cache-control'),'no-store');
  assert.equal(sent.model,'existing-model');
  assert.equal(sent.output_config,undefined);
  assert.doesNotMatch(sent.system,/gentle_grind|JSON/);
  assert.deepEqual(await (await reply('Bu Lastri: Gudeg, Nak.')).json(),{reply:'Gudeg, Nak.'});
  assert.deepEqual(await (await reply('{"reply":"Soto","movement":"rest"}')).json(),{reply:'Soto'});
  assert.equal((await reply('')).status,502);
  assert.equal((await reply('{"reply":42}')).status,502);

  const nodes=new Map(), timers=[];
  function node(){return {dataset:{},classList:{add(){},remove(){}},append(){},replaceChildren(){},addEventListener(){},remove(){}};}
  const context={sessionStorage:{removeItem(){}},$:key=>{if(!nodes.has(key))nodes.set(key,node());return nodes.get(key);},el:()=>node(),matchMedia:()=>({matches:false}),setTimeout:fn=>timers.push(fn)};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('js/warung.js','utf8'),context);
  const moveFor=t=>vm.runInContext(`warungMoveFor(${JSON.stringify(t)})`,context);
  assert.equal(moveFor('Coba sambal bawang ini, Nak!'),'grind');
  assert.equal(moveFor('Try this sambal matah.'),'grind');
  assert.equal(moveFor('Sambal terasi itu dari cabai dan terasi bakar.'),'gentle_grind');
  assert.equal(moveFor('Orang Jawa biasanya sarapan nasi pecel atau gudeg.'),'talk');
  // Her pose follows the sentence being typed, and she listens again when she has finished.
  const cook=()=>nodes.get('#warungCook');
  const seen=[];
  context.$('#warungCook'); const classes=new Set(); cook().classList={add:c=>classes.add(c),remove:c=>classes.delete(c)};
  const speech=vm.runInContext('warungSay("Selamat pagi, Nak. Coba sambal bawang ini!",false)',context);
  seen.push(classes.has('is-speaking')?'talk':cook().dataset.movement);
  while(timers.length){ timers.shift()(); seen.push(classes.has('is-speaking')?'talk':cook().dataset.movement); }
  await speech;
  assert.ok(seen.includes('talk')); assert.ok(seen.includes('grind'));
  assert.ok(seen.indexOf('talk')<seen.indexOf('grind'));
  assert.equal(cook().dataset.movement,'rest'); assert.ok(!classes.has('is-speaking'));
  // A reset interrupts an old reply that is still typing.
  const old=vm.runInContext('warungSay("An old reply that is still typing about sambal",false)',context);
  const next=vm.runInContext('warungSay("New visit",false)',context);
  while(timers.length)timers.shift()();
  await Promise.all([old,next]);
  context.matchMedia=()=>({matches:true});
  await vm.runInContext('warungSay("Reduced motion sambal",false)',context);
  assert.equal(cook().dataset.movement,'rest');
  assert.equal(timers.length,0);
  assert.equal(vm.runInContext('warungResponse({reply:" Legacy ",movement:"grind"})',context),'Legacy');
  assert.equal(vm.runInContext('warungResponse("Plain")',context),'Plain');
  console.log('Warung: plain-text replies, code-driven ulek and talking poses, interrupted speech and reduced motion passed.');
}
main().catch(err=>{console.error(err);process.exitCode=1;});
