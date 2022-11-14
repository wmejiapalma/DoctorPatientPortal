import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</React.StrictMode>
)
let body = document.getElementsByTagName('body')
body.item(0).className = "bg-gradient-to-b from-primary to-violet-500"
