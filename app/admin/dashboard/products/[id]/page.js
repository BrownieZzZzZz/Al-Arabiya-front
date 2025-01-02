"use client";

import React, { useRef, useState, useTransition, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { cn, validatePercentageInput, validatePriceInput } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DashBrandInterface from "@/components/DashBrandInterface/DashBrandInterface";
import DashCategoryInterface from "@/components/DashCategoryInterface/DashCategoryInterface";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingFetchingProduct, setLoadingFetchingProduct] = useState(true);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [onSold, setOnSold] = useState(false);
  const [in_Stock, setIn_Stock] = useState(false);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const normalSinglePriceRef = useRef(null);
  const normalMultiPriceRef = useRef(null);
  const soldPercentageRef = useRef(null);
  const soldSinglePriceRef = useRef(null);
  const soldMultiPriceRef = useRef(null);
  const imageInput = useRef(null);
  const fileInput = useRef(null);
  const deleteRef = useRef(null);
  const percentageRegex = /^(100(\.0{1,2})?|(\d{1,2})(\.\d{1,2})?)$/;
  const priceRegex = /^\d+([.]\d{1,2})?$/;

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
  };

  const handleSoldSwitch = () => {
    setOnSold((prev) => !prev);
  };

  const handleStockSwitch = () => {
    setIn_Stock((prev) => !prev);
  };

  const handleAddImage = () => {
    if (!fileInput.current?.files?.[0] || !loaded) {
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
      if (images.includes(reader.result)) {
        toast({
          title: "خطأ",
          variant: "destructive",
          description: "هذه الصورة موجودة بالفعل",
        });
        return;
      }

      setImages((prevImages) => [...prevImages, reader.result]);
      setLoaded(false);

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    };

    reader.onerror = () => {
      toast({
        title: "خطأ",
        variant: "destructive",
        description: "فشل في قراءة الصورة",
      });
    };

    reader.readAsDataURL(file);
  };

  const handleSaveProduct = async () => {
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
        title: "جاري تعديل المنتج",
        description: "يرجى الانتظار قليلاً",
      });

      const body = {
        name: nameRef.current.value.trim(),
        img: [...images],
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
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product/${id}`,
        {
          method: "PUT",
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
        description: "تمت عملية تعديل المنتج بنجاح",
      });
      setLoadingProduct(false);
    } catch (error) {
      setLoadingProduct(false);
      console.error(error);
      toast({
        title: "خطأ في تعديل المنتج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProduct = async () => {
    try {
      setLoadingProduct(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );
      const data = await response.json();
      if (data.data == null) {
        throw new Error(data.message);
      }
      toast({
        title: "تم",
        description: "تم حذف المنتج بنجاح",
        variant: "success",
      });

      setLoadingProduct(false);
      ChangeUrl("/admin/dashboard/products");
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ في مسح المنتج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      setLoadingProduct(false);
    }
  };

  const openDeletePopUp = () => {
    deleteRef.current.click();
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

      setCategories(data.data.data);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      console.error(error);
      toast({
        title: "خطأ في جلب الفئات",
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

      setBrands(data.data.data);
      setLoadingBrands(false);
    } catch (error) {
      console.error(error);
      setLoadingBrands(false);
      toast({
        title: "خطأ في جلب الماركات",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const fetchProduct = async () => {
    try {
      setLoadingFetchingProduct(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product/byid/${id}?page=1&limit=999`,
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

      setProduct(data.data);
      setSelectedBrand(data.data.brand.id);
      setSelectedCategory(data.data.category.id);
      setImages(data.data.img);
      setOnSold(data.data.onSold);
      setIn_Stock(data.data.in_Stock);
      setLoadingFetchingProduct(false);
    } catch (error) {
      setLoadingFetchingProduct(false);
      console.error(error);
      toast({
        title: "خطأ في جلب المنتوج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="flex w-full flex-col items-center gap-10 px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {(loadingPage ||
        loadingBrands ||
        loadingCategories ||
        loadingFetchingProduct) && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="text-4xl font-bold text-[var(--dash-theme5)]">
        تعديل منتج
      </div>
      <div className="flex w-full max-w-[800px] flex-col gap-4 rounded-lg bg-[var(--dash-theme2)] px-4 py-8 sm:p-10">
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            اسم المنتج <font className="text-red-500">*</font>
          </div>
          <input
            disabled={loadingFetchingProduct || loadingProduct}
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
            disabled={loadingFetchingProduct || loadingProduct}
            defaultValue={product.description}
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
            disabled={loadingFetchingProduct || loadingProduct}
            defaultValue={product.normalSinglePrice}
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
            disabled={loadingFetchingProduct || loadingProduct}
            defaultValue={product.normalMultiPrice}
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
            disabled={loadingFetchingProduct || loadingProduct}
            onClick={() => {
              handleSoldSwitch();
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
            {onSold ? "يوجد" : "لا يوجد"}
          </button>
        </div>
        {onSold && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium text-[var(--dash-theme5)]">
                نسبة التخفيض <font className="text-red-500">*</font>
              </div>
              <input
                disabled={loadingFetchingProduct || loadingProduct}
                defaultValue={product.soldPercentage}
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
                disabled={loadingFetchingProduct || loadingProduct}
                defaultValue={product.soldSinglePrice}
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
                disabled={loadingFetchingProduct || loadingProduct}
                defaultValue={product.soldMultiPrice}
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
              defaultValue={selectedBrand}
              disabled={loadingFetchingProduct || loadingProduct}
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
              defaultValue={selectedCategory}
              disabled={loadingFetchingProduct || loadingProduct}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-lg font-medium text-[var(--dash-theme5)]">
            هل المنتج متوفر ؟
          </div>
          <button
            disabled={loadingFetchingProduct || loadingProduct}
            onClick={() => {
              handleStockSwitch();
            }}
            className={cn(
              "w-[100px] border-2 py-2.5 text-lg font-semibold transition-all duration-200",
              in_Stock
                ? "border-emerald-500 bg-emerald-500 text-[#ffffff] hover:bg-transparent hover:text-emerald-500"
                : "border-red-500 bg-red-500 text-[#ffffff] hover:bg-transparent hover:text-red-500",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            {in_Stock ? "متوفر" : "غير متوفر"}
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
            إضافة الصورة رقم {images.length + 1}
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
              disabled={loadingFetchingProduct || loadingProduct}
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
              src={null}
              className={cn(
                "absolute left-0 z-10 hidden size-full rounded-lg object-cover",
                loaded && "block",
              )}
              alt="صورة  "
              ref={imageInput}
            ></img>
            {!loaded && (
              <div
                className={cn(
                  "flex h-full w-full flex-col items-center justify-center gap-4",
                  loadingProduct && "hover:cursor-not-allowed",
                )}
              >
                <i className="fa-solid fa-upload text-3xl text-[var(--dash-theme5)]"></i>
                <span className="text-xl font-semibold text-[var(--dash-theme5)]">
                  حمل صورة
                </span>
              </div>
            )}
          </div>
          <button
            disabled={loadingFetchingProduct || loadingProduct}
            onClick={() => {
              handleAddImage();
            }}
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
          <div key={index} className="flex flex-col items-start gap-2">
            <button
              disabled={loadingFetchingProduct || loadingProduct}
              onClick={() => {
                setImages((prev) => {
                  return prev.filter((img) => img !== image);
                });
              }}
              className={cn(
                "text-lg font-semibold text-red-400 transition-all duration-200 hover:cursor-pointer hover:text-red-800",
                loadingProduct && "hover:cursor-not-allowed",
              )}
            >
              حذف الصورة رقم {index + 1}
            </button>
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
          disabled={loadingFetchingProduct || loadingProduct}
          onClick={() => {
            handleSaveProduct();
          }}
          type="button"
          className={cn(
            "w-[120px] bg-emerald-700 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-emerald-500",
            loadingProduct && "hover:cursor-not-allowed",
          )}
        >
          {loadingProduct ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "حفظ"
          )}
        </button>
        <button
          disabled={loadingFetchingProduct || loadingProduct}
          onClick={() => {
            openDeletePopUp();
          }}
          type="button"
          className={cn(
            "w-[120px] bg-red-900 py-3 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500",
            loadingProduct && "hover:cursor-not-allowed",
          )}
        >
          {loadingProduct ? (
            <div className="flex items-center justify-center">
              <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
            </div>
          ) : (
            "حذف"
          )}
        </button>
      </div>

      <Dialog>
        <DialogTrigger ref={deleteRef} className="hidden" />
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
              disabled={loadingFetchingProduct || loadingProduct}
              onClick={() => handleDeleteProduct()}
              type="button"
              className={cn(
                "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-red-500",
                loadingProduct && "hover:cursor-not-allowed",
              )}
            >
              {loadingProduct ? (
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
    </div>
  );
};

export default page;
