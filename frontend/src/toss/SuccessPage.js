import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./SuccessPage.css";
import { fetchReceipt, postPayment } from "../api";

export function SuccessPage() {
  const [searchParams] = useSearchParams();
  const totalprice = searchParams.get("amount");
  const [showButton, setShowButton] = useState(true);
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchParams.get("amount") && !searchParams.get("paymentType")) {
          alert("잘못된 경로입니다.");
          window.location.href = "/";
          return;
        }
        const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
        if (cartItems.length === 0) {
          alert("영수증 에러! 장바구니에 상품이 없습니다.");
          window.location.href = "/"; // 홈 화면으로 이동
          return;
        }
        // 주문 상품 정보를 적절한 형식으로 가공
        const CARTITEM = cartItems.map((item) => ({
          productId: item.productId,
          amount: item.amount,
          name: item.name,
          size: item.selectedSize,
          temperature: item.selectedTemperature,
        }));
        const paymentResult = await postPayment({
          cartItems: CARTITEM, // Pass your cart items here
          totalPrice: totalprice, // Pass the total price here
        });

        if (paymentResult.success) {
          // If payment is successful, set receipt data
          console.log("Payment data received:", paymentResult.data);
          const orderId = paymentResult.data.orderId;
          if (!orderId) {
            throw new Error("orderId를 찾을 수 없음!"); //오류발생 시 에러 메시지 설정
          }
          await handleViewReceipt(orderId);
          setLoading(false);
        } else {
          throw new Error("결제 처리 중 오류가 발생했습니다.");
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData(); // Call fetchData when component mounts
  }, [totalprice]); // Ensure useEffect runs when totalprice changes

  const handleViewReceipt = async (orderId) => {
    try {
      console.log("Fetching receipt for orderId:", orderId); // orderId를 콘솔에 출력
      const receipt = await fetchReceipt(orderId);
      console.log("Receipt data:", receipt); // 받아온 영수증 데이터를 콘솔에 출력
      setReceiptData(receipt);
    } catch (error) {
      console.error("Error fetching receipt:", error);

      setError(error);
    }
  };

  return (
    <div className="success-page">
      <div className="content">
        <div className="icon-container">
          <il className="far fa-check-circle"></il>
        </div>
        <h1>결제가 성공적으로 완료되었습니다!</h1>
        <div className="details">
          <p>
            <strong>승인번호:</strong> {searchParams.get("orderId")}
          </p>
          <p>
            <strong>결제 금액:</strong> {Number(totalprice).toLocaleString()}원
          </p>
          <p>
            <strong>주문 번호:</strong> {receiptData?.orders?.orderId || ""}
          </p>
        </div>
        <div className="buttons">
          <Link to="/" className="btn btn-home">
            <i className="fas fa-home"></i> 홈으로
          </Link>
          {showButton && (
            <button className="btn btn-receipt">
              <i className="fas fa-print"></i> 영수증 출력(아두이노 사용)
            </button>
          )}
        </div>
        {receiptData && receiptData.orders && (
          <div className="receipt">
            <h2>영수증</h2>
            <p>=============================</p>
            <p>주문 번호: {receiptData.orders.orderId}</p>
            <p>결제 금액: {receiptData.payment.totalPrice}원</p>
            <p>결제 수단: {receiptData.payment.method}</p>
            <p>주문 날짜: {receiptData.orders.orderDatetime}</p>
            <p>=============================</p>
            <p>주문 상품 목록:</p>
            <div className="product-list">
              {receiptData.orderProducts.map((item, index) => (
                <div className="product-item" key={index}>
                  <div className="product-details">
                    <p className="product-name">{item.name}</p>
                    <p className="product-info">
                      사이즈: {item.size}, 온도: {item.temperature}, 수량:{" "}
                      {item.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
