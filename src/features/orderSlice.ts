import { createSlice } from "@reduxjs/toolkit";
import { Order } from "types/commonTypes";
import { PayloadAction } from "@reduxjs/toolkit";

type OrderState = {
  orders: Order[];
  isLoading: boolean;
  isSubmitted: boolean;
  error: Error | null;
};

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  isSubmitted: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    submitOrderRequest(state) {
      state.isLoading = true;
    },
    submitOrderSuccess(state) {
      state.error = null;
      state.isSubmitted = true;
      state.isLoading = false;
    },
    submitOrderFailure(state, action: PayloadAction<Error>) {
      state.error = action.payload;
      state.isSubmitted = false;
      state.isLoading = false;
    },
  },
});

export const { submitOrderSuccess, submitOrderFailure, submitOrderRequest } =
  orderSlice.actions;

export default orderSlice.reducer;
