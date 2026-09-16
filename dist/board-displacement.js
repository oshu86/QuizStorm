/* A broad noise field slowly evolves with displacement capped at 17 CSS pixels.
   No random per-frame noise: continuous slow waves avoid shimmer and jitter. */
(()=>{'use strict';
 const ns='http://www.w3.org/2000/svg';
 const svg=document.createElementNS(ns,'svg');
 svg.classList.add('board-displacement-defs');svg.setAttribute('aria-hidden','true');
 svg.innerHTML='<defs><filter id="board-cloud-displacement" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.003 0.004" numOctaves="2" seed="17" result="cloudNoise"/><feDisplacementMap in="SourceGraphic" in2="cloudNoise" scale="22" xChannelSelector="R" yChannelSelector="G"/></filter></defs>';
 document.body.append(svg);
 const displacement=svg.querySelector('feDisplacementMap');
 const noise=svg.querySelector('feTurbulence');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let frame=0,last=null,elapsed=0,lastDraw=-Infinity,suspended=false;
 const active=()=>!suspended&&!document.hidden&&!reduced.matches&&document.body.classList.contains('board-atmosphere-active');
 function stop(){cancelAnimationFrame(frame);frame=0;last=null}
 function tick(now){
  frame=0;if(!active()){stop();return}
  if(last!==null)elapsed+=Math.min(now-last,100);last=now;
  // Bound filter updates to 30 fps while retaining a continuous phase.
  if(now-lastDraw>=1000/30){
   const t=elapsed/1000;
   displacement.setAttribute('scale',(22+8*Math.sin(t*Math.PI*2/29)+4*Math.sin(t*Math.PI*2/43)).toFixed(4));
   noise.setAttribute('baseFrequency',`${(.003+.00045*Math.sin(t*Math.PI*2/37)).toFixed(7)} ${(.004+.00055*Math.sin(t*Math.PI*2/47)).toFixed(7)}`);
   lastDraw=now;
  }
  frame=requestAnimationFrame(tick);
 }
 function sync(){if(active()){if(!frame)frame=requestAnimationFrame(tick)}else stop()}
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);
 window.addEventListener('pagehide',()=>{suspended=true;stop()});
 window.addEventListener('pageshow',()=>{suspended=false;sync()});sync();
})();
