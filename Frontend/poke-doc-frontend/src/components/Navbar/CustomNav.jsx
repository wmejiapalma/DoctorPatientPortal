import React from 'react'
import NavButton from './NavButton'
import { useState } from 'react'
import { useEffect } from 'react'
import { currentUser as dcurrent } from '../../doctorAPI'
import { currentUser as pcurrent } from '../../patientAPI'
const CustomNav = (props) => {
  const unAuthLinks = ["Home", "Log in", "Sign up"]
  const authLinks = ["Dashboard", "Home", "Log out"]
  const [links, setLinks] = useState(unAuthLinks)
  function getLinks(){
    if(props.auth){
      return authLinks
    }
    else{
      return unAuthLinks
    }
  }
  return (
    <>
<div className="navbar bg-secondary">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl" href="/">PokeDoc</a>
  </div>
  <div className="flex flex-none">
    <ul className="menu menu-horizontal p-0">
    {
          getLinks().map((value,index)=>{
            let link = "/"+value.toLowerCase()
            link = link.replace(" ","_")
            return <NavButton name={value} link={link}/>
        })
        }
    </ul> 
  </div>
</div>
    </>
  )
}

export default CustomNav