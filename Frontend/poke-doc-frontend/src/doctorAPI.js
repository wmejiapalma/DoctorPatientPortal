import httpClient from "./httpClient"
const gatewayURL = "https://1665-172-83-4-34.ngrok.io"
//const gatewayURL = "http://127.0.0.1:8888"
const MICROSERVICE = "employeeservice"
const URL = `${gatewayURL}/${MICROSERVICE}`
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
    return httpClient.post(`${URL}/employees`,user)
}

export async function getAppointments(){
    return httpClient.get(`${URL}/appointments`)
}
export async function getDoctors(){
    return httpClient.get(`${URL}/doctors`)
}
export async function confirmAppointment(id){
    return httpClient.put(`${URL}/appointments/confirm/${id}`)
}
export async function completeAppointment(id){
    return httpClient.put(`${URL}/appointments/complete/${id}`)
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

export async function getPatients(){
    return httpClient.get(`${URL}/patients`)
}
export async function getPatientById(id){
    return httpClient.get(`${gatewayURL}/patientservice/patients/${id}`)
}