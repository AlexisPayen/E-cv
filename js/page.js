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
/* Projets : démos en direct + mini-démos */
(function(){
function $(s,c){return(c||document).querySelector(s)}
function $$(s,c){return[].slice.call((c||document).querySelectorAll(s))}
$$('[data-load]').forEach(function(b){b.addEventListener('click',function(){
 var p=b.closest('.phone'),f=document.createElement('iframe');f.src=b.dataset.load;f.title='Démo de l’application';f.loading='lazy';p.appendChild(f);$('.scr',p).remove()})});
var ql=$('#ql');
if(ql){var q=[],n=0;
 var rq=function(){var m=+$('#qm').value;ql.innerHTML='';
  if(!q.length){ql.innerHTML='<li><span class="small">La file est vide.</span></li>'}
  q.forEach(function(x,i){var li=document.createElement('li'),a=document.createElement('span'),b=document.createElement('span');
   a.textContent=(i+1)+'. '+x;b.className='small';b.textContent=i?'≈ '+i*m+' min':'à vous !';li.appendChild(a);li.appendChild(b);ql.appendChild(li)});
  $('#qi').textContent=q.length+' personne'+(q.length>1?'s':'')+' en attente'};
 $('#qa').onclick=function(){var i=$('#qn');if(q.length<8){q.push(i.value.trim()||'Client '+(++n));i.value=''}rq()};
 $('#qs').onclick=function(){q.shift();rq()};$('#qm').onchange=rq;
 $('#qn').addEventListener('keydown',function(e){if(e.key==='Enter')$('#qa').click()});rq()}
var ot=$$('#otp input');
if(ot.length){var ck=function(){var v=ot.map(function(i){return i.value}).join('');$('#oi').textContent=v.length===4?'✔ Code complet (démo : aucune vérification)':'Tape ou colle un code.'};
 ot.forEach(function(i,k){
  i.addEventListener('input',function(){i.value=i.value.replace(/\D/g,'').slice(-1);if(i.value&&ot[k+1])ot[k+1].focus();ck()});
  i.addEventListener('keydown',function(e){if(e.key==='Backspace'&&!i.value&&ot[k-1]){ot[k-1].focus();ot[k-1].value='';ck()}});
  i.addEventListener('paste',function(e){var t=(e.clipboardData.getData('text')||'').replace(/\D/g,'').slice(0,4);if(!t)return;e.preventDefault();
   ot.forEach(function(x,j){x.value=t[j]||''});ot[Math.min(t.length,3)].focus();ck()})})}
})();