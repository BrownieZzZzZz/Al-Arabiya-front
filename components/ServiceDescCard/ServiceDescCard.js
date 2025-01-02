import { cn } from "@/lib/utils";


const ServiceDescCard = ({ title, description, items }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-neutral-600 text-start text-xl font-semibold font-lato">
        {title}
      </span>
      <ul className="list-image-[url(/images/check-solid.svg)]">
        <span className="text-slate-700">{description}</span>

        {items.map((item, index) => (
          <li key={index} className={cn("text-slate-600 ml-5", index == 0 ? 'mt-3' : '')}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceDescCard;
