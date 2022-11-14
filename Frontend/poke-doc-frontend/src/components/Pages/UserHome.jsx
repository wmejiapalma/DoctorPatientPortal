import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import { currentUser, getAppointments, createAppointment } from '../../patientAPI'
import UserInfo from "../Pages/UserHome/UserInfo"
const UserHome = () => {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)
  const [appointments, setAppointments] = React.useState(null)

  React.useEffect(() => {(getUser())},[]);
  async function getUser(){
    const user = await currentUser(); 
    const userApps = await getAppointments();
    //add appointsments to user
    console.log(userApps.data)
    setAppointments(userApps.data)
    setUser(user.data)
    setLoading(false)
  }
  function getUserInfo(){
    if(loading){
      return (<div class="btn loading">Loading...</div>)
    }
    else{
      return (<UserInfo user={user} appointments={appointments}/>)
    }
  }
  function appointmentTest(){
    createAppointment().then(()=>{
      window.location.reload()
    })
  }
  return (
    <>
        <CustomNav links={["Dashboard","Appointments","Stats","Profile","Log out"]}/>
        <div className="btn" onClick={appointmentTest}>Create Appointment</div>
        <div id="userinfo" class="mx-5">
          {getUserInfo()}
        </div>
    </>
  )

}

export default UserHome