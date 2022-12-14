import axiosClient from "./axiosClient";

const usersAPI = {
    getall: () => {
        const url = '/users/getall';
        return axiosClient.get(url);
    },
    getUser: (username) => {
        const url = '/users?username=' + username;
        return axiosClient.get(url);
    },
    deleteUser: (username) => {
        const url = '/users?username=' + username;
        return axiosClient.delete(url);
    },
    updateUserAvatar: (username, formData) => {
        const url = '/users/update-avatar/' + username;
        return axiosClient.post(url, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
    },
    updateUserDeatails: (username, payload) => {
        const url = '/users?username=' + username;
        return axiosClient.put(url, payload);
    },
    changePassword: (username, payload) => {
        const url = '/users/change-password/' + username;
        return axiosClient.post(url, payload);
    },
    receivedVerifyCodde: (payload) => {
        const url = 'users/forgot-password/'+payload;
        return axiosClient.post(url);
    },
    changePasswordWithVerifyCode: (payload) => {
        const url = 'users/changepass';
        return axiosClient.put(url, payload);
    }
};

export default usersAPI;