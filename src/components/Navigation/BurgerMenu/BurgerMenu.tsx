import React from "react";

import { NavLink } from "react-router-dom";
import { MenuProps } from "../../../types/commonTypes";

import styles from "./BurgerMenu.styles.module.css";
import icon from "../../../assets/icons/crossIcon.svg";

export const BurgerMenu = (props: {
  data: MenuProps["data"];
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, setVisible } = props;

  return (
    <ul className={styles.burgerMenu}>
      <button
        onClick={() => {
          setVisible(false);
        }}
        className={styles.crossButton}
      >
        <img src={icon} alt="cross icon" className={styles.crossIcon} />
      </button>
      {data.map((item: { menuItem: string; src: string }) => (
        <li key={item.menuItem}>
          <NavLink className={styles.burgerMenuItem} to={item.src}>
            {item.menuItem}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default BurgerMenu;
