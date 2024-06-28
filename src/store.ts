import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/reducers/rootReducer";

export const store = configureStore({ reducer: rootReducer });
