import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import { currentUser, getAppointments } from '../../doctorAPI'
import DoctorInfo from './DoctorInfo'
import { useState, useEffect } from 'react'

const DoctorHome = () => {
    const [loading, setLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)
    const [appointments, setAppointments] = React.useState(null)
    //TODO add appointments to state
    React.useEffect(() => {(getUser())},[]);
    async function getUser(){
        const user = await currentUser(); 
        const appointments = await getAppointments();
        setUser(user.data)
        setAppointments(appointments.data)
        console.log(appointments)
        setLoading(false)
    }
    function getUserInfo(){
        if(loading){
        return (<div class="btn loading">Loading...</div>)
        }
        else{
        return (<DoctorInfo user={user} apps={appointments}/>)
        }
    }
    return (
        <>
            <CustomNav links={["Dashboard","Appointments","Stats","Profile","Secure Log Out"]}/>
            <div id="userinfo" class="mx-5">
            {getUserInfo()}
            </div>
        </>
    )
}

export default DoctorHome