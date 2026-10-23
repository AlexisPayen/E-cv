(function(){
function $(s,c){return(c||document).querySelector(s)}
function $$(s,c){return[].slice.call((c||document).querySelectorAll(s))}
/* Parcours : filtres + alternance gauche/droite */
var zig=$('.zig');
if(zig){var items=$$('.zi',zig),fb=$$('.fbtn');
 function lay(){var k=0;items.forEach(function(li){if(!li.hidden){li.classList.toggle('r',k%2===1);k++}})}
 fb.forEach(function(b){b.addEventListener('click',function(){
  fb.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
  items.forEach(function(li){li.hidden=!(b.dataset.f==='all'||li.dataset.c===b.dataset.f)});lay()})});
 lay()}
/* Compétences : cliquer une techno surligne les projets concernés */
var sk=$$('.sk');
if(sk.length){var pr=$$('.proj'),res=$('.res'),on={};
 var hint='Clique sur une ou plusieurs technologies pour voir les projets concernés.';
 res.textContent=hint;
 sk.forEach(function(b){b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){
  on[b.dataset.s]=!on[b.dataset.s];b.classList.toggle('on',on[b.dataset.s]);b.setAttribute('aria-pressed',on[b.dataset.s]);
  var sel=sk.filter(function(x){return on[x.dataset.s]});
  pr.forEach(function(p){var t=p.dataset.t.split(' ');
   p.classList.toggle('dim',sel.length>0&&!sel.some(function(x){return t.indexOf(x.dataset.s)>-1}))});
  var n=pr.filter(function(p){return!p.classList.contains('dim')}).length,names=sel.map(function(x){return x.textContent}).join(', ');
  res.textContent=!sel.length?hint:n?n+' projet'+(n>1?'s':'')+' avec '+names:'Aucun projet de cette page avec '+names+' (acquis en formation ou en outil).'})})}
})();
/* Contact */
(function(){
var g=function(i){return document.getElementById(i)};
if(!g('cs')||!window.AP)return;
var AP=window.AP,T=document.querySelector('.toast');
function say(m){if(!T)return;T.textContent=m;T.classList.add('on');clearTimeout(say.t);say.t=setTimeout(function(){T.classList.remove('on')},2200)}
[].forEach.call(document.querySelectorAll('[data-act]'),function(b){b.addEventListener('click',function(){
 var a=b.dataset.act,k=b.dataset.k;
 if(a==='show'){document.querySelector('[data-show="'+k+'"]').textContent=AP[k]();b.disabled=true;b.textContent='Affiché ✔'}
 else if(a==='mail')location.href='mailto:'+AP.e();
 else if(a==='call')location.href='tel:'+AP.p();
 else navigator.clipboard.writeText(AP[k]()).then(function(){say('Copié ✔')},function(){say('Copie impossible')})})});
function paris(){var n=new Date(),f=function(o){o.timeZone='Europe/Paris';return new Intl.DateTimeFormat('fr-FR',o).format(n)};
 var h=(+f({hour:'numeric',hour12:false}))%24,on=!/^(sam|dim)/.test(f({weekday:'short'}))&&h>=9&&h<19;
 g('cs').innerHTML=(on?'🟢 <b>En ligne</b> maintenant':'🌙 <b>Hors ligne</b> pour le moment')+' · il est '+f({hour:'2-digit',minute:'2-digit'})+' à Paris'}
paris();setInterval(paris,30000);
g('vcard').addEventListener('click',function(){
 var v='BEGIN:VCARD\r\nVERSION:3.0\r\nFN:Alexis Payen\r\nN:Payen;Alexis;;;\r\nTITLE:Développeur Front-End / Back-End\r\nTEL;TYPE=CELL:'+AP.p()+'\r\nEMAIL:'+AP.e()+'\r\nURL:https://alexispayen.github.io/E-cv/\r\nEND:VCARD';
 var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([v],{type:'text/vcard'}));a.download='Alexis-Payen.vcf';a.click();say('Contact téléchargé ✔')});
g('form').addEventListener('submit',function(e){e.preventDefault();var f=e.target,d=function(n){return f.elements[n].value.trim()};
 location.href='mailto:'+AP.e()+'?subject='+encodeURIComponent(d('objet')+' – '+d('nom'))+'&body='+encodeURIComponent(d('message')+'\n\n— '+d('nom')+' ('+d('email')+')')});
})();