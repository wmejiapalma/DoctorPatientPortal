import React from 'react'
import { useState,useEffect } from 'react'
import { getDoctors } from '../../../doctorAPI'
import CustomNav from '../../Navbar/CustomNav'
import { createAppointment } from '../../../patientAPI'
const CreateAppointment = () => {
    function setUseState(){
        return {
            "date_of_appointment": "",
            "doctor_id": "",
            "doctor_name": "",
            "appointment_type": "",
            "status": "unconfirmed",
            "patient_id": "",
            "notes": ""
        }
    }
    const [appointment, setAppointment] = useState(setUseState)
    const [loading, setLoading] = useState(true)
    const [doctors, setDoctors] = useState(null)
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    //seteffect to get doctors
    useEffect(() => {
        setLoading(true)
        getDoctors().then((res)=>{
            console.log(res.data)
            setDoctors(res.data)
            setLoading(false)
        })
    }, [])
    async function setData(e){
      await setAppointment(prevState => ({
          ...prevState,
          [e.target.id]: e.target.value
      }))
    }
    function setDoctor(e){
      let doctor_id = e.target.value
      //find doctor in list of doctors
      let doctor = doctors.find((doctor)=>{
        return doctor._id == doctor_id
      })
      setAppointment(prevState => ({
          ...prevState,
          "doctor_id": doctor_id,
          "doctor_name": doctor.firstname + " " + doctor.lastname
      }))
    }
    function onFormSubmit(){
      //if fields are not filled out then dont let them submit
      if(appointment.date == "" || appointment.doctor_id == "" || appointment.appointment_type == ""){
        alert("Please fill out all fields")
        return
      }
      createAppointment(appointment).then(()=>{
      window.location.href = "/userhome"
      }
      )
    }
    function displayDoctor(doctor){
      return <option value={doctor._id}>{doctor.firstname} {doctor.lastname}</option>
    }
    return (
        <div>
        <CustomNav links={["Dashboard","Profile","Log out"]}/>
        <div className="flex justify-center items-center my-4">
        <div id="LoginForm" className='card card-compact w-96 bg-primary shadow-xl my-8 '>
          <div class="card-body justify-center ">
            <label className="input-group my-2 flex">
              <span className="w-32 min-w-min">Date of Appointment</span>
              <input id="date_of_appointment" placeholder='Date' required type="date" min={date} max="2024-01-01" className="input input-bordered flex-1"  onChange={setData}/>
            </label>
            <label>
              <span className="w-32 min-w-min">Doctor</span>
            </label>
              <select id="doctor" className="select w-full max-w-xs" onChange={setDoctor}>
                <option disabled selected>Choose a Doctor</option>
                {
                  loading ? <option>Loading...</option> : doctors.map((doctor)=>displayDoctor(doctor))
                }
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