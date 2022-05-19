import API from './http-common';
import axios from "axios";

export default class UserService {

    login = (data) => {
        return axios.post(`http://localhost:8082/login`, data)
            .then(res => {
                return res
            });
    }


    registration = (data) =>
        axios.post(`http://localhost:8082/registration`, data)
            .then(res => {
                return res
            })

    evaluateToken = (token, email) => {
        const headers = {
            'Authorization': 'Bearer ' + token
        };

        return API.get(`token/`, {headers})
            .then(res => {
                console.log("token is " + res.data.email.localeCompare(email))
                return Promise.resolve(res.data.email.localeCompare(email))
            })
            .catch(() => Promise.reject())
    }

}