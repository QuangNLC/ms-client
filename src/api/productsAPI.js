import axiosClient from './axiosClient';

const productAPI = {
    getProduct: (id) => {
        const url = '/product/' + id;
        return axiosClient.get(url);
    },
    getAll: (cate, page, limit) => {
        let url = '/product'
        if (cate) {
            url = url + '/category/' + cate;
            if (page) {
                url = url + '/' + page;
                if (limit) {
                    url = url + '/' + limit;
                };
            };
            url = url + '/material/' + cate;
            if (page) {
                url = url + '/' + page;
                if (limit) {
                    url = url + '/' + limit;
                };
            };
        } else if (page) {
            url = url + '/' + page;
            if (limit) {
                url = url + '/' + limit;
            };
        } else {
            url = url + '/getall';
        }


        return axiosClient.get(url);
    },
    createProduct: (payload) => {
        const url = '/product/create';
        return axiosClient.post(url, payload);
    },
    deleteProduct: (payload) => {
        const url = '/product/delete/'+payload;
        return axiosClient.delete(url);
    },
    updateProduct: (payload) => {
        const url = 'product/update/'+payload.id;
        return axiosClient.put(url, payload);
    },
    getByFilter: (filter, page, limit) => {
        const url = `/product/byFilter?page=${page}&limit=${limit}`;
        return axiosClient.post(url, filter);
    },
    testFilter: (filter, page) => {
        const url = `product/byFilterAndSort?page=${page}&limit=15`;
        return axiosClient.post(url, filter);
    },
    getFilterInfo: () => {
        const url = '/product/get/filter/info';
        return axiosClient.get(url);
    },
    getAllCategory: () => {
        const url = '/category/getall';
        return axiosClient.get(url);
    },
    createCategory: (payload) => {
        const url = '/category/create';
        return axiosClient.post(url, payload);
    },
    getCategoryDetails: (id) => {
        const url = '/category/details?categoryId=' + id;
        return axiosClient.get(url);
    },
    deleteCategory: (id) => {
        const url = '/category?categoryId=' + id;
        return axiosClient.delete(url);
    },
    updateCategoryDetails: (payload) => {
        const url = 'category/update?categoryId=' + payload.id;
        return axiosClient.put(url, payload);
    },
    getAllMaterial: () => {
        const url = '/material/getall';
        return axiosClient.get(url);
    },
    createMaterial: (payload) => {
        const url = '/material/create';
        return axiosClient.post(url, payload);
    },
    getMaterialDetails: (id) => {
        const url = '/material/details?materialId=' + id;
        return axiosClient.get(url);
    },
    deleteMaterial: (id) => {
        const url = '/material?materialId=' + id;
        return axiosClient.delete(url);
    },
    updateMaterialDetails: (payload) => {
        const url = 'material/update?materialId=' + payload.id;
        return axiosClient.put(url, payload);
    },

    getNewProducts: () => {
        const url = '/product/getNewProducts'
        return axiosClient.get(url);
    }
};

export default productAPI;