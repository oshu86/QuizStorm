'use strict';
// Original synthesized tones and lightweight particle effects; no media downloads.
const QuizEffects=(()=>{
 let enabled=true,context=null,voices=new Set(),stopCelebration=null;
 try{enabled=localStorage.getItem('quizstorm-sound')!=='off'}catch{}
 function unlock(){if(!enabled)return;try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;context ||= new Audio();if(context.state==='suspended')void context.resume().catch(()=>{});}catch{}}
 function silence(){for(const osc of voices){try{osc.stop()}catch{}}voices.clear()}
 function toggle(){enabled=!enabled;try{localStorage.setItem('quizstorm-sound',enabled?'on':'off')}catch{}if(enabled)unlock();else silence();document.querySelectorAll('[data-sound-toggle]').forEach(b=>{b.textContent=enabled?'Ljud på':'Ljud av';b.setAttribute('aria-pressed',String(enabled))})}
 function tone(freq,at,duration,volume,type='sine'){
  if(!enabled||!context||context.state!=='running')return;
  try{const o=context.createOscillator(),g=context.createGain(),t=context.currentTime+at;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(volume,t+.018);g.gain.exponentialRampToValueAtTime(.0001,t+duration);o.connect(g);g.connect(context.destination);voices.add(o);o.onended=()=>{voices.delete(o);o.disconnect();g.disconnect()};o.start(t);o.stop(t+duration+.02)}catch{}
 }
 function wrong(){unlock();tone(185,0,.18,.08,'triangle');tone(130,.14,.28,.07,'triangle')}
 function fanfare(){unlock();[523.25,659.25,783.99,1046.5].forEach((f,i)=>tone(f,i*.23,.38,.075,'triangle'));[523.25,659.25,783.99,1046.5].forEach(f=>tone(f,1.05,1.35,.035,'sine'))}
 function celebrate(kind,done=()=>{},host=document.body){
  stopCelebration?.();
  const seconds=kind==='double'?2.6:4.5;
  if(kind==='double')fanfare();
  // Unsupported rendering never blocks the game.
  if(!window.requestAnimationFrame||!document.createElement){done();return}
  let canvas,ctx;
  try{canvas=document.createElement('canvas');ctx=canvas.getContext('2d');if(!ctx){done();return}canvas.className='fireworks';canvas.setAttribute('aria-hidden','true');host.appendChild(canvas)}catch{done();return}
  const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  let frame=0,finished=false,particles=[],next=0,w=0,h=0;
  const start=performance.now(),colors=['#ffffff','#beb4ff','#8cbcff','#dcd5ff'];
  function resize(){const rect=host===document.body?{width:window.innerWidth,height:window.innerHeight}:host.getBoundingClientRect();w=rect.width;h=rect.height;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)}
  function finish(){if(finished)return;finished=true;window.cancelAnimationFrame(frame);clearTimeout(fallback);canvas.remove();window.removeEventListener('resize',resize);if(stopCelebration===finish)stopCelebration=null;done()}
  function burst(){const x=w*(Math.random()<.5?.12+Math.random()*.17:.71+Math.random()*.17),y=h*(.12+Math.random()*.5),count=reduced?12:42;for(let i=0;i<count;i++){const angle=Math.PI*2*i/count,speed=reduced?12:35+Math.random()*85;particles.push({x,y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,life:1.2,max:1.2,color:colors[i%colors.length]})}}
  let last=start;
  function tick(now){const elapsed=(now-start)/1000,dt=Math.min((now-last)/1000,.04);last=now;if(elapsed>=seconds){finish();return}ctx.clearRect(0,0,w,h);if(elapsed>=next&&elapsed<seconds-1){burst();next=elapsed+(reduced?1:.42)}particles=particles.filter(p=>p.life>0);for(const p of particles){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(reduced?0:28)*dt;ctx.globalAlpha=Math.max(0,p.life/p.max)*.8;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,reduced?1.8:2.2,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;frame=window.requestAnimationFrame(tick)}
  const fallback=setTimeout(finish,seconds*1000+300);stopCelebration=finish;resize();window.addEventListener('resize',resize);frame=window.requestAnimationFrame(tick);
 }
 function stop(){stopCelebration?.();silence()}
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 window.addEventListener('pagehide',stop);
 return {unlock,wrong,celebrate,toggle,stop,get enabled(){return enabled}};
})();
