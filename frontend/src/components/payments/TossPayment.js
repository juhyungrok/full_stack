import React, { useEffect, useState } from "react";
import axios from "axios";
import handlePayment from "../../hooks/handlePayment";
import { useNavigate } from "react-router-dom";

const TossPayment = ({ cartItems, totalPrice }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const requestPay = async () => {
    const IMP = window.IMP;
    IMP.init("imp01477361");

    IMP.request_pay(
      {
        pg: "tosspay.tosstest",
        pay_method: "card",
        merchant_uid: new Date().getTime().toString(),
        name: "키오스크",
        amount: totalPrice,
        // successUrl: "http://localhost:8080/success",
        // close: true, // 결제가 완료되면 자동으로 창을 닫음
      },
      async (rsp) => {
        // 콜백 함수 시작
        try {
          console.log(rsp); // rsp 값을 콘솔에 출력하여 확인
          const { data } = await axios.post(
            "http://localhost:8080/verifyIamport/" + rsp.imp_uid
          );
          if (rsp.success) {
            // rsp.success를 이용하여 결제 성공 여부 확인
            const paymentResult = await handlePayment({
              cartItems,
              totalPrice,
            });
            alert("결제 성공");
            if (paymentResult.success) {
              console.log("orderId:", paymentResult.data.orderId);
              navigate("/success", {
                state: { orderId: paymentResult.data.orderId },
              });
            } else {
              throw new Error("결제 처리 중 오류 발생");
            }
          } else {
            alert("결제 실패");
          }
        } catch (error) {
          console.error("결제 처리 중 에러 발생:", error);
          alert("결제 처리 중 오류 발생");
        }
      }
    );
  };
  return (
    <div>
      <button onClick={requestPay}>토스페이</button>
    </div>
  );
};

export default TossPayment;
