import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import KaKaoPayment from "../payments/KaKaoPayment";
import TossPayment from "../payments/TossPayment";

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
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: center; /* 모달 창 내용 가운데 정렬 */
  width: 400px; /* 너비 설정 */
  height: 300px; /* 높이 설정 */
`;

// const CloseButton = styled.button`
//   padding: 6px 12px;
//   background-color: #ffffff;
//   color: #333333;
//   border: 2px solid #333333;
//   border-radius: 5px;
//   font-weight: bold;
//   text-decoration: none;
//   position: absolute;
//   top: 10px; /* 모달 창 상단에 위치 */
//   right: 10px; /* 모달 창 우측에 위치 */
// `;

const SmallCloseButton = styled.button`
  padding: 4px 8px;
  background-color: #ffffff;
  color: #333333;
  border: 2px solid #333333;
  border-radius: 5px;
  font-weight: bold;
  margin-top: 20%; /* 닫기 버튼을 약간 더 내림 */
  text-decoration: none;
`;

// const CartButton = styled(Link)`
//   padding: 8px 20px;
//   background-color: #ffffff;
//   margin: 8px;
//   color: #333333;
//   border: 2px solid #333333;
//   border-radius: 5px;
//   font-weight: bold;
//   text-decoration: none;
//   display: block; /* 링크를 블록 요소로 설정하여 중앙 정렬 */
//   margin: 10 auto; /* 가운데 정렬 */
// `;

const SelectedCardModal = ({ show, handleClose, cartItems, totalPrice }) => {
  return (
    <>
      {show && (
        <ModalBackdrop>
          <ModalContent>
            {/* <KaKaoPayment cartItems={cartItems} totalPrice={totalPrice} />
            <TossPayment cartItems={cartItems} totalPrice={totalPrice} /> */}

            <SmallCloseButton onClick={handleClose}>닫기</SmallCloseButton>
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default SelectedCardModal;
