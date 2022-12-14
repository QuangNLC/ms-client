import axiosClient from "./axiosClient";

const addressAPI = {
    fillCitysData: (payload) => {
        const url = 'address/citys-json-to-sql-data'
        return axiosClient.post(url, payload);
    },
    fillDistrictsData: (payload, index) => {
        const url = 'address/districts-json-to-sql-data/'+index;
        return axiosClient.post(url, payload)
    },
    getCityData: () => {
        const url = 'address/data';
        return axiosClient.get(url);
    }
};

export default addressAPI;