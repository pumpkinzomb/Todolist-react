(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,o){e.exports=o(28)},,,,,,function(e,t,o){},,function(e,t,o){},,function(e,t,o){},,function(e,t,o){},,function(e,t,o){},,function(e,t,o){},,function(e,t,o){"use strict";o.r(t);var n=o(0),c=o.n(n),a=o(7),r=o.n(a),l=o(9),s=o(8),i=o(1),u=o(2),d=o(4),m=o(3),h=o(5),p=(o(16),o(18),function(e){var t=e.form,o=e.children;return c.a.createElement("main",{className:"todo-list-template"},c.a.createElement("div",{className:"title"},"\uc624\ub298 \ud560 \uc77c"),c.a.createElement("section",{className:"form-wrapper"},t),c.a.createElement("section",{className:"todos-wrapper"},o))}),f=(o(20),function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.checked!==e.checked}},{key:"render",value:function(){var e=this.props,t=e.text,o=e.checked,n=e.id,a=e.onToggle,r=e.onRemove,l=e.color;return c.a.createElement("div",{className:"todo-item",onClick:function(){return a(n)}},c.a.createElement("div",{className:"remove",onClick:function(e){e.stopPropagation(),r(n)}}," \xd7 "),c.a.createElement("div",{className:"todo-text ".concat(o?"checked":""," ").concat(l)},c.a.createElement("div",null,t)),o&&c.a.createElement("div",{className:"check-mark"},"\u2713"))}}]),t}(n.Component)),v=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return this.props.todos!==e.todos}},{key:"render",value:function(){var e=this.props,t=e.todos,o=e.onToggle,n=e.onRemove;return c.a.createElement("div",null,t.map(function(e){return c.a.createElement(f,Object.assign({},e,{onToggle:o,onRemove:n,key:e.id}))}))}}]),t}(n.Component),k=(o(22),o(24),function(e){var t=e.color,o=e.onSelect,n=e.selected;return c.a.createElement("span",{className:"palette-".concat(t," color ").concat(n?"selected":""),onClick:function(){o(t)}})}),C=function(e){function t(){return Object(i.a)(this,t),Object(d.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.props,t=e.colors,o=e.selected,n=e.onSelect;return c.a.createElement("div",{className:"palette"},t.map(function(e){return c.a.createElement(k,{color:e,selected:o,onSelect:n,key:e})}))}}]),t}(n.Component),b=function(e){var t=e.value,o=e.onChange,n=e.onCreate,a=e.onKeyPress,r=e.colors,l=e.onColor,s=e.selected,i=e.onSelect;return c.a.createElement("div",{className:"form"},c.a.createElement("input",{value:t,onChange:o,onKeyPress:a,className:l}),c.a.createElement(C,{colors:r,selected:s,onSelect:i}),c.a.createElement("div",{className:"create-button",onClick:n},"\ucd94\uac00"))},g=function(e){function t(){var e,o;Object(i.a)(this,t);for(var n=arguments.length,c=new Array(n),a=0;a<n;a++)c[a]=arguments[a];return(o=Object(d.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(c)))).state={input:"",todos:[{id:0,text:"\ub9ac\uc561\ud2b8 \uc18c\uac1c",checked:!1,color:""},{id:1,text:"\ub9ac\uc561\ud2b8 \uc18c\uac1c",checked:!0,color:""},{id:2,text:"\ub9ac\uc561\ud2b8 \uc18c\uac1c",checked:!1,color:""}],colors:["color1","color2","color3","color4"],selectedColor:""},o._onChange=function(e){o.setState({input:e.target.value})},o._onCreate=function(){var e=o.state,t=e.input,n=e.todos,c=e.selectedColor,a=n[n.length-1].id;o.setState({input:"",todos:n.concat({id:++a,text:t,checked:!1,color:c}),selectedColor:""})},o._onKeyPress=function(e){"enter"===e.key&&o._onCreate()},o._onToggle=function(e){var t=o.state.todos,n=t.findIndex(function(t){return t.id===e}),c=t[n],a=Object(s.a)(t);a[n]=Object(l.a)({},c,{checked:!c.checked}),o.setState({todos:a})},o._onRemove=function(e){var t=o.state.todos;o.setState({todos:t.filter(function(t){return t.id!==e})})},o._onSelect=function(e){o.setState({selectedColor:e})},o}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state,t=e.input,o=e.todos,n=e.colors,a=e.selectedColor,r=this._onChange,l=this._onCreate,s=this._onKeyPress,i=this._onToggle,u=this._onRemove,d=this._onSelect;return c.a.createElement(p,{form:c.a.createElement(b,{value:t,onKeyPress:s,onChange:r,onCreate:l,colors:n,onColor:a,onSelect:d})},c.a.createElement(v,{todos:o,onToggle:i,onRemove:u}))}}]),t}(n.Component);o(26),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[10,2,1]]]);
//# sourceMappingURL=main.ca3df8cb.chunk.js.map