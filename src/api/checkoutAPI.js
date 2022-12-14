import axiosClient from "./axiosClient";

const checkoutAPI = {
    checkout: (payload) => {
        const url = '/order/checkout/for-me';
        return axiosClient.post(url, payload);
    }
};

export default checkoutAPI;