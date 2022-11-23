import React from 'react'
import { Outlet } from 'react-router-dom'

const UnAuthRoutes = (props) => {
    function getComponent(){
       //props.update(true)
        return (<Outlet/>)
    }
  return (
    getComponent()
  )
}

export default UnAuthRoutes