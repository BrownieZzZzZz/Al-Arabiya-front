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
  const [currentPrice, setCurrentPrice] = useState(product.onSold ? product.soldSinglePrice : product.normalSinglePrice);
  const [productNumber, setProductNumber] = useState(1);
  const increaseProductNumber = () => {
    if (productNumber < 99) {
      setProductNumber(productNumber + 1);
      if(productNumber >= 4){
        setCurrentPrice(product.onSold ? product.soldMultiPrice : product.normalMultiPrice);
      }
    }
  };

  const decreaseProductNumber = () => {
    if (productNumber > 1) {
      setProductNumber(productNumber - 1);
      if(productNumber < 6){
        setCurrentPrice(product.onSold ? product.soldSinglePrice : product.normalSinglePrice);
      }
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
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingProduct(false);
    }
    setLoadingProduct(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  const handleAddToCart = () => {
    toast({
      title: "تمت الإضافة",
      description: "تمت إضافة المنتوج إلى السلة بنجاح!",
      variant: "success",
    });
  };

  const handleBuyDirectly = () => {};

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
      <div className="relative max-md:items-center mx-5 flex w-full justify-center gap-6 max-md:flex-col lg:gap-12">
        <div className="top-5 flex h-fit w-full  md:max-w-[450px] flex-col gap-5 max-md:px-4 md:sticky lg:max-w-[700px] lg:flex-row-reverse">
          <div className="relative w-full  md:max-w-[450px] lg:max-w-[500px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.img[imageIndex]}
              alt="Image"
              className="h-[600px] w-full rounded-lg object-cover transition-all duration-200 hover:scale-[1.15] hover:cursor-zoom-in"
            ></img>
            <img
              src={product.brand.img}
              alt="logo"
              className="absolute left-6 top-6 h-[60px] w-[150px] rounded-full bg-white object-scale-down p-2.5 shadow-md"
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
        <div className="flex w-full md:max-w-[400px] flex-col gap-3 max-md:px-5">
          <div className="flex flex-col gap-1">
            <div className="-mb-2 font-semibold">{product.brand.name}</div>
            <div className="text-3xl font-semibold text-neutral-900">
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
            <font className="text-[15px] font-normal tracking-wide text-neutral-500">
              5 منتوجات وما فوق
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
          <div className=" my-2 h-[1px] w-full bg-neutral-500"></div>
          <div className="text-2xl font-bold text-neutral-900">كمية:</div>
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-row items-center gap-4">
              <div
                onClick={() => decreaseProductNumber()}
                className="group grid size-[50px] place-items-center border-2 active:scale-90 border-neutral-700 bg-transparent shadow-md transition-all duration-200 hover:cursor-pointer hover:border-transparent hover:bg-neutral-700"
              >
                <i className="fa-solid fa-minus text-xl text-neutral-700 transition-all duration-200 group-hover:text-white"></i>
              </div>
              <div className="text-2xl text-center w-4 font-semibold text-neutral-700">
                {productNumber}
              </div>
              <div
                onClick={() => increaseProductNumber()}
                className="group grid size-[50px] active:scale-90 place-items-center border-2 border-neutral-700 bg-transparent shadow-md transition-all duration-200 hover:cursor-pointer hover:border-transparent hover:bg-neutral-700"
              >
                <i className="fa-solid fa-plus text-xl transition-all duration-20 group-hover:text-white text-neutral-700"></i>
              </div>
            </div>
          </div>
          <div className="text-sm font-medium text-neutral-700 tracking-wide">مدة التسليم من يومين إلى أربعة أيام عمل.</div>
          <button onClick={() => handleAddToCart()} className="w-full active:scale-95 py-3 mt-2 border-2 border-transparent text-2xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer bg-neutral-700 hover:bg-transparent hover:border-neutral-700 hover:text-neutral-700">ضع فالسلة</button>
          <button onClick={() => handleBuyDirectly()} className="w-full active:scale-95 py-3 border-2 border-transparent text-2xl font-semibold text-[#ffffff] transition-all duration-200 hover:cursor-pointer bg-neutral-700 hover:bg-transparent hover:border-neutral-700 hover:text-neutral-700">اشتري الآن </button>
        </div>
      </div>
    </div>
  );
}

export default page; 
