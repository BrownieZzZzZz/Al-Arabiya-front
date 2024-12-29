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
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
    {
      image: "/images/product1.png",
      name: "Work Table With Under Shelf",
      dimension: "1000 x 700 x 850 + 100mm",
      price: "2000",
      quantity: "3",
      id: "123456",
    },
  ];
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
        <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center">
          <div className="flex flex-col"></div>
          <div className="mx-5 grid grid-cols-1 place-items-center gap-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="180"
              height="180"
              fill="var(--theme3)"
              className="bi bi-cart-x"
              viewBox="0 0 16 16"
            >
              <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793z" />
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
            <span className="font-lato text-center text-3xl font-bold text-neutral-800 md:text-5xl">
              Your cart is currently empty.
            </span>
            <span className="font-lato max-w-[500px] text-center font-semibold text-neutral-400 md:text-lg">
              Before proceeding to checkout you must add some products to your
              shopping cart. You will find a lot of interesting products on our
              Products page.
            </span>
            <button
              onClick={() => {
                ChangeUrl("/products");
              }}
              type="button"
              className="font-lato bg-[var(--theme3)] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-[var(--theme)]"
            >
              RETURN TO SHOP
            </button>
          </div>
        </div>
      ) : (
        <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center">
          <div className="flex w-full max-w-[1500px] flex-col items-center justify-center">
            <div className="mx-2 flex flex-col gap-10 md:mx-10 lg:flex-row">
              <div>
                <table className="w-full">
                  <tbody className="hidden md:contents">
                    <tr className="font-lato border-b-2 border-neutral-200 text-lg font-bold">
                      <td className="p-[10px]"></td>
                      <td className="p-[10px]"></td>
                      <td className="p-[10px]">PRODUCT</td>
                      <td className="p-[10px]">DIMENSION</td>
                      <td className="p-[10px]">PRICE</td>
                      <td className="p-[10px]">QUANTITY</td>
                      <td className="p-[10px]">SUBTOTAL</td>
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
                          <i className="fa-solid fa-x text-[11px] text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-emerald-700" />
                        </td>
                        <td className="p-[10px]">
                          <Image
                            width={80}
                            height={0}
                            alt={item.name}
                            src={item.image}
                            className="max-w-[80px] hover:cursor-pointer"
                            onClick={() => {
                              ChangeUrl(`/products/${item.id}`);
                            }}
                          />
                        </td>
                        <td className="p-[10px]">
                          <div
                            onClick={() => {
                              ChangeUrl(`/products/${item.id}`);
                            }}
                            className="font-lato text-[17px] font-bold text-neutral-800 transition-colors duration-200 hover:cursor-pointer hover:text-emerald-600"
                          >
                            {item.name}
                          </div>
                        </td>
                        <td className="p-[10px]">
                          <span className="text-neutral-500">
                            {" "}
                            {item.dimension}
                          </span>
                        </td>
                        <td className="p-[10px]">
                          <span className="text-neutral-500">
                            {" "}
                            {`${item.price} QR`}
                          </span>
                        </td>
                        <td className="p-[10px]">
                          <div className="flex flex-row items-center justify-center gap-2 rounded-md border-[1px] border-neutral-300">
                            <button
                              type="button"
                              onClick={() => {
                                decreaseProductNumber();
                              }}
                              className="rounded-l-md border-r-[1px] border-neutral-300 px-2.5 py-2 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
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
                              className="rounded-r-md border-l-[1px] border-neutral-300 px-2 py-2 font-semibold transition-all duration-200 hover:bg-[var(--theme)] hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-[10px]">
                          <span className="text-lg font-bold text-[var(--theme3)]">
                            {" "}
                            {`${item.price * item.quantity} QR`}
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
