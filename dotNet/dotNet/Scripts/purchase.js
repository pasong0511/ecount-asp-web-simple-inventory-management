(()=>{"use strict";const e=()=>{const e=document.querySelector(".userInputProductInfo input[type='date']"),t=document.querySelector(".userInputProductInfo select"),o=document.querySelector(".userInputProductInfo input[type='number']");console.log("날짜 : ",e.value),console.log("선택 : ",t.options[t.selectedIndex].value),console.log("수량 : ",o.value)};document.addEventListener("DOMContentLoaded",(async()=>{alert("구매"),document.querySelector(".submit-btn").addEventListener("click",e)}))})();