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

import { Toaster } from "sonner";

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
            <Toaster position="top-center" richColors />
            <footer className="py-6 text-center text-xs text-muted-foreground">
              <p>2025 © vibe coded by carmille lim</p>
              <p className="mt-2">
                <a href="/privacy" className="hover:underline">Privacy Policy</a> • <a href="/terms" className="hover:underline">Terms of Service</a>
              </p>
              <div className="mt-2 flex items-center justify-center gap-2">
                <a
                  href="https://www.themoviedb.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <span className="text-[10px]">Powered by TMDB API • This product uses the TMDB API but is not endorsed or certified by TMDB.</span>
                  <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="TMDB Logo"
                    className="h-4 w-auto"
                  />
                </a>
              </div>
            </footer>
            <BottomNav />
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
