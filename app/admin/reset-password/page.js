"use client";

import "./page.css";

import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";

import { cn } from "@/lib/utils";

import React, { useTransition, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast } = useToast();
  const emailInput = useRef(null);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const handleSend = async () => {
    if (emailInput.current.value === "") {
      toast({
        title: "خطأ",
        description: "الرجاء التحقق من البريد الإلكتروني!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/recoverpass/${emailInput.current.value.trim()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const responseData = await response.json();

      if (responseData.statusCode !== 200) {
        if (responseData.message === "Email not found") {
          toast({
            title: "خطأ",
            description: "البريد الإلكتروني غير موجود",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }
        throw new Error(responseData.message || "حدث خطأ ما");
      }
      toast({
        title: "نجاح",
        description: "تم إرسال البريد الإلكتروني بنجاح، تحقق من بريدك الوارد!",
        variant: "success",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div
      className="image flex min-h-[100dvh] items-center justify-center bg-cover bg-center"
      dir="rtl"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-yellow-400"/>
        </div>
      )}
      <div className="mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-yellow-500 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <DashSignHeader />
        <div className="flex w-full max-w-[400px] flex-row items-center justify-between">
          <div
            className="group hover:cursor-pointer"
            onClick={() => {
              ChangeUrl("./sign-in");
            }}
          >
            <i className="fa-solid fa-arrow-right text-3xl text-[#ffffff] transition-colors duration-200 group-hover:text-yellow-400"/>
          </div>
          <div className="inline-block self-start bg-gradient-to-bl from-yellow-300 to-yellow-600 bg-clip-text pb-2 text-2xl font-semibold text-transparent sm:text-3xl">
            استعادة كلمة المرور
          </div>
        </div>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="email"
        >
          <span className="text-[15px] text-[#ffffff]">البريد الإلكتروني</span>
          <input
            ref={emailInput}
            id="email"
            type="text"
            placeholder="example@domain.com"
            className="outstl w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
          />
        </label>

        <button
          onClick={() => {
            handleSend();
          }}
          disabled={loading}
          type="button"
          className={cn(
            "mt-4 w-full rounded-3xl bg-yellow-500 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-yellow-400",
            {
              "cursor-not-allowed opacity-50": loading,
            },
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"/>
            </div>
          ) : (
            "أرسل"
          )}
        </button>
      </div>
    </div>
  );
};

export default page;
