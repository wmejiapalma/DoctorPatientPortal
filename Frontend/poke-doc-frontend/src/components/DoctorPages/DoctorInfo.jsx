import React from 'react'
import { useState, useEffect } from 'react'
import { getAppointments, getPatientById } from '../../doctorAPI'

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
          setLoading(false)
        }
        )
      });
    }
  },[])
  function debugApp(app){
    return(
      <div class="card card-compact w-48 bg-violet-900 shadow-xl m-2">
        <figure><img src=""/></figure>
        <div class="card-body items-center">
          <h2 class="card-title">{app.appointment_type}</h2>
          <p>{app.patient_name}</p>
          <p>{app.date_of_appointment}</p>
          <p>{app.status}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-error">Cancel</button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="mx-5">
      <h1 id="greeting" class="capitalize text-5xl mt-10 mb-4">hello {props.user.firstname}!</h1>
      <div id='upcoming'>
        <div className='text-btn-combo flex'>
          <div className='text-2xl flex-1'>here are your upcoming appointments with patients</div>
          <a className='btn text-secondary'>schedule</a>
        </div>
        <div className='upcoming-appointments flex flex-none'>
          {loading? <div>loading</div> :props.apps.map((app) => {
            return debugApp(app)
          })}
        </div>
      </div>
    </div>
)
}

export default DoctorInfo