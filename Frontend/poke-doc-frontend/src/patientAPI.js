import httpClient from "./httpClient"
const gatewayURL = "http://127.0.0.1:8888"
const MICROSERVICE = "patientservice"
const URL = `${gatewayURL}/${MICROSERVICE}`
//http;//apigateway:8888/patientservice
const POSTHEADERS= {
    "Content-Type": "application/json"
}
// /login
export async function login(user){
    return httpClient.post(`${URL}/login`, user)
}
// /WHOAMI
export async function currentUser(){
    return httpClient.get(`${URL}/whoami`)
}
// /logout
export async function logout(){
    return httpClient.get(`${URL}/logout`)
}
// /
export async function createUser(user){
    return httpClient.post(`${URL}/patients`,user)
}

// /WHOAMI
export async function checkAuth(){
    try {
        let res = await httpClient.get(`${URL}/whoami`)
        return res.request.status == 200
    } catch (error) {
        return false;
    }
}

export async function getAppointments(){
    return httpClient.get(`${URL}/appointments`)
}
export async function createAppointmentTest(){
    
    const appointment = {
        "doctor_id": 1,
        "date_of_appointment": "2019-02-23",
        "status": "COMPLETE",
        "appointment_type": "checkup"
    }
    return httpClient.post(`${URL}/appointments`,appointment)
}
export async function createAppointment(date,doctor,type,notes){
    const appointment = {
        "doctor_id": doctor,
        "date_of_appointment": date,
        "status": "WAITING",
        "appointment_type": type,
        "notes": notes
    }
    return httpClient.post(`${URL}/appointments`,appointment)
}
export async function deleteAppointment(id){
    return httpClient.delete(`${URL}/appointments/${id}`)
}