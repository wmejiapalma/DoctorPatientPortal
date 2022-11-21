import React from 'react'
import { useState, useEffect } from 'react'
import { getAppointments, getPatientById } from '../../doctorAPI'
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
    //if theres no appointments then return a div that says "no appointments"
    if(props.apps.length == 0){
      return(
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">No Appointments</h5>
            <p class="card-text">You have no appointments scheduled.</p>
          </div>
        </div>
      )
    }
    return props.apps.map((app) => {
      return debugApp(app)
    })
  }
  return (
    <div className="mx-5">
      <h1 id="greeting" class="capitalize text-5xl mt-10 mb-4">hello {props.user.firstname}!</h1>
      <div id='upcoming'>
        <div className='text-btn-combo flex'>
          <div className='text-2xl flex-1'>here are your upcoming appointments with patients</div>
          <a className='btn text-secondary' href="/dcreate_appointment">schedule</a>
        </div>
        <div className='upcoming-appointments'>
        {loading? <div>loading</div> : loadAppointments()}
        </div>
      </div>
    </div>
)
}

export default DoctorInfo