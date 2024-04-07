// AccessModal.js

import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 300px;
  text-align: center;
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #000;
  border: 1px solid #000;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const AccessModal = ({ show, handleClose, message }) => {
  const [timeLeft, setTimeLeft] = useState(5);
  let timer;

  useEffect(() => {
    if (show) {
      setTimeLeft(5);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime === 0 ? 0 : prevTime - 1));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [show]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleClose();
    }
  }, [timeLeft, handleClose]);

  // 모달이 열리지 않으면 보이지 않음
  if (!show) return null;

  return (
    <ModalBackdrop>
      <ModalContent>
        <p>{message}</p>
        <p>{timeLeft} 후에 없어져요!</p>
        <CloseButton onClick={handleClose}>닫기</CloseButton>
      </ModalContent>
    </ModalBackdrop>
  );
};

export default AccessModal;
