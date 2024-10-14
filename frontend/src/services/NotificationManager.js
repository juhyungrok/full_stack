// src/components/NotificationManager.js
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NotificationComponent from "./NotificationComponent";

let addNotificationHandler = null;

const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    addNotificationHandler = addNotification;
  }, []);

  const addNotification = (message, onDismiss) => {
    const id = new Date().getTime();
    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, onDismiss, fadeOut: false },
    ]);
  };

  const handleDismiss = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id
          ? { ...notification, fadeOut: true }
          : notification
      )
    );
    setTimeout(() => removeNotification(id), 500); // fadeOut 애니메이션 시간 추가
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <NotificationWrapper>
      {notifications.map((notification) => (
        <NotificationComponent
          key={notification.id}
          message={notification.message}
          onDismiss={() => handleDismiss(notification.id)}
          fadeOut={notification.fadeOut}
        />
      ))}
    </NotificationWrapper>
  );
};

export const addNotification = (message, onDismiss) => {
  if (addNotificationHandler) {
    addNotificationHandler(message, onDismiss);
  }
};

export default NotificationManager;
