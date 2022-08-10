import { combineReducers } from "redux";
import cartSlice from "../component/Cart/reducer";
import loginSlice from "../component/Login/reducer";
const rootReducer = combineReducers({
  login: loginSlice,
  cart: cartSlice,
});

export default rootReducer;
