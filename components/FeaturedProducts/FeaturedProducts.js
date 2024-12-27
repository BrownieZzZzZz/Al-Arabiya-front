"use client";

import "./FeaturedProducts.css";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";

const FeaturedProducts = ({ ChangeUrl }) => {
  const [products, setProducts] = useState([
    {
      id: "a6d0a4bb-fe53-4edd-bdb3-5414a6a97150",
      name: "مجموعة فرش المكياج الاحترافية",
      img: [
        "/images/product3.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "مجموعة من 10 فرش مكياج بجودة عالية.",
      onSold: true,
      soldPercentage: 10,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 150,
      soldSinglePrice: 135,
      normalMultiPrice: 400,
      soldMultiPrice: 360,
      in_Stock: true,
      category: {
        id: "e20eb96f-765b-48ab-bf11-841d4615e967",
        name: "إكسسوارات التجميل",
      },
      brand: {
        id: "42121eb5-dc07-4f80-bc5d-01952b832a2b",
        name: "HudaBeauty",
        img: "/images/brands/hudabeauty.png",
      },
    },
    {
      id: "d7264b10-9989-49ee-aecc-c65268039d70",
      name: "عطر زهرة الليل",
      img: [
        "/images/product4.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "عطر فاخر يدوم طويلاً بعبير الأزهار الشرقية.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 250,
      soldSinglePrice: 250,
      normalMultiPrice: 600,
      soldMultiPrice: 600,
      in_Stock: true,
      category: {
        id: "06f3e877-c310-48f3-b1c8-fbd7969c850d",
        name: "العطور",
      },
      brand: {
        id: "44f5cd0a-7cb4-4fea-8767-ab4e8636af0b",
        name: "Emper",
        img: "/images/brands/emper.png",
      },
    },
    {
      id: "c3c2a30b-630a-474f-ac57-5e40b2f71614",
      name: "كريم الأساس من HudaBeauty",
      img: [
        "/images/product5.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "كريم أساس يمنح تغطية كاملة ومظهرًا طبيعيًا.",
      onSold: true,
      soldPercentage: 20,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 190,
      soldSinglePrice: 152,
      normalMultiPrice: 500,
      soldMultiPrice: 400,
      in_Stock: true,
      category: {
        id: "dfe88fba-62df-46bd-ac83-940185240dcf",
        name: "المكياج",
      },
      brand: {
        id: "42121eb5-dc07-4f80-bc5d-01952b832a2b",
        name: "HudaBeauty",
        img: "/images/brands/hudabeauty.png",
      },
    },
    {
      id: "34e6b863-0edf-4ba2-a33d-49f5a498b7be",
      name: "منظف الوجه من La Roche Posay",
      img: [
        "/images/product6.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "منظف لطيف يساعد على إزالة الشوائب بلطف.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 100,
      soldSinglePrice: 100,
      normalMultiPrice: 250,
      soldMultiPrice: 250,
      in_Stock: true,
      category: {
        id: "58413403-50fe-4ff8-b0a3-4beb2e8d6efe",
        name: "العناية بالبشرة",
      },
      brand: {
        id: "1af2ff8d-9f8e-4942-9c19-aa87a0d8e0af",
        name: "La Roche Posay",
        img: "/images/brands/la_roche_posay.png",
      },
    },
    {
      id: "84936d7b-2c69-4dd2-9dcd-d216f84e0736",
      name: "بلسم الشفاه الطبي من Vaseline",
      img: [
        "/images/product3.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "بلسم مرطب للشفاه يمنح نعومة تدوم طويلاً.",
      onSold: true,
      soldPercentage: 5,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 25,
      soldSinglePrice: 23.75,
      normalMultiPrice: 60,
      soldMultiPrice: 57,
      in_Stock: true,
      category: {
        id: "58413403-50fe-4ff8-b0a3-4beb2e8d6efe",
        name: "العناية بالبشرة",
      },
      brand: {
        id: "a497fb4f-dd78-4084-96a7-dec9a15231e5",
        name: "Vaseline",
        img: "/images/brands/vaseline.png",
      },
    },
    {
      id: "7dc3fc66-d25e-4161-96c2-813d1c226bac",
      name: "مرطب الوجه الطبيعي",
      img: [
        "/images/product1.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "مرطب طبيعي خفيف مناسب لجميع أنواع البشرة.",
      onSold: true,
      soldPercentage: 15,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 45,
      soldSinglePrice: 38.25,
      normalMultiPrice: 120,
      soldMultiPrice: 102,
      in_Stock: true,
      category: {
        id: "50ba1907-7f3e-47c8-b16f-e44b16af2d81",
        name: "مستحضرات التجميل الطبيعية",
      },
      brand: {
        id: "a1dafbee-24e7-4bf6-b371-e83ab9267b5a",
        name: "The Ordinary",
        img: "/images/brands/the ordinary.png",
      },
    },
    {
      id: "77733c30-be54-48c7-8963-71d3c4621c70",
      name: "زيت الأرغان للعناية بالشعر",
      img: [
        "/images/product2.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "زيت أرغان نقي لتغذية الشعر وتقويته.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 80,
      soldSinglePrice: 80,
      normalMultiPrice: 200,
      soldMultiPrice: 200,
      in_Stock: true,
      category: {
        id: "7516baf0-ac2d-4704-8ac4-e9c6583c99bb",
        name: "العناية بالشعر",
      },
      brand: {
        id: "64e756d1-91b6-4be9-a2cf-d643e37f5031",
        name: "Bioaqua",
        img: "/images/brands/bioaqua.png",
      },
    },
    {
      id: "4ceed5c0-f104-4dd2-beb1-7e3839fbe4f3",
      name: "ظلال عيون من Sheglam",
      img: [
        "/images/product5.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description: "ظلال عيون بألوان جذابة تدوم طوال اليوم.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 85,
      soldSinglePrice: 85,
      normalMultiPrice: 220,
      soldMultiPrice: 220,
      in_Stock: true,
      category: {
        id: "dfe88fba-62df-46bd-ac83-940185240dcf",
        name: "المكياج",
      },
      brand: {
        id: "e6878869-0fcb-4410-8bd8-63d2afc62bbc",
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
    },
    {
      id: "dc1cfef1-c915-417a-a9e1-f8476a8f598b",
      name: "مجموعة العناية اليومية بالبشرة",
      img: [
        "/images/product2.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description:
        "مجموعة متكاملة تحتوي على غسول للوجه، تونر، ومرطب طبيعي. مصممة لتنظيف البشرة بعمق، توحيد لونها، وترطيبها طوال اليوم.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 200,
      soldSinglePrice: 200,
      normalMultiPrice: 550,
      soldMultiPrice: 550,
      in_Stock: true,
      category: {
        id: "50ba1907-7f3e-47c8-b16f-e44b16af2d81",
        name: "مستحضرات التجميل الطبيعية",
      },
      brand: {
        id: "a1dafbee-24e7-4bf6-b371-e83ab9267b5a",
        name: "The Ordinary",
        img: "/images/brands/the ordinary.png",
      },
    },
    {
      id: "ef4987c7-9a0e-4c3e-ba1c-a46a9975ee4e",
      name: "كريم مرطب للشعر بزيت الأرجان",
      img: [
        "/images/product3.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description:
        "كريم غني بزيت الأرجان الطبيعي لتغذية الشعر بعمق وحمايته من التقصف والتلف. يمنح شعرك لمعانًا طبيعيًا ونعومة فائقة.",
      onSold: true,
      soldPercentage: 20,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 75,
      soldSinglePrice: 60,
      normalMultiPrice: 200,
      soldMultiPrice: 160,
      in_Stock: true,
      category: {
        id: "7516baf0-ac2d-4704-8ac4-e9c6583c99bb",
        name: "العناية بالشعر",
      },
      brand: {
        id: "64e756d1-91b6-4be9-a2cf-d643e37f5031",
        name: "Bioaqua",
        img: "/images/brands/bioaqua.png",
      },
    },
    {
      id: "37fdc724-a71f-41e9-9625-b5e66b338a58",
      name: "عطر ليالي الشرق الفاخر",
      img: [
        "/images/product4.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description:
        "عطر شرقي فاخر بلمسة من الزهور الفواحة والتوابل. يعكس الأناقة والجاذبية في كل مرة يُستخدم.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 350,
      soldSinglePrice: 350,
      normalMultiPrice: 950,
      soldMultiPrice: 950,
      in_Stock: true,
      category: {
        id: "06f3e877-c310-48f3-b1c8-fbd7969c850d",
        name: "العطور",
      },
      brand: {
        id: "44f5cd0a-7cb4-4fea-8767-ab4e8636af0b",
        name: "Emper",
        img: "/images/brands/emper.png",
      },
    },
    {
      id: "ee39c96d-acd3-4624-894b-63c5295ead64",
      name: "لوحة ظلال العيون بيوتي جلام",
      img: [
        "/images/product5.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description:
        "لوحة ظلال عيون تحتوي على 18 لونًا مميزًا بتركيبة عالية الصبغة. تتنوع بين الألوان المطفية واللامعة لتناسب كل الإطلالات.",
      onSold: true,
      soldPercentage: 10,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 120,
      soldSinglePrice: 108,
      normalMultiPrice: 300,
      soldMultiPrice: 270,
      in_Stock: true,
      category: {
        id: "e20eb96f-765b-48ab-bf11-841d4615e967",
        name: "إكسسوارات التجميل",
      },
      brand: {
        id: "42121eb5-dc07-4f80-bc5d-01952b832a2b",
        name: "HudaBeauty",
        img: "/images/brands/hudabeauty.png",
      },
    },
    {
      id: "b6fc4975-7915-49af-baee-40e08d2ecfc6",
      name: "إسفنجة مكياج مثالية",
      img: [
        "/images/product6.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description:
        "إسفنجة مكياج متعددة الاستخدامات تساعدك على توزيع كريم الأساس والبودرة بسهولة للحصول على لمسة نهائية خالية من العيوب.",
      onSold: false,
      soldPercentage: 0,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 25,
      soldSinglePrice: 25,
      normalMultiPrice: 65,
      soldMultiPrice: 65,
      in_Stock: true,
      category: {
        id: "e20eb96f-765b-48ab-bf11-841d4615e967",
        name: "إكسسوارات التجميل",
      },
      brand: {
        id: "e6878869-0fcb-4410-8bd8-63d2afc62bbc",
        name: "Sheglam",
        img: "/images/brands/sheglam.png",
      },
    },
    {
      id: "48c5a6bd-7128-4f20-811f-69ad7d318f40",
      name: "مجموعة تنظيف وترطيب البشرة",
      img: [
        "/images/product4.jpg",
        "/images/product1.jpg",
        "/images/product2.jpg",
        "/images/product3.jpg",
        "/images/product4.jpg",
        "/images/product5.jpg",
        "/images/product6.jpg",
      ],
      description:
        "مجموعة فريدة تجمع بين منظف الوجه، سيروم فيتامين سي، ومرطب مكثف. تحافظ على نظافة البشرة وتغذيتها بعمق.",
      onSold: true,
      soldPercentage: 25,
      created_At: "2024-12-27T22:17:08.320Z",
      normalSinglePrice: 250,
      soldSinglePrice: 187.5,
      normalMultiPrice: 700,
      soldMultiPrice: 525,
      in_Stock: true,
      category: {
        id: "50ba1907-7f3e-47c8-b16f-e44b16af2d81",
        name: "مستحضرات التجميل الطبيعية",
      },
      brand: {
        id: "1af2ff8d-9f8e-4942-9c19-aa87a0d8e0af",
        name: "La Roche Posay",
        img: "/images/brands/la_roche_posay.png",
      },
    },
  ]);

  return (
    <section className="mx-4 mt-20">
      <div className="mb-7 flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
          <span className="font-lato text-center text-4xl font-bold text-neutral-800">
            المنتجات الأكثر طلباً
          </span>
          <div className="h-[2px] w-8 bg-[var(--theme)] md:w-12"></div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center">
        <div className="w-full max-w-[1400px] px-10">
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="-ml-1">
              {products.map((product, index) => (
                <CarouselItem
                  key={index}
                  className="flex w-full pl-1 min-[500px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="flex w-full p-2">
                    <ProductCard
                      className="w-full"
                      ChangeUrl={ChangeUrl}
                      product={product}
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

export default FeaturedProducts;
