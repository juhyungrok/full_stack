// PaymentButton.js 파일

import { postPayment } from "../../api";
import axios from "axios";

const handlePayment = async ({ cartItems, totalPrice }) => {
  try {
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Invalid cart items format");
    }

    // 주문 상품 정보를 적절한 형식으로 가공
    const orderProducts = cartItems.map((item) => ({
      productId: item.productId,
      amount: item.amount,
      name: item.name,
      size: item.selectedSize,
      temperature: item.selectedTemperature,
    }));

    // 결제 요청
    const paymentResult = await postPayment({ orderProducts, totalPrice });

    // 결제 성공 시
    if (paymentResult.success) {
      localStorage.removeItem("cart"); // 결제 후 장바구니 비우기
      return {
        success: true,
        data: {
          orderId: paymentResult.data.orderId,
        },
        errorCode: null, // 에러코드는 null로 설정
      };
    } else {
      // 결제 실패 시
      return {
        success: false,
        errorCode: paymentResult.errorCode,
      };
    }
  } catch (error) {
    console.error("결제 에러:", error);
    throw error; // 예외를 다시 던져서 catch 블록으로 전달
  }
};

export default handlePayment;
