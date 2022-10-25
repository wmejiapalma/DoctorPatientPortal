import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import {useState} from 'react'
const SignUp = () => {

  function setUseState(){
     return {
      "firstname": "",
      "lastname": "",
      "middlename": "",
      "email": "",
      "password": "",
      "DOB": "",
    }
  }
  function onFormSubmit(){
    console.log("Submitting Form with data of ",person)
    fetch('http://localhost:3000/patients', {  // Enter your IP address here
    method: 'POST', 
    headers: {'content-type': 'application/json'},
    mode: 'cors', 
    body: JSON.stringify(person) // body data type must match "Content-Type" header
  })
    console.log("form submitted")
  }
  const [person, setPerson] = useState(setUseState)
  function setData(e){
    console.log(e.target)
    const {id, value} = e.target
    setPerson(prevState => ({
      ...prevState,
      [id]: value
    }));
    console.log(person)
  }
    return (
      <>
      <CustomNav links={["Home","Sign up","Log in"]}/>
      <div className="place-content-center">
        <div className="form-control flex items-center">
        <label className="label"> {/* First Name Component*/}
            <span className="label-text">First Name</span>
          </label>
          <label className="input-group justify-center">
            <span>First Name</span>
            <input id="firstname" required type="text" placeholder="John" className="input input-bordered" onChange={setData} />
          </label>
          <label className="label"> {/* Middle Name Component*/}
            <span className="label-text">Middle Name (Optional)</span>
          </label>
          <label className="input-group justify-center">
            <span>Middle Name</span>
            <input id="middlename" type="text" optional placeholder="W" className="input input-bordered" onChange={setData}/>
          </label>
        <label className="label"> {/* Last Name Component*/}
            <span className="label-text">Last Name</span>
          </label>
          <label className="input-group justify-center">
            <span>Last Name</span>
            <input id="lastname" required type="text" placeholder="Doe" className="input input-bordered" onChange={setData}/>
          </label>
          <label className="label"> {/* Date of Birth Component*/}
            <span className="label-text">Date of Birth</span>
          </label>
          <label className="input-group justify-center">
            <span>Date of birth</span>
            <input id="DOB" required type="date" placeholder="Doe" className="input input-bordered" onChange={setData}/>
          </label>
          <label className="label"> {/* Password Component*/}
            <span className="label-text">Password</span>
          </label>
          <label className="input-group justify-center">
            <span>Password</span>
            <input id="password" required type="text" placeholder="Doe" className="input input-bordered" onChange={setData}/>
          </label>
          <div>
            <a className="m-3 btn btn-primary" onClick={onFormSubmit} >Sign Up</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp