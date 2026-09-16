/* Decorative animation lifecycle is independent of game timers. */
(()=>{'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let scene=null,animations=[],resizeFrame=0;
 const random=(a,b)=>a+Math.random()*(b-a);
 function motion(el,frames,options){const a=el.animate(frames,options);animations.push(a);return a}
 function clear(){animations.forEach(a=>a.cancel());animations=[];scene?.querySelectorAll('.manifestation').forEach(el=>el.remove())}
 function build(){
  clear();if(!scene)return;
  const w=innerWidth,h=innerHeight;
  scene.querySelectorAll('.floater').forEach((el,i)=>{
   const size=el.getBoundingClientRect().width;
   const frames=Array.from({length:7},(_,j)=>({easing:'ease-in-out',transform:`translate(${random(0,Math.max(0,w-size))}px,${random(0,Math.max(0,h-size))}px) rotate(${random(-16,16)}deg)`,opacity:j===0||j===6?0:random(.25,.64),filter:`brightness(${j===3?1.7:1}) drop-shadow(0 0 ${j===3?10:0}px #dceaff)`}));
   frames[6]={...frames[0]};
   if(reduced.matches){Object.assign(el.style,frames[1]);return}
   el.style.opacity='';el.style.transform='';el.style.filter='';
   const a=motion(el,frames,{duration:random(150000,230000),iterations:Infinity,easing:'linear'});a.currentTime=i*15700+10000;
  });
  const panel=document.querySelector('.menu-config-panel').getBoundingClientRect();
  // Crossfade begins at 62% of panel width; growth continues through the fade.
  const size=Math.min(panel.width*.92,h*.76);
  [...scene.querySelectorAll('.menu-person')].forEach((source,i)=>{
   if(reduced.matches&&i>0)return;
   const el=document.createElement('div');el.className='manifestation';
   const x=Math.max(size*.48,Math.min(w-size*.48,panel.left+panel.width*.12+(i%2?panel.width*.62:0)));
   const y=Math.min(h-size*.45,Math.max(size*.5,panel.top+panel.height*(i%2?.55:.30)));
   Object.assign(el.style,{width:`${size}px`,height:`${size}px`,left:`${x-size/2}px`,top:`${y-size/2}px`});
   const portrait=source.cloneNode();portrait.className='manifest-portrait';portrait.removeAttribute('style');
   const mist=document.createElement('img');mist.className='manifest-mist';mist.alt='';mist.src=`assets/menu-live/mist-${i%6+1}.webp`;mist.draggable=false;
   el.append(portrait,mist);scene.append(el);
   if(reduced.matches){el.style.opacity='.35';el.style.transform='scale(.68)';return}
   const frames=[{offset:0,opacity:0,transform:'scale(.35) translateY(16px)'},{offset:.08,opacity:.68,transform:'scale(.53) translateY(6px)'},{offset:.15,opacity:.76,transform:'scale(.674) translateY(0)'},{offset:.23,opacity:.32,transform:'scale(.85) translateY(-8px)'},{offset:.30,opacity:0,transform:'scale(1) translateY(-16px)'},{offset:1,opacity:0,transform:'scale(1) translateY(-16px)'}];
   const a=motion(el,frames,{duration:120000,iterations:Infinity,easing:'linear'});a.currentTime=(120000-i*24000+9000)%120000;
  });sync();
 }
 const stars=document.createElement('div');stars.id='board-stars';stars.setAttribute('aria-hidden','true');
 // Stratified randomness spreads the field without a visible grid or dense clusters.
 // The supplied images include generous transparent margins around each light.
 for(let i=0;i<30;i++){
  const near=i%5===2,x=((i%6)+random(.18,.82))/6*100,y=(Math.floor(i/6)+random(.18,.82))/5*100;
  const el=document.createElement('span');el.className='distant-star'+(near?' near-star':'');
  el.style.cssText=`left:${x}%;top:${y}%;--size:${near?random(155,230):random(58,128)}px;--drift:${random(55,110)}s;--twinkle:${near?random(8,14):random(12,24)}s;--delay:-${random(0,100)}s;--star-opacity:${near?random(.6,.85):random(.22,.46)};--dx:${random(10,26)}px;--dy:${random(-23,-9)}px`;
  const img=document.createElement('img');img.src=`assets/stars/star-${1+Math.floor(random(0,4))}.png`;img.alt='';img.draggable=false;el.append(img);stars.append(el);
 }document.body.append(stars);
 function sync(){document.documentElement.classList.toggle('menu-motion-paused',document.hidden);animations.forEach(a=>document.hidden?a.pause():a.play())}
 function reconcile(){const next=document.querySelector('.menu-scene');if(next===scene)return;clear();scene=next;build()}
 new MutationObserver(reconcile).observe(document.getElementById('app'),{childList:true});
 document.addEventListener('visibilitychange',sync);
 window.addEventListener('pagehide',()=>{animations.forEach(a=>a.pause());document.documentElement.classList.add('menu-motion-paused')});window.addEventListener('pageshow',sync);
 window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(build)});
 reduced.addEventListener('change',build);reconcile();sync();
})();

