"use client";

import "./page.css";

import { useState, useEffect, useTransition, useContext } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { cities, cn, formattedDate } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AuthContext } from "@/contexts/AuthContext";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
  const { adminData } = useContext(AuthContext);
  const [loadingPage, setLoadingPage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [selectedSort, setSelectedSort] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const maxVisiblePages = 5;

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admins/user?${searchQuery ? `search=${searchQuery}&` : ""}sort=${selectedSort}&order=${sortDirection}&page=${CurrentPage}&limit=${limit}`,
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

  const changeSortOrder = (sort) => {
    console.log(sort);

    if (selectedSort === sort) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSelectedSort(sort);
      setSortDirection("asc");
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const createPageNumbers = () => {
    let startPage = Math.max(1, CurrentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  useEffect(() => {
    fetchUsers();
    createPageNumbers();
  }, [CurrentPage, totalPages, searchQuery, selectedSort, sortDirection]);

  useEffect(() => {
    fetchUsers();
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
      <DashSearch
        placeholder="بحث عن حريف، بل إسم أو لقب أو رقم الهاتف"
        setSearchQuery={setSearchQuery}
      />
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="border-[#2c2d33] hover:bg-muted/10">
            <TableHead className="text-start text-lg text-[var(--dash-theme5)]">
              معرف
            </TableHead>
            <TableHead className="w-full text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("created_At")}
                className="flex w-full items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>تاريخ الصنع </span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="w-full text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("name")}
                className="flex w-full items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>الاسم</span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
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
            <TableHead className="w-full text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("city")}
                className="flex w-full items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>الولاية</span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
            <TableHead className="w-full text-start text-lg text-[var(--dash-theme5)]">
              <div
                onClick={() => changeSortOrder("role")}
                className="flex w-full items-center justify-center gap-3 transition-all duration-200 hover:scale-105 hover:cursor-pointer"
              >
                <span>الدور</span>
                <i
                  className={cn(
                    "fa-solid fa-up-down mt-1 text-lg text-[var(--dash-theme5)] transition-all duration-200 hover:cursor-pointer",
                  )}
                />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(
            (user, index) =>
              user.id !== adminData.id && (
                <TableRow
                  onClick={() =>
                    window.open(`/admin/dashboard/users/${user.id}`)
                  }
                  key={index}
                  className="border-[#2c2d33] text-white hover:cursor-pointer hover:bg-muted/10"
                >
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium">
                    {user.created_At && formattedDate(user.created_At)}
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
                  <TableCell className="font-medium">
                    {cities.find((city) => city.value === user.city).text}
                  </TableCell>
                  <TableCell className="text-end font-medium">
                    {user.role === "admin" ? "مسؤول" : "حريف"}
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
