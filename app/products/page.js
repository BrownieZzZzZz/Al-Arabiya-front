"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterInterface from "@/components/FilterInterface/FilterInterface";
import ProductCard from "@/components/ProductCard/ProductCard";
import NotFoundComp from "@/components/NotFoundComp/NotFoundComp";
import { useRouter } from "next/navigation";

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const products = [
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product1.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "0",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product2.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product3.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product4.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "0",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product5.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
    {
      title: "Product Title",
      desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
      image: "/images/product6.jpg",
      logo: "/images/sheglam.png",
      normalPrice: "25.000",
      soldPrice: "20.000",
    },
  ];
  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);
  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
  };

  function OpenFilter() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center justify-center rounded-lg bg-[var(--theme)] px-2 lg:hidden"
          >
            <i className="fa-solid fa-filter text-xl text-neutral-100"></i>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[280px] overflow-auto">
          <SheetTitle></SheetTitle>
          <FilterInterface ChangeUrl={(url, options = {}) => {
            ChangeUrl(url, options);
          }} />
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      dir="rtl"
      className="mx-auto mt-10 flex w-full flex-row items-center justify-center gap-20"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"></div>
        </div>
      )}
      <div className="mx-5 w-full  flex flex-row justify-center gap-10 xsm:mx-8 sm:mx-10">
        {/* Filter Interface Below  */}
        <div className="hidden lg:flex">
          <Suspense>
            <FilterInterface ChangeUrl={(url, options={}) => {
              ChangeUrl(url, options);
            }} />
          </Suspense>
        </div>

        {/* Search & Products Interface Below */}

        <div className="flex w-full max-w-screen-lg flex-col gap-4">
          {/* Input Interface Below */}

          <div className="flex min-w-full flex-row gap-1 rounded-xl border-2 border-neutral-200 py-1 pl-3 pr-3 xsm:pr-0">
            <div className="hidden min-w-10 items-center justify-center xsm:flex">
              <i className="fa-solid fa-magnifying-glass text-zinc-300"></i>
            </div>
            <input
              placeholder="ابحث عن منتج "
              type="text"
              className="min-h-full w-full flex-1 bg-transparent focus:outline-none"
            ></input>
            <button className="rounded-lg bg-[var(--theme)] px-2.5 py-1 text-lg text-neutral-100 transition-all duration-300 hover:scale-95">
              <span className="hidden xsm:block">ابحث </span>
              <div className="xsm:hidden">
                <i className="fa-solid fa-magnifying-glass text-neutral-100"></i>
              </div>
            </button>
            <OpenFilter />
          </div>

          {/* Products Interface Below */}

          <div dir="ltr" className="w-full grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {(products.length === 0 || !products) && (
              <NotFoundComp text="لا يوجد منتجات "/>
            )}
            {products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
