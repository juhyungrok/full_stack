import React, { useEffect, useState } from "react";
import axios from "axios";
import handlePayment from "../../hooks/handlePayment";
import { useNavigate } from "react-router-dom";

const KaKaoPayment = ({ cartItems, totalPrice }) => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/v1/iamport.js";
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
        pg: "kakaopay.TC0ONETIME", // 카카오페이 사용 시에는 'kakaopay'로 설정
        pay_method: "card",
        merchant_uid: new Date().getTime().toString(), // 고유한 주문번호를 지정
        name: "키오스크",
        amount: totalPrice,
        m_redirect_url: "http://localhost:3000/success",

        // buyer_email: "test@naver.com",
        // buyer_name: "코드쿡",
        // buyer_tel: "010-1234-5678",
        // buyer_addr: "서울특별시",
        // buyer_postcode: "123-456",
      },
      async (rsp) => {
        console.log(rsp);
        try {
          // const { data } = await axios.post("/verifyIamport/" + rsp.imp_uid);

          if (rsp.success) {
            alert("결제 성공");
            try {
              const paymentResult = await handlePayment({
                cartItems,
                totalPrice,
              });
              if (paymentResult.success) {
                console.log("orderId:", paymentResult.data.orderId);
                navigate("/success", {
                  state: { orderId: paymentResult.data.orderId },
                });
              } else {
                throw new Error("결제 처리 중 오류 발생");
              }
            } catch (error) {
              console.error("결제 처리 중 오류 발생:", error);
              alert("결제 처리 중 오류 발생");
            }
          } else {
            alert("결제 실패1");
          }
        } catch (error) {
          console.error("결제 검증 중 에러 발생:", error);
          alert("결제 실패2");
        }
      }
    );
  };
  return (
    <div>
      <button onClick={requestPay}>카카오페이</button>
    </div>
  );
};

export default KaKaoPayment;
