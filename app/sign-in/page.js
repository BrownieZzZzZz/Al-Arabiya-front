"use client";
import "./page.css";

import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const page = () => {
  const { toast } = useToast();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const checkInput = useRef(null);
  const [check, setCheck] = useState(false);

  const handleSignIn = () => {
    if (emailInput.current.value === "") {
      toast({
        description: "الرجاء التحقق من البريد الإلكتروني !",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (passwordInput.current.value === "") {
      toast({
        description: "الرجاء التحقق من كلمة المرور  !",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // write backend logic here
  };

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);
  return (
    <div
      dir="rtl"
      className="image relative flex min-h-[100dvh] items-center justify-center bg-cover bg-left md:bg-center"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-yellow-800 opacity-[0.25]"></div>
      <div className="z-20 mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-yellow-500 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <div className="inline-block self-start bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text pb-2 text-4xl font-semibold text-transparent md:text-5xl">
          تسجيل الدخول
        </div>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="email"
        >
          <span className="text-[15px] text-[#ffffff]">بريد إلكتروني</span>
          <input
            ref={emailInput}
            id="email"
            type="text"
            placeholder="بريد إلكتروني"
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
            placeholder="كلمة المرور"
            className="outstl w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
          />
        </label>
        <button
          onClick={() => handleSignIn()}
          type="button"
          className="mt-4 w-full rounded-3xl bg-yellow-500 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-yellow-400"
        >
          تسجيل الدخول
        </button>
        <a
          onClick={() => ChangeUrl("sign-up")}
          className="-mt-1 font-bold text-[#ffffff] transition-colors duration-200 hover:cursor-pointer hover:text-yellow-400"
        >
          ليس لديك حساب؟
        </a>
        <div className="mt-2 flex w-full max-w-[400px] flex-col-reverse justify-between gap-2 min-[380px]:flex-row min-[380px]:gap-0">
          <div className="checkbox-wrapper-21">
            <label
              className={cn(
                "control control--checkbox font-medium text-[#ffffff] transition-all duration-200 hover:text-yellow-400",
                check && "text-yellow-400 hover:text-yellow-400",
              )}
            >
              تذكرنى
              <input
                ref={checkInput}
                type="checkbox"
                onChange={() => {
                  setCheck(!check);
                }}
              />
              <div className="control__indicator"></div>
            </label>
          </div>

          <span
            className="mt-[2px] font-medium text-[#ffffff] transition-colors duration-200 hover:cursor-pointer hover:text-yellow-400"
            onClick={() => {
              ChangeUrl("./reset-password");
            }}
          >
            هل نسيت كلمة المرور؟
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
