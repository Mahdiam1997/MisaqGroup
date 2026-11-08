(()=>{'use strict';
const header=document.querySelector('.site-header');
const nav=document.querySelector('.main-nav');
const toggle=document.querySelector('.menu-toggle');
const progress=document.querySelector('.reading-progress');
const topLink=document.querySelector('.back-to-top');
const links=[...document.querySelectorAll('.nav-link')];
const sections=[...document.querySelectorAll('main section[id]')];
function closeNav(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','باز کردن منو');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'بستن منو':'باز کردن منو');});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeNav();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeNav();});
let ticking=false;
function updateScroll(){const y=window.scrollY;header.classList.toggle('scrolled',y>12);topLink.classList.toggle('visible',y>500);const total=document.documentElement.scrollHeight-innerHeight;progress.style.width=(total>0?Math.min(100,y/total*100):0)+'%';ticking=false;}
window.addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(updateScroll);ticking=true;}},{passive:true});updateScroll();
if('IntersectionObserver'in window){const reveal=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}})},{threshold:.08,rootMargin:'0px 0px -28px 0px'});document.querySelectorAll('.reveal').forEach(el=>reveal.observe(el));const active=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){links.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+e.target.id));}})},{rootMargin:'-25% 0px -64% 0px'});sections.forEach(s=>active.observe(s));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
document.getElementById('year').textContent=new Intl.NumberFormat('fa-IR',{useGrouping:false}).format(new Date().getFullYear());
})();