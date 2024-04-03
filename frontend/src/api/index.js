import axios from "axios";

const API_BASE_API = "http://192.168.0.20:8080";

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

export const postPayment = async ({ orderProducts, totalPrice }) => {
  try {
    const paymentData = {
      orderProducts: orderProducts,
      totalPrice: totalPrice,
    };

    const response = await api.post("/api/payment/kakaopay", paymentData);
    return response.data;
  } catch (error) {
    console.log("결제 요청 오류:", error);
    throw error;
  }
};

export default api;
