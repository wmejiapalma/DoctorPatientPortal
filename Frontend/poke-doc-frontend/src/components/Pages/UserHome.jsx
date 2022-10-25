import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import httpClient from '../../httpClient'
const UserHome = () => {


  async function whoami(){
    try{
      let response = await httpClient.get("http://localhost:3000/whoami")
      console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
        <CustomNav links={["Home","Appointments","Stats","Profile","Log out"]}/>
        <button class="btn btn-secondary " onClick={whoami}>Who am I?</button>
    </>
  )
}

export default UserHome