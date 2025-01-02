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

const DashCategoryInterface = ({ values, changeCategoryOption }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    changeCategoryOption(value);
  }, [value]);

  return (
    <div>
      <Select value={value} onValueChange={setValue} dir="rtl">
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
