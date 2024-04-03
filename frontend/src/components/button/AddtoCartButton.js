// AddToCartButton.js

import React, { useState } from "react";
import styled from "styled-components";
import CartToAddModal from "../modal/CartToAddModal";

const Button = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  background-color: #ffffff; /* 흰색 배경색 */
  color: #000000; /* 글자색을 검은색으로 변경 */
  border: 2px solid #000000; /* 테두리 추가 */
  border-radius: 5px;
  cursor: pointer;
`;

const AddToCartButton = ({ product }) => {
  const [showModal, setShowModal] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);

  const addToCart = () => {
    if (product.selectedTemperature && product.selectedSize) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingItemIndex = cart.findIndex(
        (item) =>
          item.productId === product.productId &&
          item.selectedTemperature === product.selectedTemperature &&
          item.selectedSize === product.selectedSize
      );

      if (existingItemIndex !== -1) {
        cart[existingItemIndex].amount = product.amount;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      setShowModal(true);
      setCartAdded(true);
    } else {
      setShowModal(true); // 옵션이 선택되지 않았을 때도 모달 창 표시
      setCartAdded(false); // 카트에 상품이 추가되지 않았음을 설정
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={addToCart}>장바구니 추가</Button>
      <CartToAddModal
        show={showModal}
        handleClose={closeModal}
        cartAdded={cartAdded}
      />
    </>
  );
};

export default AddToCartButton;
