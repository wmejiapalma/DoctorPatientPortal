import React from 'react'

const CustomNav = (props) => {
  return (
    <>
<div className="navbar bg-secondary">
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl" href="/">PokeDoc</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal p-0">
    {
          props.links.map((value,index)=>{
            const link = "/"+value.toLowerCase().replace(" ","_")
            if (link == "/home"){
              //CHANGES LOGOUT COLOR TO RED
              return (
                <li>
                  <a href = {link} class="border m-1">{value}</a>
                </li>
              )
            }
            return(
              <li>
                <a href={link} class="border m-1">{value}</a>
              </li>
            )
        })}
    </ul> 
  </div>
</div>
    </>
  )
}

export default CustomNav