import React from 'react'
import NavButton from './NavButton'

const CustomNav = (props) => {
  return (
    <>
<div className="navbar bg-secondary">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl" href="/">PokeDoc</a>
  </div>
  <div className="flex flex-none">
    <ul className="menu menu-horizontal p-0">
    {
          props.links.map((value,index)=>{
            let link = "/"+value.toLowerCase()
            link = link.replace(" ","_")
            return <NavButton name={value} link={link}/>
        })}
    </ul> 
  </div>
</div>
    </>
  )
}

export default CustomNav