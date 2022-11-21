import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import Footer from './components/Footer/Footer'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <BrowserRouter>
        <App/>
        <div className='h-72'> </div>
        <Footer/>
    </BrowserRouter>
</React.StrictMode>
)
document.body.className = "bg-gradient-to-b from-primary to-violet-500";
