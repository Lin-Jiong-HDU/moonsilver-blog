import type { Metadata } from "next";
import "./globals.css";
import { SiteNavbar } from "@/app/components/site-navbar";

export const metadata: Metadata = {
  title: {
    default: "Portfolio",
    template: "%s | Portfolio",
  },
  description: "Portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="min-h-screen bg-black text-white">
          <SiteNavbar />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
