document.addEventListener("DOMContentLoaded",(async()=>{const t=await fetch("/hello/data"),a=await t.json();alert(a),await fetch("/hello/data",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productName:"박송희",ProductType:"백수예정자"})});const e=await fetch("/hello/data"),o=await e.json();alert(o)}));