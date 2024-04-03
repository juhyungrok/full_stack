import React, { useEffect, useState } from "react";
import axios from "axios";

import handlePayment from "../button/PaymentButton";

const KaKaoPayment = ({ cartItems, totalPrice }) => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    // iamport.onload = () => {
    //   requestPay();
    // };
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
        pg: "kakaopay.TC0ONETIME", // 카카오페이 사용 시에는 'kakaopay'로 설정
        pay_method: "card",
        merchant_uid: new Date().getTime().toString(), // 고유한 주문번호를 지정
        name: "테스트 상품",
        amount: 1004,
        // buyer_email: "test@naver.com",
        // buyer_name: "코드쿡",
        // buyer_tel: "010-1234-5678",
        // buyer_addr: "서울특별시",
        // buyer_postcode: "123-456",
      },
      async (rsp) => {
        try {
          const { data } = await axios.post(
            "http://192.168.0.20:8080/verifyIamport/" + rsp.imp_uid
          );
          console.log("error data : ", data);
          if (rsp.paid_amount === data.response.amount) {
            alert("결제 성공");
            handlePayment({ cartItems, totalPrice }); //결제 성공시 로직
          } else {
            alert("결제 실패");
          }
        } catch (error) {
          console.error("결제 검증 중 에러 발생:", error);
          alert("결제 실패");
        }
      }
    );
  };

  return (
    <div>
      <button onClick={requestPay}>결제하기</button>
    </div>
  );
};

export default KaKaoPayment;
