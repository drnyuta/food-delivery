import React from "react";

import { Logo } from "../Logo/Logo";
import { ColumnMenu } from "../Navigation/ColumnMenu/ColumnMenu";
import { columnMenu1 } from "../../mockapi/mockapi.js";
import { columnMenu2 } from "../../mockapi/mockapi.js";
import { columnMenu3 } from "../../mockapi/mockapi.js";
import { socials } from "../../mockapi/mockapi.js";

import styles from "./Footer.styles.module.css";

type FooterProps = {
  style?: React.CSSProperties;
};

export const Footer = (props: FooterProps) => {
  return (
    <footer className={styles.footer} style={props.style}>
      <div className={styles.beforeDevider}>
        <div className={styles.logoWrapper}>
          <Logo />
          <p className={styles.description}>
            Takeaway & Delivery template for small - medium businesses.
          </p>
        </div>
        <div className={styles.columnMenuWrapper}>
          <ColumnMenu data={columnMenu1} />
          <ColumnMenu data={columnMenu2} />
          <ColumnMenu data={columnMenu3} />
        </div>
      </div>
      <div className={styles.devider}></div>
      <div className={styles.afterDevider}>
        <p className={styles.copyright}>
          Built by{" "}
          <a
            href="src"
            style={{ color: "var(--tiffany-green)", textDecoration: "none" }}
          >
            Flowbase
          </a>{" "}
          · Powered by{" "}
          <a
            href="src"
            style={{ color: "var(--tiffany-green)", textDecoration: "none" }}
          >
            Webflow
          </a>
        </p>
        <div className={styles.socials}>
          {socials.map((social: { src: string; id: number }) => (
            <a href="src" key={social.id}>
              <img
                src={social.src}
                alt="social icon"
                className={styles.socialIcon}
                key={social.id}
              ></img>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
