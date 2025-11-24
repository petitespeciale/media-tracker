"use client";

import { Home, Search, Clock, List, Play, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store";

export function TopNav() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const { syncing } = useStore();

    const links = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/search", icon: Search, label: "Search" },
        { href: "/watchlist", icon: List, label: "Watchlist" },
        { href: "/watching", icon: Play, label: "Watching" },
        { href: "/watched", icon: Clock, label: "Watched" },
    ];

    return (
        <header className="sticky top-0 z-50 hidden w-full border-b border-border bg-background/80 backdrop-blur-lg md:block">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex flex-col items-center leading-none">
                    <div className="text-xl animate-gradient-x -mb-1.5">
                        <span className="font-normal tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-[#ce0000] mr-1">media</span><span className="font-bold tracking-tighter text-[#ce0000]">TRACKER</span>
                    </div>
                    <span className="text-[10px] font-medium text-[#e2d2c2]">your personal cinema log</span>
                </Link>
                <nav className="flex items-center gap-6">
                    {links.map(({ href, icon: Icon, label }) => {
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={cn(
                                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                                    isActive ? "text-primary" : "text-muted-foreground"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {label}
                            </Link>
                        );
                    })}

                    <div className="ml-4 flex items-center gap-3 border-l border-border pl-4">
                        {syncing && (
                            <span className="text-xs text-muted-foreground">Syncing...</span>
                        )}
                        {user ? (
                            <button
                                onClick={() => signOut()}
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                <User className="h-4 w-4" />
                                Sign In
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}
