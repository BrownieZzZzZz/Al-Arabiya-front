"use client";

import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Skeleton } from "../ui/skeleton";

const ProductsByBrand = ({ ChangeUrl, loading, brands }) => {
  const [selectedBrand, setSelectedBrand] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitBrands, setLimitBrands] = useState(4);
  const [limitProducts, setLimitProducts] = useState(8);
  // const [loading, setLoadingBrands] = useState(true);

  // const [brands, setBrands] = useState([]);

  const [products, setProducts] = useState([]);

  // const fetchBrands = async () => {
  //   setLoadingBrands(true);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/brand?page=1&limit=${limitBrands}`,
  //       {
  //         method: "GET",
  //       },
  //     );

  //     const data = await res.json();
  //     if (data.data === null) {
  //       throw new Error(data.message);
  //     }

  //     setBrands(data.data.data);

  //     setLoadingBrands(false);
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "خطأ",
  //       description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
  //       variant: "destructive",
  //     });

  //     setLoadingBrands(false);
  //   }
  //   setLoadingBrands(false);
  // };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?brand=${brands[selectedBrand].name}&page=1&limit=${limitProducts}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);

      setLoadingProducts(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingProducts(false);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    if (!loading) {
      fetchProducts();
    }
  }, [loading, selectedBrand]);

  // useEffect(() => {
  //   fetchBrands();
  // }, []);
  return (
    <section className="mx-4 mt-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="mb-2 flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
          <span className="text-center text-4xl font-bold text-neutral-800">
            منتجات حسب الماركة
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
        </div>

        <div className="mt-5 flex w-full flex-shrink-0 flex-row items-center gap-6 overflow-x-auto pb-4 min-[700px]:justify-center">
          {loading
            ? Array.from({ length: limitBrands }).map((_, index) => (
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer",
                  )}
                  key={index}
                >
                  <Skeleton className={"h-[35px] w-[100px] bg-neutral-300"} />
                </div>
              ))
            : brands.map((brand, index) => (
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-stone-200",
                    selectedBrand === index
                      ? "bg-stone-300 hover:bg-stone-300"
                      : "",
                    // "w-[100px]",
                  )}
                  onClick={() => {
                    setSelectedBrand(index);
                  }}
                  key={index}
                >
                  {/* <img src={brand.img} alt={brand.name} /> */}
                  {brand.name}
                </div>
              ))}
        </div>

        <div
          className={cn(
            "flex w-full items-center justify-center delay-0",
            loadingProducts ? "animate-fadeoutdown" : "animate-fadeinup",
          )}
        >
          <div className="w-full max-w-[1400px] px-10">
            <Carousel
              opts={{
                loop: true,
              }}
            >
              <CarouselContent className="-ml-1">
                {products.map((product, index) => (
                  <CarouselItem
                    key={index}
                    className="flex w-full pl-1 min-[600px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <div className="flex w-full p-2">
                      <ProductCard
                        className="w-full"
                        product={product}
                        ChangeUrl={(url) => ChangeUrl(url)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-10 border-0 text-xl" />
              <CarouselNext className="-right-10 border-0 text-xl" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsByBrand;
