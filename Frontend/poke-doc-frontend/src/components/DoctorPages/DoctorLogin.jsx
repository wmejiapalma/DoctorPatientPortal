import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { login } from '../../doctorAPI'

const DoctorLogin = () => {
    const [person, setPerson] = useState(setUseState)
    function setUseState(){
      return {
       "firstname": "",
       "lastname": "",
       "password": "",
       "DOB": "",
     }
   }
    async function logInUser(){
      try{
        await login(person)
        window.location.href = "/doctorhome"
      }
      catch(error){
        console.log(error)
        let resCode = ""
        try {
          resCode = error.response.status
        } catch (error) {
          resCode = 500
        }
        if (resCode == 401){
          alert("Invalid Credentials")
        }
        else{
          alert("this is awkward, something went wrong")
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
    <>
        <CustomNav links={["Home","Appointments","Sign Up","Log in"]}/>
        <div className="flex justify-center items-center my-4">
        <div id="LoginForm" className='card card-compact w-96 bg-primary shadow-xl my-8 '>
          <div className="card-title justify-center my-3">
            Doctor Login
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
            <div className='mt-2 btn btn-secondary' onClick={onFormSubmit}>Doctor Log in</div>
          </div>
          </div>
            <div className="DividerAndSignUp">
              <div className='divider'>OR</div>
              <div className='flex justify-center m-3 items-center'>
                <a className="btn btn-secondary flex-1 mx-5" >Sign up</a>
                <Link to="/log_in" className="btn btn-secondary flex-1 mx-5" >Patient Login</Link>
              </div>
            </div>
        </div>
        </div>
    </>
  )
}


export default DoctorLogin