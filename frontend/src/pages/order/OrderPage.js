import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchReceipt } from "../../api";

const OrderPage = () => {
  const [receiptData, setReceiptData] = useState(null);
  const location = useLocation();
  const orderId = location.state?.orderId;
  const queryParams = new URLSearchParams(location.search);

  console.log("orderId in OrderPage:", orderId);
  useEffect(() => {
    if (orderId) {
      fetchReceipt(orderId)
        .then((data) => setReceiptData(data))
        .catch((error) => console.error("Error fetching receipt:", error));
    }
  }, [orderId]);
  return (
    <div>
      <h2>주문이 완료되었습니다</h2>
      {receiptData && (
        <>
          <h3>주문 정보</h3>
          <p>주문 번호: {receiptData.orders.orderNumber}</p>
          <p>주문 일시: {receiptData.orders.orderDatetime}</p>
          <h3>주문 상품</h3>
          <ul>
            {receiptData.orderProducts.map((product, index) => (
              <li key={index}>
                {product.name} - {product.amount}개 ({product.size},{" "}
                {product.temperature})
              </li>
            ))}
          </ul>
          <h3>결제 정보</h3>
          <p>총 결제 금액: {receiptData.payment.totalPrice}원</p>
          <p>결제 수단: {receiptData.payment.method}</p>
        </>
      )}
    </div>
  );
};

export default OrderPage;
