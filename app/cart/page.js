"use client";

import "./page.css";

import { useRouter } from "next/navigation";
import { useEffect, useTransition, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CartItem from "@/components/SideCartItem/CartItem";

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [totalPrice, setTotalPrice] = useState({});

  const router = useRouter();

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("cart") || "{}"),
  );

  const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b, 0);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div>
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      {Object.keys(items).length == 0 ? (
        <div
          dir="rtl"
          className="mx-auto mt-24 flex w-full flex-col items-center justify-center"
        >
          <div className="flex flex-col" />
          <div className="mx-5 grid grid-cols-1 place-items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="180"
              fill="var(--theme)"
              className="bi bi-cart-x"
              viewBox="0 0 16 16"
            >
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <span className="font-lato text-center text-3xl font-bold text-neutral-800 md:text-5xl">
              سلة التسوق الخاصة بك فارغة حاليا.
            </span>
            <span className="font-lato max-w-[500px] text-center font-semibold text-neutral-400 md:text-lg">
              قبل الشروع بالدفع عليك إضافة بعض المنتجات إلى سلة التسوق الخاصة
              بك. ستجد الكثير من المنتجات المثيرة للاهتمام على موقعنا.
            </span>
            <button
              onClick={() => {
                ChangeUrl("/products");
              }}
              type="button"
              className="font-lato border-2 border-[var(--theme)] bg-[var(--theme)] px-6 py-3 text-lg font-semibold text-[#ffffff] transition-colors duration-200 hover:cursor-pointer hover:bg-transparent hover:text-[var(--theme)]"
            >
              العودة إلى المتجر
            </button>
          </div>
        </div>
      ) : (
        <div
          dir="rtl"
          className="mx-auto mt-24 flex w-full flex-col items-center justify-center"
        >
          <div className="flex w-full max-w-[1500px] flex-col items-center justify-center">
            <div className="flex w-full flex-col justify-center gap-8 px-4 md:px-8 lg:flex-row">
              <div>
                <table className="w-full">
                  <tbody className="hidden md:contents">
                    <tr className="font-lato border-b-2 border-neutral-200 text-lg font-bold">
                      <td className="p-[10px]"/>
                      <td className="p-[10px]"/>
                      <td className="p-[10px]">المنتج</td>
                      <td className="p-[10px]">سعر المنتج </td>
                      <td className="p-[10px]">الكمية </td>
                      <td className="p-[10px]">المجموع</td>
                    </tr>
                  </tbody>

                  {Object.keys(items).map((productID, index) => (
                    <CartItem
                      key={index}
                      productId={productID}
                      quantity={items[productID]}
                      setTotalPrice={(param) => setTotalPrice(param)}
                      index={index}
                      items={items}
                      setItems={(param) => setItems(param)}
                      ChangeUrl={(url) => ChangeUrl(url)}
                    />
                  ))}
                </table>
              </div>

              <div className="flex h-fit w-full flex-col justify-between gap-3 border-[1px] border-neutral-200 p-7 shadow-md drop-shadow-md lg:max-w-[400px]">
                <span className="font-lato text-xl font-bold text-[var(--theme)]">
                  السعر الإجمالي
                </span>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between gap-5 px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      التوصيل
                    </span>
                    <span className="text-sm text-neutral-600">
                      تأخذ مدة التوصيل من إثنين إلى أربع أيام عمل.
                    </span>
                  </div>
                  <div className="border-mask h-[1px] w-full bg-neutral-300" />

                  <div className="flex flex-row items-center justify-between px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      المجموع
                    </span>
                    <div className="flex flex-col justify-between">
                      <span
                        dir="ltr"
                        className="font-lato text-2xl font-bold text-[var(--theme)]"
                      >
                        {sumValues(totalPrice)} DT
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="font-lato w-full bg-[var(--theme)] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[var(--theme)]"
                  onClick={() => {
                    ChangeUrl("/checkout");
                  }}
                >
                  الدفع
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
