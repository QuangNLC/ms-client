import axios from 'axios';

const axiosClient = axios.create({
    baseURL:"http://localhost:8080/api/"
});

axiosClient.interceptors.request.use((config) => {
    if(localStorage.getItem("AUTH")){
        config.headers = {
            'Authorization' : `Bearer ${JSON.parse(localStorage.getItem("AUTH"))?.token}`
        }
    };
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if(response && response.data){
        return response.data;
    }
    return response;
},(err) => {
    console.log(err);
    return err.response;
});

export default axiosClient;