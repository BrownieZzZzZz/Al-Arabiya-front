"use client";
import React, { startTransition, useRef, useState } from "react";
import "./page.css";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast } = useToast();
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const handleSignUp = () => {
    if (firstNameInput.current.value.trim() === "") {
      toast({
        description: "الرجاء التحقق من الاسم !",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (lastNameInput.current.value.trim() === "") {
      toast({
        description: "الرجاء التحقق من اللقب ! ",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (addressInput.current.value.trim() === "") {
      toast({
        description: "الرجاء التحقق من عنوان السكن  ! ",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (emailInput.current.value.trim() === "") {
      toast({
        description: "الرجاء التحقق من البريد الإلكتروني !",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (passwordInput.current.value.trim() === "") {
      toast({
        description: "الرجاء التحقق من كلمة المرور  !",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (confirmPasswordInput.current.value.trim() === "") {
      toast({
        description: "الرجاء التحقق من كلمة المرور  !",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (passwordInput.current.value.trim() == confirmPasswordInput.current.value.trim()) {
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
  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };
  const [check, setCheck] = useState(false);
  return (
    <div
      dir="rtl"
      className="image relative flex min-h-[100dvh] items-center justify-center bg-cover bg-left md:bg-center"
    >
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-yellow-800 opacity-[0.25]"></div>
      <div className="z-20 mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-yellow-500 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <div className="inline-block self-start bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text pb-2 text-4xl font-semibold text-transparent md:text-5xl">
          إنشاء حساب
        </div>
        <div className="flex w-full flex-col gap-4 min-[500px]:flex-row">
          <label
            className="flex w-full flex-col gap-1.5 hover:cursor-text"
            htmlFor="firstName"
          >
            <span className="text-[15px] text-[#ffffff]">الاسم </span>
            <input
              ref={firstNameInput}
              id="firstName"
              type="text"
              placeholder="الاسم "
              className="outstl w-full rounded-3xl border-0 bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
            />
          </label>
          <label
            className="flex w-full flex-col gap-1.5 hover:cursor-text"
            htmlFor="lastName"
          >
            <span className="text-[15px] text-[#ffffff]"> اللقب</span>
            <input
              ref={lastNameInput}
              id="lastName"
              type="text"
              placeholder="اللقب "
              className="outstl w-full rounded-3xl border-0 bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
            />
          </label>
        </div>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="email"
        >
          <span className="text-[15px] text-[#ffffff]">بريد إلكتروني</span>
          <input
            ref={emailInput}
            id="email"
            type="email"
            placeholder="بريد إلكتروني"
            className="outstl w-full rounded-3xl border-0 bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
          />
        </label>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="address"
        >
          <span className="text-[15px] text-[#ffffff]">عنوان السكن</span>
          <input
            ref={addressInput}
            id="address"
            type="text"
            placeholder="عنوان السكن "
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
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="confirmPassword"
        >
          <span className="text-[15px] text-[#ffffff]">
            التثبت من كلمة المرور
          </span>
          <input
            ref={confirmPasswordInput}
            id="confirmPassword"
            type="password"
            placeholder="التثبت من كلمة المرور"
            className="outstl w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-yellow-500"
          />
        </label>
        <button
          onClick={() => handleSignUp()}
          type="button"
          className="mt-4 w-full rounded-3xl bg-yellow-500 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-yellow-400"
        >
          إنشاء حساب
        </button>
        <a
          onClick={() => ChangeUrl("sign-in")}
          className="-mt-1 font-bold text-[#ffffff] transition-colors duration-200 hover:cursor-pointer hover:text-yellow-400"
        >
          هل لديك حساب؟
        </a>
      </div>
    </div>
  );
};

export default page;
