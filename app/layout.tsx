import type { Metadata } from "next";
import "./globals.css";
import { DashboardLayout } from "@/components/dashboard-layout";

export const metadata: Metadata = {
  title: "Oncoscan - Oral Cancer Detection",
  description: "Advanced AI platform for oral cancer detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Sans (proprietary, may fall back) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Google+Sans+Display:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* DM Sans — closest open-source equivalent to Google Sans */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <DashboardLayout>
          {children}
        </DashboardLayout>
      </body>
    </html>
  );
}
