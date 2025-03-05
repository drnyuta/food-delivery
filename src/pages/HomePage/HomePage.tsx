/* eslint-disable jsx-a11y/img-redundant-alt */
import { Button } from "../../components/Button/Button";

import styles from "./HomePage.styles.module.css";
import image from "../../assets/images/homePageImage.png";
import trustpilotLogo from "../../assets/icons/trustpilotLogo.svg";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <>
      <div className={styles.backgroundContainer}>
        <div className={styles.main}>
          <div>
            <h1 className={styles.title}>
              Beautiful food & takeaway,
              <span className={styles.greenText}>delivered</span> to your door.
            </h1>
            <p className={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
            <Link to='/menu'>
              <Button
                text="Place an Order"
                type="primaryButton"
                style={{
                  backgroundColor: "var(--tiffany-green)",
                  color: "white",
                  marginBottom: "30px",
                }}
              />
            </Link>
            <div>
              <img src={trustpilotLogo} alt="trustpilotLogo" />
              <p className={styles.statisticsText}>
                <span className={styles.greenText}>4.8 out of 5</span> based on
                2000+ reviews
              </p>
            </div>
          </div>
          <img className={styles.image} src={image} alt="main-image" />
        </div>
      </div>
    </>
  );
};
