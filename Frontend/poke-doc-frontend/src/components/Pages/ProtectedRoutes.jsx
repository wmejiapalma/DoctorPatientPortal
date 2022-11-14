import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../../patientAPI'
import { useEffect } from 'react';
const ProtectedRoutes = () => {
    const [auth, setAuth] = React.useState(false)
    const [loading, setLoading] = React.useState(true)
    useEffect(()=>{
        async function getAuth(){
            setLoading(true)
            let res = await checkAuth();
            setLoading(false);
            return res
        }
        getAuth().then((res)=>{
            setAuth(res)
        })
    },[])
    function getComponent(){
        if(loading){
            return (<div class="btn loading">Loading...</div>)
        }
        if(auth){
            return (<Outlet/>)
        }
        return (<Navigate to="/"/>)
    }
    return (
        getComponent()
    )
}

export default ProtectedRoutes