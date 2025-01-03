"use client";

import  { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

const SelectSortInterface = ({ changeSortOption, values }) => {
  const useParams = useSearchParams();
  let optionParam = useParams.get("sortOption") || "date";

  const [value, setValue] = useState(optionParam);
  useEffect(() => {
    changeSortOption(value);
  }, [value]);
  useEffect(() => {
    setValue(optionParam);
  }, [optionParam]);

  return (
    <div>
      <Select key={321} value={value} onValueChange={setValue} dir="rtl">
        <SelectTrigger className="w-[180px] focus:ring-[var(--theme)]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value, index) => (
              <SelectItem key={index} value={value[0]}>
                {value[1]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSortInterface;
