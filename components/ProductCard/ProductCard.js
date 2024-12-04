import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden transition-all duration-200 hover:cursor-pointer hover:scale-[1.03]">
      <div className="relative overflow-hidden">
        <img src={product.image} alt="Product Image" className="w-full h-48 object-cover transition-all duration-200 hover:scale-110"></img>
        <img src={product.logo} alt="Brand Logo" className="absolute top-2 left-2 w-20 bg-white rounded-full px-1.5"></img>
      </div>
  
      <div class="p-4">
        <h2 class="text-lg font-bold text-gray-800">{product.title}</h2>
        <p class="text-sm text-gray-600 mt-2">{product.desc}</p>
        
        <div class="flex items-center mt-4">
          <span class="text-gray-500 line-through mr-2">{`${product.normalPrice} DT`}</span>
          <span class="text-[var(--theme)] text-xl font-bold">{`${product.soldPrice} DT`}</span>
        </div>
      </div>
    </div>
  )
}

export default ProductCard