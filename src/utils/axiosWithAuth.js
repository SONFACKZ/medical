import axios from "axios";

const axiosAuth = () => {

    const token = localStorage.getItem('token')
    console.log(token)
    return axios.create({
        baseURL: "",
        headers: {
            authorization: `Bearer ${token}`,
            Accept: 'application/json'
        }
    })
}

export default axiosAuth;