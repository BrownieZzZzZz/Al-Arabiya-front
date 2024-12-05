import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const SpecialOffers = () => {
  const images = [
    "/images/special1.jpg",
    "/images/special2.jpg",
    "/images/special3.jpg",
    "/images/special4.jpg",
    "/images/special5.jpg",
  ]
  return (
    <section className="bg-white py-20 mx-4 mt-20">
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
          <Carousel opts={{loop:true}}>
            <CarouselContent className="-ml-1">
              {images.map((image, index) => (
                <CarouselItem
                  key={index}
                  className="flex w-full pl-4 min-[700px]:basis-1/2"
                >
                  <div className="flex w-full">
                    <img src={image} alt="image" className="max-h-[600px] h-full rounded-lg"></img>
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
  )
}

export default SpecialOffers