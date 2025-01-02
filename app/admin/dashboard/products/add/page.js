"use client";
import DashBrandInterface from "@/components/DashBrandInterface/DashBrandInterface";
import DashCategoryInterface from "@/components/DashCategoryInterface/DashCategoryInterface";
import SelectBrandInterface from "@/components/SelectBrandInterface/SelectBrandInterface";
import { useToast } from "@/hooks/use-toast";
import { cn, validatePercentageInput, validatePriceInput } from "@/lib/utils";
import React, { useEffect, useRef, useState, useTransition } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [onSold, setOnSold] = useState(false);
  const [imageNumber, setImageNumber] = useState(1);
  const [images, setImages] = useState([]);
  const [imageValue, setImageValue] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [soldText, setSoldText] = useState("لا يوجد ");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const fileInput = useRef(null);
  const imageInput = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const normalSinglePriceRef = useRef(null);
  const normalMultiPriceRef = useRef(null);
  const soldPercentageRef = useRef(null);
  const soldSinglePriceRef = useRef(null);
  const soldMultiPriceRef = useRef(null);
  const percentageRegex = /^(100(\.0{1,2})?|(\d{1,2})(\.\d{1,2})?)$/;
  const priceRegex = /^\d+([.]\d{1,2})?$/;

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
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
      setImages([...images, reader.result]);
    };
    reader.readAsDataURL(file);
    setImageNumber(imageNumber + 1);
    setLoaded(false);
  };

  const handleAddProduct = async () => {
    if (!nameRef.current.value.trim()) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة اسم المنتج",
      });
      return;
    }

    if (!descRef.current.value.trim()) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة وصف المنتج",
      });
      return;
    }

    if (
      !normalSinglePriceRef.current.value.trim() ||
      !priceRegex.test(normalSinglePriceRef.current.value.trim())
    ) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة سعر المنتج العادي بالتفصيل بشكل صحيح",
      });
      return;
    }

    if (
      !normalMultiPriceRef.current.value.trim() ||
      !priceRegex.test(normalMultiPriceRef.current.value.trim())
    ) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك كتابة سعر المنتج العادي بالجملة بشكل صحيح",
      });
      return;
    }

    if (onSold) {
      if (
        !soldPercentageRef.current.value.trim() ||
        !percentageRegex.test(soldPercentageRef.current.value.trim())
      ) {
        toast({
          title: "خطأ",
          variant: "destructive",
          description: "يجب عليك كتابة نسبة التخفيض بشكل صحيح",
        });
        return;
      }

      if (
        !soldSinglePriceRef.current.value.trim() ||
        !priceRegex.test(soldSinglePriceRef.current.value.trim())
      ) {
        toast({
          title: "خطأ",
          variant: "destructive",
          description:
            "يجب عليك كتابة سعر المنتج بالتفصيل بعد التخفيض بشكل صحيح",
        });
        return;
      }

      if (
        !soldMultiPriceRef.current.value.trim() ||
        !priceRegex.test(soldMultiPriceRef.current.value.trim())
      ) {
        toast({
          title: "خطأ",
          variant: "destructive",
          description:
            "يجب عليك كتابة سعر المنتج بالجملة بعد التخفيض بشكل صحيح",
        });
        return;
      }
    }

    if (selectedBrand === "") {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار ماركة المنتج",
      });
      return;
    }

    if (selectedCategory === "") {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار فئة المنتج",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "يجب عليك اختيار صورة واحدة على الأقل",
      });
      return;
    }

    try {
      setLoadingProduct(true);

      toast({
        title: "جاري إضافة المنتج",
        description: "يرجى الانتظار قليلاً",
      });

      const body = {
        name: nameRef.current.value.trim(),
        img: images,
        description: descRef.current.value.trim(),
        normalSinglePrice: Number(normalSinglePriceRef.current.value.trim()),
        normalMultiPrice: Number(normalMultiPriceRef.current.value.trim()),
        onSold,
        brand: { id: selectedBrand },
        category: { id: selectedCategory },
        in_Stock: true,
      };
      if (onSold) {
        body["soldPercentage"] = Number(
          soldPercentageRef.current?.value.trim(),
        );
        body["soldSinglePrice"] = Number(
          soldSinglePriceRef.current?.value.trim(),
        );
        body["soldMultiPrice"] = Number(
          soldMultiPriceRef.current?.value.trim(),
        );
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();
      if (data.data == null) {
        setLoadingProduct(false);
        if (data.message === "Product already exists") {
          toast({
            title: "خطأ",
            description: "إسم المنتوج موجود بالفعل",
            variant: "destructive",
            duration: 2500,
          });
          nameRef.current.value = "";
          return;
        }
        throw new Error(data.message);
      }
      toast({
        title: "تم",
        variant: "success",
        description: "تمت عملية إضافة المنتج بنجاح",
      });
      setLoadingProduct(false);

      nameRef.current.value = "";
      descRef.current.value = "";
      normalSinglePriceRef.current.value = "";
      normalMultiPriceRef.current.value = "";
      if (onSold) {
        soldPercentageRef.current.value = "";
        soldSinglePriceRef.current.value = "";
        soldMultiPriceRef.current.value = "";
      }
      setOnSold(false);
      setSoldText("لا يوجد ");
      setImages([]);
      setImageNumber(1);
      setLoaded(false);
      setImageValue(null);
      setSelectedBrand("");
      setSelectedCategory("");
      ChangeUrl(`/admin/dashboard/products/${data.data.id}`);
    } catch (error) {
      setLoadingProduct(false);
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category?page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      // const categoriesData = data.data.data.map((category) =>
      //   Object({ value: category.id, text: category.name }),
      // );

      // setCategories(categoriesData);

      setCategories(data.data.data);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const fetchBrands = async () => {
    try {
      setLoadingBrands(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/brand?page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      // const brandsData = data.data.data.map((brand) =>
      //   Object({ value: brand.id, text: brand.name }),
      // );

      // setBrands(brandsData);

      setBrands(data.data.data);
      setLoadingBrands(false);
    } catch (error) {
      setLoadingBrands(false);
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);
  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {(loadingPage || loadingBrands || loadingCategories) && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        إضافة منتج
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            اسم المنتج <font className="text-red-500">*</font>
          </div>
          <input
            disabled={loadingProduct}
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
            disabled={loadingProduct}
            ref={descRef}
            type="text"
            placeholder="وصف المنتج"
            className="h-[300px] bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            سعر المنتج العادي بالتفصيل <font className="text-red-500">*</font>
          </div>
          <input
            disabled={loadingProduct}
            ref={normalSinglePriceRef}
            onInput={() => validatePriceInput(normalSinglePriceRef)}
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
            disabled={loadingProduct}
            ref={normalMultiPriceRef}
            onInput={() => validatePriceInput(normalMultiPriceRef)}
            type="text"
            placeholder="سعر المنتج العادي بالجملة "
            className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            هل يوجد تخفيض لهذا المنتج ؟
          </div>
          <button
            disabled={loadingProduct}
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
              loadingProduct && "hover:cursor-not-allowed",
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
                disabled={loadingProduct}
                ref={soldPercentageRef}
                onInput={() => validatePercentageInput(soldPercentageRef)}
                type="text"
                placeholder="نسبة التخفيض "
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                سعر المنتج بالتفصيل بعد التخفيض
                <font className="text-red-500">*</font>
              </div>
              <input
                disabled={loadingProduct}
                ref={soldSinglePriceRef}
                onInput={() => validatePriceInput(soldSinglePriceRef)}
                type="text"
                placeholder="سعر المنتج بالتفصيل بعد التخفيض"
                className="bg-[var(--dash-theme)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme5)]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                سعر المنتج بالجملة بعد التخفيض
                <font className="text-red-500">*</font>
              </div>
              <input
                disabled={loadingProduct}
                ref={soldMultiPriceRef}
                onInput={() => validatePriceInput(soldMultiPriceRef)}
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
              changeBrandOption={(selectedBrand) => {
                setSelectedBrand(selectedBrand);
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
              changeCategoryOption={(selectedCategory) => {
                setSelectedCategory(selectedCategory);
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
              "relative flex h-[300px] w-full max-w-[300px] items-center justify-center rounded-lg border-[var(--dash-theme5)] hover:cursor-pointer",
              loaded ? "border-0" : "border-4 border-dashed",
            )}
          >
            <input
              disabled={loadingProduct}
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
          <button
            onClick={() => {
              handleAddImage();
            }}
            disabled={loadingProduct}
            type="button"
            className={cn(
              "mt-1 w-[200px] border-2 border-[var(--dash-theme5)] bg-[var(--dash-theme5)] py-2.5 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-[var(--dash-theme5)]",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            أضف الصورة
          </button>
        </div>

        {images.map((image, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div className="text-lg font-semibold text-[var(--dash-theme5)]">
              صورة رقم {index + 1}
            </div>
            <img
              src={image}
              key={index}
              className="h-[300px] w-[300px] rounded-lg object-cover"
            />
          </div>
        ))}
      </div>
      <div className="-mt-8 flex w-full max-w-[800px] pr-4 sm:pr-10">
        <button
          disabled={loadingProduct}
          onClick={() => {
            handleAddProduct();
          }}
          type="button"
          className={cn(
            "mt-8 w-[200px] self-start bg-[var(--dash-theme6)] py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-[var(--dash-theme5)]",
            loadingProduct && "hover:cursor-not-allowed",
          )}
        >
          {loadingProduct ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "أضف المنتج"
          )}
        </button>
      </div>
    </div>
  );
};

export default page;
