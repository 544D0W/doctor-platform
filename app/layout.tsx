import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DoctorProvider } from '@/context/DoctorContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emergency Dashboard",
  description: "Emergency response system for doctors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DoctorProvider>
          {children}
        </DoctorProvider>
      </body>
    </html>
  );
}