import httpClient from "./httpClient"
//const gatewayURL = "https://1665-172-83-4-34.ngrok.io"
const gatewayURL = "http://127.0.0.1:8888"
const MICROSERVICE = "patientservice"
const URL = `${gatewayURL}/${MICROSERVICE}`
//http;//apigateway:8888/patientservice
const POSTHEADERS= {
    "Content-Type": "application/json"
}
export async function getPatientInformation(id){
    return httpClient.get(`${URL}/patients/${id}`)
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
    let res = httpClient.get(`${URL}/appointments`)
    console.log(res)
    return res
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

export async function createAppointment(appointment){
    //APPOINTMENT IS A JSON OBJECT
    return httpClient.post(`${URL}/appointments`,appointment)
}
export async function deleteAppointment(id){
    return httpClient.delete(`${URL}/appointments/${id}`)
}