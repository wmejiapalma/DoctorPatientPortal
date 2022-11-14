import React from 'react'
import { useState, useEffect } from 'react'
import { deleteAppointment } from '../../../patientAPI'
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
const deleteConfirmed = (data)=>{
  setConfirmDelete(data)
}
function deleteApp(){
  setConfirmDelete(true)
}
  return (
    <>
      <div class="card card-compact w-48 bg-violet-900 shadow-xl m-2">
        <figure><img src="" alt="Shoes" /></figure>
        <div class="card-body items-center">
          <h2 class="card-title">{props.type}</h2>
          <p>{props.doctor}</p>
          <p>{props.date}</p>
          <p>{props.status}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-error" onClick={deleteApp}>Cancel</button>
          </div>
        </div>
      </div>
      <div>
        {confirmDelete ? <AppointmentConfirmDelete _id={props._id} confirm={deleteConfirmed}/> : null}
      </div>
    </>
  )
}

export default Appointment