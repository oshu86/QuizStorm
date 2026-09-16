'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path'),cp=require('node:child_process'),os=require('node:os');
const here=__dirname;
const newSource=['effects.js','data.js','app.js'].map(f=>fs.readFileSync(path.join(here,'dist',f),'utf8')).join('\n');
const oldCommit='63359fd824f52b6e69e23a30ab90a8278fc72a46';
let gitCwd=here,tempGit=null;
try{cp.execFileSync('git',['rev-parse','--git-dir'],{cwd:here,stdio:'ignore'})}catch{
 const bundle=path.join(here,'..','QuizStorm-history.bundle');if(!fs.existsSync(bundle))throw Error('Git-historiken saknas: '+bundle);
 tempGit=fs.mkdtempSync(path.join(os.tmpdir(),'quizstorm-history-'));cp.execFileSync('git',['clone','-q',bundle,tempGit]);gitCwd=tempGit;
}
const oldSource=['effects.js','data.js','app.js'].map(f=>cp.execFileSync('git',['show',oldCommit+':dist/'+f],{cwd:gitCwd,encoding:'utf8',maxBuffer:20*1024*1024})).join('\n');
if(tempGit)fs.rmSync(tempGit,{recursive:true,force:true});
function makeRandom(seed0){let seed=seed0>>>0;return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
function context(source,seed=1,saved=null){
 const elements=new Map(),storage=new Map(saved?[['quizstorm-v01',saved]]:[]),random=makeRandom(seed);
 const el=s=>{if(!elements.has(s))elements.set(s,{innerHTML:'',textContent:'',value:'',style:{},open:false,classList:{add(){},remove(){},toggle(){}},showModal(){this.open=true},close(){this.open=false},addEventListener(){}});return elements.get(s)};
 const math=Object.create(Math);math.random=random;
 const ctx={console,Intl,Date,Math:math,JSON,Number,String,Set,Map,Array,Object,Error,AbortController,setTimeout:()=>0,clearTimeout(){},setInterval(){},document:{querySelector:el,querySelectorAll:()=>[],body:{classList:{add(){},remove(){},toggle(){}}},addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},assert,storage};
 vm.createContext(ctx);vm.runInContext(source,ctx);return ctx;
}
const expected={easy:[1,2,3,3,3],normal:[1,2,3,4,5],hard:[3,4,4,5,5]};
let games=0,boards=0;
for(const difficulty of ['easy','normal','hard']){
 for(let t=0;t<(difficulty==='normal'?334:333);t++){
  const c=context(newSource,10000+games);const run=s=>vm.runInContext(s,c);
  run(`settings.difficulty='${difficulty}';createGame();game.players[0].score=100;game.players[1].score=0;`);
  for(let r=1;r<=3;r++){
   const state=run(`({round:game.round,difficulty:game.difficulty,board:game.board.map(c=>({id:c.id,cells:c.cells.map(q=>({id:q.id,level:q.level,difficultyLevel:q.difficultyLevel,value:q.value}))}))})`);
   assert.equal(state.round,r);assert.equal(state.difficulty,difficulty);assert.equal(state.board.length,6);
   const ids=[];
   for(const col of state.board){assert.equal(col.cells.length,5);assert.equal(JSON.stringify(col.cells.map(q=>q.level)),JSON.stringify(expected[difficulty]));assert.equal(JSON.stringify(col.cells.map(q=>q.difficultyLevel)),JSON.stringify(expected[difficulty]));assert.equal(JSON.stringify(col.cells.map(q=>q.value)),JSON.stringify([100,200,300,400,500].map(v=>v*r)));ids.push(...col.cells.map(q=>q.id));}
   assert.equal(new Set(ids).size,30);boards++;
   run(`nextRound(true);`);
  }
  assert.equal(run(`game.phase`),'final');games++;
 }
}
assert.equal(games,1000);assert.equal(boards,3000);
// Normal must produce exactly the same boards as 0.8 for identical RNG state.
for(let t=0;t<100;t++){
 const seed=70000+t,old=context(oldSource,seed),neu=context(newSource,seed);
 vm.runInContext(`createGame();game.players[0].score=100;game.players[1].score=0;`,old);
 vm.runInContext(`settings.difficulty='normal';createGame();game.players[0].score=100;game.players[1].score=0;`,neu);
 for(let r=1;r<=3;r++){
  const pick=`JSON.stringify({round:game.round,doubleCell:game.doubleCell,board:game.board.map(c=>[c.id,c.cells.map(q=>[q.id,q.value])])})`;
  assert.equal(vm.runInContext(pick,neu),vm.runInContext(pick,old));
  vm.runInContext(`nextRound(true);`,old);vm.runInContext(`nextRound(true);`,neu);
 }
}
// Legacy 0.8 saves default to Normal without changing the saved board.
{
 const old=context(oldSource,991);vm.runInContext(`createGame();game.players[0].score=100;save();`,old);const saved=old.storage.get('quizstorm-v01'),before=JSON.parse(saved);
 const neu=context(newSource,123,saved),after=vm.runInContext(`JSON.parse(JSON.stringify(game))`,neu);
 assert.equal(after.difficulty,'normal');assert.equal(JSON.stringify(after.board),JSON.stringify(before.board));
}
// New difficulty survives reload unchanged.
{
 const a=context(newSource,992);vm.runInContext(`settings.difficulty='hard';createGame();save();`,a);const saved=a.storage.get('quizstorm-v01'),before=JSON.parse(saved);
 const b=context(newSource,77,saved),after=vm.runInContext(`JSON.parse(JSON.stringify(game))`,b);
 assert.equal(after.difficulty,'hard');assert.equal(JSON.stringify(after.board),JSON.stringify(before.board));
}
const result={games,boards,normalMatches08Games:100,legacy08SaveDefaultsToNormal:true,newDifficultyPersists:true};
fs.writeFileSync(path.join(here,'review','difficulty-validation.json'),JSON.stringify(result,null,2));
console.log('PASS '+JSON.stringify(result));
