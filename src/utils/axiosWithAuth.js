import axios from "axios";

const axiosAuth = () => {

    const token = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    const user = localStorage.getItem('user')
    const role_id = localStorage.getItem('role_id')
    const status = localStorage.getItem('status')
    const role_name= localStorage.getItem('role_name')
    // console.log(role_name)
    // console.log(user)
    // console.log(role_id)
    // console.log(status)
    // console.log(token)
    return axios.create({
        baseURL: "",
        headers: {
            authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })
}

export default axiosAuth;