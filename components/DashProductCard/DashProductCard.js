import React from "react";

const DashProductCard = ({ product, ChangeUrl }) => {
  return (
    <div
      onClick={() => {
        ChangeUrl(`/admin/dashboard/products/${product.id}`);
      }}
      className="mx-auto flex w-full max-w-[500px] select-none flex-col overflow-hidden rounded-lg bg-[var(--dash-theme2)] shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer"
    >
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
            منتج متوفر{" "}
          </div>
        ) : (
          <div dir="rtl" className="text-sm font-medium text-red-500">
            منتج غير متوفر{" "}
          </div>
        )}
        <h2 dir="rtl" className="text-lg font-bold text-neutral-200">
          {product.name}
        </h2>
        <p dir="rtl" className="mt-2 text-sm text-neutral-400">
          {product.description}
        </p>

        <div className="mt-auto flex items-center" dir="ltr">
          {!product.onSold ? (
            <>
              <span className="text-xl font-bold text-[var(--dash-theme5)]">
                {product.normalSinglePrice}
                <font className="text-[15px]"> DT</font>
              </span>
            </>
          ) : (
            <>
              <span className="mr-2 text-gray-500 line-through">
                {product.normalSinglePrice}
                <font className="text-[15px]"> DT</font>
              </span>
              <span className="text-xl font-bold text-[var(--dash-theme5)]">
                {product.soldSinglePrice}
                <font className="text-[15px]"> DT</font>
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashProductCard;
