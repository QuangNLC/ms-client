import { CREATE_BILL } from "../types";


const data = localStorage.getItem("BILL");


const initialState = {
    cart: data ? [...JSON.parse(data).cart] : []                            
};

const BillReducer = (state = initialState, action) => {
    switch (action.type) {
        case(CREATE_BILL):{
            
        }
        default: {
            return [...state]
        }
    }
};


export default BillReducer;

