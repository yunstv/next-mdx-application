import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React from "react";
import qs from "qs";

export const QsStringify = (query: object = {}): string => qs.stringify(query);

export const QsParseUrl = <T = unknown>(): T | AnyObject => {
  if (!inClient()) return {};
  const href = window.location.search.replace("?", "");
  return qs.parse(href);
};

export const getDomainPathname = <T = unknown>(): T | string => {
  if (!inClient()) return "";
  const l = window.location;
  return `${l.origin}${l.pathname}`;
};

export const getRedirectUri = (param: AnyObject) => {
  return `${getDomainPathname()}?${QsStringify(param)}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const inClient = () => !inServer();
export const inServer = () => typeof window === "undefined";

/*
 * @param address string
 * @param first ? number default value 5
 * @param end ? number
 * @return 'ox12345...12345'
 */
export const formatAddressString = (
  address: string | String,
  first = 5,
  end?: number
) => {
  if (!address) return address;
  const regexp = new RegExp(`(^.{${first}})(.+)(.{${end || first}}$)`);
  return address.replace(regexp, "$1...$3");
};
export function sumRandom(max: number, min: number): number {
  const num = Math.floor(Math.random() * (max - min) + min);
  return num;
}

export const extractStringBetweenSlashes = (inputString: string) => {
  const match = inputString.match(/\/([^\/]+)(\/|$)/);
  return match ? match[1] : null;
};

export const extractStringBetweenSlashesLast = (inputString: string) => {
  const regex = /([^/]+)$/;
  const match = inputString.match(regex);
  return match ? match[1] : null;
};

export const pathRewrites = (value: string | null, rewrites?: string[]) => {
  if (!Array.isArray(rewrites)) return false;
  return rewrites.some((v) => extractStringBetweenSlashes(v) === value);
};

export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    // Try using Clipboard API first
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // If not supported, fallback to document.execCommand('copy')
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);

      textarea.select();

      const success = document.execCommand("copy");
      if (!success) {
        throw new Error("Copy to clipboard failed.");
      }

      document.body.removeChild(textarea);
    }

    // Resolve the Promise on success
    return Promise.resolve();
  } catch (err) {
    // Reject the Promise on failure
    return Promise.reject(err);
  }
};

export const isArrayLength = (arr?: any[]) =>
  Array.isArray(arr) && arr.length > 0;

/**
 * Calculate pagination array based on current page and total pages.
 * @param currentPage Current selected page number.
 * @param totalPages Total number of pages.
 * @returns Array containing calculated page numbers with ellipsis for pagination.
 */
export function calculatePagination(
  currentPage: number,
  totalPages: number
): number[] {
  const maxPagesToShow = 5;
  const pagination: number[] = [];

  // Calculate start and end page numbers
  let start = Math.max(1, currentPage - 2);
  let end = Math.min(totalPages, start + maxPagesToShow - 1);

  // Adjust start and end if necessary
  if (end - start < maxPagesToShow - 1) {
    start = Math.max(1, end - maxPagesToShow + 1);
  }

  // Add ellipsis or first page
  if (start > 1) {
    pagination.push(1);
    if (start > 2) {
      pagination.push(-1); // Ellipsis
    }
  }

  // Add pages
  for (let i = start; i <= end; i++) {
    pagination.push(i);
  }

  // Add ellipsis or last page
  if (end < totalPages) {
    if (totalPages - end > 1) {
      pagination.push(-1); // Ellipsis
    }
    pagination.push(totalPages);
  }

  return pagination;
}

// Test cases
// console.log(calculatePagination(1, 100)); // [1, 2, 3, -1, 8, 9, 10]
// console.log(calculatePagination(2, 100)); // [1, 2, 3, -1, 8, 9, 10]
// console.log(calculatePagination(3, 100)); // [1, -1, 2, 3, 4, -1, 10]

/**
 * Debounce function
 * @param fn Function to execute
 * @param time Debounce interval in milliseconds, default is 50
 * @returns Debounced function
 */
type DebounceFunction<T extends (...args: any[]) => void> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void;

/**
 * Create a debounce function
 * @param fn Function to execute
 * @param time Debounce interval in milliseconds, default is 50
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  time: number = 50
): DebounceFunction<T> {
  let timer: ReturnType<typeof setTimeout>;

  /**
   * Debounced function
   * @param args Function parameters
   */
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const that = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(that, args);
    }, time);
  };
}

// Example usage:
// const debouncedFunction = debounce(originalFunction, 300);
// debouncedFunction(arg1, arg2, ...);

/**
 * Throttle function
 * @param fn Function to execute
 * @param delay Throttle interval in milliseconds, default is 50
 * @returns Throttled function
 */
type ThrottleFunction<T extends (...args: any[]) => void> = (
  this: ThisParameterType<T>,
  ...args: Parameters<T>
) => void;

/**
 * Create a throttle function
 * @param fn Function to execute
 * @param delay Throttle interval in milliseconds, default is 50
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 50
): ThrottleFunction<T> {
  let startTime = 0;

  /**
   * Throttled function
   * @param args Function parameters
   */
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const currentTime = new Date().getTime();

    if (currentTime - startTime >= delay) {
      fn.apply(this, args);
      startTime = currentTime;
    }
  };
}

// Example usage:
// const throttledFunction = throttle(originalFunction, 300);
// throttledFunction(arg1, arg2, ...);

export function openNewWindow(
  url: string,
  width: number = 600,
  height: number = 400
): void {
  const left: number = (window.innerWidth - width) / 2;
  const top: number = (window.innerHeight - height) / 2;
  const strWindowOpt = `
    width=${width},height=${height},
    left=${left},
    top=${top},
    menubar=yes,
    location=yes,
    resizable=yes,
    scrollbars=yes,
  `;
  const newWindow: Window | null = window.open(
    url,
    "_blank",
    strWindowOpt
    // `width=${width},height=${height},left=${left},top=${top}`
  );

  if (!newWindow) {
    alert(
      "The pop-up window has been blocked by the browser. Please allow the pop-up window and try again."
    );
  }
}

// openNewWindow('https://www.example.com', 600, 400);
export const isReactElement = (
  element?: React.ReactNode
): element is React.ReactElement =>
  React.isValidElement(element) && Boolean(element.props.children);
