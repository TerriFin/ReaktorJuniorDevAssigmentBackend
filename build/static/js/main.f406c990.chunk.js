(this["webpackJsonpreaktor-junior-dev-assigment-frontend"]=this["webpackJsonpreaktor-junior-dev-assigment-frontend"]||[]).push([[0],{28:function(e,t,n){e.exports=n(56)},29:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var a=n(11),l=(n(29),n(0)),r=n.n(l),c=n(25),u=n.n(c),m=n(6),o=n(7),i=n(10),E=n.n(i),s=function(e){var t=e.modules;return r.a.createElement("div",null,r.a.createElement("h1",null,"Modules loaded in the system:"),r.a.createElement("br",null),r.a.createElement("ol",null,t.map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(m.b,{to:e},e))}))),r.a.createElement("br",null))},d=function(){var e=Object(l.useState)({}),t=Object(a.a)(e,2),n=t[0],c=t[1],u=Object(o.e)().moduleName;Object(l.useEffect)((function(){E.a.get("/api/".concat(u)).then((function(e){window.scrollTo(0,0),c(e.data)}))}),[u]);return n?r.a.createElement("div",null,r.a.createElement("h1",null,u),r.a.createElement("br",null),r.a.createElement("p",null,n.description),r.a.createElement("br",null),r.a.createElement("h2",null,"Dependencies: "),r.a.createElement("br",null),r.a.createElement("ul",null,(n.dependencies?n.dependencies:[]).map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(m.b,{to:e},e))}))),r.a.createElement("br",null),r.a.createElement("h2",null,"Reverse Dependencies: "),r.a.createElement("ul",null,(n.reverseDependencies?n.reverseDependencies:[]).map((function(e,t){return r.a.createElement("li",{key:t},r.a.createElement(m.b,{to:e},e))}))),r.a.createElement("br",null),r.a.createElement("p",null,r.a.createElement(m.b,{className:"back",to:"/"},"Back to index")),r.a.createElement("br",null)):r.a.createElement("div",null,r.a.createElement("h1",null,u),r.a.createElement("br",null),r.a.createElement("p",null,"This module is not found in the system, sorry :("),r.a.createElement("br",null),r.a.createElement("p",null,r.a.createElement(m.b,{className:"back",to:"/"},"Back to index")),r.a.createElement("br",null))};u.a.render(r.a.createElement((function(){var e=Object(l.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1];return Object(l.useEffect)((function(){E.a.get("/api").then((function(e){window.scrollTo(0,0),c(e.data)}))}),[]),r.a.createElement("div",null,r.a.createElement(m.a,null,r.a.createElement(o.a,{exact:!0,path:"/"},r.a.createElement(s,{modules:n})),r.a.createElement(o.a,{exact:!0,path:"/:moduleName"},r.a.createElement(d,null))))}),null),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.f406c990.chunk.js.map