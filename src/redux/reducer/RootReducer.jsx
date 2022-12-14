import {combineReducers} from 'redux'
import GioHangReducer from './GioHangReducer'
import cartReducer from './CartReducer';
import authReducer from './AuthReducer';

 const RootReducer=combineReducers({
    GioHangReducer,
    cartReducer,
    auth: authReducer
})

export default RootReducer;