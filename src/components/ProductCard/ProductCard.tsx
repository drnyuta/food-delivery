/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

import styles from "./ProductCard.styles.module.css";
import { Button } from "../Button/Button";
import { useState } from "react";
import { Order } from "types/commonTypes";

type ProductCardProps = {
  key: number;
  id: number;
  name: string;
  price: number;
  image: string;
  cardText: string;
  handleAddToCart: (inputValue: string, item: Order) => void;
};

export const ProductCard = (props: ProductCardProps) => {
  const [inputValue, setInputValue] = useState<string>("1");
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [displayInputError, setDisplayInputError] = useState<boolean>(false);
  let tooltipTimer: NodeJS.Timeout | null = null;

  const { id, name, price, image, cardText, handleAddToCart } = props;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    if (!+value) {
      setDisplayInputError(true);
    } else {
      setDisplayInputError(false);
    }
  };

  const handleMouseEnter = () => {
    tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 500);
  };

  const handleMouseLeave = () => {
    if (tooltipTimer) clearTimeout(tooltipTimer);
    setShowTooltip(false);
  };

  return (
    <div className={styles.card}>
      <img className={styles.image} src={image} alt="menu item image" />
      <div>
        <div className={styles.infoWrapper}>
          <h3 className={styles.title}>{name}</h3>
          <p className={styles.price}>$ {price} USD</p>
        </div>
        <div
          className={styles.tooltip}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className={styles.description}>{cardText}</p>
          {showTooltip && (
            <span className={styles.tooltipText}>{cardText}</span>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <input
            className={displayInputError ? styles.inputError : styles.input}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <Button
            text="Add to cart"
            type="secondaryButton"
            onClick={() =>
              handleAddToCart(inputValue, {
                id,
                name,
                price,
                img: image,
                quantity: +inputValue,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};
