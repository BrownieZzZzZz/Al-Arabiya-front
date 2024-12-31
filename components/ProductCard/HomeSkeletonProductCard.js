import { Skeleton } from "../ui/skeleton";

const HomeSkeletonProductCard = () => {
  return (
    <div className="mx-auto flex w-full max-w-sm select-none flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:cursor-pointer">
      <Skeleton className="h-[210px] w-full rounded-sm bg-neutral-200" />

      <div className="flex flex-1 flex-col p-4">
        <h2 dir="rtl" className="text-lg font-bold text-gray-800">
          <Skeleton className="h-[23px] w-[180px] rounded-sm bg-neutral-300" />
        </h2>
        <div dir="rtl" className="mt-2 text-sm text-gray-600">
          <Skeleton className="my-1 h-[20px] w-[200px] rounded-sm bg-neutral-300" />
          <Skeleton className="my-1 h-[20px] w-[200px] rounded-sm bg-neutral-300" />
          <Skeleton className="my-1 h-[20px] w-[100px] rounded-sm bg-neutral-300" />
        </div>

        <div className="mt-auto flex">
          <Skeleton className="h-[30px] w-[45px] rounded-sm bg-neutral-300" />
        </div>
      </div>
    </div>
  );
};

export default HomeSkeletonProductCard;
