import React from 'react'

const Category = ({ category }) => {
  return (
    <div className="flex items-center justify-center text-center px-4 py-4 rounded-xl bg-[var(--dash-theme2)] transition-all duration-200 hover:bg-[#2c2d33] text-2xl font-semibold text-neutral-300 hover:cursor-pointer hover:scale-[1.02]">
      { category }
    </div>
  )
}

export default Category