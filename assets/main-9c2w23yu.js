import{r as g,j as a,c as k,R as D}from"./client-CYooLA_G.js";const H=()=>[...Array(96)].map((e,s)=>String.fromCharCode(s+12353)),R=()=>[...Array(96)].map((e,s)=>String.fromCharCode(s+12449)),L=()=>{const e=[...Array(26)].map((l,o)=>String.fromCharCode(o+97)),s=[...Array(26)].map((l,o)=>String.fromCharCode(o+65));return[...e,...s]},N=e=>e,w=e=>e,u=["<h1>Heading</h1>",'<img src="img.png" alt="Img">','<a href="">Anchor</a>',"<script>alert('Script');<\/script>","<style>body{background: #000;}</style>"],C=["@","#","$","%","^","&","*","-","+","=","--","//","'",'"',"™️","©︎"],P=({editableTexts:e,onEditableTextChange:s})=>{const[l,o]=g.useState(null),i=g.useRef([]);g.useEffect(()=>{i.current.forEach(n=>{n&&(n.style.height="auto",n.style.height=`${n.scrollHeight}px`)})},[e]);const m=n=>{navigator.clipboard.writeText(e[n]),o(n),setTimeout(()=>{o(null)},3e3)};return a.jsx("section",{className:"gen-result",children:e.map((n,r)=>a.jsxs("div",{className:"gen-result__cont",children:[a.jsx("textarea",{value:e[r]||"",onChange:T=>s(r,T.target.value),ref:T=>{T!==null&&(i.current[r]=T)},rows:3}),a.jsxs("div",{className:"gen-result__cont-foot",children:[a.jsxs("p",{children:["文字数：",(e[r]||"").length]}),a.jsx("button",{onClick:()=>m(r),className:l===r?"clicked":"",children:l===r?"コピーしました！":"コピーする"})]})]},r))})},v={charLength:10,hiragana:!1,katakana:!1,alphabet:!0,htmlTags:!1,specialChars:!1,customChar:"",numOfStrings:1,showHtmlTags:!1,selectedHtmlTags:[],showSpChars:!1,selectedSpChars:[],useCustomChar:!1,isValidFormData:!1,htmlAccordionRef:g.createRef(),htmlTagsAccordionHeight:0,spCharsAccordionRef:g.createRef(),spCharsAccordionHeight:0,isValidFormDate:!1,editableTexts:[],isGenText:!1},O=(e,s)=>{var l,o,i,m;switch(s.type){case"UPDATE_FORM_DATA":return{...e,...s.payload};case"TOGGLE_HTML_TAGS":{const n=!e.showHtmlTags,r=(o=(l=e.htmlAccordionRef)==null?void 0:l.current)!=null&&o.clientHeight?e.htmlAccordionRef.current.clientHeight+15:0;return{...e,showHtmlTags:n,htmlTagsAccordionHeight:r}}case"UPDATE_SELECTED_HTML_TAGS":return{...e,selectedHtmlTags:s.payload};case"TOGGLE_SP_CHARS":{const n=!e.showSpChars,r=(m=(i=e.spCharsAccordionRef)==null?void 0:i.current)!=null&&m.clientHeight?e.spCharsAccordionRef.current.clientHeight+15:0;return{...e,showSpChars:n,spCharsAccordionHeight:r}}case"UPDATE_SELECTED_SP_CHARS":return{...e,selectedSpChars:s.payload};case"SET_USE_CUSTOM_CHAR":return{...e,useCustomChar:s.payload};case"SET_IS_VALID_FORM_DATA":return{...e,isValidFormData:s.payload};case"UPDATE_EDITABLE_TEXTS":return{...e,editableTexts:s.payload};case"UPDATE_EDITABLE_TEXT":return{...e,editableTexts:e.editableTexts.map((n,r)=>r===s.payload.index?s.payload.value:n)};case"SET_IS_GEN_TEXT":return{...e,isGenText:s.payload};default:return e}},G=()=>{const[e,s]=g.useReducer(O,v),l=t=>{const{name:c,value:h,checked:p}=t.target;switch(c){case"customChar":s({type:"UPDATE_FORM_DATA",payload:{customChar:h,useCustomChar:h.trim()!==""}});break;case"charLength":case"numOfStrings":s({type:"UPDATE_FORM_DATA",payload:{[c]:parseInt(h,10)}});break;default:s({type:"UPDATE_FORM_DATA",payload:{[c]:p}});break}},o=()=>{s({type:"TOGGLE_HTML_TAGS"})},i=(t,c)=>{const h=c?[...e.selectedHtmlTags,t]:e.selectedHtmlTags.filter(p=>p!==t);s({type:"UPDATE_SELECTED_HTML_TAGS",payload:h}),s({type:"UPDATE_FORM_DATA",payload:{htmlTags:h.length>0}})},m=t=>{s({type:"UPDATE_SELECTED_HTML_TAGS",payload:t?u:[]}),s({type:"UPDATE_FORM_DATA",payload:{htmlTags:t}})},n=()=>{s({type:"TOGGLE_SP_CHARS"})},r=(t,c)=>{const h=c?[...e.selectedSpChars,t]:e.selectedSpChars.filter(p=>p!==t);s({type:"UPDATE_SELECTED_SP_CHARS",payload:h}),s({type:"UPDATE_FORM_DATA",payload:{specialChars:h.length>0}})},T=t=>{s({type:"UPDATE_SELECTED_SP_CHARS",payload:t?C:[]}),s({type:"UPDATE_FORM_DATA",payload:{specialChars:t}})};g.useEffect(()=>{const t=e.charLength>0&&e.numOfStrings>0&&(e.hiragana||e.katakana||e.alphabet||e.htmlTags||e.specialChars||e.customChar!=="");s({type:"SET_IS_VALID_FORM_DATA",payload:t})},[e.charLength,e.hiragana,e.katakana,e.alphabet,e.htmlTags,e.specialChars,e.customChar,e.numOfStrings]);const S=()=>{const{charLength:t,hiragana:c,katakana:h,alphabet:p,htmlTags:y,specialChars:b,customChar:x,numOfStrings:j}=e,d=[],A=[];c&&d.push(...H()),h&&d.push(...R()),p&&d.push(...L()),y&&d.push(...N(e.selectedHtmlTags)),b&&d.push(...w(e.selectedSpChars)),x&&d.push(x);for(let E=0;E<j;E++){let _="";for(;_.length<t;)_+=d[Math.floor(Math.random()*d.length)];_.length>t&&(_=_.slice(0,t)),A.push(_)}s({type:"UPDATE_EDITABLE_TEXTS",payload:A}),s({type:"SET_IS_GEN_TEXT",payload:!0}),setTimeout(()=>{s({type:"SET_IS_GEN_TEXT",payload:!1})},1e3)},f=(t,c)=>{s({type:"UPDATE_EDITABLE_TEXT",payload:{index:t,value:c}})};return a.jsxs("section",{className:"rand-str-gen",children:[a.jsx("h1",{children:"ランダム文字列生成"}),a.jsxs("form",{className:"rand-str-gen__form",children:[a.jsx("label",{className:"rand-str-gen__form-label rand-str-gen__form-label-number",children:a.jsxs("div",{children:["文字数：",a.jsx("input",{type:"number",name:"charLength",value:e.charLength,onChange:l,min:1,max:1e3})]})}),a.jsx("label",{className:"rand-str-gen__form-label",children:a.jsxs("div",{children:[a.jsx("input",{type:"checkbox",name:"hiragana",checked:e.hiragana,onChange:l}),"ひらがな"]})}),a.jsx("label",{className:"rand-str-gen__form-label",children:a.jsxs("div",{children:[a.jsx("input",{type:"checkbox",name:"katakana",checked:e.katakana,onChange:l}),"カタカナ"]})}),a.jsx("label",{className:"rand-str-gen__form-label",children:a.jsxs("div",{children:[a.jsx("input",{type:"checkbox",name:"alphabet",checked:e.alphabet,onChange:l}),"アルファベット"]})}),a.jsxs("label",{className:"rand-str-gen__form-label",children:[a.jsxs("div",{children:[a.jsx("input",{type:"checkbox",name:"htmlTags",checked:e.htmlTags,onChange:o}),"HTMLタグ"]}),a.jsx("p",{className:`rand-str-gen__accordion-icon ${e.showHtmlTags?"open":""}`})]}),a.jsx("div",{style:{height:e.showHtmlTags?`${e.htmlTagsAccordionHeight}px`:"0px",opacity:e.showHtmlTags?1:0},className:"rand-str-gen__accordion-wrap",children:a.jsxs("div",{ref:e.htmlAccordionRef,className:"rand-str-gen__accordion-cont",children:[a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:e.selectedHtmlTags.length===u.length,onChange:t=>m(t.target.checked)}),e.selectedHtmlTags.length===u.length?"全てのチェックを外す":"全てチェックする"]}),a.jsx("div",{className:"checkBoxInput",children:u.map((t,c)=>a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:e.selectedHtmlTags.includes(t),onChange:h=>i(t,h.target.checked)}),t]},c))})]})}),a.jsxs("label",{className:"rand-str-gen__form-label",children:[a.jsxs("div",{children:[a.jsx("input",{type:"checkbox",name:"specialChars",checked:e.specialChars,onChange:n}),"特殊文字"]}),a.jsx("span",{className:`rand-str-gen__accordion-icon ${e.showSpChars?"open":""}`})]}),a.jsx("div",{style:{height:e.showSpChars?`${e.spCharsAccordionHeight}px`:"0px",opacity:e.showSpChars?1:0},className:"rand-str-gen__accordion-wrap",children:a.jsxs("div",{ref:e.spCharsAccordionRef,className:"rand-str-gen__accordion-cont",children:[a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:e.selectedSpChars.length===C.length,onChange:t=>T(t.target.checked)}),e.selectedSpChars.length===C.length?"全てのチェックを外す":"全てチェックする"]}),a.jsx("div",{className:"checkBoxInput",children:C.map((t,c)=>a.jsxs("label",{children:[a.jsx("input",{type:"checkbox",checked:e.selectedSpChars.includes(t),onChange:h=>r(t,h.target.checked)}),t]},c))})]})}),a.jsxs("label",{className:"rand-str-gen__form-label",children:[a.jsx("input",{type:"checkbox",checked:e.useCustomChar,onChange:l}),"カスタム：",a.jsx("input",{type:"text",name:"customChar",value:e.customChar,onChange:l})]}),a.jsxs("label",{className:"rand-str-gen__form-label rand-str-gen__form-label-number",children:["生成文字列数：",a.jsx("input",{type:"number",name:"numOfStrings",value:e.numOfStrings,onChange:l,min:1,max:30})]})]}),a.jsx("button",{onClick:S,className:`rand-str-gen__gen-btn ${e.isGenText?"clicked":""} ${e.isValidFormData?"":"disabled"}`,children:e.isGenText?"生成中です":"生成する"}),a.jsx(P,{editableTexts:e.editableTexts,onEditableTextChange:f})]})};k.createRoot(document.getElementById("root")).render(a.jsx(D.StrictMode,{children:a.jsx(G,{})}));