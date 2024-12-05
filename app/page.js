import FeaturedProducts from "@/components/FeaturedProducts/FeaturedProducts";
import Hero from "@/components/Hero/Hero";
import ProductsByBrand from "@/components/ProductsByBrand/ProductsByBrand";
import SpecialOffers from "@/components/SpecialOffers/SpecialOffers";

export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Hero/>
      <FeaturedProducts/>
      <SpecialOffers/>
      <ProductsByBrand/>
    </div>
  );
}
  