import{r as a,j as t,c as l,R as d}from"./client-CYooLA_G.js";const h="/rand-str-gen/assets/react-CHdo91hT.svg",u="/rand-str-gen/vite.svg";function m(){const[e,r]=a.useState(0);return t.jsx(t.Fragment,{children:t.jsxs("section",{className:"default",children:[t.jsxs("div",{className:"default__logo-wrap",children:[t.jsx("a",{href:"https://vitejs.dev",target:"_blank",children:t.jsx("img",{src:u,className:"default__logo",alt:"Vite logo"})}),t.jsx("a",{href:"https://react.dev",target:"_blank",children:t.jsx("img",{src:h,className:"default__logo react",alt:"React logo"})})]}),t.jsx("h1",{children:"Vite + React"}),t.jsx("div",{className:"default__card",children:t.jsxs("button",{onClick:()=>r(s=>s+1),children:["count is ",e]})}),t.jsx("p",{className:"default__read-the-docs",children:"Click on the Vite and React logos to learn more"})]})})}const j=()=>{const[e,r]=a.useState(new Date),[s,o]=a.useState(!0),c=new Intl.DateTimeFormat("ja-JP",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:s}).format(e);a.useEffect(()=>{setInterval(()=>{r(new Date)},1e3)},[e,s]);const n=()=>{o(i=>!i)};return t.jsxs("section",{children:[t.jsx("div",{children:t.jsx("span",{children:c})}),t.jsx("button",{onClick:n,children:"Switch"})]})};l.createRoot(document.getElementById("root")).render(t.jsxs(d.StrictMode,{children:[t.jsx(m,{}),t.jsx(j,{})]}));