import{_ as g,h as c,f as r,o as m,a as v,b as s,e as a,w as _,g as p}from"./index-3527334d.js";const y={class:"PkgVersion"},w={class:"PkgVersion-Left"},V={class:"PkgVersion-Content"},P={class:"PkgVersion-Content"},k={class:"PkgVersion-Right"},C={class:"PkgVersion-Content"},x={__name:"PageAnalyser",setup(b){const o=c(""),l=c(""),u=async()=>{if(window&&window.$ipc){const e=await window.$ipc.pageAction({type:"SELECT_DIR"});e&&!e.errCode&&!e.data.canceled&&(o.value=e.data.filePaths[0]||"")}},f=async()=>{if(window&&window.$ipc){const e={type:"GET_PKG_INFO",payload:{path:o.value}};console.log(e);const t=await window.$ipc.pageAction(e);t&&!t.errCode&&console.log(t.data)}};return(e,t)=>{const i=r("ElInput"),d=r("ElButton");return m(),v("div",y,[s("div",w,[s("div",V,[a(i,{modelValue:o.value,"onUpdate:modelValue":t[0]||(t[0]=n=>o.value=n),type:"text",clearable:""},null,8,["modelValue"])]),s("div",P,[a(d,{onClick:u,type:"primary"},{default:_(()=>[p("选择文件夹")]),_:1}),a(d,{type:"primary",disabled:o.value==="",style:{"margin-left":"6px"},onClick:f},{default:_(()=>[p(" 获取版本号 ")]),_:1},8,["disabled"])])]),s("div",k,[s("div",C,[a(i,{modelValue:l.value,"onUpdate:modelValue":t[1]||(t[1]=n=>l.value=n),type:"text"},null,8,["modelValue"])])])])}}},E=g(x,[["__scopeId","data-v-17849bb7"]]);export{E as default};
