import axios from "axios";
const $axiosPlaceholderAPI = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 3000,
    headers: {'X-Custom-Header': 'Belajar JSON Placeholder API'}
})

$axiosPlaceholderAPI.defaults.headers.common['my-custom-header'] = "coba bikin custom header";

export default $axiosPlaceholderAPI