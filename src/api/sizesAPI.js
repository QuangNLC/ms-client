import axiosClient from "./axiosClient";

const sizesAPI = {
    getAll : () =>  {
        const url  = '/sizes';
        return axiosClient.get(url);
    }
}

export default sizesAPI