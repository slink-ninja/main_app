import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { AuthProvider } from "@/hooks/use-auth";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "slink.ninja - Smart URL Shortener with Advanced Analytics",
  description:
    "Transform long URLs into powerful smart links with detailed analytics, QR codes, and advanced targeting. The future of link management.",
  keywords: [
    "url shortener",
    "link shortener",
    "analytics",
    "qr codes",
    "smart links",
    "slink ninja",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <div className="min-h-screen">
              <Navbar />
              <main>{children}</main>
            </div>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
