import React from "react";
import styles from "./styles.module.css";

const InputWithLabel = ({
  onChange,
  onPaste,
  isNeedClearNotifications,
  onClearNotifications,
}) => {
  const handleInputField = (e) => {
    isNeedClearNotifications && onClearNotifications();
    onChange(e.target.value);
  };
  return (
    <div className={styles.inputContainer}>
      <span className={styles.label}>Your URL</span>
      <input
        type="text"
        className={styles.customInput}
        onChange={handleInputField}
        onPaste={(e) => onPaste(e)}
        placeholder="Enter your URL..."
      />
    </div>
  );
};

export default InputWithLabel;
