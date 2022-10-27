import React from 'react'
import CustomNav from '../Navbar/CustomNav'
import { currentUser } from '../../contactApi'
import UserInfo from "../Pages/UserHome/UserInfo"
const UserHome = () => {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {(getUser())},[]);
  async function getUser(){
    const user = await currentUser(); 
    setUser(user.data)
    setLoading(false)
  }
  function getUserInfo(){
    if(loading){
      return (<div class="btn loading">Loading...</div>)
    }
    else{
      return (<UserInfo user={user}/>)
    }
  }

  return (
    <>
        <CustomNav links={["Home","Appointments","Stats","Profile","Log out"]}/>
        <div id="userinfo" class="mx-5">
          {getUserInfo()}
        </div>
    </>
  )

}

export default UserHome