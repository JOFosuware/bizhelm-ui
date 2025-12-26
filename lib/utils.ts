import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMoney(amount: number, currency = "GHS") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(amount);
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "short", day: "2-digit" }).format(d);
}
