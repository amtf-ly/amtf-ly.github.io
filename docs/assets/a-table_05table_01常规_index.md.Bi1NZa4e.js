import{r as o,a0 as a,q as f,B as k,a2 as d,D as e,a3 as _,ar as w,f as C,a as g,v as n,s as N,aN as x}from"./chunks/framework.0gHIT5AA.js";const A={__name:"长文",setup(q){const t=o("normal"),c=o([{field:"name",key:"a",title:"Name 40%",width:"40%"},{field:"date",key:"b",title:"Tel 20%",width:"20%"},{field:"hobby",key:"c",title:"Hobby 20%",width:"20%"},{field:"address",key:"d",title:"Address 20%",width:"20%"}]),i=o([{name:"John",date:"1900-05-20",hobby:"Honorificabilitudinitatibus califragilisticexpialidocious Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu 大江东去浪淘尽千古风流人物故垒西边人道是三国周郎赤壁乱石穿空惊涛拍岸卷起千堆雪江山如画一时多少豪杰",address:"No.1 Century Avenue, Xiamen"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]);return(y,b)=>{const l=a("el-radio-button"),r=a("el-radio-group"),s=a("q-card-section"),m=a("ve-table"),h=a("q-card");return f(),k(h,{class:"q-pa-sm"},{default:d(()=>[e(s,null,{default:d(()=>[_(" word-break： "),e(r,{size:"small",modelValue:t.value,"onUpdate:modelValue":b[0]||(b[0]=p=>t.value=p)},{default:d(()=>[e(l,{label:"normal"},{default:d(()=>[_("normal")]),_:1}),e(l,{label:"keep-all"},{default:d(()=>[_("keep-all")]),_:1}),e(l,{label:"break-all"},{default:d(()=>[_("break-all")]),_:1}),e(l,{label:"break-word"},{default:d(()=>[_("break-word")]),_:1})]),_:1},8,["modelValue"])]),_:1}),e(s,null,{default:d(()=>[e(m,{style:w({"word-break":t.value}),columns:c.value,"table-data":i.value,"border-around":!0,"border-x":!0,"border-y":!0},null,8,["style","columns","table-data"])]),_:1})]),_:1})}}},V={__name:"列宽px",setup(q){const t=o(35),c=o(!0),i=o(!0),y=o(!0),b=C(()=>[{field:"name",key:"a",title:`第一列宽${t.value}px`,width:t.value},{field:"date",key:"b",title:"Tel 200px",width:200},{field:"hobby",key:"c",title:"Hobby 200px",width:200},{field:"address",key:"d",title:"Address 200px",width:200}]),l=g([{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]);return(r,s)=>{const m=a("q-input"),h=a("ve-table"),p=a("q-card-section"),u=a("q-card");return f(),k(u,{class:"q-pa-sm"},{default:d(()=>[e(m,{modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=v=>t.value=v),modelModifiers:{number:!0},label:"第一列宽度 ? px"},null,8,["modelValue"]),e(p,null,{default:d(()=>[e(h,{style:{"border-radius":"50px"},columns:b.value,"table-data":l,"border-around":y.value,"border-x":i.value,"border-y":c.value},null,8,["columns","table-data","border-around","border-x","border-y"])]),_:1})]),_:1})}}},T={__name:"列宽",setup(q){const t=o(35),c=o(!0),i=o(!0),y=o(!0);o(80),o(200);const b=C(()=>[{field:"name",key:"a",title:`第一列宽${t.value}%`,width:`${t.value}%`},{field:"date",key:"b",title:"Tel 20%",width:"20%"},{field:"hobby",key:"c",title:"Hobby 20%",width:"20%"},{field:"address",key:"d",title:"Address 20%",width:"20%"}]),l=g([{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]);return(r,s)=>{const m=a("q-input"),h=a("ve-table"),p=a("q-card-section"),u=a("q-card");return f(),k(u,{class:"q-pa-sm"},{default:d(()=>[e(m,{modelValue:t.value,"onUpdate:modelValue":s[0]||(s[0]=v=>t.value=v),label:"第一列宽度 ? %"},null,8,["modelValue"]),e(p,null,{default:d(()=>[e(h,{style:{"border-radius":"50px"},columns:b.value,"table-data":l,"border-around":y.value,"border-x":i.value,"border-y":c.value},null,8,["columns","table-data","border-around","border-x","border-y"])]),_:1})]),_:1})}}},S={class:"row"},D=n("div",{class:"text-primary"},"直接设置style:",-1),P={__name:"a",setup(q){const t=o(["width:80%","width:50%","width:900px","width:calc(55vw - 10px);"]);function c(l,r){l.length>0&&(t.value.includes(l)||t.value.push(l),r(l,"toggle"))}o(null);const i=o("width:80%");o(200);const y=g([{field:"name",key:"a",title:"Name",width:100},{field:"date",key:"b",title:"Tel",width:200},{field:"hobby",key:"c",title:"Hobby",width:300},{field:"address",key:"d",title:"Address",width:300}]),b=g([{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]);return(l,r)=>{const s=a("q-select"),m=a("ve-table"),h=a("q-card-section"),p=a("q-card"),u=a("q-page");return f(),k(u,{padding:"",class:"q-gutter-y-md"},{default:d(()=>[e(p,{class:"my-card"},{default:d(()=>[e(h,null,{default:d(()=>[n("div",S,[e(s,{outlined:"",modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=v=>i.value=v),"use-input":"",clearable:"",onNewValue:c,options:t.value,dense:""},{before:d(()=>[D]),_:1},8,["modelValue","options"])]),e(m,{style:w(i.value),columns:y,"table-data":b},null,8,["style","columns","table-data"])]),_:1})]),_:1})]),_:1})}}},J={class:"row"},B=n("div",{class:"text-primary"},"max-height:",-1),$={__name:"a高度",setup(q){const t=o([200,500,"calc(100vh - 210px)","80%"]);function c(l,r){l.length>0&&(t.value.includes(l)||t.value.push(l),r(l,"toggle"))}o(null);const i=o(200),y=g([{field:"name",key:"a",title:"Name",width:100},{field:"date",key:"b",title:"Tel",width:200},{field:"hobby",key:"c",title:"Hobby",width:300},{field:"address",key:"d",title:"Address",width:300}]),b=g([{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]);return(l,r)=>{const s=a("q-select"),m=a("ve-table"),h=a("q-card-section"),p=a("q-card"),u=a("q-page");return f(),k(u,{padding:"",class:"q-gutter-y-md"},{default:d(()=>[e(p,{class:"my-card"},{default:d(()=>[e(h,null,{default:d(()=>[n("div",J,[e(s,{outlined:"",modelValue:i.value,"onUpdate:modelValue":r[0]||(r[0]=v=>i.value=v),"use-input":"",clearable:"",onNewValue:c,options:t.value,dense:""},{before:d(()=>[B]),_:1},8,["modelValue","options"])]),e(m,{"max-height":i.value,columns:y,"table-data":b},null,8,["max-height","columns","table-data"])]),_:1})]),_:1})]),_:1})}}},z=Object.assign({name:"table高度",icon:"school"},{__name:"边框",setup(q){const t=o(!1),c=o(!1),i=o(!0),y=g([{field:"name",key:"a",title:"Name",width:100},{field:"date",key:"b",title:"Tel",width:200},{field:"hobby",key:"c",title:"Hobby",width:300},{field:"address",key:"d",title:"Address",width:300}]),b=g([{name:"John",date:"1900-05-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shanghai"},{name:"Dickerson",date:"1910-06-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Beijing"},{name:"Larsen",date:"2000-07-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Chongqing"},{name:"Geneva",date:"2010-08-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Xiamen"},{name:"Jami",date:"2020-09-20",hobby:"coding and coding repeat",address:"No.1 Century Avenue, Shenzhen"}]);return(l,r)=>{const s=a("q-checkbox"),m=a("ve-table"),h=a("q-card-section"),p=a("q-card");return f(),k(p,{class:"my-card"},{default:d(()=>[e(s,{"left-label":"",modelValue:c.value,"onUpdate:modelValue":r[0]||(r[0]=u=>c.value=u),label:"横向边框"},null,8,["modelValue"]),e(s,{"left-label":"",modelValue:t.value,"onUpdate:modelValue":r[1]||(r[1]=u=>t.value=u),label:"纵向边框"},null,8,["modelValue"]),e(s,{"left-label":"",modelValue:i.value,"onUpdate:modelValue":r[2]||(r[2]=u=>i.value=u),label:"外边框"},null,8,["modelValue"]),e(h,null,{default:d(()=>[e(m,{style:{"border-radius":"50px"},columns:y,"table-data":b,"border-around":i.value,"border-x":c.value,"border-y":t.value},null,8,["columns","table-data","border-around","border-x","border-y"])]),_:1})]),_:1})}}}),U=x('<h2 id="宽度" tabindex="-1">宽度 <a class="header-anchor" href="#宽度" aria-label="Permalink to &quot;宽度&quot;">​</a></h2><ul><li>表格宽度可以设置固定值。如：<code>style=&quot;width:900px;&quot;</code></li><li>表格宽度可以设置动态值。如：<code>style=&quot;width:calc(100vh - 210px)&quot;</code> 或者 <code>style=&quot;width:80%&quot;</code></li><li>如果不设置表格宽度，等同于<code>style=&quot;width:100%;&quot;</code></li></ul>',2),j=x('<h2 id="高度" tabindex="-1">高度 <a class="header-anchor" href="#高度" aria-label="Permalink to &quot;高度&quot;">​</a></h2><ul><li>表格高度默认由行数据决定，也可以通过 <code>max-height</code>属性设置最大高度</li><li>表格高度可以设置固定值。如：<code>max-height=&quot;500&quot;</code></li><li>表格高度可以设置动态值。如：<code>max-height=&quot;calc(100vh - 210px)&quot;</code> 或者 <code>max-height=&quot;80%&quot;</code></li></ul>',2),H=x('<h2 id="边框" tabindex="-1">边框 <a class="header-anchor" href="#边框" aria-label="Permalink to &quot;边框&quot;">​</a></h2><ul><li>通过<code>border-around=true</code> 设置外边框</li><li>通过<code>border-x=true</code> 设置横向边框</li><li>通过<code>border-y=true</code> 设置纵向边框</li></ul>',2),X=n("h2",{id:"列宽",tabindex:"-1"},[_("列宽 "),n("a",{class:"header-anchor",href:"#列宽","aria-label":'Permalink to "列宽"'},"​")],-1),G=n("ul",null,[n("li",null,"当列宽不设置时，单元格宽度按照内容自动缩放")],-1),I=n("h3",{id:"百分比",tabindex:"-1"},[_("百分比 "),n("a",{class:"header-anchor",href:"#百分比","aria-label":'Permalink to "百分比"'},"​")],-1),L=n("ul",null,[n("li",null,"当列宽设置百分比，单元格宽度按照百分比缩放")],-1),O=n("h3",{id:"像素值",tabindex:"-1"},[_("像素值 "),n("a",{class:"header-anchor",href:"#像素值","aria-label":'Permalink to "像素值"'},"​")],-1),E=n("ul",null,[n("li",null,"当列宽设置素值（px），单元格宽度按照像素比缩放。如果不希望缩放，需要设置外层容器宽度"),n("li",null,"设置像素值，记得不要加单位")],-1),R=n("h2",{id:"长文显示",tabindex:"-1"},[_("长文显示 "),n("a",{class:"header-anchor",href:"#长文显示","aria-label":'Permalink to "长文显示"'},"​")],-1),M=n("ul",null,[n("li",null,[_("当单元格文本内容过多时会破坏布局，此时可以通过样式 "),n("a",{href:"https://developer.mozilla.org/zh-CN/docs/Web/CSS/word-break",target:"_blank",rel:"noreferrer"},"word-break"),_(" 控制")]),n("li",null,[_("也可以结合"),n("a",{href:"/a-table/01icon/"},"单元格省略"),_("功能一起使用")])],-1),K=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"a-table/05table/01常规/index.md","filePath":"a-table/05table/01常规/index.md","lastUpdated":null}'),W={name:"a-table/05table/01常规/index.md"},Q=Object.assign(W,{setup(q){return(t,c)=>(f(),N("div",null,[U,e(P),j,e($),H,e(z),X,G,I,L,e(T),O,E,e(V),R,M,e(A)]))}});export{K as __pageData,Q as default};
