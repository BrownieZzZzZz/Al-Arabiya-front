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

const ProductsByCategory = ({ ChangeUrl, loading, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitCategories, setLimitCategories] = useState(8);
  const [limitProducts, setLimitProducts] = useState(8);
  // const [loading, setLoadingCategories] = useState(true);

  // const [categories, setCategories] = useState([]);

  const [products, setProducts] = useState([]);

  // const fetchCategories = async () => {
  //   setLoadingCategories(true);
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/category?page=1&limit=${limitCategories}`,
  //       {
  //         method: "GET",
  //       },
  //     );

  //     const data = await res.json();
  //     if (data.data === null) {
  //       throw new Error(data.message);
  //     }

  //     setCategories(data.data.data);

  //     setLoadingCategories(false);
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       title: "خطأ",
  //       description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
  //       variant: "destructive",
  //     });

  //     setLoadingCategories(false);
  //   }
  //   setLoadingCategories(false);
  // };

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?categories=${categories[selectedCategory].name}&page=1&limit=${limitProducts}`,
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
  }, [loading, selectedCategory]);

  // useEffect(() => {
  //   fetchCategories();
  // }, []);
  return (
    <section className="mx-4 mt-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="mb-2 flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
          <span className="text-center text-4xl font-bold text-neutral-800">
            منتجات حسب نوع المنتج
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
        </div>

        <div className="mt-5 flex w-full flex-shrink-0 flex-row items-center gap-6 overflow-x-auto pb-4 min-[700px]:justify-center">
          {loading
            ? Array.from({ length: limitCategories }).map((_, index) => (
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer",
                  )}
                  key={index}
                >
                  <Skeleton className={"h-[35px] w-[100px] bg-neutral-300"} />
                </div>
              ))
            : categories.map((category, index) => (
                <div
                  className={cn(
                    "flex-shrink-0 rounded-lg p-2 font-semibold transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:bg-stone-200",
                    selectedCategory === index
                      ? "bg-stone-300 hover:bg-stone-300"
                      : "",
                  )}
                  onClick={() => {
                    setSelectedCategory(index);
                  }}
                  key={index}
                >
                  {category.name}
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

export default ProductsByCategory;
