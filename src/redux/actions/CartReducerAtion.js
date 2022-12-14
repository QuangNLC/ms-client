import { ADD_TO_CART, CLEAR_CART, CHANGE_CART_ITEM_QUANTITY, CHANGE_CART_ITEM_SIZE } from "../types";

export const addToCart = (payload) => ({
    type: ADD_TO_CART,
    payload
});

export const clearCartAction = () => ({
    type: CLEAR_CART
})

export const changeCartItemQuantityAction =  (payload)  =>  ({
    type:  CHANGE_CART_ITEM_QUANTITY,
    payload
})

export const changeCartItemSizeAction = (payload) => ({
    type: CHANGE_CART_ITEM_SIZE,
    payload
})