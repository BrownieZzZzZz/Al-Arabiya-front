"use client";
import { toast } from "@/hooks/use-toast";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { cn, validateEmail } from "@/lib/utils";

const page = () => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const emailRef = useRef(null);
  const CurrentPasswordRef = useRef(null);
  const CurrentPasswordEmailRef = useRef(null);
  const newPasswordRef = useRef(null);
  const confirmNewPasswordRef = useRef(null);

  const saveEmail = async () => {
    if (
      !emailRef.current.value.trim() ||
      !validateEmail(emailRef.current.value)
    ) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال البريد الالكتروني",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!CurrentPasswordEmailRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور الحالية",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    toast({
      title: "جاري التحميل",
      description: "يرجى الانتظار قليلاً",
    });
    try {
      setLoadingUser(true);
      const body = {
        email: emailRef.current.value.trim(),
        current_password: CurrentPasswordEmailRef.current.value.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.data == null) {
        if (data.message === "Email already exists") {
          toast({
            title: "خطأ",
            description: "هذا البريد قيد الاستخدام",
            variant: "destructive",
            duration: 2500,
          });
          emailRef.current.value = brand.name;

          return;
        }
        if (data.message === "Invalid password") {
          toast({
            title: "خطأ",
            description: "كلمة المرور غير صحيحة",
            variant: "destructive",
            duration: 2500,
          });
          setLoadingUser(false);

          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "تم",
        description: "تم تغيير البريد الالكتروني بنجاح",
        variant: "success",
        duration: 2000,
      });
      setUser(data.data);
      setLoadingUser(false);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير البريد الالكتروني",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const savePassword = async () => {
    if (!CurrentPasswordRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور الحالية",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!newPasswordRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال كلمة المرور الجديدة",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (!confirmNewPasswordRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء ادخال تأكيد كلمة المرور",
        variant: "destructive",
        duration: 2000,
      });
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
      title: "جاري التحميل",
      description: "يرجى الانتظار قليلاً",
    });
    try {
      setLoadingUser(true);
      const body = {
        password: newPasswordRef.current.value.trim(),
        current_password: CurrentPasswordRef.current.value.trim(),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();

      if (data.data == null) {
        if (data.message === "Invalid password") {
          toast({
            title: "خطأ",
            description: "كلمة المرور غير صحيحة",
            variant: "destructive",
            duration: 2500,
          });
          setLoadingUser(false);

          return;
        }
        throw new Error(data.message);
      }

      toast({
        title: "تم",
        description: "تم تغيير كلمة المرور بنجاح",
        variant: "success",
        duration: 2000,
      });
      CurrentPasswordRef.current.value = "";
      newPasswordRef.current.value = "";
      confirmNewPasswordRef.current.value = "";
      setLoadingUser(false);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تغيير كلمة المرور",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const forgetPassword = async () => {
    toast({
      title: "جاري التحميل",
      description: "يرجى الانتظار قليلاً",
    });
    try {
      setLoadingUser(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/recoverpass/${user.email}`,
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
          setLoadingUser(false);
          return;
        }
        throw new Error(responseData.message || "حدث خطأ ما");
      }
      toast({
        title: "نجاح",
        description: "تم إرسال البريد الإلكتروني بنجاح، تحقق من بريدك الوارد!",
        variant: "success",
      });
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، الرجاء المحاولة مرة أخرى",
        variant: "destructive",
      });
    }
    setLoadingUser(false);
  };

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/account`,
        {
          method: "GET",
          headers: {
            access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setUser(data.data);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب البيانات",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {loadingUser && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
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
            disabled={!isEditing}
            type="email"
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
            placeholder="البريد الالكتروني"
          />
        </div>
        {isEditing && (
          <div className="flex w-full flex-col gap-2">
            <div className="text-lg font-medium text-[var(--dash-theme5)]">
              كلمة المرور الحالية
            </div>
            <input
              ref={CurrentPasswordEmailRef}
              disabled={!isEditing}
              type="password"
              className="w-full bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              placeholder="كلمة المرور الحالية "
            />
          </div>
        )}

        <button
          onClick={() => {
            if (isEditing) saveEmail();
            if (!isEditing) setIsEditing(true);
          }}
          disabled={loadingUser}
          type="button"
          className={cn(
            "w-[120px] border-2 bg-emerald-700 py-2.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-500",
            isEditing && !loadingUser
              ? "border-emerald-500 bg-emerald-500 hover:bg-transparent hover:text-emerald-500"
              : "border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500",
          )}
        >
          {loadingUser ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : isEditing ? (
            "حفظ"
          ) : (
            "تعديل"
          )}
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
          تسجيل
        </button>
      </div>
    </div>
  );
};

export default page;
