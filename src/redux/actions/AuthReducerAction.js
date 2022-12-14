import { SET_AUTH, LOG_OUT } from "../types";

export const setAuthAction = (payload) => ({
    type: SET_AUTH,
    payload
});

export const logOutAction = () => ({
    type: LOG_OUT
});