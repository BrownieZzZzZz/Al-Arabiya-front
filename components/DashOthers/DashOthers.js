import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const DashOthers = ({
  ChangeUrl,
  customizationData,
  setCustomizationData,
  loading,
  setLoading,
  editDelivery,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const deliveryPriceRef = useRef(null);

  const saveData = async () => {
    if (!deliveryPriceRef.current.value) {
      toast({ title: "الرجاء إدخال سعر التوصيل", type: "destruction" });
      return;
    }
    if (loading) return;
    if (!isEditing) return;
    setLoadingData(true);
    if (editDelivery) {
      await editDelivery(deliveryPriceRef.current.value.trim());
      setLoadingData(false);
      setIsEditing(false);
    }
  };
  return (
    <div className="">
      <div className="mb-6 flex flex-col gap-2">
        <div className="text-lg font-medium text-[var(--dash-theme5)]">
          سعر التوصيل
        </div>
        <input
          defaultValue={customizationData.deliveryPrice}
          ref={deliveryPriceRef}
          disabled={!isEditing || loadingData}
          type="num"
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          className="max-w-[200px] bg-[var(--dash-theme2)] p-3 text-lg font-semibold text-white outline-none focus:outline-[var(--dash-theme)]"
        />
      </div>
      <button
        onClick={() => {
          if (isEditing) saveData();
          if (!isEditing) setIsEditing(true);
        }}
        disabled={loading || loadingData}
        type="button"
        className={cn(
          "w-[120px] border-2 bg-emerald-700 py-2.5 text-lg font-semibold text-white transition-all duration-200 hover:bg-emerald-500",
          isEditing && !loading
            ? "border-emerald-500 bg-emerald-500 hover:bg-transparent hover:text-emerald-500"
            : "border-blue-500 bg-blue-500 hover:bg-transparent hover:text-blue-500",
        )}
      >
        {loading || loadingData ? (
          <div className="flex items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          </div>
        ) : isEditing ? (
          "حفظ"
        ) : (
          "تعديل"
        )}
      </button>
    </div>
  );
};

export default DashOthers;
