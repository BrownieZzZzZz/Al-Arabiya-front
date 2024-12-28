"use client";
import React, { startTransition, useRef, useState } from "react";
import "./page.css";
import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast }  = useToast();
  const emailInput = useRef(null);
  const router = useRouter();
  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const handleSend = () =>{
    if(emailInput.current.value === ""){
      toast({
        description: "Verify the email!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }

    // write backend logic here
  }
  return (
    <div className="image flex min-h-[100dvh] items-center justify-center bg-cover bg-center">
      <div className="mx-5 my-8 flex w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-purple-300 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <DashSignHeader />
        <div className="flex w-full max-w-[400px] flex-row items-center justify-between">
          <div
            className="group hover:cursor-pointer"
            onClick={() => {
              ChangeUrl("./sign-in");
            }}
          >
            <i className="fa-solid fa-arrow-left text-3xl text-[#ffffff] transition-colors duration-200 group-hover:text-purple-400"></i>
          </div>
          <div className="inline-block self-start bg-gradient-to-bl from-purple-300 to-purple-400 bg-clip-text pb-2 text-2xl sm:text-3xl font-semibold text-transparent">
            Password Recovery
          </div>
        </div>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="email"
        >
          <span className="text-[15px] text-[#ffffff]">EMAIL</span>
          <input
            ref={emailInput}
            id="email"
            type="text"
            placeholder="Example@domain.com"
            className="w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-purple-400 outstl"
          />
        </label>

        <button
          onClick={() => {handleSend()}}
          type="button"
          className="mt-4 w-full rounded-3xl bg-purple-400 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-purple-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default page;
