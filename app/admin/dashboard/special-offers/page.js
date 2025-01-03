"use client";

import { useRef, useState, useEffect } from "react";

import Cookies from "js-cookie";

import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import SpecialOffer from "@/components/SpecialOffer/SpecialOffer";

const page = () => {
  const { toast } = useToast();
  const specialOfferRef = useRef(null);
  const imageInput = useRef(null);
  const fileInput = useRef(null);
  const [imageValue, setImageValue] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [loadingSpecialOffer, setLoadingSpecialOffer] = useState(false);
  const [loadingSpecialOffers, setLoadingSpecialOffers] = useState(true);
  const [specialOffers, setSpecialOffers] = useState([]);
  const addDialogClose = useRef(null);

  const addSpecialOffer = async () => {
    if (!specialOfferRef.current.value.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء إدخال رابط العرض ",
        duration: 2000,
      });
      return;
    }

    if (!imageInput.current.src.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "الرجاء إختيار صورة ",
        duration: 2000,
      });
      return;
    }

    try {
      setLoadingSpecialOffer(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/specialOffer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            href: specialOfferRef.current.value.trim(),
            img: imageInput.current.src.trim(),
          }),
        },
      );
      const data = await response.json();
      if (data.data == null) {
        throw new Error(data.message);
      }

      toast({
        variant: "success",
        title: "تم",
        description: "تم إنشاء العرض بنجاح",
        duration: 2000,
      });
      fetchSpecialOffers();
      setLoadingSpecialOffer(false);
      addDialogClose.current?.click();
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "حدث خطأ أثناء إنشاء العرض",
        duration: 2000,
      });
      setLoadingSpecialOffer(false);
    }
  };

  const fetchSpecialOffers = async (search = null) => {
    setLoadingSpecialOffers(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/specialOffer?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setSpecialOffers(data.data.data);

      setLoadingSpecialOffers(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingSpecialOffers(false);
    }
    setLoadingSpecialOffers(false);
  };

  useEffect(() => {
    fetchSpecialOffers();
  }, []);

  return (
    <div className="flex w-full flex-col gap-8 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Dialog>
          <DialogTrigger
            onClick={() => {
              setLoaded(false);
            }}
          >
            <div className="flex h-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-5 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2b2b36]">
              <div className="flex flex-col items-center justify-between gap-2">
                <div className="grid size-[40px] place-items-center rounded-full border-2 border-neutral-300 text-center text-2xl font-semibold text-neutral-300">
                  <div className="mb-1">+</div>
                </div>
                <div className="text-center text-xl font-semibold text-neutral-300">
                  إضافة عرض خاص
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
                رابط العرض الخاص
              </div>
              <input
                ref={specialOfferRef}
                disabled={loadingSpecialOffer}
                dir="ltr"
                type="text"
                placeholder="google.com or /products/(id)..."
                className="my-2 w-4/5 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2 focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]"
              />

              <div
                onClick={() => {
                  fileInput.current.click();
                }}
                className={cn(
                  "relative flex aspect-square h-[150px] w-3/4 items-center justify-center rounded-lg border-[var(--dash-theme6)] hover:cursor-pointer",
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
                  disabled={loadingSpecialOffer}
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
                  alt="صورة العرض "
                  ref={imageInput}
                ></img>
                {!loaded && (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                    <i className="fa-solid fa-upload text-3xl text-[var(--dash-theme6)]"></i>
                    <span className="text-xl font-semibold text-[var(--dash-theme6)]">
                      حمل صورة
                    </span>
                  </div>
                )}
              </div>
              <div className="flex w-3/4 flex-col items-center justify-center gap-1 text-center">
                <span dir="rtl" className="text-lg font-bold text-emerald-500">
                  ملاحظة
                </span>
                <span dir="rtl" className="text-lg font-medium text-white">
                  يجب أن تكون الصورة مربعة.
                </span>
                <span dir="rtl" className="text-lg font-medium text-white">
                  تأكد من اقتصاص الصورة بحيث لا توجد مساحة فارغة إضافية من جميع
                  الجوانب.
                </span>
              </div>
              <button
                onClick={() => {
                  addSpecialOffer();
                }}
                type="button"
                className={cn(
                  "w-3/4 rounded-lg bg-[var(--dash-theme6)] p-3 text-xl font-semibold text-white transition-all duration-200 hover:bg-[var(--dash-theme5)]",
                  loadingSpecialOffer
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer",
                )}
              >
                {loadingSpecialOffer ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  "أضف العرض"
                )}
              </button>
            </div>
          </DialogContent>
          <DialogClose ref={addDialogClose} className="hidden" />
        </Dialog>

        {loadingSpecialOffers
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]"
              >
                <Skeleton className={"aspect-square w-full bg-neutral-200"} />
              </div>
            ))
          : specialOffers.map((specialOffer) => (
              <SpecialOffer
                key={specialOffer.id}
                specialOffer={specialOffer}
                fetchSpecialOffers={() => fetchSpecialOffers()}
              />
            ))}
      </div>
    </div>
  );
};

export default page;
