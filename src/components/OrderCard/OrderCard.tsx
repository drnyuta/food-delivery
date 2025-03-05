/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { AppDispatch, RootState } from "store/reducers/rootReducer";
import { updateCartInDatabase } from "store/actions/asyncActions";
import { Button } from "../Button/Button";
import { Order } from "types/commonTypes";

import productCardStyles from "../ProductCard/ProductCard.styles.module.css";
import styles from "./OrderCard.styles.module.css";

interface OrderCardProps extends Order {
  handleDeleteCartItem: (id: number, quantity: number) => void;
  setNewCartValue: React.Dispatch<React.SetStateAction<number>>;
}

export const OrderCard = (props: OrderCardProps) => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  const dispatch = useDispatch() as AppDispatch;

  const {
    id,
    name,
    price,
    img,
    quantity,
    handleDeleteCartItem,
    setNewCartValue,
  } = props;

  const [inputValue, setInputValue] = useState<string>(
    quantity !== undefined ? quantity.toString() : "0"
  );

  const debouncedUpdate = debounce((newQuantity: number) => {
    dispatch(updateCartInDatabase(id, newQuantity, props, userId));
  }, 2000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const newQuantity = parseInt(inputValue);
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity !== quantity) {
      setNewCartValue((prevValue) => prevValue - quantity + newQuantity);
      debouncedUpdate(newQuantity);
    }
  };
  return (
    <div className={styles.card}>
      <img
        className={productCardStyles.image}
        src={img}
        alt="menu item image"
      />
      <div className={styles.wrapper}>
        <h3 className={productCardStyles.title}>{name}</h3>
        <div className={styles.buttonWrapper}>
          <p
            className={`${productCardStyles.price} ${styles.price}`}
          >
            $ {price} USD
          </p>
          <input
            className={productCardStyles.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <Button
            text="X"
            type="deleteButton"
            onClick={() => handleDeleteCartItem(id, quantity)}
          />
        </div>
      </div>
    </div>
  );
};
