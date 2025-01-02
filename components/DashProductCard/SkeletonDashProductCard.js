import { Skeleton } from "../ui/skeleton";

const SkeletonDashProductCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-sm select-none flex-col overflow-hidden rounded-lg bg-[var(--dash-theme2)] shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer">
      <Skeleton className="h-[200px] w-full rounded-sm bg-neutral-200" />

      <div className="flex flex-1 flex-col p-4">
        <h2 dir="rtl" className="text-lg font-bold text-gray-800">
          <Skeleton className="h-[30px] w-[160px] rounded-sm bg-neutral-300" />
        </h2>
        <div dir="rtl" className="mt-2 text-sm text-gray-600">
          <Skeleton className="my-2 h-[22px] w-[240px] rounded-sm bg-neutral-300" />
          <Skeleton className="my-2 h-[22px] w-[240px] rounded-sm bg-neutral-300" />
          <Skeleton className="my-2 h-[22px] w-[160px] rounded-sm bg-neutral-300" />
        </div>

        <div className="mt-auto flex">
          <Skeleton className="h-[34px] w-[40px] rounded-sm bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDashProductCard;
