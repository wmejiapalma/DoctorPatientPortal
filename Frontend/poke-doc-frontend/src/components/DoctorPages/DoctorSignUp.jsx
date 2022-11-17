import React from 'react'
import { createUser } from '../../doctorAPI'
import { useState } from 'react'
import CustomNav from '../Navbar/CustomNav'

const DoctorSignUp = () => {

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
            createUser(JSON.stringify(person)).then(()=>{
                alert("User Created")
                window.location.href = "/login"
            })
        }
        const [person, setPerson] = useState(setUseState)
        function setData(e){
        const {id, value} = e.target
        setPerson(prevState => ({
            ...prevState,
            [id]: value
        }));
        }
        return (
            <>
            <CustomNav links={["Home","Sign up","Log in"]}/>
            <div className="flex justify-center items-center my-4">
            <div id="LoginForm" className='card card-compact w-96 bg-primary shadow-xl my-8 '>
                <div class="card-body justify-center ">
                <label className="flex input-group my-2">
                    <span className="flex-1">First Name</span>
                    <input id="firstname" required type="text" placeholder="John" className="flex-1 input input-bordered" onChange={setData}  />
                </label>
                <label className="input-group my-2 flex">
                    <span className="flex-1">Middle Name</span>
                    <input id="middlename" required type="text" placeholder="M" className="flex-1 input input-bordered"  onChange={setData} />
                </label>
                <label className="input-group my-2 flex">
                    <span className="flex-1">Last Name</span>
                    <input id="lastname" required type="text" placeholder="Doe" className="input input-bordered flex-1"  onChange={setData} />
                </label>
                <label className="input-group my-2 flex">
                    <span className="flex-1">Email</span>
                    <input id="email" required type="text" placeholder="JohnMDoe@email.com" className="flex-1 input input-bordered"  onChange={setData} />
                </label>
                <label className="input-group my-2 flex">
                    <span className="w-32 min-w-min">Date of Birth</span>
                    <input id="DOB" placeholder='Date' required type="date" className="input input-bordered flex-1"   onChange={setData}/>
                </label>
                <label className="input-group my-2 flex">
                    <span className="flex-1">Password</span>
                    <input id="password" required type="text" placeholder="gR3AtP4ss01$" className="flex-1 input input-bordered"  onChange={setData} />
                </label>
                <div className="flex justify-center">
                <div className='mt-2 btn btn-secondary' onClick={onFormSubmit}>Sign up</div>
                </div>
                </div>
                <div className="DividerAndSignUp">
                    <div className='divider'>OR</div>
                    <div className='flex justify-center'>
                    <a className="m-3 btn btn-secondary" href='/log_in' >Login</a>
                    </div>
                </div>
            </div>
            </div>
            </>
        )
}

export default DoctorSignUp