

// Paste your deployed Apps Script web app URL (ends in /exec):
var API_URL='https://script.google.com/macros/s/AKfycbxMun-Fna-RxUCNmpq4UCYDo__MLCeeb2FPsOIWy76b6n7_ac6248hD3PQJOWreW4t4/exec';
(function(){
var $=function(s){return document.querySelector(s)},$$=function(s){return Array.prototype.slice.call(document.querySelectorAll(s))};
var menu=$('#menu'),burger=$('#burger');
burger.onclick=function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
$$('[data-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();var t=document.getElementById(a.dataset.go);if(t){t.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}menu.classList.remove('open');burger.setAttribute('aria-expanded','false')})});
// Countdown (Fri 11 Dec 2026, 3:00 PM WAT = 14:00 UTC)
var target=Date.parse('2026-12-11T15:00:00+01:00'),cd=$('#count');
function tick(){var s=Math.max(0,Math.floor((target-Date.now())/1000)),p=[['Days',86400],['Hours',3600],['Minutes',60],['Seconds',1]];
cd.innerHTML=p.map(function(x){var n=Math.floor(s/x[1]);s-=n*x[1];return '<div><b>'+n+'</b><span>'+x[0].toUpperCase()+'</span></div>'}).join('');
if(target-Date.now()<=0){clearInterval(iv)}}
var iv=setInterval(tick,1000);tick();
// Form
var f=$('#reg'),src=$('#source'),wrap=$('#otherWrap'),other=$('#other'),btn=$('#submit'),busy=false;
src.onchange=function(){var o=src.value==='Other';wrap.hidden=!o;if(!o){other.value='';err('other','')}};
function err(k,m){var e=$('#e-'+k),i=$('#'+k);e.textContent=m;if(i){m?i.setAttribute('aria-invalid','true'):i.removeAttribute('aria-invalid');if(m)i.setAttribute('aria-describedby','e-'+k);}}
function read(){return{name:$('#name').value.trim(),email:$('#email').value.trim(),address:$('#address').value.trim(),church:$('#church').value.trim(),source:src.value,other:src.value==='Other'?other.value.trim():'',expectations:$('#expectations').value.trim(),privacy:$('#privacy').checked}}
function check(d){var bad={};
if(!d.name)bad.name='Please enter your full name.';
if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email))bad.email='Please enter a valid email address.';
if(!d.address)bad.address='Please enter your residential address.';
if(!d.church)bad.church='Please enter the name of your church.';
if(!d.source)bad.source='Please select an option.';
if(d.source==='Other'&&!d.other)bad.other='Please specify how you heard about us.';
if(!d.expectations)bad.expectations='Please share your expectations.';
if(!d.privacy)bad.privacy='You must accept the privacy notice to register.';
['name','email','address','church','source','other','expectations','privacy'].forEach(function(k){err(k,bad[k]||'')});
var first=Object.keys(bad)[0];if(first){$('#'+first).focus();return false}return true}
function fail(m){busy=false;btn.disabled=false;btn.textContent='REGISTER NOW';var a=$('#formErr');a.textContent=m;a.hidden=false;a.scrollIntoView({block:'center'})}
f.addEventListener('submit',function(e){e.preventDefault();if(busy)return;$('#formErr').hidden=true;var d=read();if(!check(d))return;
if(API_URL.indexOf('PASTE')===0){return fail('Registration is not connected yet (API_URL not set in script.js).')}
busy=true;btn.disabled=true;btn.textContent='Submitting…';
var ac=window.AbortController?new AbortController():null,tm=setTimeout(function(){if(ac)ac.abort()},60000),done=false;
fetch(API_URL,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d),signal:ac?ac.signal:undefined}).then(function(x){clearTimeout(tm);return x.json()}).then(function(r){done=true;
 if(!r||!r.ok){return fail((r&&r.error)||'Registration failed. Please try again.')}
 $('#sName').textContent=r.name;var sid=$('#sId');if(sid&&sid.parentNode)sid.parentNode.remove();
 $('#sMail').textContent=r.emailSent?'Please check your email for your confirmation (and your spam folder).':'Your registration was received, but we could not send your confirmation email at this moment.';
 var fl=$('#sFlyer');if(r.flyerUrl){fl.href=r.flyerUrl;fl.hidden=false}
 $('#formArea').hidden=true;var s=$('#success');s.hidden=false;s.focus();s.scrollIntoView();f.reset();busy=false;
}).catch(function(){clearTimeout(tm);if(done)return;fail('We could not reach the server. Your details are still in the form; please check your connection and try again. If you are unsure whether it went through, wait a minute before resubmitting.')})});
})();