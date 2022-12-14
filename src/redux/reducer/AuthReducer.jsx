import { LOG_OUT, SET_AUTH } from "../types";

const data = localStorage.getItem("AUTH")

const initialState = {
    auth: data ? JSON.parse(data) : undefined,
    isAuth: data ? true : false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case(SET_AUTH):{
            state ={
                isAuth: true,
                auth: {
                    ...action.payload
                }
            }
            localStorage.setItem("AUTH", JSON.stringify(state.auth));
            return {
                ...state
            };
        }case(LOG_OUT):{
            state.auth = undefined;
            state.isAuth = false;
            localStorage.removeItem("AUTH");
            localStorage.removeItem("CART");
            
            return{
                ...state
            }
        }
        default: {
            return state;
        }
    }
};

export default authReducer;

