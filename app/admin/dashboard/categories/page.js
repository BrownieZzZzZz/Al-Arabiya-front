"use client";

import Category from "@/components/Category/Category";
import DashSearch from "@/components/DashSearch/DashSearch";
import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const page = () => {
  const categories = [
    "العناية بالشعر",
    "العناية بالبشرة",
    "العناية بالجسم",
    "العناية بالأظافر",
    "العناية بالأسنان",
    "العناية بالعيون",
    "العناية بالشفاه",
    "العناية بالأطفال",
    "العناية بالرجال",
    "العناية بالنساء",
  ];

  const categoryRef = useRef(null);
  const { toast } = useToast();
  const addCategory = () => {
    if (categoryRef.current.value.trim() === "") {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء إدخال إسم الفئة",
        duration: 2000,
      });
      return;
    }
  };



  return (
    <div className="flex w-full flex-col gap-8 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="العناية بالشعر، المكياج..." />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {/* ADD CATEGORIE */}

        <Dialog>
          <DialogTrigger>
            <div
              className="flex items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]"
            >
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
                  <div className="mb-1">+</div>
                </div>
                <div className="text-center text-xl font-semibold text-neutral-300">
                  أضف فئة جديدة{" "}
                </div>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent
            closeClass="text-white"
            className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
          >
            <DialogTitle />
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="text-2xl font-semibold text-white">
                إسم الفئة{" "}
              </div>
              <input
                ref={categoryRef}
                dir="rtl"
                type="text"
                placeholder="العناية بالشعر"
                className="my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2 focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]"
              />
              <button
                onClick={() => addCategory()}
                type="button"
                className="w-3/4 rounded-lg bg-[var(--dash-theme6)] p-3 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme5)]"
              >
                أضف الفئة{" "}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {categories.map((category, index) => (
          <Category key={index} category={category} />
        ))}
      </div>
    </div>
  );
};

export default page;
