"use client";

import CheckoutCartItem from "@/components/SideCartItem/CheckoutCartItem";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  cn,
  eventBus,
  validateEmail,
  validateNumberInput,
  cities,
} from "@/lib/utils";

import Cookies from "js-cookie";

import { useRouter } from "next/navigation";
import { useEffect, useTransition, useState, useRef } from "react";

const Page = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const addressRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [user, setUser] = useState({});
  const [totalPrice, setTotalPrice] = useState({});
  const [deliveryPrice, setDeliveryPrice] = useState(0);

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const [items, setItems] = useState({});

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/account`,
        {
          method: "GET",
          headers: {
            access_token: Cookies.get("access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setUser(data.data);
      const full_name = data.data.full_name.split(" ");

      firstNameRef.current.value = full_name[0];
      lastNameRef.current.value = full_name.length > 1 ? full_name[1] : "";
      phoneRef.current.value = data.data.phone;
      emailRef.current.value = data.data.email;
      addressRef.current.value = data.data.address;
      setSelectedCity(data.data.city);
    } catch (error) {}
  };

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  const handleCheckout = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (!firstNameRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال الاسم الأول",
        variant: "destructive",
      });
      return;
    }
    if (!lastNameRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال الاسم الأخير",
        variant: "destructive",
      });
      return;
    }
    if (!phoneRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال رقم الهاتف",
        variant: "destructive",
      });
      return;
    }
    if (
      !emailRef.current.value.trim() ||
      !validateEmail(emailRef.current.value.trim())
    ) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال البريد الإلكتروني",
        variant: "destructive",
      });
      return;
    }
    if (!addressRef.current.value.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إدخال العنوان",
        variant: "destructive",
      });
      return;
    }
    if (!selectedCity.trim()) {
      toast({
        title: "خطأ",
        description: "الرجاء إختيار المدينة",
        variant: "destructive",
      });
      return;
    }
    if (sumValues(cart) < 1) {
      toast({
        title: "خطأ",
        description: "الرجاء إضافة منتجات إلى السلة",
        variant: "destructive",
      });
      return;
    }
    // please wait toast
    toast({
      title: "الرجاء الانتظار",
      description: "جارٍ إرسال الطلب",
    });

    const order = {
      first_name: firstNameRef.current.value.trim(),
      last_name: lastNameRef.current.value.trim(),
      email: emailRef.current.value.trim(),
      phone: phoneRef.current.value.trim(),
      address: addressRef.current.value.trim(),
      deliveryPrice,
      city: selectedCity,
      cart: cart,
      created_At: new Date(),
    };

    try {
      setLoadingOrder(true);
      var access_token = null;
      if (Cookies.get("access_token")) {
        access_token = Cookies.get("access_token");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: "POST",
          headers: {
            access_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        },
      );

      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }
      setLoadingOrder(false);

      localStorage.setItem("cart", "{}");
      eventBus.emit("updateCart");
      toast({
        title: "تم إتمام الطلب",
        description: "شكراً لاستخدامك خدماتنا",
        variant: "success",
        duration: 10000,
      });
      ChangeUrl(
        `/checkout/success?productId=${data.data.id}&productDate=${new Date(data.data.created_At).toLocaleDateString("ar")}`,
      );
    } catch (error) {
      setLoadingOrder(false);
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء إرسال الطلب",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem("cart") || "{}"));
    checkUser();
  }, []);

  const fetchDelivery = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customization`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setDeliveryPrice(data.data.deliveryPrice);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDelivery();
  }, []);
  return (
    <div
      className="mx-auto mt-20 flex w-full flex-col items-center justify-center"
      dir="rtl"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="grid w-full max-w-[1300px] grid-cols-1 gap-8 bg-white px-3 xsm:px-6 sm:px-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5 pt-10">
          <div className="font-cairo text-2xl font-bold text-neutral-800">
            معلومات الفتورة والتوصيل
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="first-name" className="font-cairo text-lg">
                الاسم <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="الاسم"
                type="text"
                id="first-name"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme)]"
                required
                ref={firstNameRef}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="last-name" className="font-cairo text-lg">
                اللقب <font className="text-rose-500">*</font>
              </label>
              <input
                placeholder="اللقب"
                type="text"
                id="last-name"
                className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme)]"
                required
                ref={lastNameRef}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="city" className="font-cairo text-lg">
              المدينة <font className="text-rose-500">*</font>
            </label>
            <Select onValueChange={setSelectedCity} value={selectedCity}>
              <SelectTrigger
                dir="rtl"
                className="border-neutral-300 bg-transparent text-right focus:ring-[var(--theme)]"
              >
                <SelectValue dir="rtl" placeholder="اختر المدينة.." />
              </SelectTrigger>
              <SelectContent dir="rtl">
                <SelectGroup dir="rtl">
                  {cities.map((city, index) => (
                    <SelectItem
                      dir="rtl"
                      className="text-right transition-colors duration-150 hover:cursor-pointer focus:bg-zinc-200"
                      key={index}
                      value={city.value}
                    >
                      {city.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="address" className="font-cairo text-lg">
              العنوان <font className="text-rose-500">*</font>
            </label>
            <input
              type="text"
              id="address"
              placeholder="الشارع / الحي"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme)]"
              required
              ref={addressRef}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="phone" className="font-cairo text-lg">
              رقم الهاتف <font className="text-rose-500">*</font>
            </label>
            <input
              type="tel"
              dir="rtl"
              id="phone"
              placeholder="xxxxxxxx"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme)]"
              required
              ref={phoneRef}
              onInput={() => validateNumberInput(phoneRef)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-cairo text-lg">
              البريد الإلكتروني <font className="text-rose-500">*</font>
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@domain.com"
              className="rounded-sm border border-neutral-300 bg-transparent px-4 py-2 outline-[var(--theme)]"
              required
              ref={emailRef}
            />
          </div>
        </div>

        <div className="my-10 flex flex-col gap-8 bg-[var(--theme2)] px-6 py-3 shadow-sm drop-shadow-sm">
          <span className="self-center font-cairo text-2xl font-bold text-neutral-800">
            طلبك
          </span>
          <div className="flex h-fit w-full flex-col justify-between gap-3 self-center bg-white p-7">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-cairo text-lg font-semibold text-neutral-800">
                  المنتج
                </span>
                <span className="font-cairo text-lg font-semibold text-neutral-800">
                  المجموع الفرعي
                </span>
              </div>
              <div className="h-[2px] w-full bg-neutral-200" />
              {Object.keys(items).map((productId, index) => (
                <CheckoutCartItem
                  key={productId}
                  productId={productId}
                  quantity={items[productId]}
                  setTotalPrice={(param) => setTotalPrice(param)}
                />
              ))}
              <div className="flex flex-row justify-between px-2 py-4">
                <span className="font-cairo text-lg font-semibold text-neutral-800">
                  المجموع الفرعي
                </span>
                <span
                  className="text-lg font-medium text-[var(--theme)]"
                  dir="ltr"
                >
                  {sumValues(totalPrice)}DT
                </span>
              </div>
              <div className="h-[2px] w-full bg-neutral-200" />
              <div className="flex flex-row items-center justify-between gap-5 px-2 py-4">
                <span className="font-cairo text-lg font-semibold text-neutral-800">
                  التوصيل
                </span>
                <div className="flex flex-col gap-4 text-right text-neutral-600">
                  <font className="font-bold text-[var(--theme)]" dir="ltr">
                    {deliveryPrice}DT
                  </font>
                </div>
              </div>
              <div className="h-[2px] w-full bg-neutral-200" />
              <div className="flex flex-row items-center justify-between gap-2 px-2 py-4">
                <span className="font-cairo text-lg font-semibold text-neutral-800">
                  مدة التوصيل
                </span>
                <span className="text-end font-cairo text-[17px] font-semibold text-[var(--theme)]">
                  التوصيل خلال 3-6 أيام عمل
                </span>
              </div>

              <div className="h-[2px] w-full bg-neutral-200" />

              <div className="flex flex-row items-center justify-between px-2 py-4">
                <span className="font-cairo text-lg font-semibold text-neutral-800">
                  المجموع
                </span>
                <div className="flex flex-col justify-between">
                  <span
                    className="font-cairo text-2xl font-bold text-[var(--theme)]"
                    dir="ltr"
                  >
                    {sumValues(totalPrice) + deliveryPrice}DT
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[1px] w-full bg-neutral-300" />
          <div className="font-cairo text-neutral-500">
            سيتم استخدام بياناتك الشخصية لمعالجة طلبك ودعم تجربتك خلال هذا
            الموقع ولأغراض أخرى موضحة في
            <font
              onClick={() => {
                ChangeUrl("/terms-and-conditions#privacy");
              }}
              className="font-bold text-neutral-700 transition-colors duration-200 hover:cursor-pointer hover:text-[var(--theme3)]"
            >
              سياسة الخصوصية
            </font>
            .
          </div>
          <button
            className={cn(
              "bg-[var(--theme)] px-2 py-3 font-cairo text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-[var(--theme3)]",
              loadingOrder && "opacity-80 hover:cursor-not-allowed",
            )}
            type="button"
            disabled={loadingOrder}
            onClick={() => {
              if (loadingOrder) return;
              handleCheckout();
            }}
          >
            {loadingOrder ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </div>
            ) : (
              "تأكيد الطلب"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
