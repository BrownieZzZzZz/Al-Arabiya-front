"use client";
import "./page.css";

import { cn } from "@/lib/utils";
import { useState, useEffect, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const firstNameInput = useRef(null);
  const lastNameInput = useRef(null);
  const addressInput = useRef(null);
  const phoneInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const confirmPasswordInput = useRef(null);

  const handleSignUp = async () => {
    if (firstNameInput.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء التحقق من الاسم!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (lastNameInput.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء التحقق من اللقب!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (addressInput.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء التحقق من عنوان السكن!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
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
    if (confirmPasswordInput.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء تأكيد كلمة المرور!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (
      passwordInput.current.value.trim() !==
      confirmPasswordInput.current.value.trim()
    ) {
      toast({
        title: "خطأ",
        description: "كلمتا المرور غير متطابقتين، الرجاء التحقق!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: `${firstNameInput.current.value} ${lastNameInput.current.value}`,
            email: emailInput.current.value,
            password: passwordInput.current.value,
            phone: phoneInput.current.value,
            address: addressInput.current.value,
          }),
        },
      );
      const data = await response.json();

      if (data.data === null) {
        if (data.message === "Email already exists") {
          toast({
            title: "خطأ",
            description:
              "البريد الإلكتروني مستخدم بالفعل، الرجاء استخدام بريد آخر!",
            variant: "destructive",
            duration: 2500,
          });
          setLoading(false);
          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "نجاح",
        description: "تم إنشاء حسابك بنجاح!",
        variant: "success",
        duration: 2500,
      });

      ChangeUrl("/sign-in");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تسجيل الحساب.",
        variant: "destructive",
        duration: 2500,
      });

      console.error(error);
    }
    setLoading(false);
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

  const validateNumberInput = (price) => {
    const input = price.current;
    let value = input.value;

    const regex = /^\+{0,1}[0-9]*$/;

    if (!regex.test(value)) {
      input.value = value.slice(0, -1);
    }
  };
  return (
    <div
      dir="rtl"
      className="image relative flex min-h-[100dvh] items-center justify-center bg-cover bg-left md:bg-center"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"/>
        </div>
      )}
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-yellow-800 opacity-[0.25]"/>
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
          className="flex w-full flex-col gap-2 hover:cursor-text"
          htmlFor="phone"
        >
          <span className="text-[15px] font-medium text-[#ffffff]">
            رقم الهاتف
          </span>
          <input
            ref={phoneInput}
            id="phone"
            dir="rtl"
            type="tel"
            onInput={() => validateNumberInput(phoneInput)}
            placeholder="أدخل رقم الهاتف"
            className="w-full rounded-3xl border bg-[#f8f9fa] px-4 py-2 text-right text-lg text-[#333333] outline-none focus:ring-2 focus:ring-yellow-500"
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
          disabled={loading}
          type="button"
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
            "إنشاء حساب"
          )}
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
