import React, { useEffect, useState } from "react";
import axios from "axios";
import handlePayment from "../button/PaymentButton";

const TossPayment = ({ cartItems, totalPrice }) => {
  const [orderId, setOrderId] = useState(null); // orderId 상태 추가

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
    const { IMP } = window;
    IMP.init("imp01477361");

    IMP.request_pay(
      {
        pg: "toss.tosstest",
        pay_method: "card",
        merchant_uid: new Date().getTime().toString(),
        name: "키오스크",
        amount: totalPrice,
      },
      async (rsp) => {
        try {
          const { data } = await axios.post(
            "http://localhost:8080/verifyIamport/" + rsp.imp_uid
          );
          if (rsp.paid_amount === data.response.amount) {
            const result = await handlePayment({ cartItems, totalPrice });
            if (result.success) {
              setOrderId(result.data.orderId); // orderId 설정
              alert("결제 성공");
            } else {
              alert("결제 실패1");
            }
          } else {
            alert("결제 실패2");
          }
        } catch (error) {
          console.error("결제 검증 중 에러 발생:", error);
          alert("결제 실패3");
        }
      }
    );
  };

  return (
    <div>
      {orderId && <p>주문 ID: {orderId}</p>}
      <button onClick={requestPay}>토스페이</button>
    </div>
  );
};

export default TossPayment;
