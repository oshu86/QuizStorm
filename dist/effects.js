'use strict';
// QuizStorm local soundtrack engine. Custom user-provided music plus local game cues; no streaming or external dependencies.
const QuizEffects=(()=>{
 let enabled=true,context=null,stopCelebration=null,media={};
 try{enabled=localStorage.getItem('quizstorm-sound')!=='off'}catch{}
 const mediaFiles={menu:'assets/audio/menu-music.mp3',launch:'assets/audio/game-launch.mp3',intro:'assets/audio/round-intro.mp3',roundEnd:'assets/audio/round-end.mp3',thinking30:'assets/audio/final-thinking-30.mp3',thinking45:'assets/audio/final-thinking-45.mp3',thinking60:'assets/audio/final-thinking-60.mp3',winner:'assets/audio/winner-loop.mp3',wrong:'assets/audio/wrong-answer.mp3',double:'assets/audio/double-fanfare.mp3',scramble:'assets/audio/scramble.mp3',level:'assets/audio/level-select.mp3'};
 let activeThinking=null;
 function getAudio(name){
  if(media[name])return media[name];
  try{const A=window.Audio;if(typeof A!=='function')return null;const a=new A(mediaFiles[name]);a.preload='auto';a.playsInline=true;media[name]=a;return a}catch{return null}
 }
 function unlock(){if(!enabled)return;try{const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return;context ||= new AudioCtx();if(context.state==='suspended')void context.resume().catch(()=>{});}catch{}}
 function pauseMedia(name,reset=false){const a=media[name];if(!a)return;try{a.pause();if(reset)a.currentTime=0}catch{}}
 function stopPersistent(reset=true){for(const name of ['thinking30','thinking45','thinking60'])pauseMedia(name,reset);activeThinking=null;pauseMedia('menu',reset);pauseMedia('launch',true);pauseMedia('winner',reset);pauseMedia('intro',true);pauseMedia('roundEnd',true);pauseMedia('wrong',true);pauseMedia('double',true);pauseMedia('scramble',true);pauseMedia('level',true);if(stopCelebration){const stop=stopCelebration;stopCelebration=null;stop()}}
 function toggle(){enabled=!enabled;try{localStorage.setItem('quizstorm-sound',enabled?'on':'off')}catch{}if(enabled)unlock();else for(const name of Object.keys(media))pauseMedia(name,false);document.querySelectorAll('[data-sound-toggle]').forEach(b=>{b.textContent=enabled?'Ljud på':'Ljud av';b.setAttribute('aria-pressed',String(enabled))})}
 function playMedia(name,{loop=false,restart=true,volume=.45}={}){if(!enabled)return;unlock();const a=getAudio(name);if(!a)return;try{a.loop=loop;a.volume=volume;if(restart)a.currentTime=0;const p=a.play();if(p?.catch)p.catch(()=>{})}catch{}}
 function levelSelect(){playMedia('level',{volume:.42})}
 function wrong(){playMedia('wrong',{volume:.62})}
 function fanfare(){playMedia('double',{volume:.60})}
 function scramble(){playMedia('scramble',{volume:.58})}
 function menuMusic(restart=false){pauseMedia('winner',false);playMedia('menu',{loop:true,restart,volume:.32})}
 function stopMenu(reset=true){pauseMedia('menu',reset)}
 function gameLaunch(){stopMenu(true);pauseMedia('roundEnd',true);pauseMedia('intro',true);playMedia('launch',{volume:.58})}
 function roundIntro(){stopMenu(true);pauseMedia('launch',true);pauseMedia('roundEnd',true);playMedia('intro',{volume:.38})}
 function roundEnd(){pauseMedia('launch',true);pauseMedia('intro',true);playMedia('roundEnd',{volume:.48})}
 function thinkingName(seconds){return seconds>=60?'thinking60':seconds>=45?'thinking45':'thinking30'}
 function startFinalThinking(seconds=45,restart=false){pauseMedia('winner',false);const name=thinkingName(seconds);if(activeThinking&&activeThinking!==name)pauseMedia(activeThinking,true);activeThinking=name;playMedia(name,{loop:false,restart,volume:.36})}
 function pauseFinalThinking(){if(activeThinking)pauseMedia(activeThinking,false)}
 function stopFinalThinking(){for(const name of ['thinking30','thinking45','thinking60'])pauseMedia(name,true);activeThinking=null}
 function celebrate(kind,done=()=>{},host=document.body){
  if(stopCelebration){const stop=stopCelebration;stopCelebration=null;stop()}
  const continuous=kind==='winner',seconds=kind==='double'?4.85:continuous?Infinity:4.5;
  if(kind==='double')fanfare();
  if(continuous){stopFinalThinking();playMedia('winner',{loop:true,restart:true,volume:.42})}
  // Unsupported rendering never blocks the game.
  if(!window.requestAnimationFrame||!document.createElement){if(!continuous)done();return}
  let canvas,ctx;
  try{canvas=document.createElement('canvas');ctx=canvas.getContext('2d');if(!ctx){if(!continuous)done();return}canvas.className='fireworks';canvas.setAttribute('aria-hidden','true');host.appendChild(canvas)}catch{if(!continuous)done();return}
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let frame=0,finished=false,particles=[],next=0,w=0,h=0;
  const start=performance.now(),colors=['#ffffff','#beb4ff','#8cbcff','#dcd5ff'];
  function resize(){const rect=host===document.body?{width:window.innerWidth,height:window.innerHeight}:host.getBoundingClientRect();w=rect.width;h=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function finish(){if(finished)return;finished=true;window.cancelAnimationFrame(frame);if(fallback)clearTimeout(fallback);canvas.remove();window.removeEventListener('resize',resize);if(continuous)pauseMedia('winner',true);if(stopCelebration===finish)stopCelebration=null;done()}
  function burst(){const x=w*(Math.random()<.5?.12+Math.random()*.17:.71+Math.random()*.17),y=h*(.12+Math.random()*.5),count=reduced?12:42;for(let i=0;i<count;i++){const angle=Math.PI*2*i/count,speed=reduced?12:35+Math.random()*85;particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1.2,max:1.2,color:colors[i%colors.length]})}}
  let last=start;
  function tick(now){const elapsed=(now-start)/1000,dt=Math.min((now-last)/1000,.04);last=now;if(!continuous&&elapsed>=seconds){finish();return}ctx.clearRect(0,0,w,h);if(elapsed>=next&&(continuous||elapsed<seconds-1)){burst();next=elapsed+(reduced?1:.42)}particles=particles.filter(p=>p.life>0);for(const p of particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(reduced?0:28)*dt;ctx.globalAlpha=Math.max(0,p.life/p.max)*.8;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,reduced?1.8:2.2,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;frame=window.requestAnimationFrame(tick)}
  const fallback=continuous?null:setTimeout(finish,seconds*1000+300);stopCelebration=finish;resize();window.addEventListener('resize',resize);frame=window.requestAnimationFrame(tick);
 }
 function stopWinner(){if(stopCelebration){const stop=stopCelebration;stopCelebration=null;stop()}else pauseMedia('winner',true)}
 function stop(){if(stopCelebration){const stop=stopCelebration;stopCelebration=null;stop()}for(const name of ['thinking30','thinking45','thinking60'])pauseMedia(name,false);pauseMedia('menu',false);pauseMedia('launch',true);pauseMedia('intro',true);pauseMedia('roundEnd',true);pauseMedia('winner',false);pauseMedia('wrong',true);pauseMedia('double',true);pauseMedia('scramble',true);pauseMedia('level',true)}
 getAudio('level'); // Small local cue preloads before the first tile press.
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 window.addEventListener('pagehide',stop);
 return {unlock,levelSelect,wrong,scramble,menuMusic,stopMenu,gameLaunch,roundIntro,roundEnd,startFinalThinking,pauseFinalThinking,stopFinalThinking,celebrate,stopWinner,stopPersistent,toggle,stop,get enabled(){return enabled}};
})();
