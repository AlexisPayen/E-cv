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