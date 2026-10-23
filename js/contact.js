(function(){
var D=document;
function $(s,c){return(c||D).querySelector(s)}
function dc(a,b){return atob(a+b)}
var AP={e:function(){return dc('YWxleGlzcGF5ZW4yMD','A0QGdtYWlsLmNvbQ==')},p:function(){return dc('KzMzNjM3','NzgzODc0')},l:function(){return dc('MDYzNzc4','Mzg3NA==')}};
AP.lf=function(){return AP.l().replace(/(\d{2})(?=\d)/g,'$1 ')};
var T=$('.toast');if(!T){T=D.createElement('div');T.className='toast';D.body.appendChild(T)}
function say(m){T.textContent=m;T.classList.add('on');clearTimeout(say.t);say.t=setTimeout(function(){T.classList.remove('on')},2200)}
function copy(t){if(navigator.clipboard&&window.isSecureContext)return navigator.clipboard.writeText(t);
 return new Promise(function(ok,ko){var x=D.createElement('textarea');x.value=t;x.style.cssText='position:fixed;opacity:0';D.body.appendChild(x);x.select();
  try{D.execCommand('copy')?ok():ko()}catch(e){ko(e)}x.remove()})}
var shown={},last='';
D.addEventListener('click',function(e){var b=e.target.closest('[data-act]');if(!b)return;var a=b.dataset.act,k=b.dataset.k;
 if(a==='show'){var t=$('[data-v="'+k+'"]');shown[k]=!shown[k];t.textContent=shown[k]?(k==='e'?AP.e():AP.lf()):t.dataset.m;b.textContent=shown[k]?'Masquer':'Afficher'}
 else if(a==='call')location.href='tel:'+AP.p();
 else if(a==='copy')copy(k==='e'?AP.e():AP.l()).then(function(){say('Copié ✔')},function(){say('Copie impossible')});
 else if(a==='copymsg')copy(last).then(function(){say('Message copié ✔')},function(){say('Copie impossible')});});
function paris(){var n=new Date(),f=function(o){o.timeZone='Europe/Paris';return new Intl.DateTimeFormat('fr-FR',o).format(n)};
 var h=(+f({hour:'numeric',hour12:false}))%24,on=!/^(sam|dim)/.test(f({weekday:'short'}))&&h>=9&&h<19,c=$('#cs');
 if(c)c.innerHTML=(on?'🟢 <b>En ligne</b> maintenant':'🌙 <b>Hors ligne</b> pour le moment')+' · '+f({hour:'2-digit',minute:'2-digit'})+' à Paris'}
paris();setInterval(paris,30000);
var F=$('#ct-form');
if(F)F.addEventListener('submit',function(e){e.preventDefault();var d=new FormData(F),nom=String(d.get('nom')).trim(),em=String(d.get('email')).trim(),
 sub=d.get('objet')+' – '+nom,body=String(d.get('message')).trim()+'\n\n— '+nom+' ('+em+')';
 last='À : '+AP.e()+'\nObjet : '+sub+'\n\n'+body;$('#ct-res').classList.add('on');
 $('#ct-gm').href='https://mail.google.com/mail/?view=cm&fs=1&to='+encodeURIComponent(AP.e())+'&su='+encodeURIComponent(sub)+'&body='+encodeURIComponent(body);
 location.href='mailto:'+AP.e()+'?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(body)});
})();