// src/components/NotificationComponent.js
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const NotificationItem = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  animation: ${(props) => (props.fadeOut ? fadeOut : fadeIn)} 0.5s forwards;
  cursor: pointer; /* 클릭 가능한 커서 표시 */
`;

const NotificationComponent = ({ message, onDismiss, fadeOut }) => {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 2000); // 2초 후에 알림 사라짐
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <NotificationItem
      fadeOut={fadeOut}
      onClick={() => window.location.reload()}
    >
      {message}
    </NotificationItem>
  );
};

export default NotificationComponent;
