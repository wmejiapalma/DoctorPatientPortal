import React from 'react'
import { useState } from 'react'
import CustomNav from '../../Navbar/CustomNav'
const CreateAppointment = () => {
    function setUseState(){
        return {
            "date": "",
            "doctor": "",
            "appointment_type": "",
            "status": "",
            "patient_id": "",
            "notes": ""
        }
    }
    const [appointment, setAppointment] = useState(setUseState)
    function setData(e){
      setAppointment(prevState => ({
          ...prevState,
          [id]: value
      }));
    }
    function onFormSubmit(){
        console.log(appointment)
    }
    return (
        <div>
        <CustomNav links={["Dashboard","Appointments","Stats","Profile","Log out"]}/>
        <div className="flex justify-center items-center my-4">
        <div id="LoginForm" className='card card-compact w-96 bg-primary shadow-xl my-8 '>
          <div class="card-body justify-center ">
            <label className="input-group my-2 flex">
              <span className="w-32 min-w-min">Date of Appointment</span>
              <input id="date" placeholder='Date' required type="date" className="input input-bordered flex-1"   onChange={setData}/>
            </label>
            <label>
              <span className="w-32 min-w-min">Doctor</span>
            </label>
              <select id="doctor" className="select w-full max-w-xs" onChange={setData}>
                <option disabled selected>Choose a Doctor</option>
                <option>Test Doctor</option>
                <option>Test Doctor2</option>
                {/* Map list of doctors to <option>*/}
              </select>
          <label>
            <span className="w-32 min-w-min">Appointment Type</span>
          </label>
            <select id="appointment_type" className="select w-full max-w-xs" onChange={setData}>
              <option disabled selected>Reason for Appointment</option>
              <option>Checkup</option>
              <option>Testing</option>
              <option>Consultation</option>
              <option>Other</option>
            </select>
          <label>
            <span className="w-32 min-w-min">Notes for Doctor</span>
          </label>
            <textarea id="notes" className="textarea h-24 textarea-bordered" onChange={setData}></textarea>
          <div className="flex justify-center">
            <div className='mt-2 btn btn-secondary' onClick={onFormSubmit}>Request Appointment</div>
          </div>
          </div>
        </div>
        </div>
        </div>
    )
}

export default CreateAppointment