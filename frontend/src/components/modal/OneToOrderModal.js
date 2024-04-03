import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const ModalContent = styled.div`
  background-color: #ffffff;
  padding: 40px; /* 크기 조정 */
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* 상대 위치 설정 */
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #333333;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: #333333;
  border: 2px solid #333333;
  border-radius: 5px;
  font-weight: bold;
`;

const OneToOrderModal = ({ show, handleClose }) => {
  const handleConfirm = () => {
    // 옵션이 선택되었을 때만 '/cart'로 이동
    if (!show) {
      window.location.href = "/cart";
    }
    handleClose();
  };

  return (
    <>
      {show && (
        <ModalBackdrop>
          <ModalContent>
            <ModalText>옵션을 선택하세요.</ModalText>
            <div>
              <CloseButton onClick={handleClose}>닫기</CloseButton>
              {/* 옵션이 선택되었을 때만 Link를 통해 '/cart'로 이동 */}
              <Link to="/cart">
                <CloseButton onClick={handleConfirm}>확인</CloseButton>
              </Link>
            </div>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default OneToOrderModal;
