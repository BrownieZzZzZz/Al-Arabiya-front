import React from "react";

const ProductCard = ({ product }) => {
  const parsePrice = (price) => {
    return price.slice(0, 4);
  };
  const parsePercentage = (x, y) => {
    return parseInt(((parseFloat(x) - parseFloat(y)) / parseFloat(x)) * 100);
  };
  return (
    <div className="select-none mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt="Product Image"
          className="h-48 w-full object-cover transition-all duration-200 hover:scale-110"
        ></img>
        <img
          src={product.logo}
          alt="Brand Logo"
          className="absolute left-2 top-2 w-20 rounded-full bg-white px-1.5"
        ></img>
        {product.soldPrice[0] != "0" && (
          <>
            <div className="absolute right-0 top-0 rounded-bl-full bg-rose-500 pb-3 pl-3 pr-1.5 pt-1.5 font-semibold text-white">{`%${parsePercentage(product.normalPrice, product.soldPrice)}`}</div>
          </>
        )}
      </div>

      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
        <p className="mt-2 text-sm text-gray-600">{product.desc}</p>

        <div className="mt-4 flex items-center">
          {product.soldPrice[0] == "0" ? (
            <>
              <span className="text-xl font-bold text-[var(--theme)]">{parsePrice(product.normalPrice)}<font className="text-[15px]"> DT</font></span>
            </>
          ) : (
            <>
              <span className="mr-2 text-gray-500 line-through">{parsePrice(product.normalPrice)}<font className="text-[15px]"> DT</font></span>
              <span className="text-xl font-bold text-[var(--theme)]">{parsePrice(product.soldPrice)}<font className="text-[15px]"> DT</font></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
