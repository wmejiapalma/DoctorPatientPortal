import React from 'react'
import httpClient from '../../httpClient'

const NavButton = (props) => {
    function logOut(){
        httpClient.get("http://localhost:3000/logout").then(
            (response)=>{
                window.location.href = "/"
            }
        )
    }

    function getButton(){
        if (props.name == "Log out"){
            return <a onClick={logOut} class="btn btn-primary opacity-80 m-1 text-error">{props.name}</a>
        }
        else if(props.name == "Home"){
            return <a class="btn btn-primary opacity-80 m-1 text-success" href={props.link}>{props.name}</a>
        }
        return <a class="btn btn-primary opacity-80 m-1" href={props.link}>{props.name}</a>
    }    
    return (
        <div>
            {getButton()}
        </div>
    )
}

export default NavButton