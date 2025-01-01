"use client";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const page = () => {
  const { toast } = useToast();
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = useState({
    id: 1,
    name: "عطر زهري",
    category: { name: "عطور" },
    brand: {
      name: "Sheglam",
      img: "/images/brands/sheglam.png",
    },
    img: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
      "/images/product6.jpg",
    ],
    description:
      "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
    onSold: true,
    normalSinglePrice: 100,
    soldSinglePrice: 80,
    multiNormalPrice: 80,
    multiSoldPrice: 64,
    soldPercentage: 20,
    in_Stock: true,
  });
  const [soldText, setSoldText] = useState(
    product.onSold ? "يوجد" : "لا يوجد ",
  );
  const [stockText, setStockText] = useState(
    product.in_Stock ? "متوفر" : "غير متوفر",
  );
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const normalSinglePriceRef = useRef(null);
  const normalMultiPriceRef = useRef(null);
  const soldSinglePriceRef = useRef(null);
  const soldMultiPriceRef = useRef(null);
  const soldPercentageRef = useRef(null);

  const imageInput = useRef(null);
  const [imageValue, setImageValue] = useState(null);

  const fileInput = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const handleSoldSwitch = () => {
    if (product.onSold) {
      setProduct({
        ...product,
        onSold: false,
      });
      setSoldText("لا يوجد");
    } else {
      setProduct({
        ...product,
        onSold: true,
      });
      setSoldText("يوجد");
    }
  };

  const handleStockSwitch = () => {
    if (product.in_Stock) {
      setProduct({
        ...product,
        in_Stock: false,
      });
      setStockText("غير متوفر");
    } else {
      setProduct({
        ...product,
        in_Stock: true,
      });
      setStockText("متوفر");
    }
  };

  const handleAddImage = () => {
    if (!fileInput.current.files[0] || !loaded) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار صورة",
      });
      return;
    }
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, img: [...product.img, reader.result] });
    };
    reader.readAsDataURL(file);
    setLoaded(false);
  };

  const deleteRef = useRef(null);

  const handleSaveProduct = () => {
    if (nameRef.current.value.trim() === "") {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة اسم المنتج",
      });
      return;
    }
    if (descRef.current.value.trim() === "") {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة وصف المنتج",
      });
      return;
    }
    if (normalSinglePriceRef.current.value.trim() === "") {
      // Here do REGEX check maybe? for correct price format
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة سعر المنتج العادي بالتفصيل",
      });
      return;
    }
    if (normalMultiPriceRef.current.value.trim() === "") {
      // Here do REGEX check maybe? for correct price format
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة سعر المنتج العادي بالجملة",
      });
      return;
    }
    if (product.onSold) {
      if (soldPercentageRef.current.value.trim() === "") {
        // Here do REGEX check maybe? for correct percentage format
        toast({
          title: "خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة نسبة التخفيض",
        });
        return;
      }
      if (soldSinglePriceRef.current.value.trim() === "") {
        // Here do REGEX check maybe? for correct price format
        toast({
          title: "خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة سعر المنتج بالتفصيل بعد التخفيض",
        });
        return;
      }
      if (soldMultiPriceRef.current.value.trim() === "") {
        // Here do REGEX check maybe? for correct price format
        toast({
          title: "خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة سعر المنتج بالجملة بعد التخفيض",
        });
        return;
      }
    }
    if (brandOption === "إختر ماركة") {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار ماركة المنتج",
      });
      return;
    }
    if (categoryOption === "إختر فئة") {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار فئة المنتج",
      });
      return;
    }
    if (product.img.length === 0) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار صورة واحدة على الأقل",
      });
      return;
    }

    if (product.onSold) {
      setProduct({
        ...product,
        name: nameRef.current.value,
        description: descRef.current.value,
        normalSinglePrice: normalSinglePriceRef.current.value,
        multiNormalPrice: normalMultiPriceRef.current.value,
        soldSinglePrice: soldSinglePriceRef.current.value,
        soldMultiPrice: soldMultiPriceRef.current.value,
        soldPercentage: soldPercentageRef.current.value,
        in_Stock: product.in_Stock,
        img: product.img,
        category: product.category,
        brand: product.brand,
      });
    } else {
      setProduct({
        ...product,
        name: nameRef.current.value,
        description: descRef.current.value,
        normalSinglePrice: normalSinglePriceRef.current.value,
        multiNormalPrice: normalMultiPriceRef.current.value,
        soldSinglePrice: 0,
        soldMultiPrice: 0,
        soldPercentage: 0,
        in_Stock: product.in_Stock,
        img: product.img,
        category: product.category,
        brand: product.brand,
      });
    }

    toast({
      title: "تم",
      variant: "success",
      description: "تمت عملية التسجيل المنتج بنجاح",
    });
  };

  const handleDeleteProduct = () => {
    // DELETE PRODUCT LOGIC BJDOGGGGGGGGGGGGGGG

    toast({
      title: "تم",
      description: "تم حذف المنتج بنجاح",
      variant: "success",
    });
  };

  const deletePopUp = () => {
    deleteRef.current.click();
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        تعديل منتج
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            اسم المنتج <font className="text-red-500">*</font>
          </div>
          <input
            defaultValue={product.name}
            ref={nameRef}
            type="text"
            placeholder="اسم المنتج"
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            وصف المنتج <font className="text-red-500">*</font>
          </div>
          <textarea
            defaultValue={product.description}
            ref={descRef}
            type="text"
            placeholder="وصف المنتج"
            className="h-[300px] bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            {" "}
            سعر المنتج العادي بالتفصيل <font className="text-red-500">*</font>
          </div>
          <input
            defaultValue={product.normalSinglePrice}
            ref={normalSinglePriceRef}
            type="text"
            placeholder="سعر المنتج العادي بالتفصيل "
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            سعر المنتج العادي بالجملة <font className="text-red-500">*</font>
          </div>
          <input
            defaultValue={product.multiNormalPrice}
            ref={normalMultiPriceRef}
            type="text"
            placeholder="سعر المنتج العادي بالجملة "
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            هل يوجد تخفيض لهذا المنتج ؟{" "}
          </div>
          <button
            onClick={() => {
              handleSoldSwitch();
            }}
            type="button"
            className={cn(
              "w-[100px] border-2 py-2.5 text-lg font-semibold transition-all duration-200",
              product.onSold
                ? "border-emerald-500 bg-emerald-500 text-[#ffffff] hover:bg-transparent hover:text-emerald-500"
                : "border-red-500 bg-red-500 text-[#ffffff] hover:bg-transparent hover:text-red-500",
            )}
          >
            {soldText}
          </button>
        </div>
        {product.onSold && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                نسبة التخفيض <font className="text-red-500">*</font>
              </div>
              <input
                defaultValue={product.soldPercentage}
                ref={soldPercentageRef}
                type="text"
                placeholder="نسبة التخفيض "
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                سعر المنتج بالتفصيل بعد التخفيض{" "}
                <font className="text-red-500">*</font>
              </div>
              <input
                defaultValue={product.soldSinglePrice}
                ref={soldSinglePriceRef}
                type="text"
                placeholder="سعر المنتج بالتفصيل بعد التخفيض"
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                سعر المنتج بالجملة بعد التخفيض{" "}
                <font className="text-red-500">*</font>
              </div>
              <input
                defaultValue={product.multiSoldPrice}
                ref={soldMultiPriceRef}
                type="text"
                placeholder="سعر المنتج بالجملة  بعد التخفيض"
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            هل المنتج متوفر ؟
          </div>
          <button
            onClick={() => {
              handleStockSwitch();
            }}
            className={cn(
              "w-[100px] border-2 py-2.5 text-lg font-semibold transition-all duration-200",
              product.in_Stock
                ? "border-emerald-500 bg-emerald-500 text-[#ffffff] hover:bg-transparent hover:text-emerald-500"
                : "border-red-500 bg-red-500 text-[#ffffff] hover:bg-transparent hover:text-red-500",
            )}
          >
            {stockText}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            صور المنتج <font className="text-red-500">*</font>
          </div>
          <div className="text-lg font-semibold text-white">
            ملاحضة هامة: الصورة الأولى هي التي سيتم عرضها على البطاقات.
          </div>
          <div className="text-lg font-semibold text-[var(--dash-theme5)]">
            إضافة الصورة رقم {product.img.length + 1}
          </div>
          <div
            onClick={() => {
              fileInput.current.click();
            }}
            className={cn(
              "relative flex h-[300px] w-full max-w-[300px] items-center justify-center rounded-lg border-[var(--dash-theme5)] hover:cursor-pointer",
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
                "absolute left-0 z-10 hidden size-full rounded-lg object-cover",
                loaded && "block",
              )}
              alt="صورة  "
              ref={imageInput}
            ></img>
            {!loaded && (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4">
                <i className="fa-solid fa-upload text-3xl text-[var(--dash-theme5)]"></i>
                <span className="text-xl font-semibold text-[var(--dash-theme5)]">
                  حمل صورة
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              handleAddImage();
            }}
            type="button"
            className="mt-1 w-[200px] border-2 border-[var(--dash-theme5)] bg-[var(--dash-theme5)] py-2.5 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--dash-theme5)]"
          >
            أضف الصورة
          </button>
        </div>

        {product.img.map((image, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div
              onClick={() => {
                setProduct({
                  ...product,
                  img: product.img.filter((img) => img !== image),
                });
              }}
              className="text-lg font-semibold text-red-400 transition-all duration-200 hover:cursor-pointer hover:text-red-800"
            >
              حذف الصورة رقم {index + 1}{" "}
            </div>
            <img
              src={image}
              key={index}
              className="h-[300px] w-[300px] rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-[800px] flex-row gap-2 pr-4 sm:pr-10">
        <button
          onClick={() => {
            handleSaveProduct();
          }}
          type="button"
          className="w-[120px] bg-emerald-700 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-emerald-500"
        >
          حفظ{" "}
        </button>
        <button
          onClick={() => {
            deletePopUp();
          }}
          type="button"
          className="w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500"
        >
          حذف{" "}
        </button>
      </div>

      <Dialog>
        <DialogTrigger className="hidden">
          <div ref={deleteRef} className="hidden"></div>
        </DialogTrigger>
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
              حذف هذا المنتج سينجم عنه حذف كل البيانات المرتبطة بهذا المنتج
            </div>
            <button
              onClick={() => handleDeleteProduct()}
              type="button"
              className={cn(
                "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500",
              )}
            >
              أنا متأكد
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
