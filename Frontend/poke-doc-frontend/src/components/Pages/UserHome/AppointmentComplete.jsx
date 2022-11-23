import React from 'react'
import { completeAppointment } from '../../../doctorAPI'
const AppointmentComplete = (props) => {
    function appointmentComplete(){
        completeAppointment(props._id).then((res)=>{
            window.location.reload()
          })
    }
    function denyComplete(){
        props.complete(false)
    }
  return (
<div className="alert shadow-lg flex-col">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <span>Mark Appointment As Complete?</span>
    </div>
    <div className="flex-none">
        <button className="btn btn-sm btn-ghost" onClick={denyComplete} >Deny</button>
        <button className="btn btn-sm btn-primary" onClick={appointmentComplete}>Complete</button>
    </div>
</div>
  )
}

export default AppointmentComplete