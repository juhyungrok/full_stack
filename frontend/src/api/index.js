import axios from "axios";

const API_BASE_API = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_API,
});
export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.log("error get products", error);
    return error;
  }
};

export const postPayment = async ({ cartItems, totalPrice }) => {
  try {
    const paymentData = {
      orderProducts: cartItems,
      totalPrice: totalPrice,
    };

    const response = await api.post("/api/payment/kakaopay", paymentData);
    localStorage.removeItem("cart");
    return response.data;
  } catch (error) {
    console.log("결제 요청 오류:", error);
    throw error;
  }
};
export const fetchReceipt = async (orderId) => {
  try {
    const response = await api.get(`/api/receipt?orderId=${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching receipt:", error);
    throw error;
  }
};
// postPayment 함수가 성공적으로 실행되면 fetchReceipt를 호출하는 함수
// export const handlePostPaymentAndFetchReceipt = async ({
//   cartItems,
//   totalPrice,
// }) => {
//   try {
//     const paymentResult = await postPayment({ cartItems, totalPrice });
//     if (paymentResult.success) {
//       // localStorage.removeItem("cart"); // 결제 후 장바구니 비우기
//       const orderId = paymentResult.data.orderId;
//       const receiptData = await fetchReceipt(orderId);
//       return receiptData;
//     } else {
//       throw new Error("결제 처리 중 오류가 발생했습니다.");
//     }
//   } catch (error) {
//     console.error("결제 및 영수증 조회 중 오류가 발생했습니다:", error);
//     throw error;
//   }
// };
export default api;
