(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[23],{7850:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",[a("div",{ref:"infoBar",staticClass:"row q-mx-md q-gutter-sm items-center"},[a("q-select",{staticStyle:{"min-width":"200px"},attrs:{options:t.iconSets,label:"Icon Set","emit-value":""},model:{value:t.iconSet,callback:function(e){t.iconSet=e},expression:"iconSet"}}),a("q-separator",{attrs:{vertical:"",inset:""}}),a("span",[t._v("Count: "+t._s(t.pagination.total))]),a("q-separator",{attrs:{vertical:"",inset:""}}),a("span",[t._v("Selected: "),a("mark",[t._v(t._s(t.name))])]),a("q-separator",{attrs:{vertical:"",inset:""}}),a("q-icon",{attrs:{name:t.name,size:"3em"}}),t.name&&t.name.length>0?a("q-separator",{attrs:{vertical:"",inset:""}}):t._e(),a("q-space"),a("q-input",{staticClass:"q-ma-md",attrs:{label:"Filter",outlined:"",clearable:""},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}})],1),a("q-separator",{staticStyle:{width:"100%"},attrs:{color:"light-blue-2"}}),a("div",{staticClass:"row fit"},[a("div",{staticClass:"col-auto no-wrap text-grey-7 q-py-lg full-height"},[a("q-scroll-area",{style:t.scrollStyle},[a("q-list",{attrs:{separator:""}},[a("q-item-label",{staticClass:"text-center full-width q-pb-lg"},[t._v("Categories")]),a("q-separator"),t._l(t.categories,(function(e){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],key:e,attrs:{clickable:""}},[a("q-item-section",[a("q-checkbox",{attrs:{label:e,dense:""},model:{value:t.selected[e],callback:function(a){t.$set(t.selected,e,a)},expression:"selected[cat]"}})],1)],1)}))],2)],1)],1),a("div",{staticClass:"column col",staticStyle:{"min-width":"1px","max-width":"1px"}},[a("q-separator",{staticClass:"full-height",attrs:{vertical:"",inset:"",color:"light-blue-2"}})],1),a("div",{staticClass:"col"},[a("div",{staticClass:"row"},[a("div",{staticClass:"column col-grow"},[a("q-resize-observer",{on:{resize:t.onResize}}),a("q-icon-picker",{staticStyle:{height:"calc(100vh - 140px)"},attrs:{filter:t.filter,"icon-set":t.iconSet,tags:t.tags,"font-size":"3em",tooltips:"",pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e},tags:t.onTags},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)])])])],1)},s=[],n=(a("8e6e"),a("8a81"),a("ac6a"),a("cadf"),a("06db"),a("456d"),a("4db1")),c=a.n(n),o=a("c47a"),r=a.n(o),l=a("2f62");function p(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function u(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?p(Object(a),!0).forEach((function(e){r()(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var h={name:"Icons",data:function(){return{name:"",filter:"",tags:[],pagination:{itemsPerPage:0,page:0,total:0},loaded:!1,categories:[],selected:{},height:600}},computed:u({},Object(l["b"])({iconSets:"common/iconSets"}),{iconSet:{get:function(){return this.$store.state.common.iconSet},set:function(t){this.$store.commit("common/iconSet",t)}},scrollStyle:function(){return{width:"130px",height:this.height-39+"px"}}}),watch:{iconSet:function(t){this.loaded=!1,this.tags.splice(0,this.tags.length)},filter:function(t){this.loaded=!1},selected:{handler:function(t){var e,a=[];this.categories.forEach((function(e){!0===t[e]&&a.push(e)})),(e=this.tags).splice.apply(e,[0,this.tags.length].concat(a))},deep:!0}},methods:{onTags:function(t){var e=this;if(!0!==this.loaded){var a,i,s=[],n=c()(t);s.splice.apply(s,[0,0].concat(c()(n))),(a=this.categories).splice.apply(a,[0,this.categories.length].concat(s)),(i=this.categories).concat.apply(i,s),this.categories.forEach((function(t){e.$set(e.selected,t,!1)})),this.loaded=!0}},onResize:function(t){this.height=t.height}}},d=h,g=a("2877"),f=Object(g["a"])(d,i,s,!1,null,null,null);e["default"]=f.exports}}]);