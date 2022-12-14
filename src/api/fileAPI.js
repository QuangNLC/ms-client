import axiosClient from "./axiosClient";

const fileAPI = {
    upload: (folder, formData) => {
        const url = "/file/" + folder
        return axiosClient.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}

export default fileAPI