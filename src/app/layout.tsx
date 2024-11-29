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

//  TODO:
//    search by plate no.
//    implement history logs
//    implement user reservation page (for private entries only)

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
