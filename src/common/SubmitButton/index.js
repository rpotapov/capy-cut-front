import React from "react";
import styles from "./styles.module.css";

const SubmitButton = ({ disabled, isPending }) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.submitButton} ${disabled ? styles.disabled : styles.active}`}
        disabled={disabled}
        type="submit"
        id="btn"
      >
        <p id="btnText">{isPending ? "Pending" : "Submit"}</p>
      </button>
    </div>
  );
};

export default SubmitButton;
