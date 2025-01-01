"use client";
import DashBrandInterface from "@/components/DashBrandInterface/DashBrandInterface";
import DashCategoryInterface from "@/components/DashCategoryInterface/DashCategoryInterface";
import SelectBrandInterface from "@/components/SelectBrandInterface/SelectBrandInterface";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const page = () => {
  const [onSold, setOnSold] = useState(false);
  const [soldText, setSoldText] = useState("لا يوجد ");
  let brandOption = "إختر ماركة";
  let categoryOption = "إختر فئة";
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageNumber, setImageNumber] = useState(1);
  const fileInput = useRef(null);
  const imageInput = useRef(null);
  const [images, setImages] = useState([]);
  const [imageValue, setImageValue] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { toast } = useToast();
  const changeBrandOption = (option) => {
    brandOption = option;
  };
  const changeCategoryOption = (option) => {
    categoryOption = option;
  };
  const handleAddImage = () => {
    if(!fileInput.current.files[0] || !loaded){
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار صورة"
      })
      return;
    }
    const file = fileInput.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages([...images, reader.result]);
    };
    reader.readAsDataURL(file);
    setImageNumber(imageNumber + 1);
    setLoaded(false);
  }
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const normalSinglePriceRef = useRef(null);
  const normalMultiPriceRef = useRef(null);
  const soldPercentageRef = useRef(null);
  const soldSinglePriceRef = useRef(null);
  const soldMultiPriceRef = useRef(null);

  const handleAddProduct = () => {
    if(nameRef.current.value.trim() === ""){
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة اسم المنتج"
      });
      return;
    }
    if(descRef.current.value.trim() === ""){
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة وصف المنتج"
      });
      return;
    }
    if(normalSinglePriceRef.current.value.trim() === ""){ // Here do REGEX check maybe? for correct price format
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة سعر المنتج العادي بالتفصيل"
      });
      return;
    }
    if(normalMultiPriceRef.current.value.trim() === ""){ // Here do REGEX check maybe? for correct price format
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة سعر المنتج العادي بالجملة"
      });
      return;
    }
    if(onSold){
      if(soldPercentageRef.current.value.trim() === ""){ // Here do REGEX check maybe? for correct percentage format
        toast({
          title:"خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة نسبة التخفيض"
        });
        return;
      }
      if(soldSinglePriceRef.current.value.trim() === ""){ // Here do REGEX check maybe? for correct price format
        toast({
          title:"خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة سعر المنتج بالتفصيل بعد التخفيض"
        });
        return;
      }
      if(soldMultiPriceRef.current.value.trim() === ""){ // Here do REGEX check maybe? for correct price format
        toast({
          title:"خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة سعر المنتج بالجملة بعد التخفيض"
        });
        return;
      }
    }
    if(brandOption === "إختر ماركة"){
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار ماركة المنتج"
      });
      return;
    }
    if(categoryOption === "إختر فئة"){
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار فئة المنتج"
      });
      return;
    }
    if(images.length === 0){
      toast({
        title:"خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار صورة واحدة على الأقل"
      });
      return;
    }
    toast({
      title:"تم",
      variant: "success",
      description: "تمت عملية إضافة المنتج بنجاح"
    });

    // DO BACKEND LOGIC HERE
    // IF RESPONSE IS SUCCESS THEN RESET ALL INPUTS BY THE CODE BELOW

    nameRef.current.value = "";
    descRef.current.value = "";
    normalSinglePriceRef.current.value = "";
    normalMultiPriceRef.current.value = "";
    soldPercentageRef.current.value = "";
    soldSinglePriceRef.current.value = "";
    soldMultiPriceRef.current.value = "";
    setOnSold(false);
    setSoldText("لا يوجد ");
    setImages([]);
    setImageNumber(1);
    setLoaded(false);
    setImageValue(null);
    brandOption = "إختر ماركة";
    categoryOption = "إختر فئة";
  }
  
  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        إضافة منتج
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            اسم المنتج <font className="text-red-500">*</font>
          </div>
          <input
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
              setOnSold(!onSold);
              if (onSold) {
                setSoldText("لا يوجد ");
              } else {
                setSoldText("يوجد ");
              }
            }}
            type="button"
            className={cn(
              "w-[100px] border-2 py-2.5 text-lg font-semibold transition-all duration-200",
              onSold
                ? "border-emerald-500 bg-emerald-500 text-[#ffffff] hover:bg-transparent hover:text-emerald-500"
                : "border-red-500 bg-red-500 text-[#ffffff] hover:bg-transparent hover:text-red-500",
            )}
          >
            {soldText}
          </button>
        </div>
        {onSold && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                نسبة التخفيض <font className="text-red-500">*</font>
              </div>
              <input
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
            ماركة المنتج <font className="text-red-500">*</font>
          </div>
          <div dir="rtl" className="px-2">
            <DashBrandInterface
              key={321321}
              changeBrandOption={(brandOption) => {
                changeBrandOption(brandOption);
              }}
              values={brands}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            فئة المنتج <font className="text-red-500">*</font>
          </div>
          <div dir="rtl" className="px-2">
            <DashCategoryInterface
              key={32132}
              changeCategoryOption={(categoryOption) => {
                changeCategoryOption(categoryOption);
              }}
              values={categories}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            صور المنتج <font className="text-red-500">*</font>
          </div>
          <div className="text-lg font-semibold text-white">
            ملاحضة هامة: الصورة الأولى هي التي سيتم عرضها على البطاقات.
          </div>
          <div className="text-lg font-semibold text-[var(--dash-theme5)]">
            إضافة الصورة رقم {imageNumber}
          </div>
          <div
            onClick={() => {
              fileInput.current.click();
            }}
            className={cn(
              "relative flex h-[300px] max-w-[300px] w-full items-center justify-center rounded-lg border-[var(--dash-theme5)] hover:cursor-pointer",
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
              alt="صورة الماركة "
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
          <button onClick={() => {
            handleAddImage();
          }} type="button" className="w-[200px] py-3 mt-1 text-lg font-semibold transition-all duration-200 bg-[var(--dash-theme5)] border-2 border-[var(--dash-theme5)] text-[#ffffff] hover:bg-transparent hover:text-[var(--dash-theme5)]">
            أضف الصورة
          </button>
        </div>

        {images.map((image, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="text-lg font-semibold text-[var(--dash-theme5)]">
              صورة رقم {index + 1}
            </div>
            <img src={image} key={index} className="object-cover h-[300px] w-[300px] rounded-lg"/>
          </div>
        ))}
      </div>
      <div className="flex w-full max-w-[800px] -mt-8 sm:pr-10 pr-4">
      <button onClick={() => {handleAddProduct()}} type="button" className="self-start w-[200px] py-3 mt-8 text-lg font-semibold transition-all duration-200 bg-[var(--dash-theme6)] text-[#ffffff] hover:bg-[var(--dash-theme5)]">أضف المنتج </button>
      </div>
    </div>
  );
};

export default page;
