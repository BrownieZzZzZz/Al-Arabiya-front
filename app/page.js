"use client";

import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/Hero/Hero";
import LookingFor from "@/components/LookingFor/LookingFor";
import ProductsByBrand from "@/components/ProductsByBrand/ProductsByBrand";
import SpecialOffers from "@/components/SpecialOffers/SpecialOffers";
import ProductsByCategory from "@/components/ProductsByCategory/ProductsByCategory";

import { toast } from "@/hooks/use-toast";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/customization`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setLoading(false);

      setProducts(data.data.featuredProducts);
      setBrands(data.data.brands);
      setCategories(data.data.categories);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mx-auto flex w-full flex-col">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <Hero
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
      />
      <FeaturedProducts
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
        loading={loading}
        products={products}
      />
      <SpecialOffers
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
      />
      <ProductsByBrand
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
        loading={loading}
        brands={brands}
      />
      <LookingFor
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
      />
      <ProductsByCategory
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
        loading={loading}
        categories={categories}
      />
    </div>
  );
}
