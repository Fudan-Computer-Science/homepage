import React from "react";
import styles from "./DetailsBlock.module.css";

export default function DetailsBlock({ type = "info", title, children }) {
  return (
    <details className={`${styles.details} ${styles[type]}`}>
      <summary className={styles.summary}>
        {title || type.toUpperCase()}
      </summary>
      <div className={styles.content}>{children}</div>
    </details>
  );
}
