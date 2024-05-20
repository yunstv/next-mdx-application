"use client";
import React from "react";
import empty from "@/app/assets/image/empty.png";
import { cn } from "@utils";

export function Empty() {
  return (
    <div className="flex-center flex h-full w-full flex-col">
      <p className="text-sm text-[#5B616E]">No more available</p>
    </div>
  );
}

export interface LoadingDataProps extends React.PropsWithChildren {
  isLoading: boolean;
}

export function LoadingData({ isLoading, children }: LoadingDataProps) {
  if (!isLoading) return children;
  return (
    <div className="flex-center flex py-20">
      <span className="loading loading-spinner loading-md text-blue2"></span>
    </div>
  );
}

export interface LoadingIconProps {
  className?: string;
  wrapClassName?: string;
}

export function LoadingIcon({ className, wrapClassName }: LoadingIconProps) {
  return (
    <div className={cn("flex-center flex py-20", wrapClassName)}>
      <span
        className={cn("loading loading-spinner loading-md", className)}
      ></span>
    </div>
  );
}

export function LoadingDataOverlay({ isLoading, children }: LoadingDataProps) {
  if (!isLoading) return children;
  return (
    <div className="relative h-fit min-h-[inherit] w-full">
      <div className="absolute z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-70">
        <LoadingIcon />
      </div>
      {children}
    </div>
  );
}
