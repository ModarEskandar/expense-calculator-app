import axios from "axios";
export default axios.create({
    // baseURL: process.env.API_URI,
    baseURL: 'http://192.168.1.5:8080/api',
});

