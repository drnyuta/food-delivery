import { NavLink } from "react-router-dom";
import { MenuProps } from "../../../types/commonTypes";

import styles from "./InlineMenu.styles.module.css";
import { useSelector } from "react-redux";
import { RootState } from "store/reducers/rootReducer";

export const InlineMenu = (props: MenuProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const data = isLoggedIn === false ? props.data : props.data.slice(0, -1);

  return (
    <ul className={styles.inlineMenu}>
      {data.map((item: { menuItem: string; src: string }) => (
        <li key={item.menuItem}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.inlineMenuItem} ${styles.active}`
                : styles.inlineMenuItem
            }
            to={item.src}
          >
            {item.menuItem}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
