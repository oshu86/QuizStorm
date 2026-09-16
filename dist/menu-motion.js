/* Pause only decorative menu motion when the page is hidden. */
(()=>{const sync=()=>document.documentElement.classList.toggle('menu-motion-paused',document.hidden);document.addEventListener('visibilitychange',sync);window.addEventListener('pagehide',()=>document.documentElement.classList.add('menu-motion-paused'));window.addEventListener('pageshow',sync);sync()})();
