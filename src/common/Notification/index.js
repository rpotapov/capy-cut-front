import React from "react";
import styles from "./styles.module.css";

const Notification = ({ type, message }) => (
  <div className={styles.messageContainer}>
    <span className={`${styles.message} ${styles[type]}`}>{message}</span>
  </div>
);

export default Notification;
