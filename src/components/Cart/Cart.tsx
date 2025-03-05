import { Link } from "react-router-dom";
import cart from "../../assets/icons/cartIcon.svg";
import styles from "./Cart.styles.module.css";

export const Cart = () => {
  return (
    <Link to="/order" data-testid={"order-page-link"}>
      <div className={styles.cartBg}>
        <img className={styles.cartIcon} src={cart} alt="cart" />
      </div>
    </Link>
  );
};
