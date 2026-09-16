const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
let animation,timeout,removed=0;const listeners={},audio=[];
const drawing={setTransform(){},clearRect(){},beginPath(){},arc(){},fill(){}};
const host={appendChild(){},getBoundingClientRect:()=>({width:600,height:400})};
class AudioContext{state='running';currentTime=0;destination={};resume(){return Promise.resolve()}}
class Audio{constructor(src){this.src=src;this.currentTime=0;this.loop=false;this.volume=1;this.paused=true;this.plays=0;this.pauses=0;audio.push(this)}play(){this.paused=false;this.plays++;return Promise.resolve()}pause(){this.paused=true;this.pauses++}}
const c={window:{AudioContext,Audio,innerWidth:390,innerHeight:844,requestAnimationFrame:f=>(animation=f,1),cancelAnimationFrame(){},matchMedia:()=>({matches:false}),addEventListener(){},removeEventListener(){}},document:{body:host,createElement:()=>({getContext:()=>drawing,setAttribute(){},remove(){removed++}}),addEventListener:(e,f)=>listeners[e]=f,querySelectorAll:()=>[],hidden:false},localStorage:{getItem:()=>null,setItem(){}},performance:{now:()=>0},setTimeout:f=>(timeout=f,1),clearTimeout(){},assert};
vm.createContext(c);vm.runInContext(fs.readFileSync(__dirname+'/dist/effects.js','utf8'),c);

const files=['menu-music.mp3','game-launch.mp3','round-intro.mp3','round-end.mp3','final-thinking-30.mp3','final-thinking-45.mp3','final-thinking-60.mp3','winner-loop.mp3','wrong-answer.mp3','double-fanfare.mp3','scramble.mp3'];
for(const name of files){const p=path.join(__dirname,'dist/assets/audio',name);assert(fs.existsSync(p),`missing ${name}`);assert(fs.statSync(p).size>10000,`${name} unexpectedly small`)}
vm.runInContext("let finished=0;QuizEffects.unlock();QuizEffects.menuMusic(true);QuizEffects.gameLaunch();QuizEffects.roundIntro();QuizEffects.wrong();QuizEffects.scramble();QuizEffects.startFinalThinking(45,true);QuizEffects.pauseFinalThinking();QuizEffects.startFinalThinking(45,false);QuizEffects.celebrate('double',()=>finished++,document.body);assert.equal(finished,0)",c);
const menu=audio.find(a=>a.src.includes('menu-music.mp3'));assert(menu&&menu.loop&&menu.plays===1&&menu.pauses>=1);
const launch=audio.find(a=>a.src.includes('game-launch.mp3'));assert(launch&&launch.plays===1&&launch.pauses>=1);
const intro=audio.find(a=>a.src.includes('round-intro.mp3'));assert(intro&&intro.plays===1);
const wrong=audio.find(a=>a.src.includes('wrong-answer.mp3'));assert(wrong&&wrong.plays===1&&!wrong.loop);
const scramble=audio.find(a=>a.src.includes('scramble.mp3'));assert(scramble&&scramble.plays===1&&!scramble.loop);
const thinking45=audio.find(a=>a.src.includes('final-thinking-45.mp3'));assert(thinking45&&!thinking45.loop&&thinking45.plays===2&&thinking45.pauses>=1);
vm.runInContext('QuizEffects.stopFinalThinking();QuizEffects.startFinalThinking(30,true)',c);
const thinking30=audio.find(a=>a.src.includes('final-thinking-30.mp3'));assert(thinking30&&thinking30.plays===1&&!thinking30.loop);
vm.runInContext('QuizEffects.stopFinalThinking();QuizEffects.startFinalThinking(60,true)',c);
const thinking60=audio.find(a=>a.src.includes('final-thinking-60.mp3'));assert(thinking60&&thinking60.plays===1&&!thinking60.loop);
const dbl=audio.find(a=>a.src.includes('double-fanfare.mp3'));assert(dbl&&dbl.plays===1);
animation(100);animation(5000);vm.runInContext('assert.equal(finished,1)',c);assert.equal(removed,1);timeout();vm.runInContext('assert.equal(finished,1);QuizEffects.toggle();assert(!QuizEffects.enabled)',c);
const beforeWrong=wrong.plays;vm.runInContext('QuizEffects.wrong()',c);assert.equal(wrong.plays,beforeWrong);
vm.runInContext("QuizEffects.toggle();QuizEffects.celebrate('winner',()=>finished++)",c);const winner=audio.find(a=>a.src.includes('winner-loop.mp3'));assert(winner&&winner.loop&&winner.plays===1);
c.document.hidden=true;listeners.visibilitychange();vm.runInContext('assert.equal(finished,2)',c);assert.equal(removed,2);assert(winner.paused);
console.log('PASS: custom menu/start/round/final soundtrack, 30/45/60 final selection, deep horn wrong cue, HQ scramble, custom double/round/winner cues and continuous winner cleanup.');

// New selection cue uses the shared mute and cleanup paths.
const level=audio.find(a=>a.src.includes('level-select.mp3'));assert(level);vm.runInContext('QuizEffects.levelSelect()',c);assert.equal(level.plays,1);assert(!level.loop);vm.runInContext('QuizEffects.toggle();QuizEffects.levelSelect()',c);assert.equal(level.plays,1);assert(level.paused);vm.runInContext('QuizEffects.toggle();QuizEffects.levelSelect();QuizEffects.stopPersistent()',c);assert.equal(level.plays,2);assert(level.paused);assert.equal(level.currentTime,0);vm.runInContext('QuizEffects.levelSelect();QuizEffects.stop()',c);assert(level.paused);console.log('PASS: level-selection cue plays once, respects mute, and is stopped on cleanup.');
