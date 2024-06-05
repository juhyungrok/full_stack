import axios from "axios";

const { REACT_APP_BACKEND } = process.env;
// 프록시 설정을 사용하여 백엔드 서버에 요청
const api = axios.create({
  baseURL: REACT_APP_BACKEND,
});

export const getProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.log("Error getting products:", error);
    throw error;
  }
};

export const postPayment = async ({ cartItems, totalPrice }) => {
  try {
    const paymentData = {
      orderProducts: cartItems,
      totalPrice: totalPrice,
    };

    const response = await api.post("/api/payment/tosspay", paymentData);
    localStorage.removeItem("cart");
    return response.data;
  } catch (error) {
    console.log("Error processing payment:", error);
    throw error;
  }
};
export const allOrderinfo = async () => {
  try {
    const response = await api.get("/api/receipt/all");
    return response.data;
  } catch (error) {
    console.log("Error getting allreReipt:", error);
    throw error;
  }
};

export const fetchReceipt = async (orderId) => {
  try {
    const response = await api.get(`/api/receipt`, {
      params: { orderId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching receipt:", error);
    throw error;
  }
};

export const handlePostPaymentAndFetchReceipt = async ({
  cartItems,
  totalPrice,
}) => {
  try {
    const paymentResult = await postPayment({ cartItems, totalPrice });
    if (paymentResult.success) {
      const orderId = paymentResult.data.orderId;
      const receiptData = await fetchReceipt(orderId);
      return receiptData;
    } else {
      throw new Error("Error during payment processing.");
    }
  } catch (error) {
    console.error("Error during payment and receipt fetching:", error);
    throw error;
  }
};

export default api;
