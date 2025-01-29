"use client";

import { twMerge } from "tailwind-merge";
import { ShineBorder } from "../ui/shine-border";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
}

export function MyShineBorder({ children, className = "" }: Props) {
  return (
    <ShineBorder
      className={twMerge(
        "relative flex  flex-col items-center justify-center overflow-hidden rounded-lg border-2 bg-background md:shadow-xl",
        className
      )}
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      {children}
    </ShineBorder>
  );
}
