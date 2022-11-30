import React from 'react'
import httpClient from '../../httpClient'
import { logout } from '../../patientAPI'
import { logout as SecureLogOut } from '../../doctorAPI'
import { Link } from 'react-router-dom'

const NavButton = (props) => {
    function logOut(){
        logout().then(
            (response)=>{
                window.location.href = "/"
            }
        )
    }
    function doctorLogOut(){
        SecureLogOut().then(
            (response)=>{
                window.location.href = "/"
            }
        )
    }
    function completeLogout(){
        props.setAuth(false)
        logOut().then(()=>{
            doctorLogOut()
        })

    }

    function getButton(){
        
        if (props.name == "Log out"){
            return <Link onClick={completeLogout} class="btn btn-primary opacity-80 m-1 text-error">{props.name}</Link>
        }
        else if(props.name == "Home"){
            //TODO if user is logged in then redirect to user home
            return <Link class="btn btn-primary opacity-80 m-1 text-success" to={props.link}>{props.name}</Link>
        }
        else if(props.name =="Dashboard"){
            //TODO if user is logged in then redirect to user home
            //TODO if user is doctor then redirect to doctor home
            return <Link class="btn btn-primary opacity-80 m-1 text-success" to="/userhome">{props.name}</Link>
        }
        return <Link class="btn btn-primary opacity-80 m-1" to={props.link}>{props.name}</Link>
    }    
    return (
        <div>
            {getButton()}
        </div>
    )
}

export default NavButton