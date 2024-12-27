"use client";

import "./page.css";

import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "@/hooks/use-toast";

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useParams();
  const id = searchParams.id;

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const [product, setProduct] = useState({
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
    brand: { img: "/images/sheglam.png" },
    onSold: true,
    soldPercentage: 15,
    normalSinglePrice: 45.0,
    soldSinglePrice: 38.25,
    normalMultiPrice: 40,
    soldMultiPrice: 34,
    in_Stock: true,
    category: { name: "العناية بالبشرة" },
  });

  const [imageIndex, setImageIndex] = useState(0);

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

  const handleCategoryClick = () => {};

  const cat = {};
  if (product.category) {
    cat[product.category?.name] = true;
  }

  const increaseProductNumber = () => {
    if (productNumber < 99) {
      setProductNumber(productNumber + 1);
    }
  };

  const decreaseProductNumber = () => {
    if (productNumber > 1) {
      setProductNumber(productNumber - 1);
    }
  };

  const [loadingProduct, setLoadingProduct] = useState(true);

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
      cat[product.category?.name] = true;

      setLoadingProduct(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong, Please Try Again!",
        variant: "destructive",
      });
      setLoadingProduct(false);
    }
    setLoadingProduct(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    document.title = `Al-Arabiya: ${product.name ? product.name : "Loading..."}`;
  }, [product]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div
      dir="rtl"
      className="mx-auto mt-14 flex w-full flex-row items-center justify-center gap-20"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      <div className="relative mx-5 flex w-full justify-center gap-10 max-md:flex-col xsm:mx-8 sm:mx-10">
        <div className="top-5 flex h-fit w-full max-w-[700px] flex-col gap-5 px-4 md:sticky lg:flex-row-reverse">
          <div className="relative w-full max-w-[600px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.img[imageIndex]}
              alt="Image"
              className="h-[600px] w-full rounded-lg object-cover transition-all duration-200 hover:scale-[1.15] hover:cursor-zoom-in"
            ></img>
            <img
              src={product.brand.img}
              alt="logo"
              className="absolute left-6 top-6 w-[150px] rounded-full bg-white px-3 py-2 shadow-md"
            ></img>
            <div className="absolute bottom-6 right-6 flex flex-row gap-1.5">
              <div
                onClick={() => handleNextImage()}
                className="grid size-[40px] place-items-center rounded-full bg-white shadow-md hover:cursor-pointer"
              >
                <i className="fa-solid fa-chevron-right text-xl text-neutral-900"></i>
              </div>
              <div
                onClick={() => handlePrevImage()}
                className="grid size-[40px] place-items-center rounded-full bg-white shadow-md hover:cursor-pointer"
              >
                <i className="fa-solid fa-chevron-left text-xl text-neutral-900"></i>
              </div>
            </div>
          </div>
          <div
            dir="ltr"
            className="images-scroll flex gap-3 max-lg:h-full max-lg:w-full max-lg:max-w-[600px] max-lg:overflow-x-auto max-lg:py-3 lg:h-[600px] lg:w-full lg:max-w-[110px] lg:flex-col lg:overflow-y-auto lg:px-3"
          >
            {product.img.map((image, index) => (
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
                ></img>
                <div
                  onMouseOver={() => {
                    setImageIndex(index);
                  }}
                  className={cn(
                    "absolute left-0 top-0 z-10 h-[75px] w-[75px] rounded-sm bg-transparent opacity-20 shadow-md transition-all duration-200 hover:cursor-pointer",
                    imageIndex == index && "scale-110 bg-neutral-950",
                  )}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-fit flex-col gap-3 px-4">
          <div className="flex flex-col gap-1">
            <div className="text-2xl font-semibold text-neutral-900">
              {product.name}
            </div>
            <div
              onClick={() =>
                ChangeUrl(
                  `/products?selectedCategories=${encodeURIComponent(JSON.stringify(cat))}`,
                )
              }
              dir="rtl"
              className="text-lg font-medium text-neutral-500 transition-all duration-200 hover:cursor-pointer hover:text-neutral-400"
            >{`منتوجات ${product.category.name}`}</div>
          </div>
          <div className="text-lg tracking-wide text-neutral-700">
            {product.description}
          </div>
          <div className="text-xl font-semibold text-neutral-700">
            سعر بالتفصيل{" "}
          </div>
          <div className="-mt-2 flex flex-row gap-2">
            {product.onSold ? (
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
            <font className="text-[15px] font-medium tracking-wide text-neutral-500">
              ( 5 منتوجات وما فوق )
            </font>
          </div>
          <div className="-mt-2 flex flex-row gap-2">
            {product.onSold ? (
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
        </div>
      </div>
    </div>
  );
};

export default page;
