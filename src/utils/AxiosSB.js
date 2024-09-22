import axios from "axios";

const $axiosSB = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 3000,
    headers: {
        'my-custom-header': 'Belajar Spring Boot API via H2 DB',
        'Content-type': 'application/json'
    }
})

export default $axiosSB