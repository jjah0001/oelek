const fs=require('fs'),vm=require('vm'),assert=require('assert');
class Element{constructor(){this.children=[];this.dataset={};this.style={setProperty(){}};}append(...x){this.children.push(...x)}replaceChildren(...x){this.children=x}setAttribute(){}focus(){}}
const nodes=new Map(),node=k=>{if(!nodes.has(k))nodes.set(k,new Element());return nodes.get(k)};
const context=vm.createContext({console,Date,Promise,Error,Number,Object,Math,AbortSignal,setTimeout,clearTimeout,byId:{test:{},other:{}},el:()=>new Element(),shelfButton:()=>new Element(),$:node,document:{querySelectorAll:()=>[]},window:{},dlg:{open:false},RATINGS_CONFIG:{},fetch:()=>{throw Error('Unexpected network request in unit test')}});
let source=fs.readFileSync(require('node:path').join(__dirname,'../js/ratings.js'),'utf8');source=source.replace(/initPublicRatings\(\);\s*$/,'');vm.runInContext(source,context);
(async()=>{
await vm.runInContext('initPublicRatings()',context);assert.equal(vm.runInContext('publicRatings.mode',context),'unconfigured');
let calls=0,fail=false,refreshFail=false,rows=[];
context.fake={auth:{getSession:async()=>({data:{session:{user:{id:'anonymous'}}}})},rpc:async(_,args)=>{calls++;if(fail)return {error:Error('network')};rows=args.p_stars?[{sambal_id:'test',n:1,avg_stars:args.p_stars,s1:0,s2:0,s3:0,s4:args.p_stars===4?1:0,s5:args.p_stars===5?1:0}]:[];return {};},from:()=>({select:async()=>refreshFail?{error:Error('offline')}:{data:rows}})};
vm.runInContext('publicRatings.client=fake;publicRatings.mode="ready"',context);
async function vote(n){vm.runInContext('publicRatings.lastVote=0',context);await vm.runInContext(`submitPublicRating({id:'test'},${n})`,context)}
await vote(5);assert.equal(vm.runInContext('publicRatings.mine.test',context),5);assert.equal(vm.runInContext('publicRatings.totals.test.avg',context),5);
await vote(4);assert.equal(vm.runInContext('publicRatings.mine.test',context),4);assert.equal(rows.length,1);
fail=true;await vote(5);assert.equal(vm.runInContext('publicRatings.mine.test',context),4);assert.equal(vm.runInContext('publicRatings.busy',context),false);
fail=false;refreshFail=true;await vote(5);assert.equal(vm.runInContext('publicRatings.mine.test',context),5);assert.match(vm.runInContext('publicRatings.message',context),/was saved/);
refreshFail=false;await vote(0);assert.equal(vm.runInContext('publicRatings.mine.test',context),undefined);assert.equal(rows.length,0);
vm.runInContext('publicRatings.lastVote=Date.now()',context);const before=calls;await vm.runInContext('submitPublicRating({id:"test"},4)',context);assert.equal(calls,before);
console.log('PASS: unconfigured state, submit, replace, delete, failed-write preservation, saved vote with failed totals refresh, cooldown.');
})().catch(e=>{console.error(e);process.exitCode=1});
