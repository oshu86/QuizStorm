const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let board=false,callback=null,observer,scale=22,id=0;
const events={},motion={matches:false,addEventListener:(_,fn)=>events.motion=fn};
const svg={classList:{add(){}},setAttribute(){},querySelector:name=>({setAttribute:(_,value)=>{if(name==='feDisplacementMap')scale=Number(value);else {const pair=value.split(' ').map(Number);assert(pair[0]>=.00255&&pair[0]<=.00345);assert(pair[1]>=.00345&&pair[1]<=.00455)}}})};
const ctx={Math,document:{hidden:false,createElementNS:()=>svg,body:{append(){},classList:{contains:()=>board}},addEventListener:(event,fn)=>events[event]=fn},window:{addEventListener:(event,fn)=>events[event]=fn},matchMedia:()=>motion,MutationObserver:class{constructor(fn){observer=fn}observe(){}},requestAnimationFrame:fn=>(callback=fn,++id),cancelAnimationFrame:()=>callback=null};
vm.runInNewContext(fs.readFileSync(__dirname+'/dist/board-displacement.js','utf8'),ctx);
assert.equal(callback,null,'No work in menu');board=true;observer();assert(callback);
let previous=scale,min=Infinity,max=-Infinity;
for(let time=0;time<200000;time+=34){const next=callback;assert(next);next(time);assert(scale>=10&&scale<=34);assert(Math.abs(scale-previous)<.1,'No abrupt displacement jump');previous=scale;min=Math.min(min,scale);max=Math.max(max,scale)}
assert(max-min>15,'Background changes over time');
ctx.document.hidden=true;events.visibilitychange();assert.equal(callback,null);
ctx.document.hidden=false;events.visibilitychange();assert(callback);callback(900000);assert.equal(scale,previous,'Hidden time must not jump the phase');
motion.matches=true;events.motion();assert.equal(callback,null);motion.matches=false;events.motion();assert(callback);
events.pagehide();assert.equal(callback,null);events.pageshow();assert(callback);
board=false;observer();assert.equal(callback,null);
const css=fs.readFileSync(__dirname+'/dist/atmosphere.css','utf8');
assert(css.includes('body.board-atmosphere-active .backdrop{inset:-24px;filter:url(#board-cloud-displacement)}'));
assert(css.includes('body.board-atmosphere-active .backdrop{filter:none;inset:0}'));
const html=fs.readFileSync(__dirname+'/dist/index.html','utf8');assert(html.includes('src="board-displacement.js" defer'));
console.log('PASS: smooth bounded displacement over 200 seconds; inactive/hidden/reduced-motion/page lifecycle; background-only filter and script inclusion.');
const children=[];
const element=()=>({style:{},setAttribute(){},append(...nodes){this.children.push(...nodes)},children:[]});
vm.runInNewContext(fs.readFileSync(__dirname+'/dist/menu-motion.js','utf8'),{
 Math,matchMedia:()=>motion,document:{hidden:false,createElement:element,body:{append:el=>children.push(el)},documentElement:{classList:{toggle(){}}},querySelector:()=>null,getElementById:()=>({}),addEventListener(){}},window:{addEventListener(){}},MutationObserver:class{observe(){}},requestAnimationFrame(){},cancelAnimationFrame(){}
});
const stars=children[0];assert.equal(stars.id,'board-stars');assert.equal(stars.children.length,30);
assert.equal(stars.children.filter(el=>el.className.includes('near-star')).length,6);
for(const star of stars.children){assert(fs.existsSync(__dirname+'/dist/'+star.children[0].src));assert(star.style.cssText.includes('--star-opacity:'))}
console.log('PASS: 30 randomized stars, six nearer stars, and valid local image paths.');
