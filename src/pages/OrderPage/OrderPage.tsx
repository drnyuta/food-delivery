import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ref, remove } from "firebase/database";
import { database } from "../../index.js";

import { RootState } from "store/reducers/rootReducer";
import { OrderCard } from "components/OrderCard/OrderCard";
import { Order } from "types/commonTypes";
import { AppDispatch } from "store/reducers/rootReducer";
import {
  addOrderToDatabase,
  fetchCartFromDatabase,
} from "store/actions/asyncActions";
import { TailSpin } from "react-loader-spinner";
import { Button } from "components/Button/Button";
import { clearCart, deleteFromCart } from "features/cartSlice";
import { clearErrors } from "features/authSlice";

import menuStyles from "../MenuPage/MenuPage.styles.module.css";
import styles from "./OrderPage.styles.module.css";
import loginStyles from "../LoginPage/LoginPage.styles.module.css";

type OrderPageProps = {
  newCartValue: number;
  setNewCartValue: React.Dispatch<React.SetStateAction<number>>;
};

export const OrderPage = (props: OrderPageProps) => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const isLoading = useSelector((state: RootState) => state.order.isLoading);
  const error = useSelector((state: RootState) => state.order.error);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const isSubmitted = useSelector(
    (state: RootState) => state.order.isSubmitted
  );

  const cartValue = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [street, setStreet] = useState<string>("");
  const [house, setHouse] = useState<string>("");
  const [displayError, setDisplayError] = useState<string>("");

  const dispatch = useDispatch() as AppDispatch;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartFromDatabase(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    props.setNewCartValue(cartValue);
  }, [cartItems]);

  const handleStreetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearErrors());
    setStreet(e.target.value);
  };

  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearErrors());
    setHouse(e.target.value);
  };

  const handleDeleteCartItem = async (id: number) => {
    dispatch(deleteFromCart(id));
    const cartRef = ref(database, `cart/${userId}/${id}`);
    await remove(cartRef);
  };

  const handleSubmitOrder = async (
    e: React.MouseEvent<HTMLButtonElement>,
    street: string,
    house: string,
    userId: string
  ) => {
    e.preventDefault();
    if (street && house) {
      dispatch(clearErrors());
      setDisplayError("");

      const address = street + ", " + house;
      const orderData = {
        address,
        order: cartItems,
      };
      dispatch(addOrderToDatabase(orderData, userId));
      dispatch(clearCart());
      const cartRef = ref(database, `cart/${userId}`);
      await remove(cartRef);  

      if (isSubmitted) {
        navigate("/confirmation");
      }
    } else {
      setDisplayError("Please fill in the fields");
    }
  };

  return (
    <>
      {cartItems.length === 0 && (
        <div className={styles.emptyCartWrapper}>
          <p style={{ fontSize: "20px" }}>Your cart is empty</p>
          <Link to="/menu">
            <Button
              text="Go shopping"
              type="secondaryButton"
              style={{ marginBottom: "70px" }}
            />
          </Link>
        </div>
      )}
      {cartItems.length > 0 && (
        <div className={menuStyles.background}>
          <main className={styles.mainSection}>
            <h1 className={menuStyles.title} style={{ marginBottom: "40px" }}>
              Finish your order
            </h1>
            {error && <p className={styles.error}>{error.message}</p>}
            {cartItems.length > 0 &&
              cartItems.map((item: Order) => (
                <OrderCard
                  key={item.id}
                  {...item}
                  handleDeleteCartItem={handleDeleteCartItem}
                  setNewCartValue={props.setNewCartValue}
                />
              ))}
            <form
              style={{ backgroundColor: "transparent", border: "none" }}
              className={loginStyles.form}
            >
              <div className={loginStyles.inputContainer}>
                <label className={loginStyles.label} htmlFor="street">
                  Street
                </label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    className={`${loginStyles.input} ${
                      displayError.length > 0 ? loginStyles.error : ""
                    }`}
                    type="text"
                    value={street}
                    onChange={handleStreetChange}
                  />
                  {displayError.length > 0 && (
                    <span className={loginStyles.errorMessage}>
                      {displayError}
                    </span>
                  )}
                </div>
              </div>
              <div className={loginStyles.inputContainer}>
                <label className={loginStyles.label} htmlFor="house">
                  House
                </label>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <input
                    className={`${loginStyles.input} ${
                      displayError.length > 0 ? loginStyles.error : ""
                    }`}
                    type="text"
                    value={house}
                    onChange={handleHouseChange}
                  />
                  {displayError.length > 0 && (
                    <span className={loginStyles.errorMessage}>
                      {displayError}
                    </span>
                  )}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "30px",
                  justifyContent: "center",
                }}
              >
                <Button
                  text="Order"
                  type="primaryButton"
                  style={{
                    backgroundColor: "var(--tiffany-green)",
                    color: "white",
                  }}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmitOrder(e, street, house, userId)
                  }
                />
              </div>
            </form>
            {isLoading && (
              <TailSpin
                visible={true}
                height="40"
                width="40"
                color="#808080"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            )}
          </main>
        </div>
      )}
    </>
  );
};
