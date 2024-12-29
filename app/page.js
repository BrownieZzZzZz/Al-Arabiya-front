"use client";

import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/Hero/Hero";
import LookingFor from "@/components/LookingFor/LookingFor";
import ProductsByBrand from "@/components/ProductsByBrand/ProductsByBrand";
import SpecialOffers from "@/components/SpecialOffers/SpecialOffers";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };
  return (
    <div className="mx-auto flex w-full flex-col">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]"/>
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
      />
      <LookingFor
        ChangeUrl={(url, options = {}) => {
          ChangeUrl(url, options);
        }}
      />
    </div>
  );
}
