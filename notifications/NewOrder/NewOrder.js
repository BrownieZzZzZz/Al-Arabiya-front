"use client";

import { useContext, useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { eventBus } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const NewOrder = () => {
  const { adminData } = useContext(AuthContext);
  const audioRef = useRef(new Audio("/sounds/LikeNotification.mp3"));
  const [permissionState, setPermissionState] = useState("prompt");
  const socketRef = useRef(null);

  const connectSocket = () => {
    if (!adminData?.id || socketRef.current?.connected) return;

    const socket = io(process.env.NEXT_PUBLIC_API_URL || "", {
      transports: ["websocket", "polling"], // Try WebSocket first, fallback to polling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 20000,
      query: { id: adminData.id },
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("تم الاتصال بالخادم");
    });

    socket.on("connect_error", (error) => {
      console.error("خطأ في الاتصال:", error);
      toast({
        title: "خطأ في الاتصال",
        description: "جاري إعادة المحاولة...",
        duration: 3000,
      });
    });

    socket.on("disconnect", () => {
      console.log("تم قطع الاتصال عن الخادم");
    });

    socket.on("NewOrder", (data) => {
      playNotificationSound();
      eventBus.emit("NewOrder", data);
    });

    socketRef.current = socket;
  };

  const openBrowserSettings = () => {
    const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    const isChrome =
      /chrome/i.test(navigator.userAgent) && !/edge/i.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isEdge = /edge/i.test(navigator.userAgent);

    if (isFirefox) {
      window.open("about:preferences#privacy", "_blank");
    } else if (isChrome) {
      window.open("chrome://settings/content/sound", "_blank");
    } else if (isSafari) {
      toast({
        title: "تغيير الإعدادات",
        description: "يرجى فتح إعدادات Safari > المواقع > الصوت",
        duration: 7000,
      });
    } else if (isEdge) {
      window.open("edge://settings/content/mediaAutoplay", "_blank");
    } else {
      toast({
        title: "تغيير الإعدادات",
        description: "يرجى فتح إعدادات المتصفح وتمكين تشغيل الصوت التلقائي",
        duration: 7000,
      });
    }
  };

  const requestAudioPermission = async () => {
    try {
      const playAttempt = audioRef.current.play();
      if (playAttempt !== undefined) {
        await playAttempt;
        setPermissionState("granted");
        return true;
      }
    } catch (error) {
      try {
        if (navigator.permissions) {
          const result = await navigator.permissions.query({
            name: "notifications",
          });
          setPermissionState(result.state);

          if (result.state === "granted") return true;

          if (result.state === "prompt") {
            const permission = await Notification.requestPermission();
            setPermissionState(permission);
            return permission === "granted";
          }
        } else {
          const permission = await Notification.requestPermission();
          setPermissionState(permission);
          return permission === "granted";
        }
      } catch (permError) {
        console.error("خطأ في طلب الإذن:", permError);
      }
    }
    return false;
  };

  const playNotificationSound = async () => {
    try {
      toast({
        title: "طلب جديد",
        description: "تم استلام طلب جديد",
        duration: 5000,
      });

      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(async (error) => {
          console.error("فشل التشغيل الأولي:", error);

          const hasPermission = await requestAudioPermission();

          if (hasPermission) {
            audioRef.current.play().catch((error) => {
              console.error("خطأ في تشغيل الصوت حتى مع الإذن:", error);
            });
          }
        });
      }
    } catch (error) {
      console.error("خطأ في تشغيل صوت الإشعار:", error);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "touchstart",
      () => {
        audioRef.current.load();
      },
      { once: true },
    );

    audioRef.current.load();

    connectSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [adminData]);

  if (permissionState === "denied") {
    return (
      <Alert className="m-4">
        <AlertTitle>تم حظر صوت الإشعارات</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>
            يرجى تمكين الصوت في إعدادات المتصفح لسماع تنبيهات الطلبات الجديدة
          </p>
          <Button className="mt-2" onClick={openBrowserSettings}>
            فتح الإعدادات
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default NewOrder;
