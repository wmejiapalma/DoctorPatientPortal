import {
  Route,
  Routes} from "react-router-dom";
import UserHome from './components/Pages/UserHome';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SignUp';
import Home from './components/Pages/Home';
import NotFound from './components/Pages/NotFound';
import ProtectedRoutes from './components/Pages/ProtectedRoutes';
import DoctorLogin from './components/DoctorPages/DoctorLogin';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="sign_up" element={<SignUp/>}/>
      <Route path="log_in" element={<Login/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path = "doctor_login" element={<DoctorLogin/>}/>
      <Route element = {<ProtectedRoutes/>}>
        <Route path="userhome" element={<UserHome/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
