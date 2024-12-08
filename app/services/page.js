"use client";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import ServiceDescCard from "@/components/ServiceDescCard/ServiceDescCard";
import React from "react";

const page = () => {
  const serviceCardData = [
    {
      title: "Counseling Services",
      description:
        "At Golden Brand Stainless Steel, we understand that every project is unique, and selecting the right products and designs can be a complex process. Our expert counseling services are here to guide you through every step of your project, offering professional advice on selecting the best stainless steel and aluminum products for your specific needs. Whether you're working on a commercial kitchen, handrails, or custom solutions, our team helps you make informed decisions that align with your project goals, budget, and long-term vision.",
      logo: "fa-solid fa-clipboard",
    },
    {
      title: "Engineering Services",
      description:
        "Our engineering services at Golden Brand Stainless Steel are designed to bring your vision to life with precision and innovation. Our experienced engineers work closely with clients to develop detailed plans and technical drawings that meet exact specifications. Whether you're creating custom stainless steel structures, kitchens, or industrial installations, our engineering team provides solutions that enhance functionality, durability, and aesthetics. We use the latest technology to ensure that every design is both practical and efficient, meeting industry standards and exceeding client expectations.",
      logo: "fa-solid fa-screwdriver-wrench",
    },
    {
      title: "Manufacture and Supply of Equipment",
      description:
        "Golden Brand Stainless Steel takes pride in manufacturing and supplying top-quality equipment for a wide range of industries. Our products are made from the finest stainless steel and aluminum materials, ensuring durability, hygiene, and resistance to corrosion. From commercial kitchen equipment to custom-made industrial solutions, we offer a broad range of products tailored to meet the specific needs of our clients. Our advanced manufacturing processes and stringent quality control standards guarantee that every piece of equipment we supply meets the highest performance expectations.",
      logo: "fa-solid fa-industry",
    },
    {
      title: "After Sale Services",
      description:
        "At Golden Brand Stainless Steel, our commitment to customers doesn’t end with the sale. We offer comprehensive after-sale services to ensure the continued performance and maintenance of our products. Whether you need regular maintenance, repairs, or technical support, our dedicated team is always ready to assist you. We aim to build long-lasting relationships with our clients by providing reliable service that keeps your equipment in optimal condition for years to come.",
      logo: "fa-solid fa-wrench",
    },
  ];

  const serviceDescData = [
    {
      title: "Counseling Services",
      description:
        "Our counseling services are designed to ensure that every client receives expert advice tailored to the specific needs of their project. Whether you are looking to upgrade an existing kitchen or plan a new stainless steel installation, our team provides personalized recommendations that balance functionality, style, and budget. We work closely with you to understand your requirements and offer solutions that enhance the value and performance of your space.",
      items: [
        "Personalized consultation tailored to your project.",
        "Expert guidance on material selection and design.",
        "Support from concept to installation, ensuring seamless execution.",
      ],
    },
    {
      title: "Engineering Services",
      description:
        "Golden Brand Stainless Steel's engineering services focus on providing custom solutions to complex design challenges. Our team combines technical expertise with a creative approach to ensure that your stainless steel and aluminum projects are executed with precision and care. From concept development to final implementation, we work alongside you to bring your vision to life, guaranteeing a result that is both practical and aesthetically pleasing.",
      items: [
        "Detailed technical drawings and planning.",
        "Customized solutions for complex design challenges.",
        "Expertise in optimizing materials for strength and efficiency.",
      ],
    },
    {
      title: "Manufacture and Supply of Equipment",
      description:
        "We manufacture and supply premium-quality stainless steel and aluminum equipment to meet the diverse needs of our clients. Our manufacturing process is built around high standards of craftsmanship, ensuring that each piece is durable, hygienic, and built to last. Whether you're in the market for standard products or custom-made solutions, our team ensures that you receive equipment that performs reliably in even the most demanding environments.",
      items: [
        "High-grade stainless steel and aluminum materials.",
        "Customized equipment to meet specific industry requirements.",
        "Rigorous quality control for optimal performance and longevity.",
      ],
    },
    {
      title: "After Sale Services",
      description:
        "Our after-sale services are designed to provide long-term support for all the products we supply. We are committed to ensuring that your equipment remains in peak condition through regular maintenance, repair services, and technical assistance. Whether it's troubleshooting a minor issue or performing comprehensive repairs, our team is always ready to help. Our goal is to provide peace of mind, knowing that your investment in our equipment is backed by dedicated service.",
      items: [
        "Regular maintenance and repair services.",
        "Fast and responsive technical support.",
        "Spare parts and replacements available when needed.",
      ],
    },
  ];

  return (
    <div className="mx-auto mt-6 flex w-full flex-col items-center justify-center gap-20">
      {/* Services Title */}

      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
          <span className="text-center font-lato text-5xl font-bold text-neutral-800 sm:text-6xl md:text-7xl">
            Services
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] xxsm:w-12 xsm:w-14 md:w-16 lg:w-20 xl:w-24"></div>
        </div>
        <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          What We Do
        </span>
      </div>

      {/* Services cards grid */}

      <div className="mx-2 grid grid-cols-1 gap-4 xxsm:mx-6 xsm:mx-12 md:mx-20 md:grid-cols-2 lg:mx-12 lg:grid-cols-3 xl:mx-4 xl:grid-cols-4">
        {serviceCardData.map((item, index) => (
          <ServiceCard
            key={index}
            title={item.title}
            logo={item.logo}
            description={item.description}
          />
        ))}
      </div>

      {/* Services descriptions cards  */}

      <div className="grid w-full grid-cols-1 gap-12 border-[1px] border-neutral-100 bg-white px-5 py-20 shadow-sm drop-shadow-sm xxsm:px-8 xsm:px-12 sm:px-16 md:grid-cols-2 md:gap-6 md:px-10 lg:grid-cols-3 lg:px-6 xl:grid-cols-4 xl:px-10">
        {serviceDescData.map((item, index) => (
          <ServiceDescCard
            key={index}
            title={item.title}
            description={item.description}
            items={item.items}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
