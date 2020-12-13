/*! For license information please see 26.2c9622c1.chunk.js.LICENSE.txt */
(this["webpackJsonpshreyu-react"]=this["webpackJsonpshreyu-react"]||[]).push([[26],{136:function(e,t,a){var n;!function(){"use strict";var a={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var i=r.apply(null,n);i&&e.push(i)}else if("object"===o)for(var c in n)a.call(n,c)&&n[c]&&e.push(c)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(n=function(){return r}.apply(t,[]))||(e.exports=n)}()},137:function(e,t,a){"use strict";a.r(t),a.d(t,"getScrollbarWidth",(function(){return i})),a.d(t,"setScrollbarWidth",(function(){return c})),a.d(t,"isBodyOverflowing",(function(){return s})),a.d(t,"getOriginalBodyPadding",(function(){return l})),a.d(t,"conditionallyUpdateScrollbar",(function(){return u})),a.d(t,"setGlobalCssModule",(function(){return d})),a.d(t,"mapToCssModules",(function(){return h})),a.d(t,"omit",(function(){return m})),a.d(t,"pick",(function(){return p})),a.d(t,"warnOnce",(function(){return b})),a.d(t,"deprecated",(function(){return y})),a.d(t,"DOMElement",(function(){return v})),a.d(t,"targetPropType",(function(){return E})),a.d(t,"tagPropType",(function(){return S})),a.d(t,"TransitionTimeouts",(function(){return N})),a.d(t,"TransitionPropTypeKeys",(function(){return L})),a.d(t,"TransitionStatuses",(function(){return T})),a.d(t,"keyCodes",(function(){return w})),a.d(t,"PopperPlacements",(function(){return k})),a.d(t,"canUseDOM",(function(){return O})),a.d(t,"isReactRefObj",(function(){return j})),a.d(t,"toNumber",(function(){return C})),a.d(t,"isObject",(function(){return D})),a.d(t,"isFunction",(function(){return M})),a.d(t,"findDOMElements",(function(){return z})),a.d(t,"isArrayOrNodeList",(function(){return F})),a.d(t,"getTarget",(function(){return A})),a.d(t,"defaultToggleEvents",(function(){return B})),a.d(t,"addMultipleEventListeners",(function(){return W})),a.d(t,"focusableElements",(function(){return P}));var n,r=a(5),o=a.n(r);function i(){var e=document.createElement("div");e.style.position="absolute",e.style.top="-9999px",e.style.width="50px",e.style.height="50px",e.style.overflow="scroll",document.body.appendChild(e);var t=e.offsetWidth-e.clientWidth;return document.body.removeChild(e),t}function c(e){document.body.style.paddingRight=e>0?e+"px":null}function s(){return document.body.clientWidth<window.innerWidth}function l(){var e=window.getComputedStyle(document.body,null);return parseInt(e&&e.getPropertyValue("padding-right")||0,10)}function u(){var e=i(),t=document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top")[0],a=t?parseInt(t.style.paddingRight||0,10):0;s()&&c(a+e)}function d(e){n=e}function h(e,t){return void 0===e&&(e=""),void 0===t&&(t=n),t?e.split(" ").map((function(e){return t[e]||e})).join(" "):e}function m(e,t){var a={};return Object.keys(e).forEach((function(n){-1===t.indexOf(n)&&(a[n]=e[n])})),a}function p(e,t){for(var a,n=Array.isArray(t)?t:[t],r=n.length,o={};r>0;)o[a=n[r-=1]]=e[a];return o}var f={};function b(e){f[e]||("undefined"!==typeof console&&console.error(e),f[e]=!0)}function y(e,t){return function(a,n,r){null!==a[n]&&"undefined"!==typeof a[n]&&b('"'+n+'" property of "'+r+'" has been deprecated.\n'+t);for(var o=arguments.length,i=new Array(o>3?o-3:0),c=3;c<o;c++)i[c-3]=arguments[c];return e.apply(void 0,[a,n,r].concat(i))}}var g="object"===typeof window&&window.Element||function(){};function v(e,t,a){if(!(e[t]instanceof g))return new Error("Invalid prop `"+t+"` supplied to `"+a+"`. Expected prop to be an instance of Element. Validation failed.")}var E=o.a.oneOfType([o.a.string,o.a.func,v,o.a.shape({current:o.a.any})]),S=o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func}),o.a.arrayOf(o.a.oneOfType([o.a.func,o.a.string,o.a.shape({$$typeof:o.a.symbol,render:o.a.func})]))]),N={Fade:150,Collapse:350,Modal:300,Carousel:600},L=["in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","onEnter","onEntering","onEntered","onExit","onExiting","onExited"],T={ENTERING:"entering",ENTERED:"entered",EXITING:"exiting",EXITED:"exited"},w={esc:27,space:32,enter:13,tab:9,up:38,down:40,home:36,end:35,n:78,p:80},k=["auto-start","auto","auto-end","top-start","top","top-end","right-start","right","right-end","bottom-end","bottom","bottom-start","left-end","left","left-start"],O=!("undefined"===typeof window||!window.document||!window.document.createElement);function j(e){return!(!e||"object"!==typeof e)&&"current"in e}function x(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}function C(e){var t=typeof e;if("number"===t)return e;if("symbol"===t||"object"===t&&"[object Symbol]"===x(e))return NaN;if(D(e)){var a="function"===typeof e.valueOf?e.valueOf():e;e=D(a)?""+a:a}if("string"!==t)return 0===e?e:+e;e=e.replace(/^\s+|\s+$/g,"");var n=/^0b[01]+$/i.test(e);return n||/^0o[0-7]+$/i.test(e)?parseInt(e.slice(2),n?2:8):/^[-+]0x[0-9a-f]+$/i.test(e)?NaN:+e}function D(e){var t=typeof e;return null!=e&&("object"===t||"function"===t)}function M(e){if(!D(e))return!1;var t=x(e);return"[object Function]"===t||"[object AsyncFunction]"===t||"[object GeneratorFunction]"===t||"[object Proxy]"===t}function z(e){if(j(e))return e.current;if(M(e))return e();if("string"===typeof e&&O){var t=document.querySelectorAll(e);if(t.length||(t=document.querySelectorAll("#"+e)),!t.length)throw new Error("The target '"+e+"' could not be identified in the dom, tip: check spelling");return t}return e}function F(e){return null!==e&&(Array.isArray(e)||O&&"number"===typeof e.length)}function A(e,t){var a=z(e);return t?F(a)?a:null===a?[]:[a]:F(a)?a[0]:a}var B=["touchstart","click"];function W(e,t,a,n){var r=e;F(r)||(r=[r]);var o=a;if("string"===typeof o&&(o=o.split(/\s+/)),!F(r)||"function"!==typeof t||!Array.isArray(o))throw new Error("\n      The first argument of this function must be DOM node or an array on DOM nodes or NodeList.\n      The second must be a function.\n      The third is a string or an array of strings that represents DOM events\n    ");return Array.prototype.forEach.call(o,(function(e){Array.prototype.forEach.call(r,(function(a){a.addEventListener(e,t,n)}))})),function(){Array.prototype.forEach.call(o,(function(e){Array.prototype.forEach.call(r,(function(a){a.removeEventListener(e,t,n)}))}))}}var P=["a[href]","area[href]","input:not([disabled]):not([type=hidden])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","object","embed","[tabindex]:not(.modal)","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])']},147:function(e,t,a){"use strict";var n=a(8),r=a(16),o=a(0),i=a.n(o),c=a(5),s=a.n(c),l=a(136),u=a.n(l),d=a(137),h={tag:d.tagPropType,fluid:s.a.oneOfType([s.a.bool,s.a.string]),className:s.a.string,cssModule:s.a.object},m=function(e){var t=e.className,a=e.cssModule,o=e.fluid,c=e.tag,s=Object(r.a)(e,["className","cssModule","fluid","tag"]),l="container";!0===o?l="container-fluid":o&&(l="container-"+o);var h=Object(d.mapToCssModules)(u()(t,l),a);return i.a.createElement(c,Object(n.a)({},s,{className:h}))};m.propTypes=h,m.defaultProps={tag:"div"},t.a=m},242:function(e,t,a){"use strict";var n=a(44),r=a(45),o=a(64),i=a(46),c=a(47),s=a(0),l=a.n(s),u=a(37),d=a(30),h=a(31),m=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).componentDidMount=function(){r._loadStateFromProps()},r.componentDidUpdate=function(e,t){e!==r.props&&r._loadStateFromProps()},r.handleClose=function(e){e.preventDefault(),r.props.hideRightSidebar()},r.changeLayout=function(e){switch(e.currentTarget.value){case"horizontal":r.setState({isHorizontalLayout:!r.state.isHorizontalLayout,isCondensed:!1,isDetachedLayout:!1}),r.props.changeLayout(h.a);break;default:r.setState({isHorizontalLayout:!1,isCondensed:!1,isDetachedLayout:!1}),r.props.changeLayout(h.b)}},r.changeWidthMode=function(e){switch(e.currentTarget.value){case"boxed":r.setState({isBoxed:!0}),r.props.changeLayoutWidth(h.c);break;default:r.setState({isBoxed:!1}),r.props.changeLayoutWidth(h.d)}},r.changeTheme=function(e){switch(e.currentTarget.value){case"dark":r.setState({isLight:!1,isDark:!0}),r.props.changeSidebarTheme(h.e);break;default:r.setState({isLight:!0,isDark:!1}),r.props.changeSidebarTheme(h.f)}},r.changeLeftSiderbarType=function(e){switch(e.currentTarget.value){case"condensed":r.setState({isCondensed:!0,isSidebarScrollable:!1,isLight:!1,isDark:!1}),r.props.changeSidebarType(h.g);break;case"scrollable":r.setState({isCondensed:!1,isSidebarScrollable:!0}),r.props.changeSidebarType(h.i);break;default:r.setState({isCondensed:!1,isSidebarScrollable:!1}),r.props.changeSidebarType(h.h)}},r.handleClose=r.handleClose.bind(Object(o.a)(r)),r.changeLayout=r.changeLayout.bind(Object(o.a)(r)),r.changeWidthMode=r.changeWidthMode.bind(Object(o.a)(r)),r.changeTheme=r.changeTheme.bind(Object(o.a)(r)),r.changeLeftSiderbarType=r.changeLeftSiderbarType.bind(Object(o.a)(r)),r.state={isHorizontalLayout:!1,isBoxed:!1,isSidebarScrollable:!1,isCondensed:!1,isLight:!1,isDark:!1},r}return Object(r.a)(a,[{key:"_loadStateFromProps",value:function(){this.setState({isHorizontalLayout:this.props.layoutType===h.a,isBoxed:this.props.layoutWidth===h.c,isSidebarScrollable:this.props.leftSideBarType===h.i,isCondensed:this.props.leftSideBarType===h.g,isDark:this.props.leftSideBarTheme===h.e})}},{key:"render",value:function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"mt-2 p-2"},l.a.createElement("div",{className:"alert alert-primary",role:"alert"},l.a.createElement("strong",null,"Customize the layout, sidebar menu, etc"))),l.a.createElement("h5",{className:"pl-3 font-size-15"},"Layout"),l.a.createElement("div",{className:"pl-3"},l.a.createElement("div",{className:"pt-2"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"vertical",id:"vertical-check",onChange:this.changeLayout,checked:!this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"vertical-check"},"Vertical Layout (Default)")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"layout",value:"horizontal",id:"horizontal-check",onChange:this.changeLayout,checked:this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"horizontal-check"},"Horizontal Layout")))),l.a.createElement("h5",{className:"pl-3 pt-3 border-top font-size-15"},"Width"),l.a.createElement("div",{className:"mt-2 pl-3"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"width",value:"fluid",id:"fluid-check",checked:!this.state.isBoxed,onChange:this.changeWidthMode,disabled:this.state.isDetachedLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"fluid-check"},"Fluid")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"width",value:"boxed",id:"boxed-check",checked:this.state.isBoxed,onChange:this.changeWidthMode,disabled:this.state.isDetachedLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"boxed-check"},"Boxed"))),l.a.createElement("hr",{className:"mb-0"}),l.a.createElement("h5",{className:"pl-3 pt-3 font-size-15"},"Left Sidebar"),l.a.createElement("div",{className:"pl-3"},l.a.createElement("div",{className:"pt-2"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"default",id:"default-theme-check",checked:!this.state.isDark,onChange:this.changeTheme,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"default-theme-check"},"Default")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"theme",value:"dark",id:"dark-theme-check",onChange:this.changeTheme,checked:this.state.isDark,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"dark-theme-check"},"Dark")))),l.a.createElement("div",{className:"pl-3"},l.a.createElement("div",{className:"pt-2"},l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"fixed",id:"left-sidebar-width-fixed",checked:!this.state.isCondensed&&!this.state.isSidebarScrollable,onChange:this.changeLeftSiderbarType,disabled:this.state.isDetachedLayout||this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-fixed"},"Fixed (Default)")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"condensed",id:"left-sidebar-width-condensed",onChange:this.changeLeftSiderbarType,checked:this.state.isCondensed,disabled:this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-condensed"},"Condensed")),l.a.createElement("div",{className:"custom-control custom-switch mb-1"},l.a.createElement("input",{type:"radio",className:"custom-control-input",name:"left-sidebar-width",value:"scrollable",id:"left-sidebar-width-scrollable",onChange:this.changeLeftSiderbarType,checked:this.state.isSidebarScrollable,disabled:this.state.isHorizontalLayout}),l.a.createElement("label",{className:"custom-control-label",htmlFor:"left-sidebar-width-scrollable"},"Scrollable")))))}}]),a}(s.Component);t.a=Object(u.b)((function(e){return{showRightSidebar:e.Layout.showRightSidebar,layoutType:e.Layout.layoutType,layoutWidth:e.Layout.layoutWidth,leftSideBarTheme:e.Layout.leftSideBarTheme,leftSideBarType:e.Layout.leftSideBarType}}),{hideRightSidebar:d.B,changeLayout:d.d,changeLayoutWidth:d.e,changeSidebarType:d.g,changeSidebarTheme:d.f})(m)},629:function(e,t,a){"use strict";a.r(t);var n=a(44),r=a(45),o=a(64),i=a(46),c=a(47),s=a(0),l=a.n(s),u=a(147),d=a(37),h=a(30),m=a(31),p=a(242),f=l.a.lazy((function(){return Promise.all([a.e(0),a.e(1),a.e(2),a.e(3),a.e(6)]).then(a.bind(null,397))})),b=l.a.lazy((function(){return Promise.all([a.e(1),a.e(25)]).then(a.bind(null,625))})),y=l.a.lazy((function(){return Promise.all([a.e(4),a.e(8)]).then(a.bind(null,398))})),g=l.a.lazy((function(){return a.e(7).then(a.bind(null,396))})),v=function(){return l.a.createElement("div",{className:"text-center"})},E=function(e){Object(i.a)(a,e);var t=Object(c.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).componentDidMount=function(){r.props.changeLayout(m.a)},r.openMenu=function(e){e.preventDefault(),r.setState({isMenuOpened:!r.state.isMenuOpened})},r.openMenu=r.openMenu.bind(Object(o.a)(r)),r.state={isMenuOpened:!1},r}return Object(r.a)(a,[{key:"render",value:function(){var e=this.props.children||null;return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{id:"wrapper"},l.a.createElement(s.Suspense,{fallback:v()},l.a.createElement(f,Object.assign({openLeftMenuCallBack:this.openMenu},this.props))),l.a.createElement(s.Suspense,{fallback:v()},l.a.createElement(b,Object.assign({isMenuOpened:this.state.isMenuOpened},this.props))),l.a.createElement("div",{className:"content-page"},l.a.createElement("div",{className:"content"},l.a.createElement(u.a,{fluid:!0},l.a.createElement(s.Suspense,{fallback:v()},e))),l.a.createElement(g,null))),l.a.createElement(y,Object.assign({title:"Customize"},this.props),l.a.createElement(p.a,null)))}}]),a}(s.Component);t.default=Object(d.b)((function(e){return{layout:e.Layout,user:e.Auth.user}}),{changeLayout:h.d})(E)}}]);
//# sourceMappingURL=26.2c9622c1.chunk.js.map