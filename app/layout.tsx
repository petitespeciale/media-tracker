import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Media Tracker",
  description: "Track your watched movies and TV shows.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Media Tracker",
  },
  formatDetection: {
    telephone: false,
  },
};

import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { StoreProvider } from "@/context/store";
import { AuthProvider } from "@/context/auth-context";
import { BottomNav } from "@/components/bottom-nav";
import { TopNav } from "@/components/top-nav";

// ... imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <AuthProvider>
          <StoreProvider>
            <TopNav />
            <main className="pb-16 md:pb-0">
              {children}
            </main>
            <footer className="py-6 text-center text-xs text-muted-foreground">
              2025 © vibe coded by carmille lim
            </footer>
            <BottomNav />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
