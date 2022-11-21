import React from 'react'
import { Outlet } from 'react-router-dom'

const UnAuthRoutes = (props) => {
    function getComponent(){
        props.update(false)
        return (<Outlet/>)
    }
  return (
    getComponent()
  )
}

export default UnAuthRoutes