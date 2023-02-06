"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["zoom"],{474:(t,e,i)=>{var r=i(421),s=i(864);r.Z.defineExtend("menu-bar",s.nm,"ul"),r.Z.defineExtend("menu-button",s.v2,"button");var n=document.getElementById("title"),o=document.getElementById("layout-viewport"),a=document.getElementById("visual-viewport");n.innerText="".concat(window.innerWidth," CSS Viewport"),o.innerText="".concat(window.innerWidth," X ").concat(window.innerHeight),a.innerText="".concat(window.visualViewport.width," X ").concat(window.visualViewport.height),window.addEventListener("resize",(function(){n.innerText="".concat(window.innerWidth," CSS Viewport"),o.innerText="".concat(window.innerWidth," X ").concat(window.innerHeight)})),window.visualViewport.addEventListener("resize",(function(){a.innerText="".concat(Math.round(window.visualViewport.width)," X ").concat(Math.round(window.visualViewport.height))}))},421:(t,e,i)=>{function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function s(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,(void 0,n=function(t,e){if("object"!==r(t)||null===t)return t;var i=t[Symbol.toPrimitive];if(void 0!==i){var s=i.call(t,e);if("object"!==r(s))return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(s.key,"string"),"symbol"===r(n)?n:String(n)),s)}var n}i.d(e,{Z:()=>n});const n=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t)}var e,i;return e=t,i=[{key:"shadowBuilder",value:function(){throw Error("This should be implemented.")}},{key:"shadowMount",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"closed",r=t.attachShadow({mode:i}),s=e(),n=s.style,o=s.element;r.append(n,o)}},{key:"css",value:function(t){var e=document.createElement("style");return e.textContent=t,e}},{key:"defineExtend",value:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"div";customElements.define(t,e,{extends:i})}}],null&&s(e.prototype,null),i&&s(e,i),Object.defineProperty(e,"prototype",{writable:!1}),t}()},353:(t,e,i)=>{i.d(e,{X:()=>N});var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])},r(t,e)};function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function i(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}function n(t){var e="function"==typeof Symbol&&Symbol.iterator,i=e&&t[e],r=0;if(i)return i.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function o(t,e){var i="function"==typeof Symbol&&t[Symbol.iterator];if(!i)return t;var r,s,n=i.call(t),o=[];try{for(;(void 0===e||e-- >0)&&!(r=n.next()).done;)o.push(r.value)}catch(t){s={error:t}}finally{try{r&&!r.done&&(i=n.return)&&i.call(n)}finally{if(s)throw s.error}}return o}function a(t,e,i){if(i||2===arguments.length)for(var r,s=0,n=e.length;s<n;s++)!r&&s in e||(r||(r=Array.prototype.slice.call(e,0,s)),r[s]=e[s]);return t.concat(r||Array.prototype.slice.call(e))}function c(t){return"function"==typeof t}function l(t){var e=t((function(t){Error.call(t),t.stack=(new Error).stack}));return e.prototype=Object.create(Error.prototype),e.prototype.constructor=e,e}Object.create,Object.create;var u=l((function(t){return function(e){t(this),this.message=e?e.length+" errors occurred during unsubscription:\n"+e.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=e}}));function h(t,e){if(t){var i=t.indexOf(e);0<=i&&t.splice(i,1)}}var d=function(){function t(t){this.initialTeardown=t,this.closed=!1,this._parentage=null,this._finalizers=null}var e;return t.prototype.unsubscribe=function(){var t,e,i,r,s;if(!this.closed){this.closed=!0;var l=this._parentage;if(l)if(this._parentage=null,Array.isArray(l))try{for(var h=n(l),d=h.next();!d.done;d=h.next())d.value.remove(this)}catch(e){t={error:e}}finally{try{d&&!d.done&&(e=h.return)&&e.call(h)}finally{if(t)throw t.error}}else l.remove(this);var p=this.initialTeardown;if(c(p))try{p()}catch(t){s=t instanceof u?t.errors:[t]}var f=this._finalizers;if(f){this._finalizers=null;try{for(var b=n(f),y=b.next();!y.done;y=b.next()){var g=y.value;try{v(g)}catch(t){s=null!=s?s:[],t instanceof u?s=a(a([],o(s)),o(t.errors)):s.push(t)}}}catch(t){i={error:t}}finally{try{y&&!y.done&&(r=b.return)&&r.call(b)}finally{if(i)throw i.error}}}if(s)throw new u(s)}},t.prototype.add=function(e){var i;if(e&&e!==this)if(this.closed)v(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=null!==(i=this._finalizers)&&void 0!==i?i:[]).push(e)}},t.prototype._hasParent=function(t){var e=this._parentage;return e===t||Array.isArray(e)&&e.includes(t)},t.prototype._addParent=function(t){var e=this._parentage;this._parentage=Array.isArray(e)?(e.push(t),e):e?[e,t]:t},t.prototype._removeParent=function(t){var e=this._parentage;e===t?this._parentage=null:Array.isArray(e)&&h(e,t)},t.prototype.remove=function(e){var i=this._finalizers;i&&h(i,e),e instanceof t&&e._removeParent(this)},t.EMPTY=((e=new t).closed=!0,e),t}(),p=d.EMPTY;function f(t){return t instanceof d||t&&"closed"in t&&c(t.remove)&&c(t.add)&&c(t.unsubscribe)}function v(t){c(t)?t():t.unsubscribe()}var b=null,y=null,g=void 0,m=!1,w=!1,_={setTimeout:function(t,e){for(var i=[],r=2;r<arguments.length;r++)i[r-2]=arguments[r];var s=_.delegate;return(null==s?void 0:s.setTimeout)?s.setTimeout.apply(s,a([t,e],o(i))):setTimeout.apply(void 0,a([t,e],o(i)))},clearTimeout:function(t){var e=_.delegate;return((null==e?void 0:e.clearTimeout)||clearTimeout)(t)},delegate:void 0};function x(){}var A=E("C",void 0,void 0);function E(t,e,i){return{kind:t,value:e,error:i}}var S=null;function O(t){if(m){var e=!S;if(e&&(S={errorThrown:!1,error:null}),t(),e){var i=S,r=i.errorThrown,s=i.error;if(S=null,r)throw s}}else t()}var L=function(t){function e(e){var i=t.call(this)||this;return i.isStopped=!1,e?(i.destination=e,f(e)&&e.add(i)):i.destination=j,i}return s(e,t),e.create=function(t,e,i){return new V(t,e,i)},e.prototype.next=function(t){this.isStopped?M(function(t){return E("N",t,void 0)}(t),this):this._next(t)},e.prototype.error=function(t){this.isStopped?M(E("E",void 0,t),this):(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped?M(A,this):(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){try{this.destination.error(t)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(d),T=Function.prototype.bind;function k(t,e){return T.call(t,e)}var I=function(){function t(t){this.partialObserver=t}return t.prototype.next=function(t){var e=this.partialObserver;if(e.next)try{e.next(t)}catch(t){$(t)}},t.prototype.error=function(t){var e=this.partialObserver;if(e.error)try{e.error(t)}catch(t){$(t)}else $(t)},t.prototype.complete=function(){var t=this.partialObserver;if(t.complete)try{t.complete()}catch(t){$(t)}},t}(),V=function(t){function e(e,i,r){var s,n,o=t.call(this)||this;return c(e)||!e?s={next:null!=e?e:void 0,error:null!=i?i:void 0,complete:null!=r?r:void 0}:o&&w?((n=Object.create(e)).unsubscribe=function(){return o.unsubscribe()},s={next:e.next&&k(e.next,n),error:e.error&&k(e.error,n),complete:e.complete&&k(e.complete,n)}):s=e,o.destination=new I(s),o}return s(e,t),e}(L);function $(t){var e;m?(e=t,m&&S&&(S.errorThrown=!0,S.error=e)):function(t){_.setTimeout((function(){if(!b)throw t;b(t)}))}(t)}function M(t,e){var i=y;i&&_.setTimeout((function(){return i(t,e)}))}var j={closed:!0,next:x,error:function(t){throw t},complete:x},D="function"==typeof Symbol&&Symbol.observable||"@@observable";function P(t){return t}function B(t){return 0===t.length?P:1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}}var C=function(){function t(t){t&&(this._subscribe=t)}return t.prototype.lift=function(e){var i=new t;return i.source=this,i.operator=e,i},t.prototype.subscribe=function(t,e,i){var r,s=this,n=(r=t)&&r instanceof L||function(t){return t&&c(t.next)&&c(t.error)&&c(t.complete)}(r)&&f(r)?t:new V(t,e,i);return O((function(){var t=s,e=t.operator,i=t.source;n.add(e?e.call(n,i):i?s._subscribe(n):s._trySubscribe(n))})),n},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){t.error(e)}},t.prototype.forEach=function(t,e){var i=this;return new(e=X(e))((function(e,r){var s=new V({next:function(e){try{t(e)}catch(t){r(t),s.unsubscribe()}},error:r,complete:e});i.subscribe(s)}))},t.prototype._subscribe=function(t){var e;return null===(e=this.source)||void 0===e?void 0:e.subscribe(t)},t.prototype[D]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return B(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=X(t))((function(t,i){var r;e.subscribe((function(t){return r=t}),(function(t){return i(t)}),(function(){return t(r)}))}))},t.create=function(e){return new t(e)},t}();function X(t){var e;return null!==(e=null!=t?t:g)&&void 0!==e?e:Promise}var H=l((function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}})),q=function(t){function e(){var e=t.call(this)||this;return e.closed=!1,e.currentObservers=null,e.observers=[],e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return s(e,t),e.prototype.lift=function(t){var e=new z(this,this);return e.operator=t,e},e.prototype._throwIfClosed=function(){if(this.closed)throw new H},e.prototype.next=function(t){var e=this;O((function(){var i,r;if(e._throwIfClosed(),!e.isStopped){e.currentObservers||(e.currentObservers=Array.from(e.observers));try{for(var s=n(e.currentObservers),o=s.next();!o.done;o=s.next())o.value.next(t)}catch(t){i={error:t}}finally{try{o&&!o.done&&(r=s.return)&&r.call(s)}finally{if(i)throw i.error}}}}))},e.prototype.error=function(t){var e=this;O((function(){if(e._throwIfClosed(),!e.isStopped){e.hasError=e.isStopped=!0,e.thrownError=t;for(var i=e.observers;i.length;)i.shift().error(t)}}))},e.prototype.complete=function(){var t=this;O((function(){if(t._throwIfClosed(),!t.isStopped){t.isStopped=!0;for(var e=t.observers;e.length;)e.shift().complete()}}))},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var t;return(null===(t=this.observers)||void 0===t?void 0:t.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(e){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)},e.prototype._innerSubscribe=function(t){var e=this,i=this,r=i.hasError,s=i.isStopped,n=i.observers;return r||s?p:(this.currentObservers=null,n.push(t),new d((function(){e.currentObservers=null,h(n,t)})))},e.prototype._checkFinalizedStatuses=function(t){var e=this,i=e.hasError,r=e.thrownError,s=e.isStopped;i?t.error(r):s&&t.complete()},e.prototype.asObservable=function(){var t=new C;return t.source=this,t},e.create=function(t,e){return new z(t,e)},e}(C),z=function(t){function e(e,i){var r=t.call(this)||this;return r.destination=e,r.source=i,r}return s(e,t),e.prototype.next=function(t){var e,i;null===(i=null===(e=this.destination)||void 0===e?void 0:e.next)||void 0===i||i.call(e,t)},e.prototype.error=function(t){var e,i;null===(i=null===(e=this.destination)||void 0===e?void 0:e.error)||void 0===i||i.call(e,t)},e.prototype.complete=function(){var t,e;null===(e=null===(t=this.destination)||void 0===t?void 0:t.complete)||void 0===e||e.call(t)},e.prototype._subscribe=function(t){var e,i;return null!==(i=null===(e=this.source)||void 0===e?void 0:e.subscribe(t))&&void 0!==i?i:p},e}(q),N=function(t){function e(e){var i=t.call(this)||this;return i._value=e,i}return s(e,t),Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(e){var i=t.prototype._subscribe.call(this,e);return!i.closed&&e.next(this._value),i},e.prototype.getValue=function(){var t=this,e=t.hasError,i=t.thrownError,r=t._value;if(e)throw i;return this._throwIfClosed(),r},e.prototype.next=function(e){t.prototype.next.call(this,this._value=e)},e}(q)},864:(t,e,i)=>{i.d(e,{Ee:()=>v,LR:()=>n,Pz:()=>l,UQ:()=>s,XO:()=>a,XZ:()=>u,am:()=>c,nm:()=>p,p$:()=>f,v2:()=>d,wb:()=>h});var r=i(353);class s extends HTMLDivElement{constructor(){super(),this.tabs=this.querySelectorAll(".accordion__header"),this.panels=this.querySelectorAll(".accordion__panel"),this.shadowBuilder(this)}shadowBuilder(t){const e=(i=t).getAttributeNames().reduce(((t,e)=>Object.assign({[e]:i.getAttribute(e)},t)),{});var i;this.activeTab=new r.X(this.panels[0]),this.activeTab.asObservable().subscribe((t=>{this.tabs.forEach((e=>{e.setAttribute("aria-expanded",(t===e).toString())})),this.panels.forEach((e=>{t.getAttribute("aria-controls")===e.id?(e.classList.add("accordion__panel--active"),e.focus()):e.classList.remove("accordion__panel--active")}))})),this.initTabList(t,e),this.initPanels(t,e)}initTabList(t,e){const{id:i}=e;this.tabs.forEach(((t,e)=>{const r=`${i}__panel__${e}`;t.setAttribute("id",`${i}__tab__${e}`),t.setAttribute("aria-controls",r),t.setAttribute("aria-selected",(0===e).toString()),t.addEventListener("click",(t=>{t.preventDefault(),this.activeTab&&this.activeTab.next(t.target)}))}))}initPanels(t,e){const{id:i}=e;this.panels.forEach(((t,e)=>{t.setAttribute("id",`${i}__panel__${e}`),t.setAttribute("aria-labelledby",`${i}__tab__${e}`),t.setAttribute("tabindex","-1"),0===e&&t.classList.add("tabber__panel--active")}))}}class n extends HTMLDivElement{constructor(){super(),this.slides=Array.from(this.querySelectorAll('[aria-roledescription="slide"]'));const t=this.slides[0].parentNode;if(!t)throw new Error(`${this}: no parent element.`);this.slideWrapper=t,this.activeSlide=new r.X(this.slides[0]),this.autoplay=new r.X(setInterval((()=>{this.nextSlide()}),4e3)),this.shadowBuilder(this)}shadowBuilder(t){this.activeSlide.asObservable().subscribe((t=>{this.slides.forEach((t=>{this.activeSlide&&t===this.activeSlide.getValue()?t.classList.add("carousel_slide--active"):t.classList.remove("carousel_slide--active")}))})),this.autoplay.asObservable().subscribe((t=>{this.slideWrapper.offsetWidth,this.slideWrapper.setAttribute("aria-live",t?"off":"polite")})),this.startAutoplay()}nextSlide(t=!1){const e=this.slides.findIndex((t=>t===this.activeSlide.getValue()));let i=Math.min(e+1,this.slides.length-1);i===e&&(i=0),this.gotoSlide(i,t)}previousSlide(t=!1){const e=Math.max(this.slides.findIndex((t=>t===this.activeSlide.getValue()))-1,0);this.gotoSlide(e,t)}gotoSlide(t,e=!1){const i=this.autoplay.getValue();i&&e&&this.stopAutoplay(),this.activeSlide.next(this.slides[t]),i&&e&&this.startAutoplay()}startAutoplay(){this.autoplay?(clearInterval(this.autoplay.getValue()),this.autoplay.next(setInterval((()=>{this.nextSlide()}),4e3))):this.autoplay=new r.X(setInterval((()=>{this.nextSlide()}),4e3))}stopAutoplay(){this.autoplay.getValue()&&(clearInterval(this.autoplay.getValue()),this.autoplay.next(null))}handleRotation(){return this.autoplay.getValue()?this.stopAutoplay():this.startAutoplay(),!!this.autoplay.getValue()}}class o extends HTMLButtonElement{constructor(){super();const t=this.closest('[aria-roledescription="carousel"]');if(!t)throw new Error(`${this}: no carousel parent element.`);this.parentCarousel=t}}class a extends o{constructor(){if(super(),!this.parentCarousel)throw new Error(`${this}: no carousel parent.`);this.addEventListener("click",(t=>{const e=this.parentCarousel.handleRotation();this.innerHTML=e?'<span class="fa-solid fa-pause w-6 h-6"></span><span class="sr-only">Stop slide rotation</span>':'<span class="fa-solid fa-play ml-1 w-6 h-6"></span><span class="sr-only">Start slide rotation</span>'}))}}class c extends o{constructor(){super(),this.addEventListener("click",(t=>{this.parentCarousel.previousSlide(!0)}))}}class l extends o{constructor(){super(),this.addEventListener("click",(t=>{this.parentCarousel.nextSlide(!0)}))}}class u extends HTMLButtonElement{constructor(){super(),this.checked=!1,this.addEventListener("click",(t=>{this.toggle(!this.checked),this.dispatchEvent(new Event("change",{bubbles:!0,cancelable:!1}))}))}toggle(t){this.checked=t,this.setAttribute("aria-checked",t.toString())}}class h extends HTMLDivElement{constructor(){super();const t=this.querySelector('[role="combobox"]');if(!t)throw"No list-box trigger.";const e=this.querySelector('[role="listbox"]');if(!e)throw"No list-box options container";this.trigger=t,this.list=e;const i=Array.from(this.list.querySelectorAll('[role="option"]'));if(0===i.length)throw"No option in list-box component";this.options=i,this.activeOption=new r.X(i[0]),this.activeOption.asObservable().subscribe((t=>{this.trigger.setAttribute("aria-activedescendant",t.id),this.list.querySelectorAll("li").forEach(((t,e)=>{t.classList.remove("list-box__option--active")})),t.classList.add("list-box__option--active")})),this.shadowBuilder(this)}shadowBuilder(t){const e=t.getAttributeNames().reduce(((e,i)=>Object.assign({[i]:t.getAttribute(i)},e)),{});this.initTrigger(t,e),this.initList(t,e)}initTrigger(t,e){const{id:i}=e;this.trigger.setAttribute("id",`${i}__trigger`),this.trigger.setAttribute("aria-controls",`${i}__list`);const r=()=>{this.list.classList.add("active"),this.list.focus()};this.trigger.addEventListener("click",(t=>{r()})),this.trigger.addEventListener("keyup",(t=>{switch(t.key){case"Enter":case" ":r()}}))}initList(t,e){const{id:i}=e;this.list.setAttribute("id",`${i}__list`),this.list.setAttribute("aria-labelledby",`${i}__trigger`),this.options.forEach(((t,e)=>{t.setAttribute("id",`${i}_option_${e}`),t.setAttribute("aria-selected",(0===e).toString()),0===e&&(t.classList.add("list-box__option--selected"),this.trigger.innerHTML=t.innerHTML,this.activeOption.next(t))})),this.list.addEventListener("focusout",(({target:t})=>{t.classList.remove("active")}));const r=t=>{this.activeOption.next(t),this.options.forEach((t=>{t.setAttribute("aria-selected","false")})),t.setAttribute("aria-selected","true"),this.trigger.innerHTML=t.innerHTML,this.trigger.setAttribute("aria-activedescendant",t.id),this.list.classList.remove("active"),this.trigger.focus()};this.options.forEach(((t,e)=>{t.addEventListener("click",(({target:t})=>{r(t)}))})),this.list.addEventListener("keydown",(t=>{const e=this.options.findIndex((t=>t===this.activeOption.getValue()));switch(t.key){case"ArrowUp":if(t.preventDefault(),e<=0)return;this.activeOption.next(this.options[e-1]);break;case"ArrowDown":if(t.preventDefault(),e===this.options.length-1)return;this.activeOption.next(this.options[e+1]);break;case"Enter":case" ":t.preventDefault(),this.options.forEach((t=>{t.setAttribute("aria-selected","false")})),this.activeOption.getValue().setAttribute("aria-selected","true"),this.trigger.innerHTML=this.activeOption.getValue().innerHTML,this.list.classList.remove("active"),this.trigger.focus();break;case"Escape":this.list.classList.remove("active"),this.trigger.focus()}}))}}class d extends HTMLButtonElement{constructor(){super(),this.trigger=this;const t=this.trigger.nextElementSibling;if(!t)throw"No list element found near trigger";if(this.list=t,this.items=Array.from(this.list.querySelectorAll('[role="menuitem"]')),!this.items.length)throw"Menu has no options.";this.expanded=new r.X(!1),this.shadowBuilder(this)}shadowBuilder(t){const e=t.getAttributeNames().reduce(((e,i)=>Object.assign({[i]:t.getAttribute(i)},e)),{});this.expanded.asObservable().subscribe((t=>{this.setAttribute("aria-expanded",t.toString()),t&&this.list.focus()})),this.list.setAttribute("tabIndex","-1");const i=()=>{this.expanded.next(!0),this.activeItem=new r.X(this.items[0]),this.activeItem.asObservable().subscribe((t=>{this.trigger.setAttribute("aria-activedescendant",t.id),this.items.forEach((e=>{e===t?e.classList.add("menu__item--active"):e.classList.remove("menu__item--active")}))}))};this.trigger.addEventListener("keydown",(t=>{switch(t.key){case" ":case"ArrowDown":t.preventDefault(),i()}})),this.trigger.addEventListener("click",(()=>{this.expanded.getValue()?this.expanded.next(!1):i()})),this.trigger.addEventListener("focusout",(()=>{this.expanded.getValue()})),this.initItems(t,e)}initItems(t,e){const{id:i}=e;this.items.forEach(((t,e)=>{t.setAttribute("id",`${i}-menu-item-${e}`),t.addEventListener("mouseenter",(t=>{this.activeItem&&this.activeItem.next(t.target)}))})),this.list.addEventListener("keydown",(t=>{if(!this.activeItem)return;const e=this.activeItem,i=this.items.findIndex((t=>t===e.getValue()));switch(t.key){case"Escape":this.expanded.next(!1),this.trigger.focus();break;case"ArrowUp":if(t.preventDefault(),0===i)return this.expanded.next(!1),void this.trigger.focus();this.activeItem.next(this.items[i-1]);break;case"ArrowDown":if(t.preventDefault(),i===this.items.length-1)return;this.activeItem.next(this.items[i+1]);break;case"Tab":this.expanded.next(!1);break;case" ":case"Enter":t.preventDefault(),this.activeItem.getValue().click()}})),this.list.addEventListener("focusout",(({target:t})=>{t.matches(":focus-within")||(this.expanded.next(!1),this.activeItem&&this.activeItem.next(this.items[0]))}))}}class p extends HTMLUListElement{constructor(){super(),this.root=this,this.items=Array.from(this.querySelectorAll(' [role="menuitem"]:not([role="menu"] [role="menuitem"])')),this.activeItem=new r.X(this.items[0]),this.shadowBuilder(this)}shadowBuilder(t){const e=t.getAttributeNames().reduce(((e,i)=>Object.assign({[i]:t.getAttribute(i)},e)),{});this.items[0].addEventListener("focus",(({target:t})=>{this.activeItem=new r.X(t),this.activeItem.asObservable().subscribe((t=>{t.focus()}))})),this.initItems(t,e)}initItems(t,e){this.items.forEach(((t,e)=>{t.setAttribute("tabIndex",0===e?"0":"-1"),t.addEventListener("keyup",(t=>{const e=this.items.findIndex((t=>t===this.activeItem.getValue()));switch(t.key){case"ArrowLeft":if(t.preventDefault(),e<=0)return;this.activeItem.next(this.items[e-1]);break;case"ArrowRight":if(t.preventDefault(),e>=this.items.length-1)return;this.activeItem.next(this.items[e+1])}}))}))}}class f extends HTMLDivElement{constructor(){super(),this.tabs=Array.from(this.querySelectorAll('[role="tab"]'));const t=this.querySelector('[role="tablist"]');if(!t)throw'no role="tablist" found in element.';this.tablist=t,this.panels=Array.from(this.querySelectorAll('[role="tabpanel"]')),this.activeTab=new r.X(null),this.shadowBuilder(this)}shadowBuilder(t){const e=t.getAttributeNames().reduce(((e,i)=>Object.assign({[i]:t.getAttribute(i)},e)),{});this.activeTab.asObservable().subscribe((t=>{t&&(t.classList.add("tabber__tablist__tab--active"),this.tabs.forEach((e=>{e.setAttribute("aria-selected",(t===e).toString()),e.id!==t.id&&e.classList.remove("tabber__tablist__tab--active")})),t.focus())})),this.initTabList(t,e),this.initPanels(t,e)}initTabList(t,e){const{id:i}=e;this.tabs[0].addEventListener("focus",(({target:t})=>{this.activeTab.next(t)})),this.tabs.forEach(((t,e)=>{const r=`${i}__panel__${e}`;t.setAttribute("id",`${i}__tab__${e}`),t.setAttribute("aria-controls",r),t.setAttribute("aria-selected",(0===e).toString()),t.addEventListener("click",(({target:t})=>{this.activeTab.next(t)}))})),this.tabs.forEach(((t,e)=>{const r=`${i}__panel__${e}`;t.setAttribute("id",`${i}__tab__${e}`),t.setAttribute("aria-controls",r),t.setAttribute("aria-selected",(0===e).toString()),t.setAttribute("tabIndex",0===e?"0":"-1"),t.addEventListener("click",(({target:t})=>{this.panels.forEach((e=>{e.getAttribute("aria-labelledby")===t.id?e.classList.add("tabber__panel--active"):e.classList.remove("tabber__panel--active")})),this.panels[e].focus()})),t.addEventListener("keydown",(t=>{switch(t.key){case"ArrowLeft":if(t.preventDefault(),this.activeTab.getValue()===this.tabs[0])return;this.activeTab.next(this.tabs[this.tabs.findIndex((t=>t===this.activeTab.getValue()))-1]);break;case"ArrowRight":if(t.preventDefault(),this.activeTab.getValue()===this.tabs[this.tabs.length-1])return;this.activeTab.next(this.tabs[this.tabs.findIndex((t=>t===this.activeTab.getValue()))+1])}}))}))}initPanels(t,e){const{id:i}=e;this.panels.forEach(((t,e)=>{t.setAttribute("aria-labelledby",`${i}__tab__${e}`),t.setAttribute("tabindex","-1"),0===e&&t.classList.add("tabber__panel--active")}))}}class v extends HTMLUListElement{constructor(){super(),this.container=this,this.options=Array.from(this.querySelectorAll('[role="radio"]')),this.selectedOption=new r.X(null),this.activeOption=new r.X(null),this.shadowBuilder(this)}shadowBuilder(t){const e=t.getAttributeNames().reduce(((e,i)=>Object.assign({[i]:t.getAttribute(i)},e)),{});this.selectedOption.asObservable().subscribe((e=>{null!==e&&(this.options.forEach((i=>{i.setAttribute("aria-checked",(e===i).toString()),t.setAttribute("aria-activedescendant",e.id)})),this.activeOption.getValue()&&this.activeOption.next(e))})),this.activeOption.asObservable().subscribe((t=>{this.options.forEach((e=>{e===t?e.classList.add("radio--active"):e.classList.remove("radio--active")}))})),this.container.addEventListener("focus",(t=>{var e;this.activeOption.next(null!==(e=this.selectedOption.getValue())&&void 0!==e?e:this.options[0])})),this.container.addEventListener("focusout",(t=>{this.activeOption.next(null)})),this.initOptions(t,e)}initOptions(t,e){const{id:i}=e;this.options.forEach(((t,e)=>{t.setAttribute("id",`${i}__option__${e}`),t.setAttribute("aria-checked","false"),t.addEventListener("click",(t=>{this.selectedOption.next(t.target)}))})),this.container.addEventListener("keydown",(t=>{switch(t.key){case"ArrowLeft":case"ArrowUp":if(t.preventDefault(),this.selectedOption.getValue()||this.selectedOption.next(this.activeOption.getValue()),this.selectedOption.getValue()===this.options[0])return;this.selectedOption.next(this.selectedOption.getValue().previousElementSibling);break;case"ArrowRight":case"ArrowDown":if(t.preventDefault(),this.selectedOption.getValue()||this.selectedOption.next(this.activeOption.getValue()),this.selectedOption.getValue()===this.options[this.options.length-1])return;this.selectedOption.next(this.selectedOption.getValue().nextElementSibling);break;case" ":t.preventDefault(),this.selectedOption.next(this.activeOption.getValue())}}))}}}},t=>{t(t.s=474)}]);