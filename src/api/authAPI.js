import axiosClient from "./axiosClient";

const authAPI = {
    signin: (payload) => {
        const url = '/auth/signin';
        return axiosClient.post(url, payload);
    },
    register: (payload) => {
        const url = '/auth/register';
        return axiosClient.post(url, payload)
    },
    registerByAdmd: (payload) => {
        const url = 'auth/adm-register';
        return axiosClient.post(url, payload);
    },
    updateRoleByAdm: (payload) => {
        const url = `auth/adm-update/${payload.username}/${payload.roleid}`
        return axiosClient.put(url);
    }
};

export default authAPI;