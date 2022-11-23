import React, { useState } from 'react'
import CustomNav from '../Navbar/CustomNav'
import {login} from '../../patientAPI'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const Login = (props) => {
  const [person, setPerson] = useState(setUseState)
  function setUseState(){
    return {
     "firstname": "",
     "lastname": "",
     "password": "",
     "DOB": "",
   }
 }
 //useEffect
  useEffect(()=>{
    if(props.activeSession){
      switch(props.personType){
        case "patient":
          window.location.href = "/userhome"
          break;
        case "doctor":
          window.location.href = "/doctorhome"
      }
    }
  },[])
  async function logInUser(){
    try{
      await login(person).then(
        (res) =>{
          window.location.href = "/userhome"
        }
      )
    }
    catch(error){
      console.log(error)
      let resCode = ""
      try {
        resCode = error.response.status
      } catch (error) {
        resCode = 500
      }
      if(resCode != 200){
        alert("Invalid Login")
      }
    }
}
  async function onFormSubmit(){
    if(person.firstname == "" || person.lastname == "" || person.password == "" || person.DOB == ""){
      alert("Please fill out all fields")
      return
    }
    logInUser()
  }
 function setData(e){
   const {id, value} = e.target
   setPerson(prevState => ({
     ...prevState,
     [id]: value
   }));
 }

  return (
    <div>
        <div className="flex justify-center items-center my-4 ">
        <div id="LoginForm" className='card card-compact w-96 bg-primary shadow-xl my-8 '>
          <div className="card-title justify-center my-3">
            Patient Login
          </div>
          <div class="card-body justify-center ">
            <label className="flex input-group my-2">
              <span>First Name</span>
              <input id="firstname" required type="text" placeholder="John" className="flex-1 input input-bordered" onChange={setData}  />
            </label>
            <label className="input-group my-2 flex">
              <span>Last Name</span>
              <input id="lastname" required type="text" placeholder="Doe" className="input input-bordered flex-1"  onChange={setData} />
            </label>
            <label className="input-group my-2 flex">
              <span>Date of Birth</span>
              <input id="DOB" placeholder='Date' required type="date" className="input input-bordered flex-1"   onChange={setData}/>
            </label>
            <label className="input-group my-2 flex">
              <span>Password</span>
              <input id="password" required type="text" placeholder="gR3AtP4ss01$" className="flex-1 input input-bordered"  onChange={setData} />
            </label>
          <div className="flex justify-center">
            <div className='mt-2 btn btn-secondary' onClick={onFormSubmit}>Log in</div>
          </div>
          </div>
            <div className="DividerAndSignUp">
              <div className='divider'>OR</div>
              <div className='flex justify-center m-3 items-center'>
                <Link to="/sign_up" className="btn btn-secondary flex-1 mx-5" >Sign up</Link>
                <Link to="/doctor_login" className="btn btn-secondary flex-1 mx-5" >Doctor Login</Link>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login