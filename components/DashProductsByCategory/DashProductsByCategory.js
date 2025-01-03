import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "../ui/skeleton";
import DashProductCard from "../DashProductCard/DashProductCard";
import Category from "../Category/Category";
import DashSearch from "../DashSearch/DashSearch";

const DashProductsByCategory = ({
  ChangeUrl,
  categories,
  setCategories,
  loading,
  setLoading,
  addCategory,
  deleteCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [limitCategories, setLimitCategories] = useState(6);
  const [limitProducts, setLimitProducts] = useState(8);
  const [products, setProducts] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/product/search?category=${categories[selectedCategory]?.name}&page=1&limit=${limitProducts}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
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

  const fetchCategories = async (search = null) => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/category?${search ? `name=${search.trim()}` : ``}&page=1&limit=999`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            access_token: Cookies.get("admin_access_token"),
          },
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setCategoriesData(data.data.data);

      setLoadingCategories(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingCategories(false);
    }
    setLoadingCategories(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchProducts();
    }
  }, [loading, selectedCategory]);
  return (
    <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
      <div className="text-center text-4xl font-bold text-[var(--dash-theme5)]">
        منتجات حسب الفئة
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

      <div className="h-full w-full overflow-hidden">
        <div
          className={cn(
            "flex w-full items-center justify-center overflow-hidden delay-0",
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
                    className="flex w-full pl-1 min-[630px]:basis-1/2 md:basis-2/3 lg:basis-1/2 xl:basis-1/3"
                  >
                    <div className="flex w-full p-2">
                      <DashProductCard
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

      <div className="mb-10 mt-16 flex w-full flex-col gap-8">
        <DashSearch
          placeholder="...Sheglam, Vaseline"
          search={(search) => fetchCategories(search)}
        />
        <div className="grid w-full auto-rows-fr gap-6 min-[500px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {loadingCategories
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--dash-theme2)] px-4 py-4 text-center text-2xl font-semibold text-neutral-300 transition-all duration-200 hover:scale-[1.02] hover:cursor-pointer hover:bg-[#2c2d33]"
                >
                  <Skeleton className={"h-7 w-[100px] bg-neutral-200"} />
                </div>
              ))
            : categoriesData.map((category) => (
                <Category
                  key={category.id}
                  category={category}
                  fetchCategories={() => fetchCategories()}
                  isAdd={!categories.find((b) => b.id === category.id)}
                  addCategory={addCategory}
                  isDelete={categories.find((b) => b.id === category.id)}
                  deleteCategory={deleteCategory}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default DashProductsByCategory;
