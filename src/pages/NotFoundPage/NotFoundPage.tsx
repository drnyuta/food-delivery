import { Link, useNavigate } from "react-router-dom";

import { Button } from "../../components/Button/Button";

import menuStyles from "../MenuPage/MenuPage.styles.module.css";
import styles from "./NotFoundPage.styles.module.css";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <main className={menuStyles.mainSection} style={{height: '100vh'}}>
        <h1 className={styles.title}>404 Page is not found</h1>
        <p className={styles.description}>
          Sorry, but the page you were trying to view does not exist.
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
