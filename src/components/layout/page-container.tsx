import React, { HtmlHTMLAttributes } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { twMerge } from "tailwind-merge";
interface PageContainerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function PageContainer({
  children,
  scrollable = false,
  className = "",
}: PageContainerProps) {
  const styles = twMerge("h-full  p-4 md:px-8", className);
  return (
    <>
      {scrollable ? (
        <ScrollArea className="h-[calc(100dvh-52px)]">
          <div className={styles}>{children}</div>
        </ScrollArea>
      ) : (
        <div className={styles}>{children}</div>
      )}
    </>
  );
}
