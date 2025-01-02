"use client";
import { usePathname } from "next/navigation";


const PreFooter = () => {
  const pathname = usePathname();
  return !(pathname == "/") ? (
    <></>
  ) : (
    <div
      dir="rtl"
      className="mt-20 grid auto-cols-fr auto-rows-fr gap-4 px-4 md:grid-cols-2 min-[1400px]:grid-cols-4"
    >
      <div
        dir="rtl"
        className="flex min-w-full flex-1 flex-row gap-4 p-1 sm:min-w-[320px] lg:min-w-0"
      >
        <div className="relative">
          <i className="fa-solid fa-truck-fast fa-flip-horizontal text-9xl text-neutral-600"/>
          <i className="fa-solid fa-circle-check absolute -right-2 -top-5 text-[40px] text-red-500"/>
        </div>
        <div dir="rtl" className="flex flex-col gap-1">
          <div className="text-xl font-bold text-neutral-800">توصيل سريع </div>
          <div className="text-sm text-neutral-500">
            خدمة التوصيل لدينا تتميز بالموثوقية والدقة لضمان وصول طلباتكم في
            الوقت المحدد وبأعلى مستويات الأمان. شريك التوصيل الخاص بنا يلتزم
            بأعلى معايير الاحترافية لبناء ثقتكم وراحتكم.
          </div>
        </div>
      </div>
      <div className="flex min-w-full flex-1 flex-row gap-4 p-1 sm:min-w-[320px] lg:min-w-0">
        <div className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="128"
            height="128"
            fill="#525252"
            className="bi bi-shield-check"
            viewBox="0 0 16 16"
          >
            <path d="M5.338 1.59a61 61 0 0 0-2.837.856.48.48 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.7 10.7 0 0 0 2.287 2.233c.346.244.652.42.893.533q.18.085.293.118a1 1 0 0 0 .101.025 1 1 0 0 0 .1-.025q.114-.034.294-.118c.24-.113.547-.29.893-.533a10.7 10.7 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.8 11.8 0 0 1-2.517 2.453 7 7 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7 7 0 0 1-1.048-.625 11.8 11.8 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 63 63 0 0 1 5.072.56" />
            <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0" />
          </svg>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold text-neutral-800">
            منتجات عالية الجودة
          </div>
          <div className="text-sm text-neutral-500">
            منتجاتنا تتميز بأعلى معايير الجودة والموثوقية لتلبية توقعات عملائنا.
            نحن نحرص على تقديم حلول مبتكرة ومتينة تضمن الأداء المميز
            والاستمرارية، مما يجعلنا الخيار الأمثل لاحتياجاتكم.
          </div>
        </div>
      </div>
      <div className="flex min-w-full flex-1 flex-row gap-4 p-1 sm:min-w-[320px] lg:min-w-0">
        <div className="relative">
          <i className="fa-regular fa-flip-horizontal fa-comment text-9xl text-neutral-600"/>
          <i className="fa-solid fa-flip-horizontal fa-headset absolute left-[35px] top-[30px] text-[58px] text-neutral-600"/>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold text-neutral-800">
            مصلحة الحرفاء
          </div>
          <div className="text-sm text-neutral-500">
            نحن نفتخر بتقديم خدمة دعم عملاء استثنائية تضع احتياجاتكم في المقدمة.
            فريقنا المتخصص جاهز دائمًا للإجابة على استفساراتكم وحل مشاكلكم بسرعة
            واحترافية، لضمان رضاكم التام وتعزيز ثقتكم بنا.
          </div>
        </div>
      </div>
      <div className="flex min-w-full flex-1 flex-row gap-4 p-1 sm:min-w-[320px] lg:min-w-0">
        <div className="">
          <i className="fa-solid fa-money-bills text-9xl text-neutral-600"/>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xl font-bold text-neutral-800">
            بيع بلجملة والتفصيل
          </div>
          <div className="text-sm text-neutral-500">
            نقدم خدمات البيع بالجملة والتجزئة لتلبية احتياجات عملائنا بكل مرونة
            وسهولة. سواء كنتم تبحثون عن كميات كبيرة أو مشتريات فردية، نضمن لكم
            أفضل الأسعار وجودة لا تُضاهى.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreFooter;
