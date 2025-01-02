"use client";

import { useEffect } from "react";
import AboutCard from "@/components/AboutCard/AboutCard";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = () => {
  const faqCards = [
    {
      question: "ما هي مدة التوصيل؟",
      answer: "يتم التوصيل خلال 2-5 أيام عمل حسب موقعك.",
    },
    {
      question: "هل يمكنني استرجاع المنتج إذا لم يعجبني؟",
      answer:
        "نعم، يمكنك استرجاع المنتج خلال 14 يومًا من تاريخ الاستلام بشرط أن يكون بحالته الأصلية.",
    },
    {
      question: "كيف أستفيد من الخصومات والعروض؟",
      answer:
        "قم بمتابعة صفحتنا للحصول على آخر العروض أو اشترك في النشرة البريدية لتصلك التنبيهات.",
    },
    {
      question: "هل يمكنني تعديل الطلب بعد تأكيده؟",
      answer: "نعم، يمكن تعديل الطلب خلال ساعة من تأكيده من خلال خدمة العملاء.",
    },
    {
      question: "هل يتوفر الدفع عند الاستلام؟",
      answer: "نعم، نوفر خيار الدفع عند الاستلام في كل المناطق .",
    },
    {
      question: "هل يتم توفير عينات مجانية مع الطلبات؟",
      answer:
        "في بعض الحملات الترويجية، نقدم عينات مجانية من منتجات مختارة مع طلبك.",
    },
  ];
  const aboutCards = [
    {
      text: "تنبيهات المنتجات الجديدة",
      logo: <i className="fa-solid fa-bell text-7xl text-[var(--theme)]" />,
    },
    {
      text: "إرشادات استخدام المنتج",
      logo: (
        <i className="fa-solid fa-person-chalkboard fa-flip-horizontal text-7xl text-[var(--theme)]" />
      ),
    },
    {
      text: "الدعم الفني",
      logo: <i className="fa-solid fa-comments text-7xl text-[var(--theme)]" />,
    },
    {
      text: "ضمان الجودة",
      logo: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="78"
          height="78"
          fill="var(--theme)"
          className="bi bi-shield-check"
          viewBox="0 0 16 16"
        >
          <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
          <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
        </svg>
      ),
    },
  ];

  useEffect(() => {
    document.title = "Al-Arabiya: About Us";
  }, []);

  return (
    <div
      dir="rtl"
      className="m-20 mx-auto flex w-full flex-col items-center justify-center gap-10"
    >
      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] md:w-16" />
          <span className="font-lato text-center text-5xl font-bold text-neutral-800 sm:text-6xl">
            معلومات عنا
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] md:w-16" />
        </div>
        <span className="font-lato text-center text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
          من نحن
        </span>
      </div>

      <div className="group mx-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-evenly lg:gap-4">
          <div className="font-lato relative hidden text-4xl font-semibold before:absolute before:left-full before:top-3 before:h-10 before:w-10 before:border-b-2 before:border-r-2 before:border-[var(--theme)] before:content-[''] after:absolute after:-left-10 after:-top-2 after:h-10 after:w-10 after:border-l-2 after:border-t-2 after:border-[var(--theme)] after:bg-transparent after:transition-all after:content-[''] lg:block">
            <span className="tracking-wide">شركتنا</span>
          </div>

          <img
            src="/images/logo.png"
            className="max-h-[250px] max-lg:max-w-[300px]"
          />
        </div>

        <div
          id="faqs"
          className="flex max-w-[600px] flex-col gap-4 rounded-md border-[1px] border-neutral-200 bg-white px-6 py-8 shadow-md drop-shadow-md xsm:px-12"
        >
          <span className="text-center text-xl font-semibold text-[var(--theme)]">
            نبذة عن متجرنا الإلكتروني
          </span>
          <span className="text-lg tracking-wider text-neutral-800">
            العربية – متجر إلكتروني رائد متخصص في بيع مستحضرات التجميل عالية
            الجودة. نقدم لكِ مجموعة متكاملة من منتجات العناية بالبشرة، المكياج،
            والعطور المصممة لتلبية احتياجاتك اليومية وتعزيز جمالك الطبيعي. في
            العربية، نؤمن بأن الجمال يبدأ من الداخل، ولهذا نحرص على تقديم منتجات
            تجمع بين الفخامة والجودة لتمنحكِ تجربة تسوق استثنائية. اكتشفي الآن
            جمالكِ مع العربية!
          </span>
        </div>
      </div>

      <span className="font-lato mt-5 border-b-2 border-[var(--theme)] pb-2 text-center text-4xl font-semibold">
        التعليمات
      </span>
      <div className="mx-5 flex w-10/12 flex-col gap-3 sm:max-w-[800px]">
        <Accordion type="single" collapsible className="w-full">
          {faqCards.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent className="text-neutral-600">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <span className="font-lato mt-5 border-b-2 border-[var(--theme)] pb-2 text-center text-4xl font-semibold">
        خدمات ما بعد البيع
      </span>

      <div className="grid w-full auto-rows-fr grid-cols-1 place-items-center gap-6 px-10 md:grid-cols-2 min-[1360px]:grid-cols-4 min-[1550px]:px-28 min-[1700px]:px-36 min-[1900px]:px-48">
        {aboutCards.map((item, index) => (
          <AboutCard key={index} text={item.text} logo={item.logo} />
        ))}
      </div>
    </div>
  );
};

export default page;
