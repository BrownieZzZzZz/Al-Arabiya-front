"use client";

import "./page.css";

import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";

import { cn } from "@/lib/utils";

import Cookies from "js-cookie";
import React, { useRef, useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const router = useRouter();
  const { toast } = useToast();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const [check, setCheck] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const handleSignIn = async () => {
    if (emailInput.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء التحقق من البريد الإلكتروني!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    if (passwordInput.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء التحقق من كلمة المرور!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput.current.value,
            password: passwordInput.current.value,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();

        if (data.data === null) {
          toast({
            title: "غير موجود",
            description: "بيانات الاعتماد غير صحيحة، يرجى التحقق من التفاصيل!",
            variant: "destructive",
            duration: 2500,
          });
          setLoading(false);
          return;
        }

        let expires = 3;
        if (check) {
          expires = 30;
        }

        Cookies.set("access_token", data.data.access_token, { expires });

        toast({
          title: "نجاح",
          description: "لقد تم تسجيل الدخول بنجاح.",
          variant: "success",
          duration: 2500,
        });
        setLoadingPage(true);
        document.location.href = "/admin/dashboard";
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);

      setLoading(false);

      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الدخول.",
        variant: "destructive",
        duration: 2500,
      });

      console.error(error);
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
        <div className="inline-block self-start bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text pb-2 text-4xl font-semibold text-transparent md:text-5xl">
          تسجيل الدخول
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
            className="outstl w-full rounded-3xl border-0 bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
          />
        </label>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="password"
        >
          <span className="text-[15px] text-[#ffffff]">كلمة المرور</span>
          <input
            ref={passwordInput}
            id="password"
            type="password"
            placeholder="******"
            className="outstl w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
          />
        </label>
        <button
          onClick={() => handleSignIn()}
          type="button"
          disabled={loading}
          className={cn(
            "mt-4 w-full rounded-3xl bg-yellow-500 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-yellow-400",
            loading && "hover:cursor-not-allowed",
          )}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"/>
            </div>
          ) : (
            "تسجيل الدخول"
          )}
        </button>
        <div className="mt-2 flex w-full max-w-[400px] flex-col-reverse justify-between gap-2 min-[380px]:flex-row min-[380px]:gap-0">
          <div className="checkbox-wrapper-21">
            <label
              className={`control control--checkbox font-medium text-[#ffffff] transition-all duration-200 hover:text-yellow-400 ${check && "text-yellow-500  hover:text-yellow-500"}`}
            >
              تذكرني
              <input
                type="checkbox"
                onChange={() => {
                  setCheck(!check);
                }}
              />
              <div className="control__indicator"/>
            </label>
          </div>

          <span
            className="mt-[2px] font-medium text-yellow-400 transition-colors duration-200 hover:cursor-pointer hover:text-yellow-500"
            onClick={() => {
              if (!loading) {
                ChangeUrl("./reset-password");
              }
            }}
          >
            نسيت كلمة المرور؟
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
