import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../scss/index.scss'
import Form from './Form.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Form />
  </React.StrictMode>,
)
