import React, { useState } from "react";
import InputWithLabel from "../../common/InputWithLabel";
import SubmitButton from "../../common/SubmitButton";
import CopyButton from "../../common/CopyButton";
import Notification from "../../common/Notification";
import { post } from "../../helpers/requests";
import { NOTIFICATION_TYPES } from "../../constants";
import styles from "./styles.module.css";

const ShortenForm = () => {
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [pending, setPending] = useState(false);

  const isValidAndSafeUrl = () => {
    const urlPattern = /^(https?:\/\/)[^\s.]+(\.\w+)+/;

    if (!urlPattern.test(originalURL)) {
      return false;
    }

    try {
      const sanitizedUrl = encodeURI(originalURL);
      new URL(sanitizedUrl);
      return true;
    } catch (error) {
      setErrorMessage("Invalid URL");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    if (isValidAndSafeUrl(originalURL)) {
      try {
        const response = await post("api/checkUrl", {
          originalURL,
        });
        if (response.status === 200 && !response.data.url) {
          const secondResponse = await post("api/shorten", {
            originalURL,
          });
          setShortURL(secondResponse.data);
        } else {
          setNotificationMessage(response.data.message);
          setShortURL(response.data.url.shortURL);
        }
      } catch (error) {
        console.error("Error: ", error);
        setErrorMessage(error.message);
      } finally {
        setPending(false);
      }
    }
  };

  const clearNotification = () => {
    setShortURL("");
    setNotificationMessage("");
    setErrorMessage("");
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <InputWithLabel
            onChange={setOriginalURL}
            onPaste={isValidAndSafeUrl}
            onClearNotifications={clearNotification}
            isNeedClearNotifications={errorMessage || notificationMessage}
          />
          <Notification
            type={NOTIFICATION_TYPES.ERROR}
            message={errorMessage}
          />
          <Notification
            type={NOTIFICATION_TYPES.WARNING}
            message={notificationMessage}
          />
        </div>
        <SubmitButton
          disabled={
            !originalURL.length ||
            errorMessage ||
            notificationMessage ||
            pending ||
            shortURL
          }
          isPending={pending}
        />
        {shortURL && (
          <>
            <Notification
              type={NOTIFICATION_TYPES.SUCCESS}
              message={`Here your short URL: ${window.location.origin}/${shortURL}`}
            />
            {shortURL && (
              <CopyButton
                textToCopy={`${window.location.origin}/${shortURL}`}
              />
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default ShortenForm;
