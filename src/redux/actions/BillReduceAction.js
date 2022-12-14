import { CREATE_BILL } from "../types";

export const createBillAction = (payload) =>({
    type: CREATE_BILL,
    payload
});