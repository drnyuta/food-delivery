import { MenuProps } from "../../../types/commonTypes";

import styles from "./ColumnMenu.styles.module.css";

export const ColumnMenu = (props: MenuProps) => {
  const { title } = props.data[0];
  const menuItems = props.data.slice(1);
  return (
    <ul className={styles.columnMenu}>
      <li className={styles.title}>{title}</li>
      {menuItems.map((item: { menuItem: string , src?: string}, index: number) => (
        <li key={index}>
          <a href={item.src} className={styles.columnMenuItem}>
            {item.menuItem}
          </a>
        </li>
      ))}
    </ul>
  );
};
