import { useContext, useState } from "react";
import { useEffect } from "react";

import { Logo } from "../Logo/Logo";
import { InlineMenu } from "../Navigation/InlineMenu/InlineMenu";
import { menu } from "../../mockapi/mockapi.js";
import { Cart } from "../Cart/Cart";
import { BurgerMenu } from "components/Navigation/BurgerMenu/BurgerMenu";
import { ThemeContext } from "components/context/ThemeContext";

import sunIcon from "../../assets/icons/sun.svg";
import moonIcon from "../../assets/icons/moon.svg";
import styles from "./Header.styles.module.css";
import burgerMenuIcon from "../../assets/icons/burger.svg";

export const Header = () => {
  const [isVisible, setVisible] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", theme === "dark");
  }, [theme]);

  return (
    <header className={styles.header}>
      {isVisible && <BurgerMenu data={menu} setVisible={setVisible} />}
      <div>
        <button
          className={styles.burgerButton}
          onClick={() => {
            setVisible(true);
          }}
        >
          <img className={styles.burgerMenuIcon} src={burgerMenuIcon} alt="" />
        </button>
        <Logo />
      </div>
      <div className={styles.wrapper}>
        <button onClick={handleToggleTheme} className={styles.themeButton}>
          {theme === "light" ? (
            <img className={styles.sunIcon} src={sunIcon} alt="" />
          ) : (
            <img className={styles.moonIcon} src={moonIcon} alt="" />
          )}
        </button>
        <InlineMenu data={menu} />
        <Cart />
      </div>
    </header>
  );
};
