"use client";

import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const SpecialOffer = ({ specialOffer, fetchSpecialOffers = null }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingSpecialOffer, setLoadingSpecialOffer] = useState(false);
  const [imageValue, setImageValue] = useState(specialOffer.img);
  const specialOfferRef = useRef(null);
  const imageRef = useRef(null);
  const fileInput = useRef(null);
  const confirmDeleteRef = useRef(null);

  const handleDelete = async () => {
    toast({
      title: "حذف عرض خاص",
      description: " جاري حذف العرض الخاص...",
    });
    try {
      setLoadingSpecialOffer(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/specialOffer/${specialOffer.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            admin_access_token: Cookies.get("admin_access_token"),
          },
        },
      );
      const data = await response.json();
      if (data.data == null) {
        throw new Error(data.message);
      }
      toast({
        title: "تم",
        description: "تم حذف العرض الخاص بنجاح!",
        variant: "success",
        duration: 3000,
      });
      setLoadingSpecialOffer(false);
      if (fetchSpecialOffers) fetchSpecialOffers();
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء حذف العرض الخاص. الرجاء المحاولة لاحقًا.",
        variant: "destructive",
      });
      setLoadingSpecialOffer(false);
    }
  };

  const confirmDeletePopUp = () => {
    confirmDeleteRef.current.click();
  };

  return (
    <>
      <Dialog>
        <DialogTrigger ref={confirmDeleteRef} className="hidden" />
        <DialogContent
          closeClass="text-white"
          className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
        >
          <DialogTitle />
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <div className="w-3/4 text-center text-3xl font-bold text-red-500">
              تحذير
            </div>
            <div className="text-medium w-3/4 text-center text-xl text-white">
              حذف هذا العرض سينجم عنه حذف كل البيانات المرتبطة بهذه العرض
            </div>
            <button
              onClick={() => handleDelete()}
              disabled={loadingSpecialOffer}
              type="button"
              className={cn(
                "mt-4 w-3/4 rounded-lg border-2 bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                loadingSpecialOffer
                  ? "opacity-50 hover:cursor-not-allowed"
                  : "hover:bg-red-500",
              )}
            >
              {loadingSpecialOffer ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                </div>
              ) : (
                "أنا متأكد"
              )}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger
          className="h-full w-full"
          onClick={() => {
            setIsEditing(false);
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]">
            <img
              src={specialOffer.img}
              alt={specialOffer.href}
              className="aspect-square w-full rounded-lg object-cover"
            />
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
              readOnly={!isEditing}
              defaultValue={specialOffer.href}
              dir="rtl"
              type="text"
              placeholder="Sheglam"
              disabled={true}
              className={cn(
                "my-2 w-3/4 rounded-lg bg-[var(--dash-theme2)] p-3 text-lg font-medium text-white placeholder-neutral-500 outline-none outline-2",
                !isEditing && loadingSpecialOffer
                  ? "hover:cursor-not-allowed"
                  : "focus:bg-[var(--dash-theme4)] focus:outline-[var(--dash-theme6)]",
              )}
            />
            <input
              onChange={() => {
                const file = fileInput.current.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  imageRef.current.src = reader.result;
                };
                reader.readAsDataURL(file);
              }}
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInput}
              disabled={true}
            />
            <img
              onClick={() => {
                if (isEditing && !loadingSpecialOffer) {
                  fileInput.current.click();
                }
              }}
              ref={imageRef}
              src={imageValue}
              alt={specialOffer.href}
              className={cn(
                "mb-2 h-[150px] w-3/4 rounded-lg object-scale-down",
                isEditing ? "hover:cursor-pointer" : "hover:cursor-not-allowed",
              )}
            ></img>
            <div className="flex w-3/4 flex-row gap-4">
              <button
                onClick={() => confirmDeletePopUp()}
                type="button"
                disabled={loadingSpecialOffer}
                className="w-full rounded-lg border-2 border-red-500 bg-red-500 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-red-500"
              >
                إحذف
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpecialOffer;
