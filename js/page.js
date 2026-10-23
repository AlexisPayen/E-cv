function $(s,c){return(c||document).querySelector(s)}
function $$(s,c){return[].slice.call((c||document).querySelectorAll(s))}
/* Classeur de projets : onglets */
(function(){
var tabs=$$('.tabs [role=tab]');if(!tabs.length)return;
function sel(t,focus,keepHash){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;$('#'+x.getAttribute('aria-controls')).hidden=!on});
 if(focus)t.focus();if(!keepHash){try{history.replaceState(null,'','#'+t.dataset.h)}catch(e){}}}
tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t)});
 t.addEventListener('keydown',function(e){var k=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(k){e.preventDefault();sel(tabs[(i+k+tabs.length)%tabs.length],true)}})});
var h=location.hash.slice(1),f=tabs.filter(function(t){return t.dataset.h===h})[0];sel(f||tabs[0],false,true)})();
/* Compétences : explorateur */
(function(){
var sk=$$('.sk');if(!sk.length)return;
var pr=$$('.proj'),res=$('.res'),on={},hint='Clique sur une ou plusieurs technologies pour voir les projets concernés.';
res.textContent=hint;
sk.forEach(function(b){b.setAttribute('aria-pressed','false');b.addEventListener('click',function(){
 on[b.dataset.s]=!on[b.dataset.s];b.classList.toggle('on',on[b.dataset.s]);b.setAttribute('aria-pressed',on[b.dataset.s]);
 var sel=sk.filter(function(x){return on[x.dataset.s]});
 pr.forEach(function(p){var t=p.dataset.t.split(' ');p.classList.toggle('dim',sel.length>0&&!sel.some(function(x){return t.indexOf(x.dataset.s)>-1}))});
 var n=pr.filter(function(p){return!p.classList.contains('dim')}).length,names=sel.map(function(x){return x.textContent}).join(', ');
 res.textContent=!sel.length?hint:n?n+' projet'+(n>1?'s':'')+' avec '+names:'Aucun projet de cette page avec '+names+' (acquis en formation ou en outil).'})})})();