import axios from 'axios';
import {RoutesEnum} from "../constants/routes";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    config.headers.Authorization = `Bearer ${token}`
    return config;
})

axiosClient.interceptors.response.use(response => {
    return response
}, (error) => {
    const {response} = error;
    if (response?.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
        window.location.href = RoutesEnum.Login
    }

    throw error;
});


export default axiosClient;