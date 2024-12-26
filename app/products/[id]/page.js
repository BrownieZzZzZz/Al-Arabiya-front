"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const page = () => {
  const [loadingPage, setLoadingPage] = useState(true);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  // const id = params.id;
  const product = {
    id: 1234,
    title: "Product Title",
    desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque rerum ullam nesciunt optio! Libero nostrum ducimus temporibus. Magnam, ullam nobis.",
    images: [
      "/images/product1.jpg",
      "/images/product2.jpg",
      "/images/product3.jpg",
      "/images/product4.jpg",
      "/images/product5.jpg",
      "/images/product6.jpg",
    ],
    logo: "/images/sheglam.png",
    normalPrice: "25.000",
    soldPrice: "0",
  };
  const [imageIndex, setImageIndex] = useState(0);
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
      <div className="relative mx-5 flex w-full flex-row justify-center gap-10 xsm:mx-8 sm:mx-10">
        <div className="sticky top-10 flex flex-row gap-5">
          <img
            src={product.images[imageIndex]}
            alt="Image"
            className="w-[700px] h-[700px] object-cover"
          ></img>
          <div className="flex flex-col gap-2">
            {product.images.map((image, index) => (
              <img onClick={() => {
                setImageIndex(index)
              }} src={image} key={index} alt="image" className="size-[50px] object-cover hover:cursor-pointer"></img>
            ))}
          </div>
        </div>
        <div className="h-[1400px] w-[600px] bg-emerald-500"></div>
      </div>
    </div>
  );
};

export default page;
