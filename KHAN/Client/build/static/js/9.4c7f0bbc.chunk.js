(this["webpackJsonpshreyu-react"]=this["webpackJsonpshreyu-react"]||[]).push([[9],{302:function(e,t,r){"use strict";r.r(t);var n=r(27),a=r(28),o=r(44),l=r(29),i=r(30),c=r(0),s=r.n(c),u=r(32),h=r(33),d=r(212),f=r.n(d),m=(r(133),r(6)),p=r.n(m);function b(){return(b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function v(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var g=Object(c.forwardRef)((function(e,t){var r=e.color,n=void 0===r?"currentColor":r,a=e.size,o=void 0===a?24:a,l=v(e,["color","size"]);return s.a.createElement("svg",b({ref:t,xmlns:"http://www.w3.org/2000/svg",width:o,height:o,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),s.a.createElement("circle",{cx:"12",cy:"12",r:"10"}),s.a.createElement("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),s.a.createElement("line",{x1:"9",y1:"9",x2:"15",y2:"15"}))}));g.propTypes={color:p.a.string,size:p.a.oneOfType([p.a.string,p.a.number])},g.displayName="XCircle";var y=g,O=function(e){Object(l.a)(r,e);var t=Object(i.a)(r);function r(e){var a;return Object(n.a)(this,r),(a=t.call(this,e)).componentDidMount=function(){document.addEventListener("mousedown",a.handleOtherClick,!1)},a.componentWillUnmount=function(){document.removeEventListener("mousedown",a.handleOtherClick,!1)},a.handleClose=function(e){e.preventDefault(),a.hide()},a.handleOtherClick=function(e){a.rightBarNodeRef.contains(e.target)||a.hide()},a.handleClose=a.handleClose.bind(Object(o.a)(a)),a.state={},a}return Object(a.a)(r,[{key:"hide",value:function(){document.body.classList.remove("right-bar-enabled")}},{key:"render",value:function(){var e=this,t=this.props.title,r=this.props.children||null;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"right-bar",ref:function(t){return e.rightBarNodeRef=t}},s.a.createElement("div",{className:"rightbar-title"},s.a.createElement(h.b,{to:"#",className:"right-bar-toggle float-right",onClick:this.handleClose},s.a.createElement(y,null)),s.a.createElement("h5",{className:"m-0"},t)),s.a.createElement(f.a,null,r)),s.a.createElement("div",{className:"rightbar-overlay"}))}}]),r}(c.Component);O.defaultProps={title:"Right Sidebar"};t.default=Object(u.b)()(O)}}]);
//# sourceMappingURL=9.4c7f0bbc.chunk.js.map