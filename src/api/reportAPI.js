import axiosClient from "./axiosClient";

const reportAPI = {
    getChartData: (payload) => {
        const url = 'report/turnover/' + payload;
        return axiosClient.get(url);
    },
    getOrderStat: () =>{
        const url = 'report/order-statistic';
        return axiosClient.get(url);
    },
    getTodayOrderCount: () => {
        const url = 'report/order-today';
        return axiosClient.get(url);
    },
    getProductSellThisMonth: ()=> {
        const url = 'report/product-Month';
        return axiosClient.get(url);
    }
};

export default reportAPI;