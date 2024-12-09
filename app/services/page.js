"use client";
import ServiceCard from "@/components/ServiceCard/ServiceCard";
import ServiceDescCard from "@/components/ServiceDescCard/ServiceDescCard";
import React from "react";

const page = () => {
  const serviceCardData = [
    {
      title: "خدمة التوصيل السريع",
      description:
        "نوفر لك تجربة توصيل استثنائية تعتمد على السرعة والكفاءة. نعمل على ضمان وصول طلباتك بأمان وفي الوقت المناسب لتلبية توقعاتك. خدمة التوصيل تغطي كافة أنحاء المملكة لتبسيط تجربتك معنا.",
      logo: "fa-solid fa-clipboard fa-flip-horizontal",
    },
    {
      title: "استشارات تجميلية",
      description:
        "لأننا نؤمن بأن كل شخص يحتاج إلى حلول تجميلية مخصصة، نوفر استشارات متخصصة مع خبراء تجميل محترفين. هدفنا مساعدتك في اختيار المنتجات التي تناسب احتياجاتك وتعكس شخصيتك.",
      logo: "fa-solid fa-screwdriver-wrench fa-flip-horizontal",
    },
    {
      title: "ضمان جودة المنتج",
      description:
        "منتجاتنا تأتي مباشرة من العلامات التجارية المعروفة. نحن نضمن لك أن جميع المنتجات أصلية ومعتمدة، مما يضمن جودة عالية ونتائج فعالة.",
      logo: "fa-solid fa-industry fa-flip-horizontal",
    },
    {
      title: "عروض وخصومات حصرية",
      description:
        "استفد من التخفيضات المميزة التي نقدمها باستمرار. نحن نهتم بأن تحصل على أفضل قيمة مقابل ما تدفعه، مع مجموعة واسعة من العروض الموسمية والخصومات المستمرة.",
      logo: "fa-solid fa-wrench fa-flip-horizontal",
    },
  ];

  const serviceDescData = [
    {
      title: "خدمة التوصيل السريع",
      description:
        "نحن ندرك أهمية الوقت في حياتك، ولهذا نقدم خدمة توصيل سريعة وفعّالة تلبي احتياجاتك بأسهل الطرق الممكنة. بفضل شراكاتنا مع أفضل شركات الشحن في تونس، نضمن لك أن تصل طلباتك إلى باب منزلك بسرعة وأمان، سواء كنت في المدن الكبرى أو المناطق الريفية.",
      items: [
        "تغطية وطنية شاملة: نوفر خدمات التوصيل إلى جميع ولايات تونس بدون استثناء.",
        "سرعة التنفيذ: نحرص على إيصال الطلبات خلال يومين إلى أربعة أيام عمل حسب الموقع.",
        "مرونة الشحن: نقدم خيارات توصيل تناسب مواعيدك، مع إمكانية اختيار التوصيل في نهاية الأسبوع.",
        "التغليف الآمن: منتجاتك تُغلف بعناية فائقة لضمان وصولها بحالة ممتازة.",
        "تتبع الطلبات: يمكنك تتبع شحنتك بسهولة من خلال رقم التتبع الذي تحصل عليه فور شحن الطلب.",
      ],
    },
    {
      title: "استشارات تجميلية",
      description:
        "لأننا نهتم بجمالك وراحتك، نوفر لك خدمة استشارات تجميلية متكاملة تساعدك في اختيار المنتجات الأنسب لاحتياجاتك. مع فريقنا المتخصص، ستجد الحلول المثالية التي تناسب نوع بشرتك وشعرك.",
      items: [
        "تواصل مباشر مع الخبراء: احصل على نصائح من خبراء تجميل معتمدين عبر الهاتف أو الدردشة على الموقع.",
        "إرشادات دقيقة: نوفر لك خطوات تفصيلية لاستخدام المنتجات بشكل صحيح لتحقيق أفضل النتائج.",
        "توصيات شخصية: يتم تقديم نصائح تعتمد على تفاصيل فردية مثل نوع بشرتك والمشاكل التي تواجهها.",
        "استشارات مجانية: في فترات العروض، يمكنك الاستفادة من استشارات مجانية تمامًا.",
        "تحديثات مستمرة: نبقيك على اطلاع بأحدث الاتجاهات والمنتجات في عالم التجميل.",
      ],
    },
    {
      title: "ضمان جودة المنتج",
      description:
        "ثقتك هي أساس نجاحنا! نقدم منتجات عالية الجودة تضمن لك تجربة شراء خالية من القلق، مع الالتزام التام بتوفير منتجات أصلية ومضمونة.",
      items: [
        "منتجات أصلية: جميع المنتجات تأتي من مصادر موثوقة وتُعتمد من قبل العلامات التجارية المصنعة.",
        "فحص شامل: يتم فحص كل منتج بعناية قبل الشحن لضمان مطابقته لمعايير الجودة العالية.",
        "سياسة إرجاع سهلة: نوفر لك خيار إرجاع المنتجات في حالة وجود أي مشكلة، مع استرداد كامل للمبلغ.",
        "ضمان استبدال: إذا واجهت مشكلة في المنتج، نضمن استبداله بآخر جديد بدون أي تكلفة إضافية.",
        "ثقة العملاء: سجلنا الحافل ورضا العملاء دليل على التزامنا بالجودة.",
      ],
    },
    {
      title: "عروض وخصومات حصرية",
      description:
        "تجربة التسوق معنا ليست فقط حول الجودة، بل حول تقديم قيمة إضافية لعملائنا من خلال العروض والخصومات الحصرية التي تستمر طوال العام.",
      items: [
        "عروض موسمية: استمتع بخصومات كبيرة خلال المناسبات مثل الأعياد والمواسم الصيفية.",
        "هدايا مجانية: احصل على هدايا مميزة مع كل طلباتك الكبيرة خلال العروض.",
        "نقاط الولاء: كل عملية شراء تمنحك نقاطًا يمكنك استبدالها للحصول على خصومات إضافية.",
        "باقات اقتصادية: وفر المزيد عند شراء مجموعة منتجات معًا ضمن الباقات الخاصة.",
        "تنبيهات فورية: اشترك في النشرة البريدية لتلقي أحدث العروض مباشرة في بريدك الإلكتروني.",
      ],
    },
  ];

  return (
    <div dir="rtl" className="mx-auto mt-6 flex w-full flex-col items-center justify-center gap-20">
      {/* Services Title */}

      <div className="flex w-full flex-col items-center justify-center gap-2 self-center">
        <div className="flex w-full flex-row items-center justify-center gap-3">
          <div className="h-[2px] w-10 bg-[var(--theme)] md:w-16"></div>
          <span className="text-center text-5xl font-bold text-neutral-800 sm:text-6xl">
          خدماتنا 
          </span>
          <div className="h-[2px] w-10 bg-[var(--theme)] md:w-16"></div>
        </div>
        <span className="text-center font-lato text-lg text-slate-700 sm:text-xl md:text-2xl lg:text-3xl">
        ماذا نقدم 
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
