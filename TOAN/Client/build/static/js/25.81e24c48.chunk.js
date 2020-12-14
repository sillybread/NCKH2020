/*! For license information please see 25.81e24c48.chunk.js.LICENSE.txt */
(this["webpackJsonpshreyu-react"]=this["webpackJsonpshreyu-react"]||[]).push([[25],{139:function(e,t,n){"use strict";function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.d(t,"a",(function(){return i}))},142:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var i=n(139);function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?Object(arguments[t]):{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),a.forEach((function(t){Object(i.a)(e,t,n[t])}))}return e}},303:function(e,t,n){"use strict";var i=n(44),a=n(45),s=n(46),r=n(47),o=n(0),l=n.n(o),c=n(48),u=n(20),m=n(37),d=n(136),v=n.n(d),h=n(304),p=n.n(h),f=n(30),g=function e(t){var n=t.item,i=t.linkClassNames,a=t.subMenuClassNames,s=t.activatedMenuItemIds,r=n.icon||null;return l.a.createElement("li",{className:v()("side-nav-item",{"active mm-active":s.indexOf(n.id)>=0})},l.a.createElement(c.b,{to:"/",className:v()("side-sub-nav-link",i),"aria-expanded":s.indexOf(n.id)>=0},n.icon&&l.a.createElement(r,null),n.badge&&l.a.createElement("span",{className:"badge badge-".concat(n.badge.variant," float-right")},n.badge.text),l.a.createElement("span",null," ",n.name," "),l.a.createElement("span",{className:"menu-arrow"})),l.a.createElement("ul",{className:v()(a,{"mm-collapse mm-show":s.indexOf(n.id)>=0}),"aria-expanded":s.indexOf(n.id)>=0},n.children.map((function(t,n){return l.a.createElement(l.a.Fragment,{key:n},t.children?l.a.createElement(e,{item:t,linkClassNames:v()({active:s.indexOf(t.id)>=0}),activatedMenuItemIds:s,subMenuClassNames:"side-nav-third-level"}):l.a.createElement(b,{item:t,className:v()({active:s.indexOf(t.id)>=0}),linkClassName:v()({active:s.indexOf(t.id)>=0})}))}))))},b=function(e){var t=e.item,n=e.className,i=e.linkClassName;return l.a.createElement("li",{className:v()("side-nav-item",n)},l.a.createElement(E,{item:t,className:i}))},E=function(e){var t=e.item,n=e.className,i=t.icon||null;return l.a.createElement(c.b,{to:t.path,className:v()("side-nav-link-ref","side-sub-nav-link",n)},t.icon&&l.a.createElement(i,null),t.badge&&l.a.createElement("span",{className:"font-size-12 badge badge-".concat(t.badge.variant," float-right")},t.badge.text),l.a.createElement("span",null," ",t.name," "))},y=function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(i.a)(this,n);for(var a=arguments.length,s=new Array(a),r=0;r<a;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).componentDidMount=function(){e.props.menu.menuItems?e.initMenu():e.props.initMenu(),e.props.history.listen((function(t,n){e.props.changeActiveMenuFromLocation()}))},e.componentDidUpdate=function(t){(!t.menu.menuItems||t.menu.menuItems&&t.menu.menuItems!==e.props.menu.menuItems)&&e.initMenu(),e.props.menu.activatedMenuItemIds||e.props.changeActiveMenuFromLocation()},e}return Object(a.a)(n,[{key:"initMenu",value:function(){if("horizontal"===this.props.mode)var e=new p.a("#menu-bar").on("shown.metisMenu",(function(t){window.addEventListener("click",(function n(i){t.target.contains(i.target)||(e.hide(t.detail.shownElement),window.removeEventListener("click",n))}))}));else new p.a("#menu-bar")}},{key:"render",value:function(){var e=this,t="horizontal"===this.props.mode,n=t?[]:this.props.menu?this.props.menu.activatedMenuItemIds?this.props.menu.activatedMenuItemIds:[]:[]||!1;return l.a.createElement(l.a.Fragment,null,this.props.menu&&this.props.menu.menuItems&&l.a.createElement("ul",{className:"metismenu",id:"menu-bar"},this.props.menu.menuItems.map((function(i,a){if(e.props.RoomList.currentRoom&&i.roles.includes(e.props.RoomList.currentRoom.role))return l.a.createElement(l.a.Fragment,{key:i.id},i.header&&!t&&l.a.createElement("li",{className:"menu-title",key:a+"-el"},i.header),i.children?l.a.createElement(g,{item:i,subMenuClassNames:"nav-second-level",activatedMenuItemIds:n,linkClassNames:"side-nav-link"}):l.a.createElement(b,{item:i,className:v()({"mm-active":n.indexOf(i.id)>=0}),linkClassName:"side-nav-link"}))}))))}}]),n}(o.Component);y.defaultProps={mode:"vertical"};t.a=Object(u.g)(Object(m.b)((function(e){return{menu:e.AppMenu,RoomList:e.RoomList}}),{initMenu:f.C,changeActiveMenuFromLocation:f.c})(y))},304:function(e,t,n){e.exports=function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},t={parentTrigger:"li",subMenu:"ul",toggle:!0,triggerElement:"a"},n="mm-active",i="mm-collapse",a="mm-collapsed",s="mm-collapsing",r="metismenu",o="mm-show";function l(e,t){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,t)}function c(e,t){if(e.closest)return e.closest(t);for(var n=e;n;){if(l(n,t))return n;n=n.parentElement}return null}return function(){function l(n,i){this.element=l.isElement(n)?n:document.querySelector(n),this.config=e(e({},t),i),this.disposed=!1,this.triggerArr=[],this.init()}return l.attach=function(e,t){return new l(e,t)},l.prototype.init=function(){var e=this,t=r,a=n,s=i;this.element.classList.add(t),[].slice.call(this.element.querySelectorAll(this.config.subMenu)).forEach((function(t){t.classList.add(s);var n=c(t,e.config.parentTrigger);(null===n||void 0===n?void 0:n.classList.contains(a))?e.show(t):e.hide(t);var i=null===n||void 0===n?void 0:n.querySelector(e.config.triggerElement);"true"!==(null===i||void 0===i?void 0:i.getAttribute("aria-disabled"))&&(null===i||void 0===i||i.setAttribute("aria-expanded","false"),null===i||void 0===i||i.addEventListener("click",e.clickEvent.bind(e)),e.triggerArr.push(i))}))},l.prototype.clickEvent=function(e){if(!this.disposed){var t=null===e||void 0===e?void 0:e.currentTarget;t&&"A"===t.tagName&&e.preventDefault();var n=c(t,this.config.parentTrigger),i=null===n||void 0===n?void 0:n.querySelector(this.config.subMenu);this.toggle(i)}},l.prototype.update=function(){this.disposed=!1,this.init()},l.prototype.dispose=function(){var e=this;this.triggerArr.forEach((function(t){t.removeEventListener("click",e.clickEvent.bind(e))})),this.disposed=!0},l.prototype.on=function(e,t,n){return this.element.addEventListener(e,t,n),this},l.prototype.off=function(e,t,n){return this.element.removeEventListener(e,t,n),this},l.prototype.emit=function(e,t,n){var i;return void 0===n&&(n=!1),"function"===typeof CustomEvent?i=new CustomEvent(e,{bubbles:n,detail:t}):(i=document.createEvent("CustomEvent")).initCustomEvent(e,n,!1,t),this.element.dispatchEvent(i),this},l.prototype.toggle=function(e){var t=c(e,this.config.parentTrigger);(null===t||void 0===t?void 0:t.classList.contains(n))?this.hide(e):this.show(e)},l.prototype.show=function(e){var t,r=this,l=e,u=n,m=i,d=a,v=s,h=o;if(!this.isTransitioning&&!l.classList.contains(v)){var p=c(l,this.config.parentTrigger);null===p||void 0===p||p.classList.add(u);var f=null===p||void 0===p?void 0:p.querySelector(this.config.triggerElement);null===f||void 0===f||f.setAttribute("aria-expanded","true"),null===f||void 0===f||f.classList.remove(d),l.style.height="0px",l.classList.remove(m),l.classList.remove(h),l.classList.add(v);var g=[].slice.call(null===(t=null===p||void 0===p?void 0:p.parentNode)||void 0===t?void 0:t.children).filter((function(e){return e!==p}));this.config.toggle&&g.length>0&&g.forEach((function(e){var t=e.querySelector(r.config.subMenu);t&&r.hide(t)})),this.setTransitioning(!0),l.classList.add(m),l.classList.add(h),l.style.height=l.scrollHeight+"px",this.emit("show.metisMenu",{showElement:l}),l.addEventListener("transitionend",(function e(){l.classList.remove(v),l.style.height="",l.removeEventListener("transitionend",e),r.setTransitioning(!1),r.emit("shown.metisMenu",{shownElement:l})}))}},l.prototype.hide=function(e){var t=this,r=n,l=i,u=a,m=s,d=o,v=e;if(!this.isTransitioning&&v.classList.contains(d)){this.emit("hide.metisMenu",{hideElement:v});var h=c(v,this.config.parentTrigger);null===h||void 0===h||h.classList.remove(r),v.style.height=v.getBoundingClientRect().height+"px",v.style.height=v.offsetHeight+"px",v.classList.add(m),v.classList.remove(l),v.classList.remove(d),this.setTransitioning(!0),v.addEventListener("transitionend",(function e(){v.classList.remove(m),v.classList.add(l),v.style.height="",v.removeEventListener("transitionend",e),t.setTransitioning(!1),t.emit("hidden.metisMenu",{hiddenElement:v})})),v.style.height="0px";var p=null===h||void 0===h?void 0:h.querySelector(this.config.triggerElement);null===p||void 0===p||p.setAttribute("aria-expanded","false"),null===p||void 0===p||p.classList.add(u)}},l.prototype.setTransitioning=function(e){this.isTransitioning=e},l.isElement=function(e){return Boolean(e.classList)},l}()}()},625:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n.n(i),s=n(303),r=n(278);t.default=function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"topnav shadow-sm"},a.a.createElement("div",{className:"container-fluid"},a.a.createElement("nav",{className:"navbar navbar-light navbar-expand-lg topbar-nav"},a.a.createElement(r.a,{isOpen:e.isMenuOpened,className:"navbar-collapse",id:"topnav-menu-content"},a.a.createElement(s.a,{mode:"horizontal"}))))))}}}]);
//# sourceMappingURL=25.81e24c48.chunk.js.map