(()=>{"use strict";var t=document.querySelectorAll("h2, h3, h4, h5, h6"),e=document.getElementById("table-of-contents");t.forEach((function(t){if(t.id||t.setAttribute("id",t.textContent.trim().toLocaleLowerCase().replaceAll(" ","-")),"content-list-title"!==t.id){var n=document.createElement("li");n.innerHTML='<a href="#'.concat(t.id,'">').concat(t.textContent,"</a>"),e.appendChild(n)}}))})();