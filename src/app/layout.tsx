import type { Metadata } from "next";
import "./globals.css";

// Supports weights 300-700
import "@fontsource-variable/comfortaa";
// Supports weights 100-900
import "@fontsource-variable/montserrat";

export const metadata: Metadata = {
  title: "Parking System",
  description: "",
};

// TODO: test if everything works properly
// TODO: search by plate no.

// FIXME: RESERVATION PAGE LOOKS LIKE SHIT IT NEEDS FIXING

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex flex-col justify-center items-center antialiased">
        {children}
      </body>
    </html>
  );
}
