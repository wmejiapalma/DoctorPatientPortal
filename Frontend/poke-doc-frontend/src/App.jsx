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
import CreateAppointment from "./components/Pages/UserActions/CreateAppointment";
import DoctorSignUp from "./components/DoctorPages/DoctorSignUp";
import DoctorHome from "./components/DoctorPages/DoctorHome";
import DoctorProtectedRoutes from "./components/DoctorPages/DoctorProtectedRoutes";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="sign_up" element={<SignUp/>}/>
      <Route path="log_in" element={<Login/>}/>
      <Route path="home" element={<Home/>}/>
      <Route path = "doctor_login" element={<DoctorLogin/>}/>
      <Route path = "doctor_sign_up" element={<DoctorSignUp/>}/>
      <Route element = {<ProtectedRoutes/>}>
        <Route path="userhome" element={<UserHome/>}/>
        <Route path="/create_appointment" element={<CreateAppointment/>}/>
      </Route>
      {/* Authenticated Doctor Routes */}
      <Route element = {<DoctorProtectedRoutes/>}>
        <Route path="doctorhome" element={<DoctorHome/>}/>
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
