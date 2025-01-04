"use client";

import { useContext, useEffect } from "react";
import { usePathname } from "next/navigation";

import { io } from "socket.io-client";

import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { eventBus } from "@/lib/utils";

const NewOrder = () => {
  const { adminData } = useContext(AuthContext);
  const pathname = usePathname();

  const playNotificationSound = () => {
    const audio = new Audio("/sounds/LikeNotification.mp3");
    audio.muted = false;
    audio
      .play()
      .catch((err) => console.error("Error playing notification sound:", err));
  };

  useEffect(() => {
    if (adminData?.id) {
      const ioSocket = io(
        `${process.env.NEXT_PUBLIC_API_URL}?id=${adminData.id}`,
      );

      ioSocket.on("connect", () => {
        console.info("Connected to server");
      });

      ioSocket.on("disconnect", () => {
        console.info("Disconnected from server");
      });

      ioSocket.on("NewOrder", (data) => {
        playNotificationSound();
        eventBus.emit("NewOrder", data);
        toast({
          title: "طلب جديد",
          description: "تم استلام طلب جديد",
          duration: 5000,
        });
      });

      return () => {
        ioSocket.disconnect();
      };
    }
  }, [adminData]);

  return <></>;
};

export default NewOrder;
