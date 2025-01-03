"use client";
import DashSearch from "@/components/DashSearch/DashSearch";
import "./page.css";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const page = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      first_name: "Raed",
      last_name: "Lafi",
      phone: "56620075",
      email: "browniesandmuffin@gmail.com",
      city: "medenine",
      address: "niggerland",
      created_At: "2024-12-30T21:42:35.210Z"
    },
    {
      id: 1,
      first_name: "Raed",
      last_name: "Lafi",
      phone: "56620075",
      email: "browniesandmuffin@gmail.com",
      city: "medenine",
      address: "niggerland",
      created_At: "2024-12-30T21:42:35.210Z"
    },
    {
      id: 1,
      first_name: "Raed",
      last_name: "Lafi",
      phone: "56620075",
      email: "browniesandmuffin@gmail.com",
      city: "medenine",
      address: "niggerland",
      created_At: "2024-12-30T21:42:35.210Z"
    },
    {
      id: 1,
      first_name: "Raed",
      last_name: "Lafi",
      phone: "56620075",
      email: "browniesandmuffin@gmail.com",
      city: "medenine",
      address: "niggerland",
      created_At: "2024-12-30T21:42:35.210Z"
    },
    {
      id: 1,
      first_name: "Raed",
      last_name: "Lafi",
      phone: "56620075",
      email: "browniesandmuffin@gmail.com",
      city: "medenine",
      address: "niggerland",
      created_At: "2024-12-30T21:42:35.210Z"
    },
  ])
  return (
    <div className="table-scroll flex w-full flex-col gap-10 overflow-x-auto px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      <DashSearch placeholder="بحث عن حريف، بل إسم أو لقب أو رقم الهاتف " />
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="border-[#2c2d33] hover:bg-muted/10">
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              معرف
            </TableHead>
            <TableHead className="flex flex-row items-center justify-start gap-2 text-lg text-[var(--dash-theme5)]">
              <span>تاريخ الصنع </span>
              <i
                className={cn(
                  "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                )}
              ></i>
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              الاسم{" "}
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              اللقب
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              رقم الهاتف
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              البريد الالكتروني
            </TableHead>
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              الولاية
            </TableHead>
            <TableHead className="text-end text-lg text-[var(--dash-theme5)]">
              العنوان
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow
              onClick={() => window.open(`/admin/dashboard/users/${user.id}`)}
              key={index}
              className="border-[#2c2d33] text-white hover:cursor-pointer hover:bg-muted/10"
            >
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell className="font-medium">{user.created_At}</TableCell>
              <TableCell className="font-medium">{user.first_name}</TableCell>
              <TableCell className="font-medium">{user.last_name}</TableCell>
              <TableCell className="font-medium">{user.phone}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-medium">{user.city}</TableCell>
              <TableCell className="font-medium text-end">{user.address}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
