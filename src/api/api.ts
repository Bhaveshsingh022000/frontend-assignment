import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://raw.githubusercontent.com/'
});

export default axiosInstance;