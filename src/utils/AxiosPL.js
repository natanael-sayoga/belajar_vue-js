import axios from "axios";
const $axiosPlaceholderAPI = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 3000,
    headers: {'X-Custom-Header': 'Belajar JSON Placeholder API'}
})

export default $axiosPlaceholderAPI