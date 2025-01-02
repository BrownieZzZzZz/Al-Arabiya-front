"use client";

import "./page.css";

import { Skeleton } from "@/components/ui/skeleton";

import { toast } from "@/hooks/use-toast";
import { cn, eventBus } from "@/lib/utils";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const page = () => {
  const router = useRouter();
  const searchParams = useParams();
  const id = searchParams.id;
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [product, setProduct] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [productNumber, setProductNumber] = useState(1);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const cat = {};
  if (product.category) {
    cat[product.category?.name] = true;
  }

  const increaseProductNumber = () => {
    if (productNumber < 99) {
      setProductNumber(productNumber + 1);
      if (productNumber >= 4) {
        setCurrentPrice(
          product.onSold ? product.soldMultiPrice : product.normalMultiPrice,
        );
      }
    }
  };

  const decreaseProductNumber = () => {
    if (productNumber > 1) {
      setProductNumber(productNumber - 1);
      if (productNumber < 6) {
        setCurrentPrice(
          product.onSold ? product.soldSinglePrice : product.normalSinglePrice,
        );
      }
    }
  };

  const fetchProduct = async () => {
    setLoadingProduct(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/byid/${id}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProduct(data.data);
      setCurrentPrice(
        data.data.onSold
          ? data.data.soldSinglePrice
          : data.data.normalSinglePrice,
      );

      cat[product.category?.name] = true;

      setLoadingProduct(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    cart[product.id] = cart[product.id]
      ? productNumber + cart[product.id]
      : productNumber;

    localStorage.setItem("cart", JSON.stringify(cart));

    eventBus.emit("updateCart");

    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة المنتوج إلى السلة بنجاح!",
      variant: "success",
    });
    setProductNumber(1);
  };

  const handleNextImage = () => {
    if (imageIndex == product.img.length - 1) {
      setImageIndex(0);
    } else {
      setImageIndex(imageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (imageIndex == 0) {
      setImageIndex(product.img.length - 1);
    } else {
      setImageIndex(imageIndex - 1);
    }
  };

  const handleBuyDirectly = () => {
    handleAddToCart();
    ChangeUrl("/cart");
  };

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  useEffect(() => {
    document.title = `Al-Arabiya: ${product.name ? product.name : "Loading..."}`;
  }, [product]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div
      dir="rtl"
      className="mx-auto mt-14 flex w-full flex-row items-center justify-center gap-20"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="relative mx-5 flex w-full justify-center gap-6 max-md:flex-col max-md:items-center lg:gap-12">
        <div className="top-5 flex h-fit w-full flex-col gap-5 max-md:px-4 md:sticky md:max-w-[450px] lg:max-w-[700px] lg:flex-row-reverse">
          <div className="relative w-full overflow-hidden rounded-lg shadow-lg md:max-w-[450px] lg:max-w-[500px]">
            {loadingProduct ? (
              <Skeleton className="object-coverhover:scale-[1.15] h-[600px] w-full rounded-lg bg-neutral-300 hover:cursor-zoom-in" />
            ) : (
              <img
                src={product.img[imageIndex]}
                alt="Image"
                className="h-[600px] w-full rounded-lg object-cover transition-all duration-200 hover:scale-[1.15] hover:cursor-zoom-in"
              />
            )}
            {loadingProduct ? (
              <Skeleton className="absolute left-6 top-6 h-[60px] w-[150px] rounded-full bg-neutral-400 object-scale-down p-2.5 shadow-md hover:cursor-pointer" />
            ) : (
              <img
                src={product.brand.img}
                alt="logo"
                onClick={() =>
                  ChangeUrl(`/products?brandOption=${product.brand.name}`)
                }
                className="absolute left-6 top-6 h-[60px] w-[150px] rounded-full bg-white object-scale-down p-2.5 shadow-md transition-all duration-300 hover:scale-105 hover:cursor-pointer hover:bg-gray-100"
              />
            )}
            <div className="absolute bottom-6 right-6 flex flex-row gap-1.5">
              <div
                onClick={() => {
                  if (loadingProduct) {
                    return;
                  }
                  handleNextImage();
                }}
                className={cn(
                  "grid size-[40px] place-items-center rounded-full bg-white shadow-md",
                  loadingProduct
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer",
                )}
              >
                <i className="fa-solid fa-chevron-right text-xl text-neutral-900" />
              </div>
              <div
                onClick={() => {
                  if (loadingProduct) {
                    return;
                  }
                  handlePrevImage();
                }}
                className={cn(
                  "grid size-[40px] place-items-center rounded-full bg-white shadow-md",
                  loadingProduct
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer",
                )}
              >
                <i className="fa-solid fa-chevron-left text-xl text-neutral-900" />
              </div>
            </div>
          </div>
          <div
            dir="ltr"
            className={cn(
              "images-scroll flex gap-3 max-lg:h-full max-lg:w-full max-lg:max-w-[600px] max-lg:overflow-x-auto max-lg:px-2 max-lg:py-3 lg:h-[600px] lg:w-full lg:max-w-[110px] lg:flex-col lg:overflow-y-auto lg:px-3 lg:py-2",
              !loadingPage ? "" : "lg:px-3",
            )}
          >
            {loadingProduct
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="relative m-auto h-[75px] w-[75px] flex-shrink-0"
                  >
                    <Skeleton
                      key={index}
                      className="size-full rounded-sm bg-neutral-300"
                    />
                    <div className="absolute left-0 top-0 z-10 h-[75px] w-[75px] rounded-sm bg-transparent opacity-20 shadow-md transition-all duration-200 hover:cursor-pointer" />
                  </div>
                ))
              : product.img.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-[75px] w-[75px] flex-shrink-0"
                  >
                    <img
                      src={image}
                      key={index}
                      alt="image"
                      className={cn(
                        "size-full rounded-sm object-cover transition-all duration-200",
                        imageIndex == index && "scale-110",
                      )}
                    />
                    <div
                      onMouseOver={() => {
                        setImageIndex(index);
                      }}
                      className={cn(
                        "absolute left-0 top-0 z-10 h-[75px] w-[75px] rounded-sm bg-transparent opacity-20 shadow-md transition-all duration-200 hover:cursor-pointer",
                        imageIndex == index && "scale-110 bg-neutral-950",
                      )}
                    />
                  </div>
                ))}
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 max-md:px-5 md:max-w-[400px]">
          <div className="flex flex-col gap-1">
            <div
              onClick={() => {
                if (loadingProduct) {
                  return;
                }
                ChangeUrl(`/products?brandOption=${product.brand?.name}`);
              }}
              className="-mb-2 font-semibold transition-all duration-200 hover:cursor-pointer hover:text-neutral-700"
            >
              {loadingProduct ? (
                <Skeleton className={"h-[24px] w-[100px] bg-neutral-300"} />
              ) : (
                product.brand.name
              )}
            </div>
            <div className="text-3xl font-semibold text-neutral-900">
              {loadingProduct ? (
                <Skeleton
                  className={"my-2 h-[40px] w-[200px] bg-neutral-300"}
                />
              ) : (
                product.name
              )}
            </div>
            <div
              onClick={() => {
                if (loadingProduct) {
                  return;
                }
                ChangeUrl(
                  `/products?selectedCategories=${encodeURIComponent(JSON.stringify(cat))}`,
                );
              }}
              dir="rtl"
              className="text-lg font-medium text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-neutral-400"
            >
              {loadingProduct ? (
                <Skeleton className={"h-[24px] w-[130px] bg-neutral-300"} />
              ) : (
                `منتوجات ${product.category.name}`
              )}
            </div>
          </div>
          <div className="text-lg tracking-wide text-neutral-700">
            {loadingProduct ? (
              <>
                <Skeleton
                  className={"my-1 h-[20px] w-[250px] bg-neutral-300"}
                />
                <Skeleton
                  className={"my-1 h-[20px] w-[250px] bg-neutral-300"}
                />
                <Skeleton
                  className={"my-1 h-[18px] w-[120px] bg-neutral-300"}
                />
              </>
            ) : (
              product.description
            )}
          </div>
          <div className="text-xl font-semibold text-neutral-700">
            سعر بالتفصيل{" "}
          </div>
          <div className="-mt-2 flex flex-row gap-2">
            {loadingProduct ? (
              <Skeleton className={"h-6 w-[240px] bg-neutral-300"} />
            ) : product.onSold ? (
              <>
                <div
                  dir="ltr"
                  className="text-lg font-bold"
                >{`${product.soldSinglePrice} DT`}</div>
                <div
                  dir="ltr"
                  className="text-lg font-medium text-neutral-500 line-through"
                >{` ${product.normalSinglePrice} DT`}</div>
                <div className="text-lg font-medium text-emerald-600">{`${product.soldPercentage}% تخفيض `}</div>
              </>
            ) : (
              <div
                dir="ltr"
                className="text-lg font-bold"
              >{`${product.normalSinglePrice} DT`}</div>
            )}
          </div>
          <div className="text-xl font-semibold text-neutral-700">
            سعر بالجملة{" "}
            <font className="text-[15px] font-normal tracking-wide text-neutral-500">
              5 منتوجات وما فوق
            </font>
          </div>
          <div className="-mt-2 flex flex-row gap-2">
            {loadingProduct ? (
              <Skeleton className={"h-6 w-[240px] bg-neutral-300"} />
            ) : product.onSold ? (
              <>
                <div
                  dir="ltr"
                  className="text-lg font-bold"
                >{`${product.soldMultiPrice} DT`}</div>
                <div
                  dir="ltr"
                  className="text-lg font-medium text-neutral-500 line-through"
                >{` ${product.normalMultiPrice} DT`}</div>
                <div className="text-lg font-medium text-emerald-600">{`${product.soldPercentage}% تخفيض `}</div>
              </>
            ) : (
              <div
                dir="ltr"
                className="text-lg font-bold"
              >{`${product.normalMultiPrice} DT`}</div>
            )}
          </div>
          <div className="my-2 h-[1px] w-full bg-neutral-500" />
          {loadingProduct ? (
            <Skeleton className={"h-6 w-[200px] bg-neutral-300"} />
          ) : product.in_Stock ? (
            <div className="-mb-2 font-medium text-emerald-500">
              منتج متوفر{" "}
            </div>
          ) : (
            <div className="-mb-2 font-medium text-red-500">
              منتج غير متوفر{" "}
            </div>
          )}
          <div className="text-2xl font-bold text-neutral-900">كمية:</div>

          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-4">
              <div
                onClick={() => {
                  if (loadingProduct || !product.in_Stock) {
                    return;
                  }
                  decreaseProductNumber();
                }}
                className={cn(
                  "group grid size-[50px] place-items-center border-2 border-neutral-700 bg-transparent shadow-md transition-all duration-200",
                  loadingProduct || !product.in_Stock
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer hover:border-transparent active:scale-90 hover:bg-neutral-700",
                )}
              >
                {loadingProduct ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-700" />
                  </div>
                ) : (
                  <i
                    className={cn(
                      "fa-solid fa-minus text-xl text-neutral-700 transition-all duration-200",
                      loadingProduct || !product.in_Stock
                        ? ""
                        : "group-hover:text-white",
                    )}
                  />
                )}
              </div>
              <div className="w-4 text-center text-2xl font-semibold text-neutral-700">
                {productNumber}
              </div>
              <div
                onClick={() => {
                  if (loadingProduct || !product.in_Stock) {
                    return;
                  }
                  increaseProductNumber();
                }}
                className={cn(
                  "group grid size-[50px] place-items-center border-2 border-neutral-700 bg-transparent shadow-md transition-all duration-200",
                  loadingProduct || !product.in_Stock
                    ? "hover:cursor-not-allowed"
                    : "hover:cursor-pointer hover:border-transparent hover:bg-neutral-700 active:scale-90",
                )}
              >
                {loadingProduct ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-700" />
                  </div>
                ) : (
                  <i
                    className={cn(
                      "fa-solid fa-plus duration-20 text-xl text-neutral-700 transition-all",
                      loadingProduct || !product.in_Stock
                        ? ""
                        : "group-hover:text-white",
                    )}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="text-2xl font-bold text-neutral-900">
            السعر الكلي:
          </div>
          <div
            className="text-right text-lg font-bold"
            dir={loadingProduct ? "rtl" : "ltr"}
          >
            {loadingProduct ? (
              <Skeleton className={"h-[26px] w-20 bg-neutral-300"} />
            ) : (
              `${productNumber * currentPrice} DT`
            )}
          </div>
          <div className="text-sm font-medium tracking-wide text-neutral-700">
            مدة التسليم من يومين إلى أربعة أيام عمل.
          </div>
          <button
            onClick={() => {
              if (loadingProduct || !product.in_Stock) {
                return;
              }
              handleAddToCart();
            }}
            className={cn(
              "mt-2 w-full border-2 border-transparent bg-neutral-700 py-3 text-2xl font-semibold text-[#ffffff] transition-all duration-200",
              loadingProduct || !product.in_Stock
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer hover:border-neutral-700 hover:bg-transparent active:scale-95 hover:text-neutral-700",
            )}
          >
            {loadingProduct ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </div>
            ) : (
              "ضع فالسلة"
            )}
          </button>
          <button
            onClick={() => {
              if (loadingProduct || !product.in_Stock) {
                return;
              }
              handleBuyDirectly();
            }}
            className={cn(
              "w-full border-2 border-transparent bg-neutral-700 py-3 text-2xl font-semibold text-[#ffffff] transition-all duration-200",
              loadingProduct || !product.in_Stock
                ? "hover:cursor-not-allowed"
                : "hover:cursor-pointer hover:border-neutral-700 hover:bg-transparent active:scale-95 hover:text-neutral-700",
            )}
          >
            {loadingProduct ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </div>
            ) : (
              "اشتري الآن"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
