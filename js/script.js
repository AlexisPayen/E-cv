(function(){
var D=document,R=D.documentElement;
function $(s,c){return(c||D).querySelector(s)}
function $$(s,c){return[].slice.call((c||D).querySelectorAll(s))}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
/* Coordonnées encodées : absentes du HTML pour limiter le spam */
function dc(a,b){return atob(a+b)}
var AP=window.AP={e:function(){return dc('YWxleGlzcGF5ZW4yMD','A0QGdtYWlsLmNvbQ==')},p:function(){return dc('KzMzNjM3','NzgzODc0')},l:function(){return dc('MDYzNzc4','Mzg3NA==')},lf:function(){return this.l().replace(/(\d{2})(?=\d)/g,'$1 ')}};

var calm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(pointer:fine)').matches;

/* Année + adresses */
var y=$('#y');if(y)y.textContent=new Date().getFullYear();
$$('.addr').forEach(function(e){var a=(e.getAttribute('data-a')||'').trim();if(!a)return;
 e.textContent='📍 '+a+' ';var l=el('a');l.target='_blank';l.rel='noopener';l.textContent='Voir sur la carte';
 l.href='https://www.openstreetmap.org/search?query='+encodeURIComponent(a);e.appendChild(l)});

/* Thème (sombre par défaut) */
var saved;try{saved=localStorage.getItem('theme')}catch(e){}
R.setAttribute('data-theme',saved||'dark');
function toggleTheme(){var n=R.getAttribute('data-theme')==='dark'?'light':'dark';R.setAttribute('data-theme',n);try{localStorage.setItem('theme',n)}catch(e){}}
$('#theme').addEventListener('click',toggleTheme);

/* Toast */
var toast=el('div','toast');D.body.appendChild(toast);
function say(m){toast.textContent=m;toast.classList.add('on');clearTimeout(say.t);say.t=setTimeout(function(){toast.classList.remove('on')},2200)}

/* Barre de progression + halo souris */
var bar=el('div','progress');D.body.appendChild(bar);
addEventListener('scroll',function(){var h=R.scrollHeight-innerHeight;bar.style.width=(h>0?scrollY/h*100:0)+'%'},{passive:true});
if(fine&&!calm){var gl=el('div','glow');D.body.appendChild(gl);addEventListener('mousemove',function(e){gl.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'})}

/* Réseau de particules interactif */
if(!calm){var cv=el('canvas');cv.id='bg';D.body.prepend(cv);
 var cx=cv.getContext('2d'),W,H,P=[],m={x:-999,y:-999};
 function size(){W=cv.width=innerWidth;H=cv.height=innerHeight}
 size();addEventListener('resize',size);
 var N=Math.min(70,Math.floor(innerWidth/18));
 for(var i=0;i<N;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
 addEventListener('mousemove',function(e){m.x=e.clientX;m.y=e.clientY});
 (function loop(){cx.clearRect(0,0,W,H);
  var rgb=R.getAttribute('data-theme')==='dark'?'92,200,255':'20,71,125';
  P.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
   var dx=m.x-p.x,dy=m.y-p.y,d=Math.hypot(dx,dy);if(d<140){p.x-=dx*.01;p.y-=dy*.01}
   cx.fillStyle='rgba('+rgb+',.7)';cx.beginPath();cx.arc(p.x,p.y,1.6,0,6.3);cx.fill();
   for(var j=i+1;j<P.length;j++){var q=P[j],l=Math.hypot(p.x-q.x,p.y-q.y);
    if(l<120){cx.strokeStyle='rgba('+rgb+','+.25*(1-l/120)+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}
   if(d<160){cx.strokeStyle='rgba('+rgb+','+.5*(1-d/160)+')';cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(m.x,m.y);cx.stroke()}});
  requestAnimationFrame(loop)})()}

/* Accueil : salutation selon l'heure, machine à écrire, bandeau techno, chiffres */
var hero=$('.hero');
if(hero){
 var hr=new Date().getHours(),g=hr<6?'Bonne nuit':hr<12?'Bonjour':hr<18?'Bon après-midi':'Bonsoir';
 var hm=new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
 var tz=(Intl.DateTimeFormat().resolvedOptions().timeZone||'').replace(/_/g,' ');
 var h1=$('h1',hero);h1.parentNode.insertBefore(el('p','greet',g+' ! Vous consultez mon CV à <b>'+hm+'</b>'+(tz?', fuseau <b>'+tz+'</b>':'')+'.'),h1);
 var role=$('.role',hero),ph=['Développeur Front-End / Back-End','Flutter · Firebase · Symfony','Créateur d’applications web (PWA)','Disponible pour un CDI'],pi=0,ci=0,del=false;
 if(!calm)(function t(){var s=ph[pi];role.textContent=s.slice(0,ci);
  if(!del&&ci===s.length){del=true;return setTimeout(t,1800)}
  if(del&&ci===0){del=false;pi=(pi+1)%ph.length}
  ci+=del?-1:1;setTimeout(t,del?30:60)})();
 var techs=['HTML','CSS','JavaScript','Node.js','PHP','Symfony','MySQL','Firebase','Flutter','React','Dart','Python','Java','C++','Figma','WordPress','GitHub','Agile'];
 var mq=el('div','marq','<div>'+techs.concat(techs).map(function(t){return'<span>'+t+'</span>'}).join('')+'</div>');
 var st=el('section','','<div class="wrap"><h2>Mon parcours en chiffres</h2><div class="stats">'+[[3,'ans d’études','BUT Informatique, de 2022 à 2025','parcours.html'],[4,'expériences pro','Web, mobile et service civique','parcours.html'],[2,'applications en ligne','Des apps que tu peux ouvrir et tester','competences.html'],[17,'technologies','Front, back, mobile et design','competences.html']].map(function(s){return'<a class="card link-card" href="'+s[3]+'"><b data-n="'+s[0]+'">0</b><strong class="lbl">'+s[1]+'</strong><span class="small">'+s[2]+'</span></a>'}).join('')+'</div></div>');
 hero.after(mq);mq.after(st);
}
function count(b){var n=+b.getAttribute('data-n'),s=null;(function f(t){s=s||t;var p=Math.min((t-s)/1200,1);b.textContent=Math.round(n*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(performance.now())}
if(calm)$$('[data-n]').forEach(function(b){b.textContent=b.getAttribute('data-n')});

/* Apparition au scroll + inclinaison 3D */
if(!calm){
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var n=e.target;n.classList.add('in');io.unobserve(n);
  $$('[data-n]',n).forEach(count);setTimeout(function(){n.classList.remove('rv','in');n.style.transitionDelay=''},900)})},{threshold:.15});
 $$('.card,.timeline>li,.banner,h2,.contact,.marq,.page-head').forEach(function(n,i){n.classList.add('rv');n.style.transitionDelay=(i%4*70)+'ms';io.observe(n)});
}
if(fine&&!calm)$$('.card,.timeline>li,.portrait .frame').forEach(function(n){n.setAttribute('data-tilt','');
 n.addEventListener('mousemove',function(e){var r=n.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  n.style.transform='perspective(800px) rotateY('+x*8+'deg) rotateX('+-y*8+'deg)'});
 n.addEventListener('mouseleave',function(){n.style.transform=''})});

/* Widget : heure du visiteur / de n'importe quel pays + disponibilité d'Alexis + météo Calais */
var zones=[['Mon heure locale',''],['Paris – France','Europe/Paris'],['Montréal – Canada','America/Toronto'],['New York – USA','America/New_York'],['Los Angeles – USA','America/Los_Angeles'],['Dakar – Sénégal','Africa/Dakar'],['Dubaï – Émirats','Asia/Dubai'],['Tokyo – Japon','Asia/Tokyo'],['Sydney – Australie','Australia/Sydney']];
var live=el('aside','live','<button class="pill" type="button" aria-label="Afficher ou masquer l’horloge">🕒 <span class="pt"></span></button><div class="body"><div class="t"></div><select aria-label="Choisir un pays">'+zones.map(function(z){return'<option value="'+z[1]+'">'+z[0]+'</option>'}).join('')+'</select><p class="d small"></p><p class="av"></p><p class="wx small"></p></div>');
D.body.appendChild(live);
if(innerWidth<760)live.classList.add('min');
var sel=$('select',live),T=$('.t',live),PT=$('.pt',live),DD=$('.d',live),AV=$('.av',live),WX=$('.wx',live);
$('.pill',live).addEventListener('click',function(){live.classList.toggle('min')});
function tick(){var now=new Date(),z=sel.value||undefined;
 function f(tz,o){o.timeZone=tz;return new Intl.DateTimeFormat('fr-FR',o).format(now)}
 T.textContent=f(z,{hour:'2-digit',minute:'2-digit',second:'2-digit'});
 PT.textContent=f(z,{hour:'2-digit',minute:'2-digit'});
 DD.textContent=f(z,{weekday:'long',day:'numeric',month:'long'});
 var hp=(+f('Europe/Paris',{hour:'numeric',hour12:false}))%24,wd=f('Europe/Paris',{weekday:'short'}),hmp=f('Europe/Paris',{hour:'2-digit',minute:'2-digit'});
 var on=!/^(sam|dim)/.test(wd)&&hp>=9&&hp<19;
 AV.innerHTML=on?'🟢 Alexis est <b>probablement en ligne</b> (il est '+hmp+' à Paris).':'🌙 Alexis est <b>hors ligne</b> (il est '+hmp+' à Paris). Réponse sous 24 h.'}
tick();setInterval(tick,1000);
fetch('https://api.open-meteo.com/v1/forecast?latitude=50.95&longitude=1.86&current=temperature_2m,weather_code').then(function(r){return r.json()}).then(function(j){
 var c=j.current,w=c.weather_code,e=w===0?'☀️':w<4?'⛅':w<50?'🌫️':w<70?'🌧️':w<80?'❄️':w<83?'🌧️':w<87?'❄️':'⛈️';
 WX.textContent=e+' '+Math.round(c.temperature_2m)+' °C à Calais en ce moment'}).catch(function(){});

/* Palette de commandes (Ctrl + K) */
var acts=[['🏠 Accueil','index.html'],['🧭 Parcours','parcours.html'],['🚀 Projets','projets.html'],['🛠️ Compétences','competences.html'],['✉️ Contact','contact.html'],['📄 Télécharger le CV','assets/Cv.pdf'],
 ['📋 Copier mon e-mail',function(){navigator.clipboard.writeText(AP.e()).then(function(){say('E-mail copié ✔')})}],
 ['💼 LinkedIn','https://www.linkedin.com/in/alexis-payen-2b2b54290/'],['📱 Appli de réservation','https://pedadog-d5728.web.app/'],['🐕 Suivi de livret PédaDog','https://e-booking-a7637.web.app/'],['🌗 Changer de thème',toggleTheme]];
var pal=el('div','pal','<div><input placeholder="Aller à… (Ctrl + K)" aria-label="Recherche rapide"><ul></ul></div>');D.body.appendChild(pal);
var pin=$('input',pal),ul=$('ul',pal),sx=0,list=[];
function draw(){var q=pin.value.toLowerCase();list=acts.filter(function(a){return a[0].toLowerCase().indexOf(q)>-1});sx=Math.min(sx,Math.max(list.length-1,0));ul.innerHTML='';
 list.forEach(function(a,i){var li=el('li',i===sx?'on':'',a[0]);li.onclick=function(){run(a)};ul.appendChild(li)})}
function openP(){pal.classList.add('open');pin.value='';sx=0;draw();pin.focus()}
function closeP(){pal.classList.remove('open')}
function run(a){closeP();if(typeof a[1]==='function')a[1]();else if(/^http/.test(a[1]))window.open(a[1],'_blank','noopener');else location.href=a[1]}
addEventListener('keydown',function(e){var o=pal.classList.contains('open');
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();o?closeP():openP()}
 else if(o){if(e.key==='Escape')closeP();
  else if(e.key==='ArrowDown'){e.preventDefault();sx=Math.min(sx+1,list.length-1);draw()}
  else if(e.key==='ArrowUp'){e.preventDefault();sx=Math.max(sx-1,0);draw()}
  else if(e.key==='Enter'&&list[sx])run(list[sx])}});
pin.addEventListener('input',function(){sx=0;draw()});
pal.addEventListener('click',function(e){if(e.target===pal)closeP()});
var kb=el('button','kbtn','Ctrl K');kb.type='button';kb.setAttribute('aria-label','Ouvrir la recherche rapide');kb.onclick=openP;
$('nav').insertBefore(kb,$('#theme'));
})();