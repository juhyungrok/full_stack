import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../cart/Header";
import Footer from "../cart/Footer";
import CartComponent from "../cart/CartComponent";

import SelectedCardModal from "../modal/SeletedCardModal";
import { CheckoutPage } from "../../toss/CheckoutPage";
// import handlePayment from "../button/PaymentButton.js";

const Layout = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MobileLayout = styled(Layout)`
  @media (max-width: 768px) {
    padding-top: 60px;
    padding-bottom: 60px;
    height: 100vh;
  }
`;

const CartContent = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 0px 1px;
`;

const CartLayout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
    calculateTotalPrice(storedCart);
  }, []);

  const calculateTotalPrice = (items) => {
    if (!items) return; // 예외 처리 추가
    let totalPrice = 0;
    items.forEach((item) => {
      totalPrice += item.price * item.amount;
    });
    setTotalPrice(totalPrice);
  };

  const handleCartUpdate = (updatedCart) => {
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleCartContentClick = () => {
    if (showCheckout) {
      setShowCheckout(false);
    }
  };

  return (
    <MobileLayout>
      <Header>장바구니</Header>

      <CartContent>
        <CartComponent cartItems={cartItems} onUpdate={handleCartUpdate} />
      </CartContent>

      <Footer>
        <div>
          {cartItems.length > 0 && (
            <p>총 가격: {totalPrice.toLocaleString()}원</p>
          )}
        </div>

        {showCheckout ? (
          <button onClick={() => setShowCheckout(false)}>닫기</button>
        ) : (
          <button onClick={handleCheckout}>결제하기</button>
        )}
        {showCheckout && (
          <CheckoutPage cartItems={cartItems} totalPrice={totalPrice} />
        )}
        {/* <SelectedCardModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          cartItems={cartItems}
          totalPrice={totalPrice}
        /> */}
      </Footer>
    </MobileLayout>
  );
};

export default CartLayout;
