import axios from "axios";

const axiosAuth = () => {

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const role_id = localStorage.getItem('role_id')
    const status = localStorage.getItem('status')
    console.log(user)
    console.log(role_id)
    console.log(status)
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