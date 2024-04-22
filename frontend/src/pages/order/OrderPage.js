import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { handlePostPaymentAndFetchReceipt } from "../../api";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const totalprice = searchParams.get("amount");
  const [showButton, setShowButton] = useState(true);
  const [receiptData, setReceiptData] = useState(null);

  const handlePrintReceipt = async () => {
    try {
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      if (cartItems.length === 0) {
        alert("영수증 에러! 장바구니에 상품이 없습니다.");
        return;
      }

      // 주문 상품 정보를 적절한 형식으로 가공
      const orderProducts = cartItems.map((item) => ({
        productId: item.productId,
        amount: item.amount,
        name: item.name,
        size: item.selectedSize,
        temperature: item.selectedTemperature,
      }));

      const receiptData = await handlePostPaymentAndFetchReceipt({
        cartItems: orderProducts, // 가공된 주문 상품 정보를 전달
        totalPrice: totalprice,
      });

      // Clear cart items after printing the receipt
      localStorage.removeItem("cart");

      console.log("receiptData:", receiptData);
      // receiptData의 형식에 따라 영수증 정보를 출력할 수 있도록 수정
      setReceiptData(receiptData);
      setShowButton(false); // Hide the button after printing the receipt
    } catch (error) {
      console.error("영수증 출력 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <div>
      <h1>결제 성공</h1>
      <div>{`승인번호: ${searchParams.get("orderId")}`}</div>
      <div>{`결제 금액: ${Number(totalprice).toLocaleString()}원`}</div>
      {showButton && <button onClick={handlePrintReceipt}>영수증 출력</button>}
      {receiptData && (
        <div>
          {/* Display receipt data here */}
          <h2>영수증 정보</h2>
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
        </div>
      )}
      <Link to="/">홈으로</Link>
    </div>
  );
}
