import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { Provider } from "react-redux";
import { store } from "./store";

import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

const firebaseConfig = {
  apiKey: "",
  authDomain: "delivery-food-e7dbe.firebaseapp.com",
  projectId: "delivery-food-e7dbe",
  storageBucket: "delivery-food-e7dbe.appspot.com",
  messagingSenderId: "118985398057",
  appId: "1:118985398057:web:c24f1844952924dfb48938",
  databaseURL: "https://delivery-food-e7dbe-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
