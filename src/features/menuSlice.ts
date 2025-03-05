import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MenuItem } from "../types/commonTypes";

type MenuState = {
    menu: MenuItem[];
    isLoading: boolean;
    error: Error | null;
}

const initialState: MenuState = {
    menu: [],
    isLoading: false,
    error: null,
}

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        menuFetching(state) {   
            state.isLoading = true;
            state.error = null;
        },
        menuFetchingSuccess(state, action: PayloadAction<MenuItem[]>) {
            state.isLoading = false;
            state.menu = action.payload;
            state.error = null; 
        },
        menuFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = new Error(action.payload);
        }
    }
})

export default menuSlice.reducer;
