/* Decorative animation lifecycle is independent of game timers. */
(()=>{'use strict';
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let scene=null,animations=[],resizeFrame=0,portraitSlots=[],bag=[],lastPortrait=null,layoutWidth=0;
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.setAttribute('class','portrait-color-defs');svg.setAttribute('aria-hidden','true');
 svg.innerHTML='<defs><filter id="portrait-night-palette" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues=".025 .10 .22 .52 .96"/><feFuncG type="table" tableValues=".02 .055 .12 .22 .55"/><feFuncB type="table" tableValues=".15 .35 .62 .82 .90"/></feComponentTransfer></filter></defs>';
 document.body.append(svg);
 function nextPortrait(){
  if(!bag.length){bag=[...scene.querySelectorAll('.menu-person')];for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]}
   if(bag.length>1&&bag[0].src===lastPortrait){const j=1+Math.floor(Math.random()*(bag.length-1));[bag[0],bag[j]]=[bag[j],bag[0]]}}
  const source=bag.shift();lastPortrait=source.src;return source;
 }
 function layoutPortraits(){
  if(!scene)return;layoutWidth=innerWidth;
  const panel=document.querySelector('.menu-config-panel').getBoundingClientRect();
  const h=scene.getBoundingClientRect().height||innerHeight,w=innerWidth,size=Math.min(panel.width*.92,h*.76);
  portraitSlots.forEach(({el},i)=>{const x=Math.max(size*.48,Math.min(w-size*.48,panel.left+panel.width*.12+(i%2?panel.width*.62:0)));
   const y=Math.min(h-size*.45,Math.max(size*.5,panel.top+window.scrollY+panel.height*(i%2?.55:.30)));
   Object.assign(el.style,{width:size+'px',height:size+'px',left:(x-size/2)+'px',top:(y-size/2)+'px'});
  });
 }
 const random=(a,b)=>a+Math.random()*(b-a);
 function motion(el,frames,options){const a=el.animate(frames,options);animations.push(a);return a}
 function clear(){animations.forEach(a=>{a.onfinish=null;a.cancel()});animations=[];portraitSlots=[];bag=[];scene?.querySelectorAll('.manifestation').forEach(el=>el.remove())}
 function build(){
  clear();if(!scene)return;
  
  scene.querySelectorAll('.floater').forEach((el,i)=>{
   
   const frames=Array.from({length:7},(_,j)=>({easing:'ease-in-out',transform:`translate(calc((100vw - clamp(52px,8vw,120px)) * ${random(0,1)}),calc((100svh - clamp(52px,8vw,120px)) * ${random(0,1)})) rotate(${random(-16,16)}deg)`,opacity:j===0||j===6?0:random(.25,.64),filter:`brightness(${j===3?1.7:1}) drop-shadow(0 0 ${j===3?10:0}px #dceaff)`}));
   frames[6]={...frames[0]};
   if(reduced.matches){Object.assign(el.style,frames[1]);return}
   el.style.opacity='';el.style.transform='';el.style.filter='';
   const a=motion(el,frames,{duration:random(150000,230000),iterations:Infinity,easing:'linear'});a.currentTime=i*15700+10000;
  });
  // Two overlapping slots; swap images only while their slot is fully transparent.
  const frames=[{offset:0,opacity:0,transform:'scale(.35) translateY(16px)'},{offset:8/30,opacity:.68,transform:'scale(.53) translateY(6px)'},{offset:.5,opacity:.76,transform:'scale(.674) translateY(0)'},{offset:23/30,opacity:.32,transform:'scale(.85) translateY(-8px)'},{offset:1,opacity:0,transform:'scale(1) translateY(-16px)'}];
  for(let i=0;i<(reduced.matches?1:2);i++){
   const el=document.createElement('div');el.className='manifestation';
   const portrait=nextPortrait().cloneNode();portrait.className='manifest-portrait';portrait.removeAttribute('style');
   const mist=document.createElement('img');mist.className='manifest-mist';mist.alt='';mist.src='assets/menu-live/mist-'+(i+1)+'.webp';mist.draggable=false;
   el.append(portrait,mist);scene.append(el);portraitSlots.push({el,portrait});
   if(reduced.matches){el.style.opacity='.35';el.style.transform='scale(.68)';continue}
   function schedule(delay,initial=false){
    if(!initial)portrait.src=nextPortrait().src;
    const a=motion(el,frames,{duration:36000,delay,fill:'both',easing:'linear'});
    if(initial&&i===0)a.currentTime=9000;
    a.onfinish=()=>{animations=animations.filter(item=>item!==a);a.onfinish=null;a.cancel();schedule(12000)};
    if(document.hidden)a.pause();
   }
   schedule(i===0?0:15000,true);
  }
  layoutPortraits();sync();
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
 // Safari toolbar/keyboard height changes during scroll must never recreate animations.
 window.addEventListener('resize',()=>{if(innerWidth===layoutWidth)return;cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(layoutPortraits)});
 reduced.addEventListener('change',build);reconcile();sync();
})();

