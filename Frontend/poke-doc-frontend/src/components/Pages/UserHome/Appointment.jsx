import React from 'react'
import { useState, useEffect } from 'react'

import AppointmentConfirm from './AppointmentConfirm'
import AppointmentConfirmDelete from './AppointmentConfirmDelete'
const Appointment = (props) => {
{/*
  _id
  type
  date​​
  doctor
  patient
  status
*/
}
//usestate for delete confirmation
const [confirmDelete, setConfirmDelete] = useState(false)
//Used for confirming the appointment on the doctor side
const [confirmDocApp, setConfirmAppointment] = useState(false)
const deleteConfirmed = (data)=>{
  setConfirmDelete(data)
}
function deleteApp(){
  setConfirmDelete(true)
}

const confirmAppointment = (data)=>{
  if(data == null){
    setConfirmAppointment(true)
  }
  setConfirmAppointment(data)
}
const getStatusColor = (status)=>{
  switch(status){
    case "unconfirmed":
      return "text-error"
    case "confirmed":
      return "text-success"
    case "cancelled":
      return "text-error"
  }
}
const getPersonTitle = ()=>{
  if(props.doc){
    return "Patient: "
  }
  else{
    return "Dr. "
  }
}
  return (
    <>
      <div class="card card-compact w-48 bg-violet-900 shadow-xl m-2">
        <figure><img src=""/></figure>
        <div class="card-body items-center">
          <h2 class="card-title">{props.type}</h2>
          <p>{props.date}</p>
          <p>{getPersonTitle()} {props.doctor_name}</p>
          <p className={getStatusColor(props.status)}>{props.status}</p>
          <div class="card-actions justify-end flex flex-row">
            <button class="btn btn-error flex-auto" onClick={deleteApp}>Cancel</button>
            {props.doc && props.status =="unconfirmed" ? <button class="btn btn-primary flex-auto" onClick={confirmAppointment}>Confirm</button> : null}
          </div>
        </div>
      </div>
      <div>
        {confirmDelete ? <AppointmentConfirmDelete _id={props._id} confirm={deleteConfirmed}/> : null}
      </div>
      <div>
        {confirmDocApp ? <AppointmentConfirm _id={props._id} confirm={confirmAppointment}/> : null}
      </div>
    </>
  )
}

export default Appointment