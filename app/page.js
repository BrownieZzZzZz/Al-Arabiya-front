import FeaturedRecipes from "@/components/FeaturedRecipes/FeaturedRecipes";
import Hero from "@/components/Hero/Hero";
import ProductsByBrand from "@/components/ProductsByBrand/ProductsByBrand";

export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Hero/>
      <FeaturedRecipes/>
      <ProductsByBrand/>
    </div>
  );
}
