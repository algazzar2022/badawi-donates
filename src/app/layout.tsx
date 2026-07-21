import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: "default" }
    });

    if (settings) {
      return {
        title: settings.title,
        description: settings.description,
        keywords: settings.keywords,
        openGraph: {
          title: settings.title,
          description: settings.description,
          images: settings.ogImage ? [{ url: settings.ogImage }] : [],
        }
      };
    }
  } catch (e) {
    // Ignore errors during build time and use fallback
  }

  return {
    title: "بدواي تتبرع | شبكة بدواي للتبرع بالدم",
    description: "شبكة بدواي للتبرع بالدم. تبرعك بالدم قد ينقذ حياة إنسان. سجل كمتبرع بقرية بدواي في سرية تامة.",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.variable} font-sans antialiased bg-slate-50 text-slate-900`}>
        {children}
      </body>
    </html>
  );
}
