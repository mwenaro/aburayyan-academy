import "./globals.css";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface RootLayoutProps extends PropsWithChildren {}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          
        )}
      >
        {children}
      </body>
    </html>
  );
}
