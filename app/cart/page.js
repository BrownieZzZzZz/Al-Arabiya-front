"use client";

import "./page.css";

import { useRouter } from "next/navigation";
import { useEffect, useTransition, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const items = [
    {
      productId: 1234,
      quantity: 2,
    },
    {
      productId: 1234,
      quantity: 3,
    },
    {
      productId: 1234,
      quantity: 4,
    },
    {
      productId: 1234,
      quantity: 5,
    },
  ];
  const product = {
    id: 1234,
    name: "مرطب الوجه الطبيعي",
    description: "مرطب طبيعي خفيف مناسب لجميع أنواع البشرة.",
    img: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
      "/images/product6.jpg",
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
      "/images/product6.jpg",
    ],
    brand: { img: "/images/sheglam.png", name: "Sheglam" },
    onSold: true,
    soldPercentage: 15,
    normalSinglePrice: 45.0,
    soldSinglePrice: 38.25,
    normalMultiPrice: 40,
    soldMultiPrice: 34,
    in_Stock: true,
    category: { name: "العناية بالبشرة" },
  };
  const increaseProductNumber = () => {};

  const decreaseProductNumber = () => {};
  return (
    <div>
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      {items.length == 0 ? (
        <div
          dir="rtl"
          className="mx-auto mt-24 flex w-full flex-col items-center justify-center"
        >
          <div className="flex flex-col"></div>
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
          className="mx-auto mt-6 flex w-full flex-col items-center justify-center"
        >
          <div className="flex w-full max-w-[1500px] flex-col items-center justify-center">
            <div className="mx-2 flex flex-col gap-10 md:mx-10 lg:flex-row">
              <div>
                <table className="w-full">
                  <tbody className="hidden md:contents">
                    <tr className="font-lato border-b-2 border-neutral-200 text-lg font-bold">
                      <td className="p-[10px]"></td>
                      <td className="p-[10px]"></td>
                      <td className="p-[10px]">المنتج</td>
                      <td className="p-[10px]">سعر المنتج </td>
                      <td className="p-[10px]">الكمية </td>
                      <td className="p-[10px]">المجموع</td>
                    </tr>
                  </tbody>

                  {items.map((item, index) => (
                    <tbody key={index}>
                      <tr
                        className={cn(
                          "hidden border-neutral-200 md:table-row",
                          index == items.length - 1 ? "" : "border-b",
                        )}
                      >
                        <td className="p-[10px]">
                          <i className="fa-solid fa-x text-[11px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-[var(--theme)]" />
                        </td>
                        <td className="p-[10px]">
                          <div className="relative">
                            {product.onSold && (
                              <div className="absolute select-none right-0 top-0 z-10 grid place-items-center rounded-bl-lg rounded-tr-lg bg-emerald-600 p-1">
                                <span className="text-xs font-semibold text-white">
                                  {product.soldPercentage}%
                                </span>
                              </div>
                            )}
                            <img
                              onClick={() => {
                                ChangeUrl(`/products/${item.productId}`);
                              }}
                              alt="product"
                              src={product.img[0]}
                              className="h-[70px] w-[110px] rounded-lg object-cover shadow-lg hover:cursor-pointer"
                            />
                          </div>
                          
                        </td>
                        <td className="p-[10px]">
                          <div className="text-sm text-neutral-500 font-medium">{product.brand.name}</div>
                          <div
                            onClick={() => {
                              ChangeUrl(`/products/${item.productId}`);
                            }}
                            className="font-lato text-[17px] font-bold text-neutral-800 transition-colors duration-200 hover:cursor-pointer hover:text-[var(--theme)]"
                          >
                            {product.name}
                          </div>
                        </td>
                        <td className="p-[10px]">
                          <span className="text-neutral-500">
                            {" "}
                            {`${product.soldSinglePrice}`}
                          </span>
                        </td>
                        <td className="p-[10px]">
                          <div className="flex flex-row items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                decreaseProductNumber();
                              }}
                              className="group grid size-[35px] place-items-center border-2 border-neutral-700 font-semibold transition-all duration-200 hover:bg-neutral-700"
                            >
                              <i className="fa-solid fa-minus text-neutral-700 group-hover:text-white" />
                            </button>
                            <span className="font-lato w-5 text-center text-xl font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                increaseProductNumber();
                              }}
                              className="group grid size-[35px] place-items-center border-2 border-neutral-700 font-semibold transition-all duration-200 hover:bg-neutral-700"
                            >
                              <i className="fa-solid fa-plus text-neutral-700 group-hover:text-white" />
                            </button>
                          </div>
                        </td>
                        <td className="p-[10px]">
                          <span className="text-lg font-bold text-[var(--theme)]">
                            {" "}
                            {`${product.soldSinglePrice * item.quantity}`}
                          </span>
                        </td>
                      </tr>

                      <tr className="contents md:hidden">
                        <td colSpan={7}>
                          <div className="flex w-full flex-row border-b border-neutral-200 py-4 min-[420px]:gap-4 sm:gap-8">
                            <div>
                              <Image
                                width={100}
                                height={0}
                                alt={item.name}
                                src={item.image}
                                className="h-[110px] w-[125px] hover:cursor-pointer"
                                onClick={() => {
                                  ChangeUrl(`/products/${item.id}`);
                                }}
                              />
                            </div>
                            <div className="flex w-full flex-col">
                              <div className="flex w-full flex-row justify-between pb-2">
                                <div
                                  className="text-lg font-bold text-neutral-800"
                                  onClick={() => {
                                    ChangeUrl(`/products/${item.id}`);
                                  }}
                                >
                                  {item.name}
                                </div>
                                <i className="fa-solid fa-x self-center text-[12px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-emerald-700" />
                              </div>
                              <div className="flex w-full flex-row justify-between gap-1 py-2 min-[400px]:gap-0">
                                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                                  Dimension
                                </div>
                                <div className="text-end font-medium text-neutral-500">
                                  {item.dimension}
                                </div>
                              </div>
                              <div className="border-mask h-[1px] w-full bg-neutral-200"></div>
                              <div className="flex w-full flex-row justify-between py-2">
                                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                                  Price
                                </div>
                                <div className="font-medium text-[var(--theme3)]">{`${item.price} QR`}</div>
                              </div>
                              <div className="border-mask h-[1px] w-full bg-neutral-200"></div>
                              <div className="flex w-full flex-row justify-between py-2">
                                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                                  Quantity
                                </div>
                                <div className="flex flex-row items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      decreaseProductNumber();
                                    }}
                                    className="rounded-l-md border-r-[1px] border-neutral-300 px-2.5 py-1 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                                  >
                                    -
                                  </button>
                                  <span className="font-lato px-1 font-semibold">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      increaseProductNumber();
                                    }}
                                    className="rounded-r-md border-l-[1px] border-neutral-300 px-2 py-1 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="border-mask h-[1px] w-full bg-neutral-200"></div>
                              <div className="flex w-full flex-row justify-between py-2">
                                <div className="font-lato my-auto text-[17px] font-semibold text-neutral-800">
                                  Subtotal
                                </div>
                                <div className="font-medium text-[var(--theme3)]">{`${item.price * item.quantity} QR`}</div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>

              <div className="flex h-fit w-full flex-col justify-between gap-3 border-[1px] border-neutral-200 p-7 shadow-md drop-shadow-md lg:max-w-[400px]">
                <span className="font-lato text-xl font-bold text-[var(--theme3)]">
                  CART TOTALS
                </span>
                <div className="flex flex-col">
                  <div className="flex flex-row justify-between px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      Subtotal
                    </span>
                    <span className="text-lg text-neutral-500">145000 QR</span>
                  </div>
                  <div className="border-mask h-[1px] w-full bg-neutral-300"></div>
                  <div className="flex flex-row items-center justify-between gap-5 px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      Shipping
                    </span>
                    <div className="flex flex-col gap-4 text-right text-neutral-600">
                      <div>
                        <label
                          htmlFor="weight"
                          className="radio-wrapper-8 hover:cursor-pointer"
                        >
                          <input
                            type="radio"
                            id="weight"
                            name="shipping"
                            defaultChecked
                            className="relative left-[2px] top-2 float-end accent-emerald-700 hover:cursor-pointer"
                          />
                          Shipping cost depends on weight:{" "}
                          <font className="font-bold text-[var(--theme3)]">
                            750 QR
                          </font>
                        </label>
                      </div>
                      <div>
                        <label htmlFor="hq" className="hover:cursor-pointer">
                          <input
                            type="radio"
                            id="hq"
                            name="shipping"
                            className="relative left-[2px] top-2 float-end accent-emerald-700 hover:cursor-pointer"
                          />
                          Receipt from the company's headquarters (QATAR){" "}
                        </label>
                      </div>
                      <div>
                        <label htmlFor="truck" className="hover:cursor-pointer">
                          <input
                            type="radio"
                            id="truck"
                            name="shipping"
                            className="relative left-[2px] top-2 float-end accent-emerald-700 hover:cursor-pointer"
                          />
                          A shipping truck for several products (from{" "}
                          <font className="font-bold text-[var(--theme3)]">
                            500
                          </font>{" "}
                          to{" "}
                          <font className="font-bold text-[var(--theme3)]">
                            2000 QR
                          </font>
                          ) contact customer service after ordering for shipping
                          cost.
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="border-mask h-[1px] w-full bg-neutral-300"></div>

                  <div className="flex flex-row items-center justify-between px-2 py-4">
                    <span className="font-lato text-lg font-semibold text-neutral-800">
                      Total
                    </span>
                    <div className="flex flex-col justify-between">
                      <span className="font-lato text-2xl font-bold text-[var(--theme3)]">
                        146750 QR
                      </span>
                      <span className="font-lato text-sm text-neutral-400">
                        (includes{" "}
                        <span className="text-[var(--theme3)]">1000 QR</span>{" "}
                        Tax)
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="font-lato w-full bg-[var(--theme3)] py-2 font-semibold text-white transition-colors duration-200 hover:bg-[var(--theme)]"
                  onClick={() => {
                    ChangeUrl("/checkout");
                  }}
                >
                  PROCEED TO CHECKOUT
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
