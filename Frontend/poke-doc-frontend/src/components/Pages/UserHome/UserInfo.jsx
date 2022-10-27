import React from 'react'
import Appointment from './Appointment'
import AppointmentStats from './AppointmentStats'
const UserInfo = (props) => {
  return (
      <div className="mx-5">
        <h1 id="greeting" class="capitalize text-5xl mt-10 mb-4">hello {props.user.firstname}!</h1>
        <div id='upcoming'>
          <div className='text-btn-combo flex'>
            <div className='text-2xl flex-1'>here are your upcoming appointments</div>
            <div className='btn text-secondary'>schedule</div>
          </div>
          <div className='upcoming-appointments flex flex-none'>
            <Appointment/>
          </div>
        </div>
        <div id='lastappointment'>
          <h1 className='text-xl mt-8'>heres what happened last visit</h1>
          <div>
            <AppointmentStats />
          </div>
        </div>
      </div>
  )
}

export default UserInfo