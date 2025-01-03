"use client";

import "./page.css";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DashFeaturedProducts from "@/components/DashFeaturedProducts/DashFeaturedProducts";
import DashProductsByBrand from "@/components/DashProductsByBrand/DashProductsByBrand";
import DashProductsByCategory from "@/components/DashProductsByCategory/DashProductsByCategory";

const page = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingPage, setLoadingPage] = useState(false);
  const [CustomizationData, setCustomizationData] = useState({});
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, options);
    });
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      setLoading(false);
      setCustomizationData(data.data);
      setFeaturedProducts(data.data.featuredProducts);
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

  const addProduct = async (productId) => {
    if (!productId) {
      toast({
        title: "خطأ في إضافة المنتج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: "جاري الإضافة",
        description: "جاري إضافة المنتج إلى المنتجات الأكثر طلباً",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization/${CustomizationData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            featuredProducts: [
              ...featuredProducts.map((featuredProduct) => ({
                id: featuredProduct.id,
              })),
              { id: productId },
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تمت العملية بنجاح",
        description: "تمت إضافة المنتج إلى المنتجات الأكثر طلباً بنجاح",
        variant: "success",
        duration: 3000,
      });
      setLoading(false);
      setFeaturedProducts(data.data.featuredProducts);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ في إضافة المنتج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (productId) => {
    if (featuredProducts.length < 8) {
      toast({
        title: "خطأ في مسح المنتج",
        description:
          "يجب أن تكون المنتجات الأكثر طلباً تحتوي على 8 منتجات على الأقل",
        variant: "destructive",
        duration: 10000,
      });
      return;
    }
    if (!productId) {
      toast({
        title: "خطأ في مسح المنتج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: "جاري المسح",
        description: "جاري مسح المنتج من المنتجات الأكثر طلباً",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization/${CustomizationData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            featuredProducts: [
              ...featuredProducts
                .filter((featuredProduct) => featuredProduct.id != productId)
                .map((featuredProduct) => ({
                  id: featuredProduct.id,
                })),
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تمت العملية بنجاح",
        description: "تم مسح المنتج من المنتجات الأكثر طلباً بنجاح",
        variant: "success",
        duration: 3000,
      });
      setLoading(false);
      setFeaturedProducts(data.data.featuredProducts);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ في مسح المنتج",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const addBrand = async (brandId) => {
    if (!brandId) {
      toast({
        title: "خطأ في إضافة الماركة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: "جاري الإضافة",
        description: "جاري إضافة الماركة",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization/${CustomizationData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            brands: [
              ...brands.map((brand) => ({
                id: brand.id,
              })),
              { id: brandId },
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تمت العملية بنجاح",
        description: "تمت إضافة الماركة",
        variant: "success",
        duration: 3000,
      });
      setLoading(false);
      setBrands(data.data.brands);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ في إضافة الماركة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const deleteBrand = async (brandId) => {
    if (brands.length < 6) {
      toast({
        title: "خطأ في مسح الماركة",
        description: "يجب أن تكون تحتوي على 6 الماركات على الأقل",
        variant: "destructive",
        duration: 10000,
      });
      return;
    }
    if (!brandId) {
      toast({
        title: "خطأ في مسح الماركة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: "جاري المسح",
        description: "جاري مسح الماركة",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization/${CustomizationData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            brands: [
              ...brands
                .filter((brand) => brand.id != brandId)
                .map((brand) => ({
                  id: brand.id,
                })),
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تمت العملية بنجاح",
        description: "تم مسح الماركة",
        variant: "success",
        duration: 3000,
      });
      setLoading(false);
      setBrands(data.data.brands);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ في مسح الماركة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const addCategory = async (categoryId) => {
    if (!categoryId) {
      toast({
        title: "خطأ في إضافة الفئة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: "جاري الإضافة",
        description: "جاري إضافة الفئة",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization/${CustomizationData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            categories: [
              ...categories.map((category) => ({
                id: category.id,
              })),
              { id: categoryId },
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تمت العملية بنجاح",
        description: "تمت إضافة الفئة",
        variant: "success",
        duration: 3000,
      });
      setLoading(false);
      setCategories(data.data.categories);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ في إضافة الفئة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  const deleteCategory = async (categoryId) => {
    if (categories.length < 6) {
      toast({
        title: "خطأ في مسح الفئة",
        description: "يجب أن تكون تحتوي على 6 الماركات على الأقل",
        variant: "destructive",
        duration: 10000,
      });
      return;
    }
    if (!categoryId) {
      toast({
        title: "خطأ في مسح الفئة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
      return;
    }
    try {
      setLoading(true);
      toast({
        title: "جاري المسح",
        description: "جاري مسح الفئة",
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/customization/${CustomizationData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
          body: JSON.stringify({
            categories: [
              ...categories
                .filter((category) => category.id != categoryId)
                .map((category) => ({
                  id: category.id,
                })),
            ],
          }),
        },
      );

      const data = await response.json();
      if (data.data === null) {
        throw new Error(data.message);
      }
      toast({
        title: "تمت العملية بنجاح",
        description: "تم مسح الفئة",
        variant: "success",
        duration: 3000,
      });
      setLoading(false);
      setCategories(data.data.categories);
    } catch (error) {
      setLoading(false);

      console.error(error);
      toast({
        title: "خطأ في مسح الفئة",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="flex w-full flex-col gap-10 overflow-auto px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="FeaturedProducts">
          <AccordionTrigger className="text-white">
            المنتجات الأكثر طلباً
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <DashFeaturedProducts
              ChangeUrl={ChangeUrl}
              featuredProducts={featuredProducts}
              setFeaturedProducts={setFeaturedProducts}
              loading={loading}
              setLoading={setLoading}
              addProduct={addProduct}
              deleteProduct={deleteProduct}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ProductsByBrand">
          <AccordionTrigger className="text-white">
            منتجات حسب الماركة
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <DashProductsByBrand
              ChangeUrl={ChangeUrl}
              brands={brands}
              setBrands={setBrands}
              loading={loading}
              setLoading={setLoading}
              addBrand={addBrand}
              deleteBrand={deleteBrand}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="ProductsByCategory">
          <AccordionTrigger className="text-white">
            منتجات حسب الفئة
          </AccordionTrigger>
          <AccordionContent className="text-white">
            <DashProductsByCategory
              ChangeUrl={ChangeUrl}
              categories={categories}
              setCategories={setCategories}
              loading={loading}
              setLoading={setLoading}
              addCategory={addCategory}
              deleteCategory={deleteCategory}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default page;
