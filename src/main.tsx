import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// 注册 Service Worker（由 vite-plugin-pwa 生成）
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
