import { ADD_TO_CART, DELETE_CART_ITEM, CHANGE_CART_ITEM_QUANTITY, CLEAR_CART, CHANGE_CART_ITEM_SIZE } from "../types";
const data = localStorage.getItem("CART");

const initialState = {
    cart: data ? [...JSON.parse(data).cart] : []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case (ADD_TO_CART): {
            console.log(action.payload)
            let index = checkItemByProductIdAndSizeId(state.cart, action.payload.product.id, action.payload.selectedSize.id);
            if (index == -1) {
                state.cart.push(action.payload);
            } else {
                (state.cart[index].quantity + action.payload.quantity) > action.payload.selectedSize.quantity ? (state.cart[index].quantity = action.payload.selectedSize.quantity) : (state.cart[index].quantity += action.payload.quantity);
            };
            localStorage.setItem("CART", JSON.stringify(state));
            console.log(state)
            return {
                ...state
            }
        }
        case (DELETE_CART_ITEM): {
            let index = checkItemByProductIdAndSizeId(state.cart, action.payload.product.id, action.payload.selectedSize.id);
            console.log(index)
            if (index == -1) {
            } else {
                state.cart.splice(index, 1)
            }
            localStorage.setItem("CART", JSON.stringify(state));
            return {
                ...state
            }
        }
        case (CHANGE_CART_ITEM_QUANTITY): {
            let index = checkItemByProductIdAndSizeId(state.cart, action.payload.product.id, action.payload.selectedSize.id);
            if (index == -1) {

            } else {
                state.cart[index].quantity = action.payload.quantity;
            }
            localStorage.setItem("CART", JSON.stringify(state));
            return {
                ...state
            }
        }
        case (CLEAR_CART): {
            state.cart = []
            localStorage.setItem("CART", JSON.stringify(state));
            return ({
                ...state
            });
        }
        case (CHANGE_CART_ITEM_SIZE): {
            let index = checkItemByProductIdAndSizeId(state.cart, action.payload.product.id, action.payload.selectedSize.id);
            const { currentIndex, ...cartItem } = action.payload
            console.log(index, currentIndex)
            console.log(cartItem)
            if (index == -1) {
                state.cart.splice(currentIndex, 1)
                state.cart = [cartItem, ...state.cart]
            } else if(index !== currentIndex){
                (state.cart[index].quantity + 1) > action.payload.selectedSize.quantity ? (state.cart[index].quantity = action.payload.selectedSize.quantity) : (state.cart[index].quantity += 1);
                state.cart.splice(currentIndex, 1);
                state.cart = [...state.cart]
            }
            localStorage.setItem("CART", JSON.stringify(state));
            return {
                ...state
            }
        }
        default: {
            return state;
        }
    }
};

const checkItemByProductIdAndSizeId = (arr, id, sizeId) => {
    let result = -1;

    arr.forEach((item, index) => {
        if (item.selectedSize.id === sizeId && item.product.id === id) {
            result = index;
        }
    });

    return result;
}

export default cartReducer;

