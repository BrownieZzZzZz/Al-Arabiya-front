import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EventEmitter } from "events";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const eventBus = new EventEmitter();

export const validateNumberInput = (inputRef) => {
  const input = inputRef.current;
  let value = input.value;

  const regex = /^[0-9]+$/;

  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }
  if (value.length > 1 && value.startsWith("0")) {
    input.value = value.slice(1);
  }
  if (value.length > 8) {
    input.value = value.slice(0, 8);
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const cities = [
  { value: "tunis", text: "تونس" },
  { value: "ariana", text: "أريانة" },
  { value: "ben-arous", text: "بن عروس" },
  { value: "mannouba", text: "منوبة" },
  { value: "bizerte", text: "بنزرت" },
  { value: "nabeul", text: "نابل" },
  { value: "beja", text: "باجة" },
  { value: "jendouba", text: "جندوبة" },
  { value: "zaghouan", text: "زغوان" },
  { value: "siliana", text: "سليانة" },
  { value: "le-kef", text: "الكاف" },
  { value: "sousse", text: "سوسة" },
  { value: "monastir", text: "المنستير" },
  { value: "mahdia", text: "المهدية" },
  { value: "kasserine", text: "القصرين" },
  { value: "sidi-bouzid", text: "سيدي بوزيد" },
  { value: "kairouan", text: "القيروان" },
  { value: "gafsa", text: "قفصة" },
  { value: "sfax", text: "صفاقس" },
  { value: "gabes", text: "قابس" },
  { value: "medenine", text: "مدنين" },
  { value: "tozeur", text: "توزر" },
  { value: "kebili", text: "قبلي" },
  { value: "tatouine", text: "تطاوين" },
];

export const validatePriceInput = (inputRef) => {
  const input = inputRef.current;
  let value = input.value;

  const regex = /^\d*\.?\d*$/;
  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }

  if (value.length > 1 && value.startsWith("0") && value[1] !== ".") {
    input.value = value.slice(1);
  }

  if (value.includes(".")) {
    const [whole, decimal] = value.split(".");
    if (decimal && decimal.length > 2) {
      input.value = `${whole}.${decimal.slice(0, 2)}`;
    }
  }

  if (value.length > 10) {
    input.value = value.slice(0, 10);
  }
};

export const validatePercentageInput = (inputRef) => {
  const input = inputRef.current;
  let value = input.value;

  const regex = /^\d*\.?\d*$/;
  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }

  if (value.length > 1 && value.startsWith("0") && value[1] !== ".") {
    input.value = value.slice(1);
  }

  if (value.includes(".")) {
    const [whole, decimal] = value.split(".");
    if (decimal && decimal.length > 2) {
      input.value = `${whole}.${decimal.slice(0, 2)}`;
    }
  }

  const numValue = parseFloat(value);
  if (numValue > 100) {
    input.value = "100";
  }
};

export const formattedDate = (date) => {
  return new Date(date).toLocaleString("ar-TN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
};
