import React from "react";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  console.log("orderId in OrderPage:", orderId);

  return (
    <div>
      <h2>주문이 완료되었습니다</h2>
      <p>주문 번호: {orderId}</p>
    </div>
  );
};

export default OrderPage;
