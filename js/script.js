(function(){
var y=document.getElementById('y');if(y)y.textContent=new Date().getFullYear();
document.querySelectorAll('.addr').forEach(function(e){
  var a=(e.getAttribute('data-a')||'').trim();if(!a)return;
  e.textContent='📍 '+a+' ';
  var l=document.createElement('a');l.target='_blank';l.rel='noopener';l.textContent='Voir sur la carte';
  l.href='https://www.openstreetmap.org/search?query='+encodeURIComponent(a);e.appendChild(l);
});
var root=document.documentElement,btn=document.getElementById('theme');
try{var s=localStorage.getItem('theme');if(s)root.setAttribute('data-theme',s);}catch(e){}
btn.addEventListener('click',function(){
  var dark=root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
  var n=dark?'light':'dark';root.setAttribute('data-theme',n);
  try{localStorage.setItem('theme',n);}catch(e){}
});
})();