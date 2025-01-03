"use client";

import "./page.css";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { cn, formattedDate } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DashSearch from "@/components/DashSearch/DashSearch";

const page = () => {
  const router = useRouter();
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [openedAccountID, setOpenedAccountID] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user`,
        {
          method: "GET",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setUsers(data.data);
      setLoadingUsers(false);
    } catch (error) {
      console.error(error);
      setLoadingUsers(false);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب البيانات",
        variant: "destructive",
      });
    }
  };

  const ChangeUrl = (url) => {
    startTransition(() => {
      router.push(url);
    });
  };

  const checkUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/account`,
        {
          method: "GET",
          headers: {
            admin_access_token: Cookies.get("admin_access_token"),
            "Content-Type": "application/json",
          },
        },
      );
      const data = await response.json();

      if (data.data === null) {
        throw new Error(data.message);
      }

      setOpenedAccountID(data.data.id);
    } catch (error) {
      console.error(error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء جلب البيانات",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    checkUser().then(() => fetchUsers());
  }, []);

  useEffect(() => {
    setLoadingPage(isPending);
  }, [isPending]);

  return (
    <div className="table-scroll flex w-full flex-col gap-10 overflow-x-auto px-5 pb-10 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10">
      {(loadingPage || loadingUsers) && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-white/60 backdrop-blur-sm">
          <div className="h-14 w-14 animate-spin rounded-full border-b-4 border-[var(--theme)]" />
        </div>
      )}
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
              الاسم
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
              الدور
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(
            (user, index) =>
              user.id !== openedAccountID && (
                <TableRow
                  onClick={() =>
                    window.open(`/admin/dashboard/users/${user.id}`)
                  }
                  key={index}
                  className="border-[#2c2d33] text-white hover:cursor-pointer hover:bg-muted/10"
                >
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium">
                    {formattedDate(user.created_At)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.full_name.split(" ")[0]}
                  </TableCell>
                  <TableCell className="font-medium">
                    {user.full_name.split(" ").length > 1
                      ? user.full_name.split(" ")[1]
                      : ""}
                  </TableCell>
                  <TableCell className="font-medium">{user.phone}</TableCell>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell className="font-medium">{user.city}</TableCell>
                  <TableCell className="text-end font-medium">
                    {user.role}
                  </TableCell>
                </TableRow>
              ),
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
