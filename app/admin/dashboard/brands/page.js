"use client";

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
import Brand from "@/components/Brand/page";

const page = () => {
  const brandRef = useRef(null);
  const imageInput = useRef(null);
  const fileInput = useRef(null);
  const [imageValue, setImageValue] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const addBrand = () => {
    if(brandRef.current.value.trim() === ""){
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء إدخال إسم الماركة ",
        duration: 2000
      })
      return;
    }
    if(!fileInput.current.files[0]) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء إختيار صورة ",
        duration: 2000
      })
      return;
    }
    
    // Check if brand is unique and Add it + confirmation message
  }

  const brands = [
    {
      title: "Sheglam",
      img: "/images/brands/sheglam.png"
    },
    {
      title: "Vaseline",
      img: "/images/brands/vaseline.png"
    },
    {
      title: "Hude Beauty",
      img: "/images/brands/hudabeauty.png"
    },
    {
      title: "Lattafa",
      img: "/images/brands/latafa.png"
    }
  ]




  return (
    <div className="flex w-full flex-col gap-8 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="...Sheglam, Vaseline" />
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">


        {/* ADD BRAND */}

        <Dialog>
          <DialogTrigger onClick={() => {
            setLoaded(false);
          }}>
            <div className="flex items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]">
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
                  <div className="mb-1">+</div>
                </div>
                <div className="text-center text-xl font-semibold text-neutral-300">
                  أضف ماركة جديدة{" "}
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
                إسم الماركة{" "}
              </div>
              <input
                ref={brandRef}
                dir="rtl"
                type="text"
                placeholder="Sheglam"
                className="my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2 focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]"
              />

              <div
                onClick={() => { fileInput.current.click() }}
                className={cn(
                  "relative flex h-[150px] w-3/4 items-center justify-center rounded-lg border-[var(--dash-theme6)] hover:cursor-pointer",
                  loaded ? "border-0" : "border-4 border-dashed",
                )}
              >
                <input
                  onChange={() => {
                    const file = fileInput.current.files[0];
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      imageInput.current.src = reader.result;
                    };
                    reader.readAsDataURL(file);
                    setLoaded(true);
                  }}
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  className="hidden"
                />
                <img
                  src={imageValue}
                  className={cn(
                    "absolute left-0 z-10 hidden size-full rounded-lg object-scale-down",
                    loaded && "block",
                  )}
                  alt="صورة الماركة "
                  ref={imageInput}
                ></img>
                {!loaded && (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    <i className="fa-solid fa-upload text-3xl text-[var(--dash-theme6)]"></i>
                    <span className="text-xl font-semibold text-[var(--dash-theme6)]">
                      حمل صورة{" "}
                    </span>
                  </div>
                )}
              </div>
              <span dir="rtl">
                <font className="text-lg font-bold text-emerald-500">
                  {" "}
                  ملاحظة:{" "}
                </font>
                <font className="text-lg font-medium text-white">
                  يجب أن تكون الصورة بدون خلفية.
                </font>
              </span>
              <button
                onClick={() => { addBrand() }}
                type="button"
                className="w-3/4 rounded-lg bg-[var(--dash-theme6)] p-3 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme5)]"
              >
                أضف ماركة{" "}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        {brands.map((brand, index) => (
          <Brand key={index} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default page;
