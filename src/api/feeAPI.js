import axios from 'axios';

const feeAxiosClient = axios.create({
    baseURL: "https://online-gateway.ghn.vn/shiip/public-api/"
    // baseURL: " https://services.giaohangtietkiem.vn/services/"
});

feeAxiosClient.interceptors.request.use((config) => {
    config.headers = {
        'token': `e31fbcda-7469-11ed-bcba-eac62dba9bd9`
        // 'token': `0F39423929357c68955e79974BFe7e0CB54029E5`
    }
    return config;
});

const feeAPI = {
    getCityData: () => {
        const url = 'master-data/province';
        return feeAxiosClient.get(url);
    },
    getDistrictData: (payload) => {
        const url = 'master-data/district';
        return feeAxiosClient.post(url, payload);
    },
    getWardData: (payload) => {
        const url = 'master-data/ward';
        return feeAxiosClient.post(url, payload);
    },
    getShipTypes: (payload) => {
        const url = 'v2/shipping-order/available-services';
        return feeAxiosClient.post(url, payload);
    },
    getShippingFee: (payload) => {
        const url = 'v2/shipping-order/fee';
        return feeAxiosClient.post(url, payload);
    },
    // getShippingFeeByGHTK: (payload) => {
    //     const url = 'shipment/fee';
    //     return feeAxiosClient.get(url, payload)
    // }
};


export default feeAPI;