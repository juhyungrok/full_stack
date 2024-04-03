import React, { useState } from "react";
import styled from "styled-components";
import CartToAddModal from "../modal/CartToAddModal";

const OrderInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-top: 16px;
`;

const TotalPriceText = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const OrderButton = styled.button`
  padding: 10px 20px;
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #000000;
  border-radius: 5px;
  cursor: pointer;
`;

const OrderInfoModule = ({ product, total }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOrder = () => {
    if (!product.selectedTemperature || !product.selectedSize) {
      setShowModal(true);
    } else {
      const newCart = [product];
      localStorage.setItem("cart", JSON.stringify(newCart));
      window.location.href = "/cart";
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <OrderInfoContainer>
        <TotalPriceText>상품 금액: {total}원</TotalPriceText>
        <OrderButton onClick={handleOrder}>주문하기</OrderButton>
      </OrderInfoContainer>
      <CartToAddModal
        show={showModal}
        handleClose={handleCloseModal}
        cartAdded={false}
      />
    </>
  );
};

export default OrderInfoModule;
