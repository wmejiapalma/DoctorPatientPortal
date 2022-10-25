import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import { useState } from 'react'
import httpClient from '../../httpClient'


const Login = () => {
  const [person, setPerson] = useState(setUseState)
  const LOGIN_URL = "http://localhost:3000/login"
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
      await httpClient.post(LOGIN_URL, person)
      window.location.href = "/userhome"
    }
    catch(error){
      let resCode = error.response.status
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
    <div>
        <CustomNav links={["Home","Sign up","Log in"]}/>
        <div className="flex justify-center items-center my-4 ">

        <div id="LoginForm" className='card card-compact w-96 bg-violet-400 shadow-xl '>
          <div class="my-9 card-body ">
            <label className="flex input-group justify-center my-2">
              <span>First Name</span>
              <input id="firstname" required type="text" placeholder="John" className="input input-bordered" onChange={setData}  />
            </label>
            <label className="input-group justify-center my-2">
              <span>Last Name</span>
              <input id="lastname" required type="text" placeholder="Doe" className="input input-bordered"  onChange={setData} />
            </label>
            <label className="input-group justify-center my-2">
              <span>Date of Birth</span>
              <input id="DOB" required type="date" className="input input-bordered"   onChange={setData}/>
            </label>
            <label className="input-group justify-center my-2">
              <span>Password</span>
              <input id="password" required type="text" placeholder="gR3AtP4ss01$" className="input input-bordered"  onChange={setData} />
            </label>
          <div className="flex justify-center">
            <div className='m-3 btn btn-secondary' onClick={onFormSubmit}>Log in</div>
          </div>
          </div>
            <div className="DividerAndSignUp">
              <div className='divider'>OR</div>
              <div className='flex justify-center'>
                <a className="m-3 btn btn-secondary" >Sign up</a>
              </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login