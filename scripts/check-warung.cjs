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
  const context={sessionStorage:{removeItem(){}},$:key=>{if(!nodes.has(key))nodes.set(key,node());return nodes.get(key);},el:()=>node(),matchMedia:()=>({matches:false}),setTimeout:fn=>timers.push(fn),clearTimeout(){}};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('js/warung.js','utf8'),context);
  const moveFor=t=>vm.runInContext(`warungMoveFor(${JSON.stringify(t)})`,context);
  assert.equal(moveFor('Coba sambal bawang ini, Nak!'),'offer');
  assert.equal(moveFor('Try this sambal matah.'),'offer');
  assert.equal(moveFor('Cabainya diulek dulu sampai halus.'),'grind');
  assert.equal(moveFor('Grind the chillies with a pinch of salt first.'),'grind');
  // Context: a short follow-up keeps the topic of the sentence before it, and only food is offered.
  const after=(t,p)=>vm.runInContext(`warungMoveFor(${JSON.stringify(t)},${JSON.stringify(p)})`,context);
  assert.equal(after('Coba ini, Nak, masih anget!','Sambal bawangnya baru jadi.'),'offer');
  assert.equal(after('Habis itu disiram minyak panas, biar wangi.','Cabainya diulek kasar.'),'gentle_grind');
  assert.equal(moveFor('Taste it and tell me if it needs more salt.'),'offer');
  assert.equal(moveFor('Try the gudeg too, it is sweet.'),'offer');
  assert.equal(moveFor('Coba tebak, Ibu umurnya berapa?'),'talk');
  assert.equal(moveFor('Coba ceritakan, kamu suka makan apa?'),'talk');
  assert.equal(moveFor('The heat here is terrible in the afternoon.'),'talk');
  assert.equal(moveFor('Selamat jalan, hati-hati di jalan ya, Nak!'),'greet');
  assert.equal(moveFor('Monggo, mampir dulu! Mau es teh?'),'greet');
  assert.equal(moveFor('Sambal terasi itu dari cabai dan terasi bakar.'),'gentle_grind');
  assert.equal(moveFor('Orang Jawa biasanya sarapan nasi pecel atau gudeg.'),'talk');
  // Her pose follows the sentence being typed, and she listens again when she has finished.
  const cook=()=>nodes.get('#warungCook');
  const seen=[];
  context.$('#warungCook'); const classes=new Set(); cook().classList={add:c=>classes.add(c),remove:c=>classes.delete(c)};
  const speech=vm.runInContext('warungSay("Selamat pagi, Nak. Coba sambal bawang ini!",false)',context);
  const look=()=>cook().dataset.movement+(classes.has('is-speaking')?'+mouth':'');
  seen.push(look());
  while(timers.length){ timers.shift()(); seen.push(look()); }
  await speech;
  assert.ok(seen.includes('talk+mouth')); assert.ok(seen.includes('offer'));
  assert.ok(seen.indexOf('talk+mouth')<seen.indexOf('offer'));
  // Her welcome opens with the greeting pose, and talking about sambal keeps her mouth moving while she grinds.
  const greetSeen=[]; const greeting=vm.runInContext('warungSay("Monggo, pinarak. Sambal terasi baru saja jadi.",false,true)',context);
  greetSeen.push(look()); while(timers.length){ timers.shift()(); greetSeen.push(look()); }
  await greeting;
  assert.equal(greetSeen[0],'greet+mouth'); assert.ok(greetSeen.includes('gentle_grind+mouth'));
  assert.equal(cook().dataset.movement,'rest'); assert.ok(!classes.has('is-speaking'));
  // She holds a speaking pose before taking the next one, and a gesture still waiting is made before she listens again.
  timers.length=0;
  vm.runInContext('warungMovement("talk",true); warungMovement("offer"); warungMovement("rest")',context);
  assert.equal(cook().dataset.movement,'talk');
  timers.shift()(); assert.equal(cook().dataset.movement,'offer');
  timers.shift()(); assert.equal(cook().dataset.movement,'rest');
  // A run of sambal sentences stays one grinding pose rather than flicking between the two.
  vm.runInContext('warungMovement("gentle_grind",true); warungHoldUntil=0; warungMovement("grind")',context);
  assert.equal(cook().dataset.movement,'gentle_grind');
  vm.runInContext('warungMovement("rest",true)',context); timers.length=0;
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
  console.log('Warung: plain-text replies, code-driven poses (talk, ulek, offer, greet), interrupted speech and reduced motion passed.');
}
main().catch(err=>{console.error(err);process.exitCode=1;});
