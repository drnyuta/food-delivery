import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
  userId: string
};

const initialState: AuthState = {
  isLoggedIn: false,
  isLoading: false,
  error: null,
  userId: ''
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest(state) {
      state.error = null;
      state.isLoggedIn = false;
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
      state.userId = action.payload
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, clearErrors } =
  authSlice.actions;
export default authSlice.reducer;
