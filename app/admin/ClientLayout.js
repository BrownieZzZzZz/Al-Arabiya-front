"use client";

import { useState, useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/contexts/AuthContext";

import DashNav from "@/components/DashNav/DashNav";
//import NewOrder from "@/notifications/NewOrder/NewOrder";

export default function ClientLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAdminSigned, setIsAdminSigned] = useState(false);
  const [loadingAdmin, setLoadingAdmin] = useState(true);
  const [loadingPage, setLoadingPage] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [isPending, startTransition] = useTransition();

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const checkAdmin = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/account`,
        {
          method: "GET",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setAdminData(data.data);
      setIsAdminSigned(true);
      setLoadingAdmin(false);
    } catch (error) {
      setIsAdminSigned(false);
      setLoadingAdmin(false);
    }
  };

  const ChangePath = () => {
    if (isAdminSigned) {
      if (pathname.includes("dashboard")) return;
      if (pathname.includes("sign") || pathname.includes("reset")) {
        toast({
          title: "تم تسجيل دخول المسؤول بالفعل",
          description: "سيتم تحويلك إلى لوحة التحكم",
          variant: "warning",
          duration: 5000,
        });
        ChangeUrl("/admin/dashboard");
        return;
      }
      ChangeUrl("/admin/dashboard");
      return;
    } else {
      if (pathname.includes("sign") || pathname.includes("reset")) return;
      if (pathname.includes("dashboard")) {
        toast({
          title: "صلاحيات المسؤول مطلوبة",
          description: "يرجى تسجيل الدخول كمسؤول للمتابعة",
          variant: "warning",
          duration: 5000,
        });
        ChangeUrl("/admin/sign-in");
        return;
      }
      ChangeUrl("/admin/sign-in");
      return;
    }
  };

  useEffect(() => {
    if (!loadingAdmin) {
      ChangePath();
    }
  }, [loadingAdmin]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    checkAdmin();
  }, []);

  if (loadingAdmin) {
    return (
      <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
        <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
      </div>
    );
  } else {
    if (isAdminSigned) {
      if (pathname.includes("sign") || pathname.includes("reset")) {
        return (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        );
      }
    } else {
      if (pathname.includes("dashboard")) {
        return (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        );
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAdminSigned,
        loadingAdmin,
        setIsAdminSigned,
        adminData,
        setAdminData,
      }}
    >
      <div
        dir="rtl"
        className="flex min-h-[100dvh] flex-col bg-[var(--dash-theme)] md:flex-row"
      >
        {loadingPage && (
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
          </div>
        )}
        <DashNav />
        {children}
        {/* {isAdminSigned && <NewOrder />} */}
      </div>
    </AuthContext.Provider>
  );
}
