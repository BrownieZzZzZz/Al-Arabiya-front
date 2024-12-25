"use client";
import React, { startTransition, useRef, useState } from "react";
import "./page.css";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast } = useToast();
  const emailInput = useRef(null);

  const handleSend = () => {
    if (emailInput.current.value === "") {
      toast({
        description: "الرجاء التحقق من البريد الإلكتروني !",
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
  return (
    <div
      dir="rtl"
      className="image relative flex min-h-[100dvh] items-center justify-center bg-cover bg-left md:bg-center"
    >
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-yellow-800 opacity-[0.25]"></div>
      <div className="z-20 mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-yellow-500 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <div className="flex w-full max-w-[400px] flex-row items-center justify-between">
          <div
            className="group hover:cursor-pointer"
            onClick={() => {
              ChangeUrl("./sign-in");
            }}
          >
            <i className="fa-solid fa-arrow-left fa-flip-horizontal text-3xl text-[#ffffff] transition-colors duration-200 group-hover:text-yellow-500"></i>
          </div>
          <div className="inline-block self-start bg-gradient-to-br from-yellow-400 to-yellow-600 bg-clip-text pb-2 text-2xl font-semibold text-transparent sm:text-3xl">
            استعادة كلمة المرور
          </div>
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
        <button
          onClick={() => handleSend()}
          type="button"
          className="mt-4 w-full rounded-3xl bg-yellow-500 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-yellow-400"
        >
          أرسل
        </button>
      </div>
    </div>
  );
};

export default page;
