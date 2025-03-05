import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import menuReducer from "../../features/menuSlice";
import authReducer from "../../features/authSlice";
import orderReducer from "../../features/orderSlice";
import cartReducer from "../../features/cartSlice";

const rootReducer = combineReducers({
  menu: menuReducer,
  auth: authReducer,
  order: orderReducer,
  cart: cartReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default rootReducer;
