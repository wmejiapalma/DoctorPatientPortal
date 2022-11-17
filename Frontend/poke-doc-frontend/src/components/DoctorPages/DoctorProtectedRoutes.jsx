import React from 'react'
import { checkAuth } from '../../doctorAPI'
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
const DoctorProtectedRoutes = () => {
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
            console.log(auth)
            return (<Outlet/>)
        }
        return (<Navigate to="/"/>)
    }
    return (
        getComponent()
    )
}

export default DoctorProtectedRoutes