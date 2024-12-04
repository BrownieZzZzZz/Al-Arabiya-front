import FeaturedRecipes from "@/components/FeaturedRecipes/FeaturedRecipes";
import Hero from "@/components/Hero/Hero";

export default function Home() {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Hero/>
      <FeaturedRecipes/>
    </div>
  );
}
