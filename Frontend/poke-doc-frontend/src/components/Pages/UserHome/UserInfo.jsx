import React from 'react'
import Appointment from './Appointment'
import AppointmentStats from './AppointmentStats'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateAppointment from '../UserActions/CreateAppointment'
const UserInfo = (props) => {
  //useeffect for loading
  function loadIncompleteAppointments(){
    if(props.appointments.length == 0 || props.appointments.filter(app => app.status != "complete").length == 0){
      return(
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">No Appointments</h5>
              <p class="card-text">You have no appointments scheduled</p>
              <p class="card-text">Schedule a new appointment using the schedule button</p>
            </div>
          </div>
        )
    }
    return props.appointments.map((app) => {
      if(app.status.toLowerCase() == "complete"){
        return
      }
      return <Appointment _id={app._id} type={app.appointment_type} date={app.date_of_appointment} doctor_name={app.doctor_name} doctor={app.doctor_id} status={app.status} />
    })
  }
  function loadCompletedAppointments(){
    return props.appointments.map((app) => {
      if(app.status.toLowerCase() != "complete"){
        return
      }
      return <Appointment _id={app._id} type={app.appointment_type} date={app.date_of_appointment} doctor_name={app.doctor_name} doctor={app.doctor_id} status={app.status} />
    })
  }
  return (
      <div className="mx-5">
        <h1 id="greeting" className="capitalize text-5xl mt-10 mb-4">hello {props.user.firstname}!</h1>
        <div id='upcoming' className=''>
          <div className='text-btn-combo flex'>
            <div className='text-2xl'>here are your upcoming appointments</div>
          </div>
          <div className='upcoming-appointments flex flex-none '>
            {
              loadIncompleteAppointments()
            }
            
            {/* Code for requesting appointment button and pop up */}
            <div className='tooltip tooltip-right self-center' data-tip="Request New Appointment">
               <label htmlFor="request_appointment" className='btn btn-circle btn-ghost ml-20 h-16 w-16 text-xl bg-secondary'>+</label>
            </div>
            <input type="checkbox" id="request_appointment" className="modal-toggle" />
            <label htmlFor="request_appointment" className="modal cursor-pointer">
              <label htmlFor="request_appointment" className="btn btn-md btn-circle absolute right-2 top-2">✕</label>
              <CreateAppointment />
            </label>
          </div>



          <div id='CompletedAppointments'>
            <div className='text-btn-combo flex'>
              <div className='text-2xl flex-1'>here are your completed appointments</div>
            </div>
            <div className='flex'>
              {loadCompletedAppointments()}
            </div>
          </div>
        </div>
        {
/*
TODO create appointment stats component
        <div id='lastappointment'>
          <h1 className='text-xl mt-8'>heres what happened last visit</h1>
          <div>
            <AppointmentStats />
          </div>
        </div>
  */      }
      </div>
  )
}

export default UserInfo