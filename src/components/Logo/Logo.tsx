import logoIcon from "../../assets/icons/logoIcon.png";
import styles from "./Logo.styles.module.css";

export const Logo = () => {
  return <img className={styles.logo} src={logoIcon} alt="logo" />;
};
