import React from 'react'
import { useState, useEffect } from 'react'
import { getAppointments, getPatientById } from '../../doctorAPI'
import DoctorAddNotes from '../Pages/UserActions/DoctorAddNotes'
import Appointment from '../Pages/UserHome/Appointment'
const DoctorInfo = (props) => {
  //PROPS user, appointments as apps
  //useeffect for fetching patient name
  const [patientName, setPatientName] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(props.apps){
      props.apps.forEach(app => {
        getPatientById(app.patient_id).then((res)=>{
          app.patient_name = res.data.firstname + " " + res.data.lastname
        }
        )
      });
      setLoading(false)
    }
  },[])
  function debugApp(app){
    return(
      <Appointment date={app.date_of_appointment} type={app.appointment_type} doctor_name={props.user.firstname + " " + props.user.lastname} status={app.status} doc={true} _id={app._id}/>
    )
  }
  function loadAppointments(){
//return noappointmentcard if there are no appointments or if there are only completed appointments
    if(props.apps.length == 0 || props.apps.filter(app => app.status != "complete").length == 0){
      return(
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">No Appointments</h5>
            <p class="card-text">You have no appointments</p>
          </div>
        </div>
      )
    }
    //if theres no appointments then return a div that says "no appointments"
    return props.apps.map((app) => {
      if(app.status.toLowerCase() == "complete"){
        return
      }
      return debugApp(app)
    })
  }
  function loadCompletedAppointments(){
    return props.apps.map((app) => {
      if(app.status.toLowerCase() != "complete"){
        return
      }
      return debugApp(app)
    })
  }
  return (
    <div className="mx-10 flex flex-col">

      <h1 id="greeting" class="capitalize text-5xl mt-10 mb-4">hello {props.user.firstname}!</h1>

      <div id='upcoming' className=''>
        <div className='text-btn-combo flex'>
          <div className='text-2xl'>here are your upcoming appointments with patients</div>
        </div>
        <div className='upcoming-appointments flex'>
        {loading? <div>loading</div> : loadAppointments()}
        </div>
      </div>

      <div id='CompletedAppointments' className=''>
        <div className='text-btn-combo flex'>
          <div className='text-2xl'>here are your completed appointments with patients</div>
        </div>
        <div className='flex'>
          {loading? <div>loading</div> : loadCompletedAppointments()}
        </div>
      </div>
    </div>
)
}
export default DoctorInfo
