"use client";

import  { useEffect, useState } from "react";
import SelectSortInterface from "../SelectSortInterface/SelectSortInterface";
import CategorieItem from "../CategorieItem/CategorieItem";
import { useSearchParams } from "next/navigation";
import SelectBrandInterface from "../SelectBrandInterface/SelectBrandInterface";
import './page.css';

const FilterInterface = ({ ChangeUrl }) => {
  const searchParams = useSearchParams();
  const resetFilters = () => {
    ChangeUrl("?", { scroll: false });
  };
  const [categories, setCategories] = useState([
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
    "منتج تجميل ",
  ]);
  const cats = {};
  categories.forEach((val) => {
    cats[val] = false;
  });
  let selectedCategories = searchParams.get("selectedCategories")
    ? JSON.parse(decodeURIComponent(searchParams.get("selectedCategories")))
    : { ...cats };
  let sortOption = searchParams.get("sortOption") || "date";
  let brandOption = searchParams.get("brandOption") || "allBrands";
  const changeSelectedCategorie = (categorie) => {
    selectedCategories[categorie] = selectedCategories[categorie]
      ? false
      : true;
  };
  const changeSortOption = (option) => {
    sortOption = option;
  };
  const changeBrandOption = (option) => {
    brandOption = option;
  };
  return (
    <div dir="ltr" className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <span dir="rtl" className="mb-2 text-3xl font-bold text-neutral-600">
        تعديلات :
        </span>
        <span dir="rtl" className="text-xl font-semibold text-neutral-800">ترتيب </span>
        <div dir="rtl" className="px-2">
          <SelectSortInterface
            changeSortOption={(sortOption) => {
              changeSortOption(sortOption);
            }}
            values={[
              ["date", "ترتيب حسب: الأحدث "],
              ["priceAsc", "ترتيب حسب: الأدنى سعر للاعلى  "],
              ["priceDesc", "ترتيب حسب: الأعلى سعر للادنى  "],
            ]}
          />
        </div>
        <span dir="rtl" className="text-xl font-semibold text-neutral-800">ماركة</span>
        <div dir="rtl" className="px-2">
          <SelectBrandInterface
            changeBrandOption={(brandOption) => {
              changeBrandOption(brandOption);
            }}
            values={[
              ["allBrands", "كل الماركات "],
              ["sheglam", "شقلام"],
            ]}
          />
        </div>
      </div>
      <div dir="rtl" className="mt-2 flex flex-col gap-4">
        <span dir="rlt" className="text-xl font-semibold text-neutral-800">
        نوع المنتج 
        </span>
        <div className="category-scroll flex flex-col gap-2 px-2 lg:max-h-[433px] lg:overflow-auto">
          {categories.map((categorie, index) => (
            <CategorieItem
              key={index}
              active={selectedCategories[categorie]}
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
              `?sortOption=${sortOption}&brandOption=${brandOption}&selectedCategories=${encodeURIComponent(
                JSON.stringify(selectedCategories),
              )}`,
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
  );
};

export default FilterInterface;
