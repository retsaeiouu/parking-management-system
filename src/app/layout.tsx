"use client";

import { SearchProvider } from "@/context/SearchContext";
import "./globals.css";

// Supports weights 300-700
import "@fontsource-variable/comfortaa";
// Supports weights 100-900
import "@fontsource-variable/montserrat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SearchProvider>
        <body className="h-screen w-screen flex flex-col justify-center items-center antialiased">
          {children}
        </body>
      </SearchProvider>
    </html>
  );
}
