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
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 45%;
`;

const CloseButton = styled.button`
  padding: 8px 31px;
  background-color: #ffffff;
  color: #333333;
  border: 2px solid #333333;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
`;

const CartButton = styled(Link)`
  padding: 8px 13px;
  background-color: #ffffff;
  color: #333333;
  border: 2px solid #333333;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  margin-left: 10px; /* 간격 조정 */
`;

const ModalText = styled.p`
  font-size: 16px;
  color: #333333;
  margin-bottom: 20px;
  font-weight: bold; /* 텍스트 굵게 */
`;

const CartToAddModal = ({ show, handleClose, cartAdded }) => {
  return (
    <>
      {show && (
        <ModalBackdrop>
          <ModalContent>
            {cartAdded !== undefined && (
              <>
                <ModalText>
                  {cartAdded
                    ? "장바구니에 상품이 추가되었습니다."
                    : "옵션을 선택하세요"}
                </ModalText>
                <ButtonContainer>
                  {cartAdded && (
                    <ButtonWrapper>
                      <CartButton to="/cart">장바구니</CartButton>
                    </ButtonWrapper>
                  )}
                  <ButtonWrapper>
                    {cartAdded ? (
                      <CloseButton as={Link} to="/">
                        닫기
                      </CloseButton>
                    ) : (
                      <CloseButton onClick={handleClose}>닫기</CloseButton>
                    )}
                  </ButtonWrapper>
                </ButtonContainer>
              </>
            )}
          </ModalContent>
        </ModalBackdrop>
      )}
    </>
  );
};

export default CartToAddModal;
