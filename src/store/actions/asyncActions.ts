import {
  query,
  orderByChild,
  equalTo,
  ref,
  get,
  set,
  update,
} from "firebase/database";
import bcrypt from "bcryptjs";
import { database } from "../../index.js";

import { User } from "types/commonTypes";
import { Order } from "types/commonTypes.js";
import { menuSlice } from "features/menuSlice";
import { authSlice } from "features/authSlice";
import { orderSlice } from "features/orderSlice";
import { cartSlice } from "features/cartSlice";
import { AppDispatch } from "store/reducers/rootReducer";

//MENU
export const fetchMenu = () => {
  return (dispatch: AppDispatch) => {
    const menuUrl = "https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals";
    dispatch(menuSlice.actions.menuFetching());

    fetch(menuUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(menuSlice.actions.menuFetchingSuccess(data));
      })
      .catch((err) => {
        dispatch(menuSlice.actions.menuFetchingError(err.message));
      });
  };
};

//LOGIN
export const login = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.clearErrors());
    dispatch(authSlice.actions.loginRequest());

    const usersRef = ref(database, "users");
    const queryByUsername = query(
      usersRef,
      orderByChild("username"),
      equalTo(username)
    );

    try {
      const snapshot = await get(queryByUsername);
      if (snapshot.exists()) {
        const users = snapshot.val();
        const user: User | undefined = Object.values<User>(users).find(
          (user: User | undefined) => user?.username === username
        );

        if (user && bcrypt.compareSync(password, user.password)) {
          dispatch(authSlice.actions.loginSuccess(user.id));
        } else {
          dispatch(
            authSlice.actions.loginFailure("Incorrect username or password")
          );
        }
      } else {
        dispatch(
          authSlice.actions.loginFailure("Incorrect username or password")
        );
      }
    } catch (error) {
      dispatch(
        authSlice.actions.loginFailure("Incorrect username or password")
      );
    }
  };
};

//CART
export const addCartItemToDatabase = (cartData: Order, userId: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const orderRef = ref(database, `cart/${userId}/${cartData.id}`);
      const snapshot = await get(orderRef);

      if (snapshot.exists()) {
        const existingCart = snapshot.val();
        const newQuantity = existingCart.quantity + cartData.quantity;
        set(orderRef, { ...existingCart, quantity: newQuantity });
      } else {
        set(orderRef, {
          id: cartData.id,
          name: cartData.name,
          price: cartData.price,
          img: cartData.img,
          quantity: cartData.quantity,
          userId: userId,
        });
        dispatch(cartSlice.actions.addToCart(cartData));
      }
    } catch (error: any) {
      dispatch(cartSlice.actions.cartFailure(error));
    }
  };
};

export const updateCartInDatabase = (
  cartId: number,
  newQuantity: number,
  cartData: Order,
  userId: string
) => {
  return async (dispatch: AppDispatch) => {
    const cartRef = ref(database, `cart/${userId}/${cartData.id}`);

    try {
      await update(cartRef, { quantity: newQuantity });
      dispatch(cartSlice.actions.updateCart({ id: cartId, newQuantity }));
    } catch (error: any) {
      console.error("Error updating cart item in database: ", error);
      dispatch(cartSlice.actions.cartFailure(error.toString()));
    }
  };
};

export const fetchCartFromDatabase = (userId: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(cartSlice.actions.cartFetching());
    try {
      const ordersRef = ref(database, `cart/${userId}`);
      const snapshot = await get(ordersRef);

      if (snapshot.exists()) {
        const ordersData: { [key: string]: Order } = snapshot.val();
        const ordersArray = Object.values(ordersData);

        dispatch(cartSlice.actions.cartFetchingSuccess(ordersArray));
      }
    } catch (error: any) {
      dispatch(cartSlice.actions.cartFetchingError(error));
    }
  };
};

//ORDER
export const addOrderToDatabase = (
  orderData: {
    address: string;
    order: Order[];
  },
  userId: string
) => {
  return async (dispatch: AppDispatch) => {
    dispatch(orderSlice.actions.submitOrderRequest());
    try {
      const orderRef = ref(database, `orders/${userId}/${Date.now()}`);
      set(orderRef, {
        address: orderData.address,
        order: orderData.order,
      });
      dispatch(orderSlice.actions.submitOrderSuccess());
    } catch (error: any) {
      dispatch(orderSlice.actions.submitOrderFailure(error));
    }
  };
};
