import { useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const SpecialOffers = ({ ChangeUrl }) => {
  const [specialOffers, setSpecialOffers] = useState([
    { img: "/images/special1.jpg", href: "/products/1234" },
    { img: "/images/special2.jpg", href: "/products/1234" },
    { img: "/images/special3.jpg", href: "/products/1234" },
    { img: "/images/special4.jpg", href: "/products/1234" },
    { img: "/images/special5.jpg", href: "/products/1234" },
  ]);

  return (
    <section className="mx-4 mt-20 bg-white py-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
          <span className="font-lato text-center text-4xl font-bold text-neutral-800">
            عروض خاصة
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[1400px] px-10">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="-ml-1">
              {specialOffers.map((offer, index) => (
                <CarouselItem
                  key={index}
                  className="flex w-full pl-4 min-[700px]:basis-1/2"
                >
                  <div
                    className="flex w-full transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer"
                    onClick={() => {
                      ChangeUrl(offer.href);
                    }}
                  >
                    <img
                      src={offer.img}
                      alt="image"
                      className="h-full max-h-[600px] rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-10 border-0 text-xl" />
            <CarouselNext className="-right-10 border-0 text-xl" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
