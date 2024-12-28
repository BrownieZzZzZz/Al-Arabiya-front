"use client";
import React, { startTransition, useRef, useState } from "react";
import "./page.css";
import DashSignHeader from "@/components/DashSignHeader/DashSignHeader";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast } = useToast();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const checkInput = useRef(null);

  const handleSignIn = () => {
    if (emailInput.current.value === "") {
      toast({
        description: "Verify the email!",
        variant: "destructive",
        duration: 2000,
      });
      return;
    }
    if (passwordInput.current.value === "") {
      toast({
        description: "Verify the password!",
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
    <div className="image flex min-h-[100dvh] items-center justify-center bg-cover bg-center">
      <div className="mx-5 flex my-8 w-full max-w-[500px] flex-col items-center gap-4 rounded-xl border-2 border-purple-300 bg-gray-400 bg-opacity-20 bg-clip-padding px-5 pb-10 pt-6 backdrop-blur-sm backdrop-filter sm:px-10 md:px-14 md:pb-16 md:pt-12">
        <DashSignHeader />
        <div className="inline-block self-start bg-gradient-to-tr from-purple-300 to-purple-400 bg-clip-text pb-2 text-4xl font-semibold text-transparent md:text-5xl">
          Sign In
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
            className="w-full border-0 rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-purple-400 outstl"
          />
        </label>
        <label
          className="flex w-full flex-col gap-1.5 hover:cursor-text"
          htmlFor="password"
        >
          <span className="text-[15px] text-[#ffffff]">PASSWORD</span>
          <input
            ref={passwordInput}
            id="password"
            type="password"
            placeholder="Your Password"
            className="w-full rounded-3xl bg-[#ffffff] px-6 py-3 text-lg outline-purple-400 outstl"
          />
        </label>
        <button
          onClick={() => handleSignIn()}
          type="button"
          className="mt-4 w-full rounded-3xl bg-purple-400 py-3 text-2xl font-semibold text-white outline-none transition-all duration-200 hover:bg-purple-500"
        >
          Sign In
        </button>
        <div className="mt-2 flex w-full max-w-[400px] flex-col-reverse justify-between gap-2 min-[380px]:flex-row min-[380px]:gap-0">
          <div className="checkbox-wrapper-21">
            <label
              className={cn(
                "control control--checkbox font-medium text-[#ffffff] transition-all duration-200 hover:text-purple-200",
                check && "text-purple-400 hover:text-purple-400",
              )}
            >
              Remember Me
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
            className="mt-[2px] font-medium text-purple-200 transition-colors duration-200 hover:cursor-pointer hover:text-purple-400"
            onClick={() => {
              ChangeUrl("./reset-password");
            }}
          >
            Forgot Password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
