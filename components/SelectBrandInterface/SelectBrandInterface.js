"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";

const SelectBrandInterface = ({ changeBrandOption, values }) => {
  const useParams = useSearchParams();
  let optionParam = useParams.get("brandOption") || "allBrands";

  const [value, setValue] = useState(optionParam);
  useEffect(() => {
    changeBrandOption(value);
  }, [value]);
  useEffect(() => {
    setValue(optionParam);
  }, [optionParam]);

  return (
    <div>
      <Select key={123} value={value} onValueChange={setValue} dir="rtl">
        <SelectTrigger className="w-[180px] focus:ring-[var(--theme)]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={"allBrands"}>كل الماركات </SelectItem>
            {values.map((value, index) => (
              <SelectItem key={index} value={value.name}>
                {value.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectBrandInterface;
