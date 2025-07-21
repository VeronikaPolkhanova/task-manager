import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// функция для безопасного мержа классов tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
