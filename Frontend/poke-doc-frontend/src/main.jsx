import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Home from './components/Pages/Home'
import SignUp from './components/Pages/SignUp'
import Login from './components/Pages/Login'
import UserHome from './components/Pages/UserHome'
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
    Route,
  } from "react-router-dom";



const router = createBrowserRouter([
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/sign_up",
        element: <SignUp />,
    },
    {
        path: "/log_in",
        element: <Login/>,
    },
    {
        path: "/userhome",
        element: <UserHome/>,
    }
]);
    

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <RouterProvider router={router}/>
</React.StrictMode>
)
