import "./globals.css";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

interface RootLayoutProps extends PropsWithChildren {}

export const metadata:Metadata = {
  title: {
    default: "Abu Rayyan Academy | Mombasa, Kenya",
    template: "%s | Abu Rayyan Academy",
  },
  description:
    "Abu Rayyan Academy is a leading private school in Mombasa, Kenya, offering a world-class education with a focus on academic excellence, character development, and Islamic values.",

  
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  

  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Abu Rayyan Academy",
    "Private School Mombasa",
    "Islamic School Mombasa",
    "Education in Kenya",
  ]
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
