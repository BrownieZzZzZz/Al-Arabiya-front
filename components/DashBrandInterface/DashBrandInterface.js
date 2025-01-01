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

const DashBrandInterface = ({ values, changeBrandOption }) => {
    let optionParam =  "إختر ماركة";
  
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
          <SelectTrigger className="w-[180px] bg-[var(--dash-theme)] text-white border-none focus:ring-[var(--dash-theme6)]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"إختر ماركة"}>إختر ماركة </SelectItem>
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
}

export default DashBrandInterface