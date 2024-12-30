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

  const regex = /^\+{0,1}[0-9]*$/;

  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
