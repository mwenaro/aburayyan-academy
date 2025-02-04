"use client";
import { useTheme } from "next-themes";
import { MagicCard } from "../ui/magic-card";
import { PropsWithChildren } from "react";

export function MyMagicCard({children}:PropsWithChildren) {
  const { theme } = useTheme();
  return (
    <MagicCard
    //   className="w-full  cursor-pointer flex-col items-center justify-center whitespace-nowrap shadow-2xl"
    className="bg-white px-2 py-1 shadow rounded overflow-hidden text-wrap"
      gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
    >
    {children}
    </MagicCard>
  );
}
