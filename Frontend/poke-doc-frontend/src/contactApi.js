import httpClient from "./httpClient"
const LOGIN_URL = "http://localhost:3000/login"
const WHOAMI = "http://localhost:3000/whoami"
export async function login(user){
    return httpClient.post(LOGIN_URL, user)
}
export async function currentUser(){
    return httpClient.get(WHOAMI)
}
export async function logout(){

}
export async function checkAuth(){
    try {
        let res = await httpClient.get(WHOAMI)
        return res.request.status == 200
    } catch (error) {
        return false;
    }
}