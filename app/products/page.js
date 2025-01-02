"use client";

import "./page.css";

import React, {
  useEffect,
  useState,
  useTransition,
  Suspense,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "@/components/ProductCard/ProductCard";
import NotFoundComp from "@/components/NotFoundComp/NotFoundComp";
import SelectSortInterface from "@/components/SelectSortInterface/SelectSortInterface";
import CategorieItem from "@/components/CategorieItem/CategorieItem";
import SelectBrandInterface from "@/components/SelectBrandInterface/SelectBrandInterface";
import SkeletonProductCard from "@/components/ProductCard/SkeletonProductCard";
import SkeletonCategorieItem from "@/components/CategorieItem/SkeletonCategorieItem";
import MultiRangeSlider from "@/components/multiRangeSlider/multiRangeSlider";

const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const searchInputRef = useRef(null);

  let selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : {};

  let brandOption = searchParams.get("brandOption") || "allBrands";
  let sortOption = searchParams.get("sortOption") || "nameAsc";
  let minPrice = searchParams.get("minPrice") || 0;
  let maxPrice = searchParams.get("maxPrice") || 500;

  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const maxVisiblePages = 5;
  const [pages, setPages] = useState([]);

  const changeSelectedCategorie = (categorie) => {
    if (selectedCategories[categorie]) {
      delete selectedCategories[categorie];
    } else {
      selectedCategories[categorie] = true;
    }
  };

  const changeBrandOption = (option) => {
    brandOption = option;
  };

  const resetFilters = () => {
    ChangeUrl("?", { scroll: false });
  };

  const changeSortOption = (option) => {
    sortOption = option;
  };

  const changePrice = (MIN, MAX) => {
    minPrice = MIN;
    maxPrice = MAX;
  };

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }

    return true;
  }

  function OpenFilter() {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button
            variant="outline"
            className="flex items-center justify-center rounded-lg bg-[var(--theme)] px-2 transition-all duration-300 hover:scale-95 lg:hidden"
          >
            <i className="fa-solid fa-filter text-xl text-neutral-100" />
          </button>
        </SheetTrigger>
        <SheetContent className="w-[280px] overflow-auto">
          <SheetTitle />
          <div dir="ltr" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span
                dir="rtl"
                className="mb-2 text-3xl font-bold text-neutral-600"
              >
                تعديلات :
              </span>
              <span
                dir="rtl"
                className="text-xl font-semibold text-neutral-800"
              >
                ترتيب{" "}
              </span>
              <div dir="rtl" className="px-2">
                <SelectSortInterface
                  changeSortOption={(sortOption) => {
                    changeSortOption(sortOption);
                  }}
                  values={[
                    ["date", "الأحدث"],
                    ["nameAsc", "الأدنى حرف للاعلى"],
                    ["nameDesc", "الأعلى حرف للادنى"],
                    ["priceAsc", "الأدنى سعر للاعلى"],
                    ["priceDesc", "الأعلى سعر للادنى"],
                  ]}
                />
              </div>
              <span
                dir="rtl"
                className="text-xl font-semibold text-neutral-800"
              >
                ماركة
              </span>
              <div dir="rtl" className="px-2">
                <SelectBrandInterface
                  key={123123}
                  changeBrandOption={(brandOption) => {
                    changeBrandOption(brandOption);
                  }}
                  values={brands}
                />
              </div>
              <span
                dir="rtl"
                className="text-xl font-semibold text-neutral-800"
              >
                السعر
              </span>
              <div dir="rtl" className="px-2">
                <MultiRangeSlider
                  min={minPrice}
                  changePrice={(MIN, MAX) => changePrice(MIN, MAX)}
                  max={maxPrice}
                />
              </div>
            </div>
            <div dir="rtl" className="mt-2 flex flex-col gap-4">
              <span
                dir="rlt"
                className="text-xl font-semibold text-neutral-800"
              >
                نوع المنتج
              </span>
              <div className="category-scroll flex max-h-[340px] flex-col gap-2 overflow-y-auto px-2 py-2">
                {loadingCategories
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonCategorieItem key={index} />
                    ))
                  : categories.map((categorie) => (
                      <CategorieItem
                        key={categorie.id}
                        active={selectedCategories[categorie.name]}
                        changeSelectedCategorie={(categorie) =>
                          changeSelectedCategorie(categorie)
                        }
                        item={categorie}
                      />
                    ))}
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <button
                type="button"
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] bg-[var(--theme)] py-2 text-xl font-semibold text-white transition-all active:scale-95"
                onClick={() => {
                  ChangeUrl(
                    `?${searchInputRef.current.value.trim() && `search=${searchInputRef.current.value.trim()}`}${sortOption && sortOption !== "nameAsc" ? `&sortOption=${sortOption}` : ``}${minPrice && minPrice !== 0 ? `&minPrice=${minPrice}` : ``}${maxPrice && maxPrice !== 50000 ? `&maxPrice=${maxPrice}` : ``}${
                      isEmpty(selectedCategories)
                        ? ""
                        : `&selectedCategories=${encodeURIComponent(
                            JSON.stringify(selectedCategories),
                          )}`
                    }${brandOption && brandOption !== "allBrands" ? `&brandOption=${brandOption}` : ""}`,
                    { scroll: false },
                  );
                }}
              >
                طبق
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                }}
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] py-2 text-xl font-semibold text-[var(--theme)] transition-all active:scale-95"
              >
                إعادة ضبط
              </button>
            </div>
          </div>
          <SheetDescription />
        </SheetContent>
      </Sheet>
    );
  }

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      let sortBy = "";
      let sort_order = "";
      if (sortOption) {
        if (sortOption === "date") {
          sortBy = "date";
          sort_order = "asc";
        } else if (sortOption === "nameAsc") {
          sortBy = "alpha";
          sort_order = "asc";
        } else if (sortOption === "nameDesc") {
          sortBy = "alpha";
          sort_order = "desc";
        } else if (sortOption === "priceAsc") {
          sortBy = "price";
          sort_order = "asc";
        } else if (sortOption === "priceDesc") {
          sortBy = "price";
          sort_order = "desc";
        }
      }

      const categories = Object.keys(selectedCategories).filter(
        (key) => selectedCategories[key] === true,
      );
      const categoriesString = encodeURIComponent(categories.join(","));

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/product/search?${searchInputRef.current.value.trim() ? `name=${searchInputRef.current.value.trim()}` : ""}${categoriesString ? `&categories=${categoriesString}` : ""}${brandOption && brandOption !== "allBrands" ? `&brand=${brandOption}` : ""}${sortBy ? `&sortBy=${sortBy}` : ""}${sort_order ? `&sortOrder=${sort_order}` : ""}${minPrice !== 0 ? `&min_price=${minPrice}` : ""}${maxPrice !== 0 ? `&max_price=${maxPrice}` : ""}${CurrentPage ? `&page=${CurrentPage}` : ""}${limit ? `&limit=${limit}` : ""}`,
        {
          method: "GET",
        },
      );
      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setProducts(data.data.data);
      setTotalItems(data.data.totalItems);
      setTotalPages(data.data.totalPages);
      setCurrentPage(Number(data.data.currentPage));

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

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category?page=1&limit=999`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setCategories(data.data.data);

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

  const fetchBrands = async () => {
    setLoadingBrands(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/brand?page=1&limit=999`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setBrands(data.data.data);

      setLoadingBrands(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingBrands(false);
    }
    setLoadingBrands(false);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createPageNumbers = () => {
    let startPage = Math.max(1, CurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  const ChangeUrl = (url, options = {}) => {
    startTransition(() => {
      router.push(url, { ...options });
    });
  };

  useEffect(() => {
    if (!isPending) {
      fetchProducts();
    }
    setLoadingPage(isPending);
  }, [isPending]);

  useEffect(() => {
    fetchProducts();
    createPageNumbers();
  }, [CurrentPage, totalPages]);

  useEffect(() => {
    document.title = "Al-Arabiya: Products";
    fetchCategories();
    fetchBrands();
  }, []);

  return (
    <div
      dir="rtl"
      className="mx-auto mt-10 flex w-full flex-row items-center justify-center gap-20"
    >
      {loadingPage && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
      <div className="mx-5 flex w-full flex-row justify-center gap-10 xsm:mx-8 sm:mx-10">
        <div className="hidden lg:flex">
          <div dir="ltr" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <span
                dir="rtl"
                className="mb-2 text-3xl font-bold text-neutral-600"
              >
                تعديلات :
              </span>
              <span
                dir="rtl"
                className="text-xl font-semibold text-neutral-800"
              >
                ترتيب{" "}
              </span>
              <div dir="rtl" className="px-2">
                <SelectSortInterface
                  changeSortOption={(sortOption) => {
                    changeSortOption(sortOption);
                  }}
                  values={[
                    ["date", "الأحدث"],
                    ["nameAsc", "الأدنى حرف للاعلى"],
                    ["nameDesc", "الأعلى حرف للادنى"],
                    ["priceAsc", "الأدنى سعر للاعلى"],
                    ["priceDesc", "الأعلى سعر للادنى"],
                  ]}
                />
              </div>
              <span
                dir="rtl"
                className="text-xl font-semibold text-neutral-800"
              >
                ماركة
              </span>
              <div dir="rtl" className="px-2">
                <SelectBrandInterface
                  key={321321}
                  changeBrandOption={(brandOption) => {
                    changeBrandOption(brandOption);
                  }}
                  values={brands}
                />
              </div>
              <span
                dir="rtl"
                className="text-xl font-semibold text-neutral-800"
              >
                السعر
              </span>
              <div dir="rtl" className="px-2">
                <MultiRangeSlider
                  min={minPrice}
                  changePrice={(MIN, MAX) => changePrice(MIN, MAX)}
                  max={maxPrice}
                />
              </div>
            </div>

            <div dir="rtl" className="mt-2 flex flex-col gap-4">
              <span
                dir="rlt"
                className="text-xl font-semibold text-neutral-800"
              >
                نوع المنتج
              </span>
              <div className="category-scroll flex max-h-[340px] flex-col gap-2 overflow-y-auto px-2 py-2">
                {loadingCategories
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <SkeletonCategorieItem key={index} />
                    ))
                  : categories.map((categorie) => (
                      <CategorieItem
                        key={categorie.id}
                        active={selectedCategories[categorie.name]}
                        changeSelectedCategorie={(categorie) =>
                          changeSelectedCategorie(categorie)
                        }
                        item={categorie}
                      />
                    ))}
              </div>
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <button
                type="button"
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] bg-[var(--theme)] py-2 text-xl font-semibold text-white transition-all active:scale-95"
                onClick={() => {
                  ChangeUrl(
                    `?${searchInputRef.current.value.trim() && `search=${searchInputRef.current.value.trim()}`}${sortOption && sortOption !== "nameAsc" ? `&sortOption=${sortOption}` : ``}${minPrice && minPrice !== 0 ? `&minPrice=${minPrice}` : ``}${maxPrice && maxPrice !== 50000 ? `&maxPrice=${maxPrice}` : ``}${
                      isEmpty(selectedCategories)
                        ? ""
                        : `&selectedCategories=${encodeURIComponent(
                            JSON.stringify(selectedCategories),
                          )}`
                    }${brandOption && brandOption !== "allBrands" ? `&brandOption=${brandOption}` : ""}`,
                    { scroll: false },
                  );
                }}
              >
                طبق
              </button>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                }}
                className="duration-400 w-full rounded-md border-2 border-[var(--theme)] py-2 text-xl font-semibold text-[var(--theme)] transition-all active:scale-95"
              >
                إعادة ضبط
              </button>
            </div>
          </div>
        </div>

        <div className="flex w-full max-w-screen-lg flex-col gap-4">
          <div className="flex min-w-full flex-row gap-1 rounded-xl border-2 border-neutral-200 py-1 pl-3 pr-3 xsm:pr-0">
            <div className="hidden min-w-10 items-center justify-center xsm:flex">
              <i className="fa-solid fa-magnifying-glass text-zinc-300" />
            </div>
            <input
              placeholder="ابحث عن منتج "
              defaultValue={searchParams.get("search") || ""}
              type="text"
              ref={searchInputRef}
              className="min-h-full w-full flex-1 bg-transparent focus:outline-none"
            />
            <button
              className="rounded-lg bg-[var(--theme)] px-2.5 py-1 text-lg text-neutral-100 transition-all duration-300 hover:scale-95"
              onClick={() => {
                if (
                  loadingProducts ||
                  loadingPage ||
                  loadingCategories ||
                  loadingBrands
                )
                  return;
                fetchProducts();
              }}
            >
              <span className="hidden xsm:block">ابحث </span>
              <div className="xsm:hidden">
                <i className="fa-solid fa-magnifying-glass text-neutral-100" />
              </div>
            </button>
            <OpenFilter />
          </div>

          <div
            dir="rtl"
            className="grid-auto-rows grid w-full auto-rows-fr grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {loadingProducts ? (
              Array.from({ length: limit }, (_, index) => (
                <SkeletonProductCard key={index} />
              ))
            ) : products.length !== 0 ? (
              products.map((product, index) => (
                <ProductCard
                  key={index}
                  ChangeUrl={ChangeUrl}
                  product={product}
                />
              ))
            ) : (
              <NotFoundComp text="لا يوجد منتجات " />
            )}
          </div>
          {/* <PaginationComp /> */}
          {!loadingProducts && products.length > 0 && (
            <Pagination dir="rtl">
              <PaginationContent className="flex items-center justify-center gap-2">
                {/* Previous Button */}
                <PaginationItem>
                  <PaginationPrevious
                    className={cn(
                      "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                      CurrentPage === 1
                        ? "hover:cursor-not-allowed"
                        : "bg-white text-black hover:bg-[var(--theme)] hover:text-white",
                    )}
                    onClick={() => handlePageChange(CurrentPage - 1)}
                    disabled={CurrentPage === 1}
                  />
                </PaginationItem>

                {/* First Page and Ellipsis */}
                {pages[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        className="rounded-md bg-white px-3 py-2 text-black transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                        onClick={() => handlePageChange(1)}
                      >
                        ١
                      </PaginationLink>
                    </PaginationItem>
                    {pages[0] > 2 && (
                      <PaginationEllipsis>...</PaginationEllipsis>
                    )}
                  </>
                )}

                {/* Page Numbers */}
                {pages.map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      className={cn(
                        "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                        page === CurrentPage
                          ? "bg-[var(--theme)] text-white"
                          : "bg-white text-black hover:bg-[var(--theme)] hover:text-white",
                      )}
                      isActive={page === CurrentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Last Page and Ellipsis */}
                {pages[pages.length - 1] < totalPages && (
                  <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                      <PaginationEllipsis>...</PaginationEllipsis>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        className="rounded-md bg-white px-3 py-2 text-black transition-all duration-200 hover:cursor-pointer hover:bg-[var(--theme)] hover:text-white"
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                {/* Next Button */}
                <PaginationItem>
                  <PaginationNext
                    className={cn(
                      "rounded-md px-3 py-2 transition-all duration-200 hover:cursor-pointer",
                      CurrentPage === totalPages
                        ? "hover:cursor-not-allowed"
                        : "bg-white text-black hover:bg-[var(--theme)] hover:text-white",
                    )}
                    onClick={() => handlePageChange(CurrentPage + 1)}
                    disabled={CurrentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      }
    >
      <ProductPage />
    </Suspense>
  );
};

export default Page;
