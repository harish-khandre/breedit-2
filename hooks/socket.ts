"use client";

import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");

    ws.onopen = () => {
      console.log("Connected");
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};
