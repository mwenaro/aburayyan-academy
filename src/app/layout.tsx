import { Header } from "@/components/ict/Header";
import "./globals.css";

import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Footer } from "@/components/ict/Footer";
import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import { auth } from "@/auth/auth";

interface RootLayoutProps extends PropsWithChildren {}

export const metadata: Metadata = {
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
    "Intergrated School",
  ],
};

export default function RootLayout({ children }: RootLayoutProps) {
  const session = auth;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Header />
        <main className="min-h-screen pt-14 sm:pt-16 lg:pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Toaster />
          <Providers session={session}>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
