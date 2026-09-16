'use strict';
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),cp=require('node:child_process'),path=require('node:path'),os=require('node:os');
const files=['effects.js','data.js','app.js'];const source=files.map(f=>fs.readFileSync(__dirname+'/dist/'+f,'utf8')).join('\n');
let seed=504;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
function context(saved=null,code=source){
 const elements=new Map(),storage=new Map(saved?[['quizstorm-v01',saved]]:[]);
 const el=s=>{if(!elements.has(s))elements.set(s,{innerHTML:'',textContent:'',value:'',style:{},open:false,classList:{add(){},remove(){},toggle(){}},showModal(){this.open=true},close(){this.open=false},addEventListener(){}});return elements.get(s)};
 const ctx={console,Intl,Date,Math:Object.assign(Object.create(Math),{random}),JSON,Number,String,Set,Map,Array,Object,Error,AbortController,setTimeout:()=>0,clearTimeout(){},setInterval(){},document:{querySelector:el,querySelectorAll:()=>[],body:{classList:{add(){},remove(){},toggle(){}}},addEventListener(){}},window:{addEventListener(){}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},assert,storage};
 vm.createContext(ctx);vm.runInContext(code,ctx);return ctx;
}
const c=context(),run=s=>vm.runInContext(s,c);
run(`globalThis.covered=new Set();globalThis.seenFinals=new Set();globalThis.swaps=0;
assert.equal(BANK.length,200);assert.equal(FINALS.length,120);assert.equal(new Set(ALL_CATEGORIES).size,200);
const all=BANK.flatMap(c=>c.levels.flat());assert.equal(all.length,5000);assert.equal(new Set(all.map(q=>q.id)).size,5000);assert.equal(new Set(all.map(q=>q.key)).size,5000);
for(const c of BANK){assert.equal(c.levels.length,5);for(const [l,p] of c.levels.entries()){assert.equal(p.length,5);assert(p.every(q=>q.level===l+1));}}
assert.equal(new Set([...all,...FINALS].map(q=>q.clue)).size,5120);
for(const q of [...all,...FINALS]){assert(/^(Vem|Vad|Vilka) är .+\\?$/.test(q.answer));assert(q.clue.endsWith('.'));assert(!/^(Vem|Vad|Vilka|Vilken|Hur|Varför)\\b/.test(q.clue));for(const a of q.aliases){const n=normalizeAnswer(a),t=normalizeAnswer(q.clue);assert(!(n.length>2?t.includes(n):(' '+t+' ').includes(' '+n+' ')),q.answer);assert.equal(answerKey(a),q.key)}}
assert.equal(answerKey('Vem är Tim Bergling?'),answerKey('Avicii'));assert.equal(answerKey('Odin'),answerKey('Oden'));assert.notEqual(answerKey('ål'),answerKey('al'));
for(let trial=0;trial<1000;trial++){
 createGame();game.players[0].score=1000;game.players[1].score=500;const seen=new Set(),cats=new Set();
 for(let r=1;r<=3;r++){
  assert.equal(game.round,r);assert.equal(game.board.length,6);assert(game.board.every(c=>!cats.has(c.id)));
  const initial=game.board.map(c=>c.id);
  for(let slot=0;slot<2;slot++){pickerIndex=slot;const choices=BANK.filter(c=>!game.usedCategories.includes(c.id)&&!game.board.some(b=>b.id===c.id));replaceCategory(shuffle(choices)[0].id);swaps++;}
  for(const id of [...initial,...game.board.map(c=>c.id)])cats.add(id);
  assert.equal(new Set(game.board.map(c=>c.id)).size,6);
  for(const col of game.board)for(const [l,q] of col.cells.entries()){assert.equal(q.value,(l+1)*100*r);assert(!seen.has(answerKey(q.answer)));seen.add(answerKey(q.answer));covered.add(q.id);}
  for(let ci=0;ci<6;ci++)for(let li=0;li<5;li++){openClue(ci,li);if(active.double){$('#double-bet').value='1';revealDouble()}noMoreAnswers();}
  const before=JSON.stringify(game.board);pickerIndex=0;replaceCategory(BANK.find(x=>!game.board.some(b=>b.id===x.id)).id);assert.equal(JSON.stringify(game.board),before);
  nextRound();
 }
 assert.equal(seen.size,90);assert.equal(game.phase,'final');assert(!seen.has(answerKey(game.final.question.answer)));seenFinals.add(game.final.question.id);
 $('#final-bet-0').value='10';$('#final-bet-1').value='10';lockFinalBets();endFinalThinking();gradeFinal(0,true);gradeFinal(1,false);finishFinal();assert.equal(game.phase,'result');assert.equal(game.players[0].score,1010);assert.equal(game.players[1].score,490);
}
assert.equal(covered.size,5000);assert.equal(seenFinals.size,120);`);
// Actual reinitialization with only the serialized localStorage value available.
for(const phase of ['board','active','final']){
 run(`createGame();game.players[0].score=100;if('${phase}'==='active'){game.doubleCell=29;openClue(0,0);selectRespondent(0)}if('${phase}'==='final')startFinal();save();`);
 const saved=c.storage.get('quizstorm-v01'),fresh=context(saved),before=JSON.parse(saved),after=vm.runInContext('JSON.parse(JSON.stringify(game))',fresh);
 assert.equal(JSON.stringify(after.board),JSON.stringify(before.board));assert.equal(JSON.stringify(after.final?.question),JSON.stringify(before.final?.question));assert.equal(after.active?.question?.id,before.active?.question?.id);assert.equal(after.active?.running||false,false);
}
let gitCwd=__dirname,tempGit=null;
try{cp.execFileSync('git',['rev-parse','--git-dir'],{cwd:__dirname,stdio:'ignore'})}catch{
 const bundle=path.join(__dirname,'..','QuizStorm-history.bundle');if(!fs.existsSync(bundle))throw Error('Git-historiken saknas: '+bundle);
 tempGit=fs.mkdtempSync(path.join(os.tmpdir(),'quizstorm-history-'));cp.execFileSync('git',['clone','-q',bundle,tempGit]);gitCwd=tempGit;
}
const old=files.map(f=>cp.execFileSync('git',['show','72dab6fc5fb25640839b4c3d20cec3a5f395c473:dist/'+f],{cwd:gitCwd,encoding:'utf8'})).join('\n');
if(tempGit)fs.rmSync(tempGit,{recursive:true,force:true});
for(const phase of ['board','active','final']){
 const original=context(null,old);vm.runInContext(`createGame();game.players[0].score=100;if('${phase}'==='active'){game.doubleCell=29;openClue(0,0);selectRespondent(0)}if('${phase}'==='final')startFinal();save();`,original);
 const saved=original.storage.get('quizstorm-v01'),before=JSON.parse(saved),fresh=context(saved),after=vm.runInContext('JSON.parse(JSON.stringify(game))',fresh);
 assert.equal(JSON.stringify(after.board.map(c=>c.cells.map(q=>[q.id,q.clue,q.answer,q.value]))),JSON.stringify(before.board.map(c=>c.cells.map(q=>[q.id,q.clue,q.answer,q.value]))));
 assert.equal(JSON.stringify(after.final?.question),JSON.stringify(before.final?.question));
 vm.runInContext(`active=null;game.phase='board';game.players[0].score=100;game.players[1].score=0;nextRound(true);assert(game.board.every(c=>!game.usedCategories.includes(c.id)));`,fresh);
}
// Repeated swaps must reserve six categories for each remaining round.
run(`createGame();game.players[0].score=100;
for(let r=1;r<=3;r++){
 assert.equal(game.board.length,6);
 for(const cat of BANK){pickerIndex=0;replaceCategory(cat.id)}
 const unseen=BANK.filter(c=>!game.usedCategories.includes(c.id)&&!game.roundCategories.includes(c.id));
 assert(unseen.length>=(3-r)*6);
 const before=JSON.stringify(game.board);
 if(r<3){assert.equal(unseen.length,(3-r)*6);replaceCategory(unseen[0].id);assert.equal(JSON.stringify(game.board),before)}
 nextRound(true);
}
assert.equal(game.phase,'final');`);
const result={games:1000,ordinaryPlayed:90000,categoryChanges:6000,ordinaryAlternativesObserved:5000,finalAlternativesObserved:120,reloadCases:6,legacySaveCompatibility:true,excessiveCategorySwaps:true};
fs.writeFileSync(__dirname+'/review/game-validation.json',JSON.stringify(result,null,2));console.log('PASS '+JSON.stringify(result));

