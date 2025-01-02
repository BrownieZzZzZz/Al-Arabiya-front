"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useRef, useState } from "react";

const page = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: "browniesandmuffin@gmail.com",
    password: "123456",
  });
  const emailRef = useRef(null);
  const CurrentPasswordRef = useRef(null);
  const CurrentPasswordEmailRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);
  const saveEmail = () => {
    if (emailRef.current.value.trim() === "") {
      // Regex for email as well maybe !
      toast({
        title: "خطأ",
        description: "الرجاء ادخال البريد الالكتروني",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (CurrentPasswordEmailRef.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور الحالية",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (CurrentPasswordEmailRef.current.value.trim() !== user.password) {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير صحيحة",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    toast({
      title: "تم",
      description: "تم تغيير البريد الالكتروني بنجاح",
      variant: "success",
      duration: 2000,
    });
    //CHOGLOG
  };
  const savePassword = () => {
    if (CurrentPasswordRef.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور الحالية",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (newPasswordRef.current.value.trim() === "") {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور الجديدة",
        variant: "destructive",
        duration: 2000,
      })
      return;
    }
    if(confirmNewPasswordRef.current.value.trim() === ""){
      toast({
        title: "خطأ",
        description: "الرجاء ادخال تأكيد كلمة المرور",
        variant: "destructive",
        duration: 2000,
      })
      return;
    }
    if (CurrentPasswordRef.current.value.trim() !== user.password) {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير صحيحة",
        variant: "destructive",
        duration: 2000,
      })
      return;
    }
    if (
      newPasswordRef.current.value.trim() !==
      confirmNewPasswordRef.current.value.trim()
    ) {
      toast({
        title: "خطأ",
        description: "كلمة المرور غير متطابقة",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    toast({
      title: "تم",
      description: "تم تغيير كلمة المرور بنجاح",
      variant: "success",
      duration: 2000,
    });
    
  };

  const forgetPassword = () => {
    // SEND OLD PASSWORD TO EMAIL. OR IDK

    toast({
      title: "تم",
      description: "تم ارسال كلمة المرور الى البريد الالكتروني",
      variant: "success",
      duration: 2000,
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        التحكم بحسابك
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            البريد الالكتروني
          </div>
          <input
            defaultValue={user.email}
            ref={emailRef}
            type="email"
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="البريد الالكتروني"
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            كلمة المرور الحالية
          </div>
          <input
            ref={CurrentPasswordEmailRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="كلمة المرور الحالية "
          />
        </div>

        <button
          onClick={() => {
            saveEmail();
          }}
          type="button"
          className="w-[120px] bg-emerald-700 py-2.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-500"
        >
          تسجيل{" "}
        </button>

        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            كلمة المرور الحالية
          </div>
          <input
            ref={CurrentPasswordRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="كلمة المرور الحالية "
          />
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            كلمة المرور الجديدة
          </div>
          <input
            ref={newPasswordRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="كلمة المرور الجديدة "
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            التثبت من كلمة المرور
          </div>
          <input
            ref={confirmNewPasswordRef}
            type="password"
            className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="التثبت من  كلمة المرور "
          />
        </div>
        <div
          onClick={() => {
            forgetPassword();
          }}
          className="text-lg font-medium text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer hover:text-[var(--dash-theme6)]"
        >
          هل نسيت كلمة المرور ؟
        </div>
        <button
          onClick={() => {
            savePassword();
          }}
          type="button"
          className="w-[120px] bg-emerald-700 py-2.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-500"
        >
          تسجيل{" "}
        </button>
      </div>
    </div>
  );
};

export default page;
