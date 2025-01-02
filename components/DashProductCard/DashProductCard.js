import { useState, useRef } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DashProductCard = ({
  product,
  ChangeUrl,
  isDelete = false,
  isAdd = false,
}) => {
  const [loadingProduct, setLoadingProduct] = useState(false);
  const confirmDeleteRef = useRef(null);

  const handleAddProduct = async () => {};

  const handleDelete = async () => {};

  const confirmDeletePopUp = () => {
    confirmDeleteRef.current.click();
  };

  return (
    <div
      onClick={() => {
        if (isDelete || isAdd) return;
        ChangeUrl(`/admin/dashboard/products/${product.id}`);
      }}
      className="mx-auto flex w-full max-w-[500px] select-none flex-col overflow-hidden rounded-lg bg-[var(--dash-theme2)] shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer"
    >
      {isDelete && (
        <Dialog>
          <DialogTrigger ref={confirmDeleteRef} className="hidden" />
          <DialogContent
            closeClass="text-white"
            className="flex items-center justify-center border-0 bg-[var(--dash-theme)] px-2 py-12"
          >
            <DialogTitle />
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <div className="w-3/4 text-center text-3xl font-bold text-red-500">
                تحذير
              </div>
              <div className="text-medium w-3/4 text-center text-xl text-white">
                حذف هذه الفئة سينجم عنه حذف كل المنتوجات المرتبطة بهذه الفئة
              </div>
              <button
                onClick={() => handleDelete()}
                type="button"
                disabled={loadingProduct}
                className={cn(
                  "mt-4 w-3/4 rounded-lg bg-red-900 py-2 text-lg font-semibold text-[#ffffff] transition-all duration-200",
                  loadingProduct
                    ? "opacity-50 hover:cursor-not-allowed"
                    : "hover:bg-red-500",
                )}
              >
                {loadingProduct ? (
                  <div className="flex items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  </div>
                ) : (
                  "أنا متأكد"
                )}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="relative overflow-hidden">
        <img
          src={product.img[0]}
          alt="Product Image"
          className="h-48 w-full object-cover transition-all duration-200 hover:scale-110"
        />
        <img
          src={product.brand.img}
          alt="Brand Logo"
          className="absolute left-2 top-2 h-[50px] w-[100px] rounded-full bg-white object-scale-down px-1.5 py-1"
        />
        {product.onSold && (
          <>
            <div className="absolute right-0 top-0 rounded-bl-full bg-rose-500 pb-3 pl-3 pr-1.5 pt-1.5 font-semibold text-white">{`%${product.soldPercentage}`}</div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {product.in_Stock ? (
          <div dir="rtl" className="text-sm font-medium text-emerald-500">
            منتج متوفر
          </div>
        ) : (
          <div dir="rtl" className="text-sm font-medium text-red-500">
            منتج غير متوفر
          </div>
        )}
        <h2 dir="rtl" className="text-lg font-bold text-neutral-200">
          {product.name}
        </h2>
        <p dir="rtl" className="mt-2 text-sm text-neutral-400">
          {product.description}
        </p>

        <div
          className={cn("mt-auto flex items-center", {
            "justify-between": isDelete || isAdd,
          })}
          dir="ltr"
        >
          {!product.onSold ? (
            <>
              <span className="text-xl font-bold text-[var(--dash-theme5)]">
                {product.normalSinglePrice}
                <font className="text-[15px]"> DT</font>
              </span>
            </>
          ) : (
            <div>
              <span className="mr-2 text-gray-500 line-through">
                {product.normalSinglePrice}
                <font className="text-[15px]"> DT</font>
              </span>
              <span className="text-xl font-bold text-[var(--dash-theme5)]">
                {product.soldSinglePrice}
                <font className="text-[15px]"> DT</font>
              </span>
            </div>
          )}
          {isDelete && (
            <button
              onClick={() => confirmDeletePopUp()}
              type="button"
              disabled={loadingProduct}
              className="mt-2 rounded-lg border-2 border-red-500 bg-red-500 px-3 py-1 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-transparent hover:text-red-500"
            >
              {loadingProduct ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                </div>
              ) : (
                "إحذف"
              )}
            </button>
          )}
        </div>
        {isAdd && (
          <button
            disabled={loadingProduct}
            onClick={() => {
              handleAddProduct();
            }}
            type="button"
            className={cn(
              "mt-2 rounded-lg bg-[var(--dash-theme6)] px-3 py-1 text-lg font-semibold text-[#ffffff] transition-all duration-200 hover:bg-[var(--dash-theme5)]",
              loadingProduct && "hover:cursor-not-allowed",
            )}
          >
            {loadingProduct ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
              </div>
            ) : (
              "أضف المنتج"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashProductCard;
