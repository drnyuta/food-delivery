import { createSlice } from "@reduxjs/toolkit";
import { Order } from "types/commonTypes";
import { PayloadAction } from "@reduxjs/toolkit";

type cartItemsState = {
  cartItems: Order[];
  isLoading: boolean;
  error: Error | null;
};

export const initialState: cartItemsState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Order>) {
      state.cartItems.push(action.payload);
    },
    deleteFromCart(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter(
        (order) => order.id !== action.payload
      );
    },
    updateCart: (
      state,
      action: PayloadAction<{ id: number; newQuantity: number }>
    ) => {
      const { id, newQuantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = newQuantity;
      }
    },
    cartFailure(state, action: PayloadAction<Error>) {
      state.error = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
    },
    cartFetching(state) {
      state.isLoading = true;
      state.error = null;
    },
    cartFetchingSuccess(state, action: PayloadAction<Order[]>) {
      state.isLoading = false;
      state.cartItems = action.payload;
      state.error = null;
    },
    cartFetchingError(state, action: PayloadAction<Error>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  updateCart,
  cartFailure,
  cartFetching,
  clearCart,
  cartFetchingSuccess,
  cartFetchingError,
} = cartSlice.actions;

export default cartSlice.reducer;
