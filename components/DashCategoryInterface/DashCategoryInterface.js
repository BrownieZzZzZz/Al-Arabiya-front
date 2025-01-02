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

const DashCategoryInterface = ({
  values,
  changeCategoryOption,
  defaultValue = "",
  disabled = false,
}) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    changeCategoryOption(value);
  }, [value]);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div>
      <Select
        value={value}
        onValueChange={setValue}
        dir="rtl"
        disabled={disabled}
      >
        <SelectTrigger className="w-[180px] border-none bg-[var(--dash-theme)] text-white focus:ring-[var(--dash-theme6)]">
          <SelectValue placeholder="إختر فئة" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {values.map((value, index) => (
              <SelectItem key={index} value={value.id}>
                {value.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashCategoryInterface;
