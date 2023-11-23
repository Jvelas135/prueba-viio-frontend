import axiosInstance from 'axios';
let local = localStorage.getItem('token');

const instance = axiosInstance.create({
    baseURL : 'http://localhost:4000/',
    headers: {'Authorization': 'Bearer ' + local}
});

export default instance;