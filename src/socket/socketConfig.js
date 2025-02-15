import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WS_URL = `${process.env.REACT_APP_WSURL}`;
let stompClient = null;

export const connectSocket = (_userId, onMessageReceived) => {
  const socket = new SockJS(WS_URL);

  stompClient = new Client({
    webSocketFactory: () => socket,
    connectHeaders: {
      userId: _userId,
    },
    debug: (str) => {
      // console.log("DEBUG: " + str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  stompClient.activate();

  stompClient.onConnect = (frame) => {
    // console.log("CONNECTED...: " + JSON.stringify(frame.headers));
    // const sessionId = frame.headers["session"];

    stompClient.subscribe(`/topic/user-events/${_userId}`, (msg) => {
      if (msg.body) {
        const eventData = JSON.parse(msg.body);
        onMessageReceived(eventData);
      }
    });
  };

  setTimeout(() => {}, 1000);

  stompClient.onStompError = (frame) => {
    // console.error(`STOMP error: ${frame}`);
  };

  stompClient.onDisconnect = () => {
    // console.log("Disconnected from WebSocked...");
  };
};

export const disconnectSocket = () => {
  if (stompClient && stompClient.connected) {
    stompClient.onDisconnect(() => {
      // console.log("Disconnected from WebSocket...");
    });
  }
};
