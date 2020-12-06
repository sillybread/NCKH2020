/*! For license information please see 17.793f6ddc.chunk.js.LICENSE.txt */
(this["webpackJsonpshreyu-react"]=this["webpackJsonpshreyu-react"]||[]).push([[17],{198:function(e,i,n){"use strict";n.d(i,"a",(function(){return p}));var t=n(82),r=n(8),o=n(79),s=n(13),a=n(0),l=n.n(a),d=n(6),c=n.n(d),u=n(111),m=n(78),w=["defaultOpen"],p=function(e){function i(i){var n;return(n=e.call(this,i)||this).state={isOpen:i.defaultOpen||!1},n.toggle=n.toggle.bind(Object(o.a)(n)),n}Object(s.a)(i,e);var n=i.prototype;return n.toggle=function(e){this.setState({isOpen:!this.state.isOpen}),this.props.onToggle&&this.props.onToggle(e,!this.state.isOpen)},n.render=function(){return l.a.createElement(u.a,Object(r.a)({isOpen:this.state.isOpen,toggle:this.toggle},Object(m.omit)(this.props,w)))},i}(a.Component);p.propTypes=Object(t.a)({defaultOpen:c.a.bool,onToggle:c.a.func},u.a.propTypes)},205:function(e,i,n){"use strict";var t=n(0),r=n.n(t),o=n(6),s=n.n(o);function a(){return(a=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function l(e,i){if(null==e)return{};var n,t,r=function(e,i){if(null==e)return{};var n,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||(r[n]=e[n]);return r}(e,i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=Object(t.forwardRef)((function(e,i){var n=e.color,t=void 0===n?"currentColor":n,o=e.size,s=void 0===o?24:o,d=l(e,["color","size"]);return r.a.createElement("svg",a({ref:i,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},d),r.a.createElement("rect",{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"}),r.a.createElement("path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}))}));d.propTypes={color:s.a.string,size:s.a.oneOfType([s.a.string,s.a.number])},d.displayName="Lock",i.a=d},214:function(e,i,n){e.exports=function(){"use strict";var e=function(){return(e=Object.assign||function(e){for(var i,n=1,t=arguments.length;n<t;n++)for(var r in i=arguments[n])Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);return e}).apply(this,arguments)},i={parentTrigger:"li",subMenu:"ul",toggle:!0,triggerElement:"a"},n="mm-active",t="mm-collapse",r="mm-collapsed",o="mm-collapsing",s="metismenu",a="mm-show";function l(e,i){return(e.matches||e.webkitMatchesSelector||e.msMatchesSelector).call(e,i)}function d(e,i){if(e.closest)return e.closest(i);for(var n=e;n;){if(l(n,i))return n;n=n.parentElement}return null}return function(){function l(n,t){this.element=l.isElement(n)?n:document.querySelector(n),this.config=e(e({},i),t),this.disposed=!1,this.triggerArr=[],this.init()}return l.attach=function(e,i){return new l(e,i)},l.prototype.init=function(){var e=this,i=s,r=n,o=t;this.element.classList.add(i),[].slice.call(this.element.querySelectorAll(this.config.subMenu)).forEach((function(i){i.classList.add(o);var n=d(i,e.config.parentTrigger);(null===n||void 0===n?void 0:n.classList.contains(r))?e.show(i):e.hide(i);var t=null===n||void 0===n?void 0:n.querySelector(e.config.triggerElement);"true"!==(null===t||void 0===t?void 0:t.getAttribute("aria-disabled"))&&(null===t||void 0===t||t.setAttribute("aria-expanded","false"),null===t||void 0===t||t.addEventListener("click",e.clickEvent.bind(e)),e.triggerArr.push(t))}))},l.prototype.clickEvent=function(e){if(!this.disposed){var i=null===e||void 0===e?void 0:e.currentTarget;i&&"A"===i.tagName&&e.preventDefault();var n=d(i,this.config.parentTrigger),t=null===n||void 0===n?void 0:n.querySelector(this.config.subMenu);this.toggle(t)}},l.prototype.update=function(){this.disposed=!1,this.init()},l.prototype.dispose=function(){var e=this;this.triggerArr.forEach((function(i){i.removeEventListener("click",e.clickEvent.bind(e))})),this.disposed=!0},l.prototype.on=function(e,i,n){return this.element.addEventListener(e,i,n),this},l.prototype.off=function(e,i,n){return this.element.removeEventListener(e,i,n),this},l.prototype.emit=function(e,i,n){var t;return void 0===n&&(n=!1),"function"===typeof CustomEvent?t=new CustomEvent(e,{bubbles:n,detail:i}):(t=document.createEvent("CustomEvent")).initCustomEvent(e,n,!1,i),this.element.dispatchEvent(t),this},l.prototype.toggle=function(e){var i=d(e,this.config.parentTrigger);(null===i||void 0===i?void 0:i.classList.contains(n))?this.hide(e):this.show(e)},l.prototype.show=function(e){var i,s=this,l=e,c=n,u=t,m=r,w=o,p=a;if(!this.isTransitioning&&!l.classList.contains(w)){var f=d(l,this.config.parentTrigger);null===f||void 0===f||f.classList.add(c);var h=null===f||void 0===f?void 0:f.querySelector(this.config.triggerElement);null===h||void 0===h||h.setAttribute("aria-expanded","true"),null===h||void 0===h||h.classList.remove(m),l.style.height="0px",l.classList.remove(u),l.classList.remove(p),l.classList.add(w);var v=[].slice.call(null===(i=null===f||void 0===f?void 0:f.parentNode)||void 0===i?void 0:i.children).filter((function(e){return e!==f}));this.config.toggle&&v.length>0&&v.forEach((function(e){var i=e.querySelector(s.config.subMenu);i&&s.hide(i)})),this.setTransitioning(!0),l.classList.add(u),l.classList.add(p),l.style.height=l.scrollHeight+"px",this.emit("show.metisMenu",{showElement:l}),l.addEventListener("transitionend",(function e(){l.classList.remove(w),l.style.height="",l.removeEventListener("transitionend",e),s.setTransitioning(!1),s.emit("shown.metisMenu",{shownElement:l})}))}},l.prototype.hide=function(e){var i=this,s=n,l=t,c=r,u=o,m=a,w=e;if(!this.isTransitioning&&w.classList.contains(m)){this.emit("hide.metisMenu",{hideElement:w});var p=d(w,this.config.parentTrigger);null===p||void 0===p||p.classList.remove(s),w.style.height=w.getBoundingClientRect().height+"px",w.style.height=w.offsetHeight+"px",w.classList.add(u),w.classList.remove(l),w.classList.remove(m),this.setTransitioning(!0),w.addEventListener("transitionend",(function e(){w.classList.remove(u),w.classList.add(l),w.style.height="",w.removeEventListener("transitionend",e),i.setTransitioning(!1),i.emit("hidden.metisMenu",{hiddenElement:w})})),w.style.height="0px";var f=null===p||void 0===p?void 0:p.querySelector(this.config.triggerElement);null===f||void 0===f||f.setAttribute("aria-expanded","false"),null===f||void 0===f||f.classList.add(c)}},l.prototype.setTransitioning=function(e){this.isTransitioning=e},l.isElement=function(e){return Boolean(e.classList)},l}()}()},287:function(e,i,n){"use strict";var t=n(0),r=n.n(t),o=n(6),s=n.n(o);function a(){return(a=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function l(e,i){if(null==e)return{};var n,t,r=function(e,i){if(null==e)return{};var n,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||(r[n]=e[n]);return r}(e,i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=Object(t.forwardRef)((function(e,i){var n=e.color,t=void 0===n?"currentColor":n,o=e.size,s=void 0===o?24:o,d=l(e,["color","size"]);return r.a.createElement("svg",a({ref:i,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},d),r.a.createElement("path",{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}),r.a.createElement("circle",{cx:"12",cy:"7",r:"4"}))}));d.propTypes={color:s.a.string,size:s.a.oneOfType([s.a.string,s.a.number])},d.displayName="User",i.a=d},297:function(e,i,n){"use strict";var t=n(0),r=n.n(t),o=n(6),s=n.n(o);function a(){return(a=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function l(e,i){if(null==e)return{};var n,t,r=function(e,i){if(null==e)return{};var n,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||(r[n]=e[n]);return r}(e,i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=Object(t.forwardRef)((function(e,i){var n=e.color,t=void 0===n?"currentColor":n,o=e.size,s=void 0===o?24:o,d=l(e,["color","size"]);return r.a.createElement("svg",a({ref:i,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},d),r.a.createElement("polyline",{points:"6 9 12 15 18 9"}))}));d.propTypes={color:s.a.string,size:s.a.oneOfType([s.a.string,s.a.number])},d.displayName="ChevronDown",i.a=d},526:function(e,i,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t,r=n(0),o=(t=r)&&"object"===typeof t&&"default"in t?t.default:t,s=new(n(527)),a=s.getBrowser(),l=(s.getCPU(),s.getDevice()),d=s.getEngine(),c=s.getOS(),u=s.getUA(),m=function(e){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";return e||i},w=function(){return!("undefined"===typeof window||!window.navigator&&!navigator)&&(window.navigator||navigator)},p=function(e){var i=w();return i&&i.platform&&(-1!==i.platform.indexOf(e)||"MacIntel"===i.platform&&i.maxTouchPoints>1&&!window.MSStream)};function f(e){return(f="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,i){for(var n=0;n<i.length;n++){var t=i[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function v(e,i,n){return i in e?Object.defineProperty(e,i,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[i]=n,e}function g(){return(g=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function b(e,i){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);i&&(t=t.filter((function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable}))),n.push.apply(n,t)}return n}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function O(e,i){return(O=Object.setPrototypeOf||function(e,i){return e.__proto__=i,e})(e,i)}function E(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var x="mobile",k="tablet",T="smarttv",S="console",j="wearable",N=void 0,L="Chrome",C="Firefox",P="Opera",A="Yandex",M="Safari",V="Internet Explorer",z="Edge",B="Chromium",F="IE",W="Mobile Safari",_="iOS",R="Android",I="Windows Phone",D="Windows",q="Mac OS",U={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},G=function(e,i,n,t){return function(e){for(var i=1;i<arguments.length;i++){var n=null!=arguments[i]?arguments[i]:{};i%2?b(n,!0).forEach((function(i){v(e,i,n[i])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(n).forEach((function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))}))}return e}({},e,{vendor:m(i.vendor),model:m(i.model),os:m(n.name),osVersion:m(n.version),ua:m(t)})},H=function(e){switch(e){case x:return{isMobile:!0};case k:return{isTablet:!0};case T:return{isSmartTV:!0};case S:return{isConsole:!0};case j:return{isWearable:!0};case N:return{isBrowser:!0};default:return U}}(l.type);var X=function(){return c.name===D&&"10"===c.version&&("string"===typeof u&&-1!==u.indexOf("Edg/"))},Q=function(){return a.name===z},Y=function(){return p("iPad")},$=l.type===T,K=l.type===S,Z=l.type===j,J=a.name===W||Y(),ee=a.name===B,ie=function(){switch(l.type){case x:case k:return!0;default:return!1}}()||Y(),ne=l.type===x,te=l.type===k||Y(),re=l.type===N,oe=c.name===R,se=c.name===I,ae=c.name===_||Y(),le=a.name===L,de=a.name===C,ce=a.name===M||a.name===W,ue=a.name===P,me=a.name===V||a.name===F,we=m(c.version),pe=m(c.name),fe=m(a.version),he=m(a.major),ve=m(a.name),ge=m(l.vendor),be=m(l.model),ye=m(d.name),Oe=m(d.version),Ee=m(u),xe=Q()||X(),ke=a.name===A,Te=m(l.type,"browser"),Se=function(){var e=w();return e&&(/iPad|iPhone|iPod/.test(e.platform)||"MacIntel"===e.platform&&e.maxTouchPoints>1)&&!window.MSStream}(),je=Y(),Ne=p("iPhone"),Le=p("iPod"),Ce=function(){var e=w(),i=e&&e.userAgent.toLowerCase();return"string"===typeof i&&/electron/.test(i)}(),Pe=X(),Ae=Q(),Me=c.name===D,Ve=c.name===q;i.AndroidView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return oe?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.BrowserView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return re?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.ConsoleView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return K?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.CustomView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return e.condition?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.IEView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return me?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.IOSView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return ae?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.MobileOnlyView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return ne?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.MobileView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return ie?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.SmartTVView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return $?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.TabletView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return te?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.WearableView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return Z?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.WinPhoneView=function(e){var i=e.renderWithFragment,n=e.children,t=e.viewClassName,s=e.style;return se?i?o.createElement(r.Fragment,null,n):o.createElement("div",{className:t,style:s},n):null},i.browserName=ve,i.browserVersion=he,i.deviceDetect=function(){var e=H.isBrowser,i=H.isMobile,n=H.isTablet,t=H.isSmartTV,r=H.isConsole,o=H.isWearable;return e?function(e,i,n,t,r){return{isBrowser:e,browserMajorVersion:m(i.major),browserFullVersion:m(i.version),browserName:m(i.name),engineName:m(n.name),engineVersion:m(n.version),osName:m(t.name),osVersion:m(t.version),userAgent:m(r)}}(e,a,d,c,u):t?function(e,i,n,t){return{isSmartTV:e,engineName:m(i.name),engineVersion:m(i.version),osName:m(n.name),osVersion:m(n.version),userAgent:m(t)}}(t,d,c,u):r?function(e,i,n,t){return{isConsole:e,engineName:m(i.name),engineVersion:m(i.version),osName:m(n.name),osVersion:m(n.version),userAgent:m(t)}}(r,d,c,u):i||n?G(H,l,c,u):o?function(e,i,n,t){return{isWearable:e,engineName:m(i.name),engineVersion:m(i.version),osName:m(n.name),osVersion:m(n.version),userAgent:m(t)}}(o,d,c,u):void 0},i.deviceType=Te,i.engineName=ye,i.engineVersion=Oe,i.fullBrowserVersion=fe,i.getUA=Ee,i.isAndroid=oe,i.isBrowser=re,i.isChrome=le,i.isChromium=ee,i.isConsole=K,i.isEdge=xe,i.isEdgeChromium=Pe,i.isElectron=Ce,i.isFirefox=de,i.isIE=me,i.isIOS=ae,i.isIOS13=Se,i.isIPad13=je,i.isIPhone13=Ne,i.isIPod13=Le,i.isLegacyEdge=Ae,i.isMacOs=Ve,i.isMobile=ie,i.isMobileOnly=ne,i.isMobileSafari=J,i.isOpera=ue,i.isSafari=ce,i.isSmartTV=$,i.isTablet=te,i.isWearable=Z,i.isWinPhone=se,i.isWindows=Me,i.isYandex=ke,i.mobileModel=be,i.mobileVendor=ge,i.osName=pe,i.osVersion=we,i.withOrientationChange=function(e){return function(i){function n(e){var i,t,r;return function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,n),t=this,(i=!(r=y(n).call(this,e))||"object"!==typeof r&&"function"!==typeof r?E(t):r).isEventListenerAdded=!1,i.handleOrientationChange=i.handleOrientationChange.bind(E(i)),i.onOrientationChange=i.onOrientationChange.bind(E(i)),i.onPageLoad=i.onPageLoad.bind(E(i)),i.state={isLandscape:!1,isPortrait:!1},i}var t,r,s;return function(e,i){if("function"!==typeof i&&null!==i)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),i&&O(e,i)}(n,i),t=n,(r=[{key:"handleOrientationChange",value:function(){this.isEventListenerAdded||(this.isEventListenerAdded=!0);var e=window.innerWidth>window.innerHeight?90:0;this.setState({isPortrait:0===e,isLandscape:90===e})}},{key:"onOrientationChange",value:function(){this.handleOrientationChange()}},{key:"onPageLoad",value:function(){this.handleOrientationChange()}},{key:"componentDidMount",value:function(){void 0!==("undefined"===typeof window?"undefined":f(window))&&ie&&(this.isEventListenerAdded?window.removeEventListener("load",this.onPageLoad,!1):(this.handleOrientationChange(),window.addEventListener("load",this.onPageLoad,!1)),window.addEventListener("resize",this.onOrientationChange,!1))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onOrientationChange,!1)}},{key:"render",value:function(){return o.createElement(e,g({},this.props,{isLandscape:this.state.isLandscape,isPortrait:this.state.isPortrait}))}}])&&h(t.prototype,r),s&&h(t,s),n}(o.Component)}},527:function(e,i,n){var t;!function(r,o){"use strict";var s="model",a="name",l="type",d="vendor",c="version",u="mobile",m="tablet",w="smarttv",p={extend:function(e,i){var n={};for(var t in e)i[t]&&i[t].length%2===0?n[t]=i[t].concat(e[t]):n[t]=e[t];return n},has:function(e,i){return"string"===typeof e&&-1!==i.toLowerCase().indexOf(e.toLowerCase())},lowerize:function(e){return e.toLowerCase()},major:function(e){return"string"===typeof e?e.replace(/[^\d\.]/g,"").split(".")[0]:void 0},trim:function(e){return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},f={rgx:function(e,i){for(var n,t,r,o,s,a,l=0;l<i.length&&!s;){var d=i[l],c=i[l+1];for(n=t=0;n<d.length&&!s;)if(s=d[n++].exec(e))for(r=0;r<c.length;r++)a=s[++t],"object"===typeof(o=c[r])&&o.length>0?2==o.length?"function"==typeof o[1]?this[o[0]]=o[1].call(this,a):this[o[0]]=o[1]:3==o.length?"function"!==typeof o[1]||o[1].exec&&o[1].test?this[o[0]]=a?a.replace(o[1],o[2]):void 0:this[o[0]]=a?o[1].call(this,a,o[2]):void 0:4==o.length&&(this[o[0]]=a?o[3].call(this,a.replace(o[1],o[2])):void 0):this[o]=a||void 0;l+=2}},str:function(e,i){for(var n in i)if("object"===typeof i[n]&&i[n].length>0){for(var t=0;t<i[n].length;t++)if(p.has(i[n][t],e))return"?"===n?void 0:n}else if(p.has(i[n],e))return"?"===n?void 0:n;return e}},h={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}},v={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[a,c],[/(opios)[\/\s]+([\w\.]+)/i],[[a,"Opera Mini"],c],[/\s(opr)\/([\w\.]+)/i],[[a,"Opera"],c],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,/(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i],[a,c],[/(konqueror)\/([\w\.]+)/i],[[a,"Konqueror"],c],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[a,"IE"],c],[/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],[[a,"Edge"],c],[/(yabrowser)\/([\w\.]+)/i],[[a,"Yandex"],c],[/(Avast)\/([\w\.]+)/i],[[a,"Avast Secure Browser"],c],[/(AVG)\/([\w\.]+)/i],[[a,"AVG Secure Browser"],c],[/(puffin)\/([\w\.]+)/i],[[a,"Puffin"],c],[/(focus)\/([\w\.]+)/i],[[a,"Firefox Focus"],c],[/(opt)\/([\w\.]+)/i],[[a,"Opera Touch"],c],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[a,"UCBrowser"],c],[/(comodo_dragon)\/([\w\.]+)/i],[[a,/_/g," "],c],[/(windowswechat qbcore)\/([\w\.]+)/i],[[a,"WeChat(Win) Desktop"],c],[/(micromessenger)\/([\w\.]+)/i],[[a,"WeChat"],c],[/(brave)\/([\w\.]+)/i],[[a,"Brave"],c],[/(qqbrowserlite)\/([\w\.]+)/i],[a,c],[/(QQ)\/([\d\.]+)/i],[a,c],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[a,c],[/(baiduboxapp)[\/\s]?([\w\.]+)/i],[a,c],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[a,c],[/(MetaSr)[\/\s]?([\w\.]+)/i],[a],[/(LBBROWSER)/i],[a],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[c,[a,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[c,[a,"Facebook"]],[/safari\s(line)\/([\w\.]+)/i,/android.+(line)\/([\w\.]+)\/iab/i],[a,c],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[c,[a,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[a,/(.+)/,"$1 WebView"],c],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[a,/(.+(?:g|us))(.+)/,"$1 $2"],c],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[c,[a,"Android Browser"]],[/(sailfishbrowser)\/([\w\.]+)/i],[[a,"Sailfish Browser"],c],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[a,c],[/(dolfin)\/([\w\.]+)/i],[[a,"Dolphin"],c],[/(qihu|qhbrowser|qihoobrowser|360browser)/i],[[a,"360 Browser"]],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[a,"Chrome"],c],[/(coast)\/([\w\.]+)/i],[[a,"Opera Coast"],c],[/fxios\/([\w\.-]+)/i],[c,[a,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[c,[a,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[c,a],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[a,"GSA"],c],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[a,[c,f.str,h.browser.oldsafari.version]],[/(webkit|khtml)\/([\w\.]+)/i],[a,c],[/(navigator|netscape)\/([\w\.-]+)/i],[[a,"Netscape"],c],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[a,c]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[["architecture","amd64"]],[/(ia32(?=;))/i],[["architecture",p.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[["architecture","ia32"]],[/windows\s(ce|mobile);\sppc;/i],[["architecture","arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[["architecture",/ower/,"",p.lowerize]],[/(sun4\w)[;\)]/i],[["architecture","sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[["architecture",p.lowerize]]],device:[[/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],[s,d,[l,m]],[/applecoremedia\/[\w\.]+ \((ipad)/],[s,[d,"Apple"],[l,m]],[/(apple\s{0,1}tv)/i],[[s,"Apple TV"],[d,"Apple"],[l,w]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[d,s,[l,m]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[s,[d,"Amazon"],[l,m]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[s,f.str,h.device.amazon.model],[d,"Amazon"],[l,u]],[/android.+aft([bms])\sbuild/i],[s,[d,"Amazon"],[l,w]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[s,d,[l,u]],[/\((ip[honed|\s\w*]+);/i],[s,[d,"Apple"],[l,u]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[d,s,[l,u]],[/\(bb10;\s(\w+)/i],[s,[d,"BlackBerry"],[l,u]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i],[s,[d,"Asus"],[l,m]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[d,"Sony"],[s,"Xperia Tablet"],[l,m]],[/android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[s,[d,"Sony"],[l,u]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[d,s,[l,"console"]],[/android.+;\s(shield)\sbuild/i],[s,[d,"Nvidia"],[l,"console"]],[/(playstation\s[34portablevi]+)/i],[s,[d,"Sony"],[l,"console"]],[/(sprint\s(\w+))/i],[[d,f.str,h.device.sprint.vendor],[s,f.str,h.device.sprint.model],[l,u]],[/(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[d,[s,/_/g," "],[l,u]],[/(nexus\s9)/i],[s,[d,"HTC"],[l,m]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i],[s,[d,"Huawei"],[l,u]],[/android.+(bah2?-a?[lw]\d{2})/i],[s,[d,"Huawei"],[l,m]],[/(microsoft);\s(lumia[\s\w]+)/i],[d,s,[l,u]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[s,[d,"Microsoft"],[l,"console"]],[/(kin\.[onetw]{3})/i],[[s,/\./g," "],[d,"Microsoft"],[l,u]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[s,[d,"Motorola"],[l,u]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[s,[d,"Motorola"],[l,m]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[d,p.trim],[s,p.trim],[l,w]],[/hbbtv.+maple;(\d+)/i],[[s,/^/,"SmartTV"],[d,"Samsung"],[l,w]],[/\(dtv[\);].+(aquos)/i],[s,[d,"Sharp"],[l,w]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[d,"Samsung"],s,[l,m]],[/smart-tv.+(samsung)/i],[d,[l,w],s],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[d,"Samsung"],s,[l,u]],[/sie-(\w*)/i],[s,[d,"Siemens"],[l,u]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[d,"Nokia"],s,[l,u]],[/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],[s,[d,"Acer"],[l,m]],[/android.+([vl]k\-?\d{3})\s+build/i],[s,[d,"LG"],[l,m]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[d,"LG"],s,[l,m]],[/(lg) netcast\.tv/i],[d,s,[l,w]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[s,[d,"LG"],[l,u]],[/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],[d,s,[l,m]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[s,[d,"Lenovo"],[l,m]],[/(lenovo)[_\s-]?([\w-]+)/i],[d,s,[l,u]],[/linux;.+((jolla));/i],[d,s,[l,u]],[/((pebble))app\/[\d\.]+\s/i],[d,s,[l,"wearable"]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[d,s,[l,u]],[/crkey/i],[[s,"Chromecast"],[d,"Google"],[l,w]],[/android.+;\s(glass)\s\d/i],[s,[d,"Google"],[l,"wearable"]],[/android.+;\s(pixel c)[\s)]/i],[s,[d,"Google"],[l,m]],[/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],[s,[d,"Google"],[l,u]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],[[s,/_/g," "],[d,"Xiaomi"],[l,u]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],[[s,/_/g," "],[d,"Xiaomi"],[l,m]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[s,[d,"Meizu"],[l,u]],[/(mz)-([\w-]{2,})/i],[[d,"Meizu"],s,[l,u]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})[\s)]/i],[s,[d,"OnePlus"],[l,u]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[s,[d,"RCA"],[l,m]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[s,[d,"Dell"],[l,m]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[s,[d,"Verizon"],[l,m]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[d,"Barnes & Noble"],s,[l,m]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[s,[d,"NuVision"],[l,m]],[/android.+;\s(k88)\sbuild/i],[s,[d,"ZTE"],[l,m]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[s,[d,"Swiss"],[l,u]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[s,[d,"Swiss"],[l,m]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[s,[d,"Zeki"],[l,m]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[d,"Dragon Touch"],s,[l,m]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[s,[d,"Insignia"],[l,m]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[s,[d,"NextBook"],[l,m]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[d,"Voice"],s,[l,u]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[d,"LvTel"],s,[l,u]],[/android.+;\s(PH-1)\s/i],[s,[d,"Essential"],[l,u]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[s,[d,"Envizen"],[l,m]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[d,s,[l,m]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[s,[d,"MachSpeed"],[l,m]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[d,s,[l,m]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[s,[d,"Rotor"],[l,m]],[/android.+(KS(.+))\s+build/i],[s,[d,"Amazon"],[l,m]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[d,s,[l,m]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[l,p.lowerize],d,s],[/[\s\/\(](smart-?tv)[;\)]/i],[[l,w]],[/(android[\w\.\s\-]{0,9});.+build/i],[s,[d,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[c,[a,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[c,[a,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[a,c],[/rv\:([\w\.]{1,9}).+(gecko)/i],[c,a]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[a,c],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[a,[c,f.str,h.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[a,"Windows"],[c,f.str,h.os.windows.version]],[/\((bb)(10);/i],[[a,"BlackBerry"],c],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen|kaios)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i],[a,c],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[a,"Symbian"],c],[/\((series40);/i],[a],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[a,"Firefox OS"],c],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[a,c],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[a,"Chromium OS"],c],[/(sunos)\s?([\w\.\d]*)/i],[[a,"Solaris"],c],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[a,c],[/(haiku)\s(\w+)/i],[a,c],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[c,/_/g,"."],[a,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[a,"Mac OS"],[c,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,/(unix)\s?([\w\.]*)/i],[a,c]]},g=function e(i,n){if("object"===typeof i&&(n=i,i=void 0),!(this instanceof e))return new e(i,n).getResult();var t=i||(r&&r.navigator&&r.navigator.userAgent?r.navigator.userAgent:""),o=n?p.extend(v,n):v;return this.getBrowser=function(){var e={name:void 0,version:void 0};return f.rgx.call(e,t,o.browser),e.major=p.major(e.version),e},this.getCPU=function(){var e={architecture:void 0};return f.rgx.call(e,t,o.cpu),e},this.getDevice=function(){var e={vendor:void 0,model:void 0,type:void 0};return f.rgx.call(e,t,o.device),e},this.getEngine=function(){var e={name:void 0,version:void 0};return f.rgx.call(e,t,o.engine),e},this.getOS=function(){var e={name:void 0,version:void 0};return f.rgx.call(e,t,o.os),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return t},this.setUA=function(e){return t=e,this},this};g.VERSION="0.7.21",g.BROWSER={NAME:a,MAJOR:"major",VERSION:c},g.CPU={ARCHITECTURE:"architecture"},g.DEVICE={MODEL:s,VENDOR:d,TYPE:l,CONSOLE:"console",MOBILE:u,SMARTTV:w,TABLET:m,WEARABLE:"wearable",EMBEDDED:"embedded"},g.ENGINE={NAME:a,VERSION:c},g.OS={NAME:a,VERSION:c},"undefined"!==typeof i?("undefined"!==typeof e&&e.exports&&(i=e.exports=g),i.UAParser=g):void 0===(t=function(){return g}.call(i,n,i,e))||(e.exports=t);var b=r&&(r.jQuery||r.Zepto);if(b&&!b.ua){var y=new g;b.ua=y.getResult(),b.ua.get=function(){return y.getUA()},b.ua.set=function(e){y.setUA(e);var i=y.getResult();for(var n in i)b.ua[n]=i[n]}}}("object"===typeof window?window:this)},530:function(e,i,n){"use strict";var t=n(0),r=n.n(t),o=n(6),s=n.n(o);function a(){return(a=Object.assign||function(e){for(var i=1;i<arguments.length;i++){var n=arguments[i];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(e[t]=n[t])}return e}).apply(this,arguments)}function l(e,i){if(null==e)return{};var n,t,r=function(e,i){if(null==e)return{};var n,t,r={},o=Object.keys(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||(r[n]=e[n]);return r}(e,i);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(t=0;t<o.length;t++)n=o[t],i.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=Object(t.forwardRef)((function(e,i){var n=e.color,t=void 0===n?"currentColor":n,o=e.size,s=void 0===o?24:o,d=l(e,["color","size"]);return r.a.createElement("svg",a({ref:i,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},d),r.a.createElement("path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}),r.a.createElement("polyline",{points:"16 17 21 12 16 7"}),r.a.createElement("line",{x1:"21",y1:"12",x2:"9",y2:"12"}))}));d.propTypes={color:s.a.string,size:s.a.oneOfType([s.a.string,s.a.number])},d.displayName="LogOut",i.a=d}}]);
//# sourceMappingURL=17.793f6ddc.chunk.js.map