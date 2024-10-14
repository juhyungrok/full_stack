// src/services/websocketService.js
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { addNotification } from "./NotificationManager";
import { fetchReceipt } from "../api"; // 필요한 API 로직을 가져옵니다.

let stompClient = null;

export const connect = () => {
  const socket = new SockJS(`${process.env.REACT_APP_BACKEND}/ws`);
  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    () => {
      console.log("Connected to WebSocket");
      stompClient.subscribe("/topic/notifications", (message) => {
        const parsedMessage = JSON.parse(message.body);
        addNotification(parsedMessage.message, async () => {
          console.log("Notification clicked");
          try {
            const receipt = await fetchReceipt(parsedMessage.orderId);
            console.log("Fetched receipt:", receipt);
          } catch (error) {
            console.error("Error fetching receipt:", error);
          }
        });
      });
    },
    (error) => {
      console.error("WebSocket connection error:", error);
    }
  );
};

export const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
};
