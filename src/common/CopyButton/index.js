import React, { useState } from "react";
import styles from "./styles.module.css";

function CopyButton({ textToCopy }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(null);

  const handleCopyClick = () => {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);

    textArea.select();

    try {
      const successful = document.execCommand("copy");
      setCopySuccess(successful);
    } catch (err) {
      setCopySuccess(false);
    }

    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    document.body.removeChild(textArea);
  };

  return (
    <div>
      <button
        type="button"
        className={styles.copyButton}
        onClick={handleCopyClick}
      >
        Copy to Clipboard
      </button>
      <div
        className={`${styles.message} ${showMessage ? styles.show : ""} ${
          copySuccess ? styles.success : styles.error
        }`}
      >
        {copySuccess ? "Copied to clipboard!" : "Copy failed"}
      </div>
    </div>
  );
}

export default CopyButton;
