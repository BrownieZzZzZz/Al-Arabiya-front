import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";

const SpecialOffers = ({ ChangeUrl }) => {
  const [loadingSpecialOffers, setLoadingSpecialOffers] = useState(true);
  const [specialOffers, setSpecialOffers] = useState([]);

  const fetchSpecialOffers = async () => {
    setLoadingSpecialOffers(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/specialOffer?page=1&limit=999`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      if (data.data === null) {
        throw new Error(data.message);
      }

      setSpecialOffers(data.data.data);

      setLoadingSpecialOffers(false);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ ما، يرجى المحاولة مرة أخرى!",
        variant: "destructive",
      });

      setLoadingSpecialOffers(false);
    }
  };

  useEffect(() => {
    fetchSpecialOffers();
  }, []);
  return (
    <section className="mx-4 mt-20 bg-white py-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
          <span className="font-lato text-center text-4xl font-bold text-neutral-800">
            عروض خاصة
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12" />
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[1400px] px-10">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="-ml-1">
              {loadingSpecialOffers
                ? Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem
                      key={index}
                      className="flex w-full pl-4 min-[700px]:basis-1/2"
                    >
                      <div className="flex w-full transition-all duration-300 hover:scale-[1.02] hover:cursor-pointer">
                        <div className="aspect-square max-h-[600px] w-full max-w-[600px] animate-pulse rounded-lg bg-neutral-300"></div>
                      </div>
                    </CarouselItem>
                  ))
                : specialOffers.map((offer, index) => (
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
