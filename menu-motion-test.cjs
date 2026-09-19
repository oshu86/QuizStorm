const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const code=fs.readFileSync(__dirname+'/dist/menu-motion.js','utf8');
function harness(seed=1){
 const events={},all=[],body=[],floaters=[],slots=[],sources=[];let observer,queued;
 const rng=Object.create(Math);rng.random=()=>{seed=(seed*1664525+1013904223)>>>0;return seed/4294967296};
 function el(){return {children:[],style:{},src:'',setAttribute(){},removeAttribute(){},append(...items){this.children.push(...items)},remove(){const i=slots.indexOf(this);if(i>=0)slots.splice(i,1)},getBoundingClientRect:()=>({width:70}),cloneNode(){const n=el();n.src=this.src;return n},animate(frames,options){const a={frames,options,currentTime:0,cancelled:false,paused:false,cancel(){this.cancelled=true},pause(){this.paused=true},play(){this.paused=false}};all.push(a);this.animation=a;return a}}}
 for(let i=0;i<11;i++)floaters.push(el());for(const name of ['elon','mozart','saladin','einstein','astrid']){const e=el();e.src=name;sources.push(e)}
 const scene={querySelectorAll:s=>s==='.floater'?floaters:s==='.menu-person'?sources:slots.slice(),append:e=>slots.push(e),getBoundingClientRect:()=>({height:800})};
 const motion={matches:false,addEventListener:(n,f)=>events.motion=f};
 const context={Math:rng,innerWidth:390,innerHeight:844,matchMedia:()=>motion,document:{hidden:false,createElement:el,createElementNS:el,body:{append:e=>body.push(e)},documentElement:{classList:{toggle(){},add(){}}},querySelector:s=>s==='.menu-scene'?scene:{getBoundingClientRect:()=>({width:350,left:20,top:230,height:600})},getElementById:()=>({}),addEventListener:(n,f)=>events[n]=f},window:{scrollY:0,addEventListener:(n,f)=>events[n]=f},MutationObserver:class{constructor(f){observer=f}observe(){}},requestAnimationFrame:f=>(queued=f,1),cancelAnimationFrame(){queued=null}};
 vm.runInNewContext(code,context);
 return {context,events,all,slots,motion,observer,flush:()=>{if(queued){const f=queued;queued=null;f()}}};
}
const h=harness();assert.equal(h.slots.length,2);assert.equal(h.all.length,13);
const original=h.all.slice();original.forEach(a=>a.currentTime=12345);
for(const height of [740,690,844,760,844]){h.context.innerHeight=height;h.context.window.scrollY+=50;h.events.resize();h.flush()}
assert.equal(h.all.length,13);assert(original.every(a=>!a.cancelled&&a.currentTime===12345),'Scroll/toolbar resize must preserve every animation');
h.context.innerWidth=844;h.events.resize();h.flush();assert.equal(h.all.length,13);assert(original.every(a=>!a.cancelled&&a.currentTime===12345),'Rotation must preserve phase');
h.observer();assert.equal(h.all.length,13,'Unchanged scene must not rebuild');
const sequence=h.slots.map(e=>e.children[0].src);
for(let i=0;i<18;i++){const slot=h.slots[i%2];slot.animation.onfinish();sequence.push(slot.children[0].src)}
for(let i=1;i<sequence.length;i++)assert.notEqual(sequence[i],sequence[i-1]);
for(let i=0;i<sequence.length;i+=5)assert.equal(new Set(sequence.slice(i,i+5)).size,5,'Every shuffled bag contains all five people');
assert(h.slots.every(s=>s.animation.options.delay===12000));
h.context.document.hidden=true;h.events.visibilitychange();assert(h.all.filter(a=>!a.cancelled).every(a=>a.paused));
h.context.document.hidden=false;h.events.visibilitychange();assert(h.all.filter(a=>!a.cancelled).every(a=>!a.paused));
h.motion.matches=true;h.events.motion();assert.equal(h.slots.length,1);assert(h.all.every(a=>a.cancelled));
const firsts=new Set();for(let seed=1;seed<31;seed++)firsts.add(harness(seed).slots[0].children[0].src);assert(firsts.size>=4,'First person must vary between visits');
console.log('PASS: shuffled portrait bags, varying first person, no adjacent repeats, transparent swaps, scroll/rotation preserve animation objects and phase, hidden-tab pause and reduced motion.');

