// Vanilla adaptation of Magic UI Blur Fade and Magic Card, retrieved through its MCP.
// Content is visible by default, including when JavaScript or observation is unavailable.
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches && 'IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(!entry.isIntersecting)continue;entry.target.animate([{opacity:0,transform:'translateY(14px)',filter:'blur(4px)'},{opacity:1,transform:'translateY(0)',filter:'blur(0)'}],{duration:650,easing:'cubic-bezier(.22,1,.36,1)',fill:'none'});observer.unobserve(entry.target);}},{threshold:.12});
 document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
}
if(window.matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced.matches){
 document.querySelectorAll('.magic-card').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mouse-x',`${e.clientX-r.left}px`);card.style.setProperty('--mouse-y',`${e.clientY-r.top}px`);},{passive:true});});
}
