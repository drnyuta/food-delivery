import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";

import menuStyles from "../MenuPage/MenuPage.styles.module.css";
import styles from "./ConfirmationPage.styles.module.css";

export const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className={`${menuStyles.mainSection} ${styles.mainSection}`} style={{height: '100vh'}}>
        <h1 className={`${menuStyles.title} ${styles.title}`}>Your order has been confirmed</h1>
        <p className={styles.description}>
          Thank you for your order!
        </p>
        <div
          style={{ marginBottom: "100px" }}
          className={menuStyles.buttonsWrapper}
        >
          <Link to="/">
            <Button text="Go home" type="primaryButton"></Button>
          </Link>
          <Button
            text="Go back"
            type="primaryButton"
            onClick={() => navigate(-1)}
          ></Button>
        </div>
      </main>
    </>
  );
};
