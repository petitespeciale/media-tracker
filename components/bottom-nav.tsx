"use client";

import { Home, Search, Clock, List, Play, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

export function BottomNav() {
    const pathname = usePathname();
    const { user } = useAuth();

    const links = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/search", icon: Search, label: "Search" },
        { href: "/watchlist", icon: List, label: "Watchlist" },
        { href: "/watching", icon: Play, label: "Watching" },
        { href: "/watched", icon: Clock, label: "Watched" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/80 backdrop-blur-lg md:hidden">
            <div className="flex items-center justify-around py-2">
                {links.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center gap-1 px-1 py-2 text-[10px] transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
                <Link
                    href={user ? "/account" : "/login"}
                    className={cn(
                        "flex flex-col items-center gap-1 px-1 py-2 text-[10px] transition-colors",
                        pathname === "/account" || pathname === "/login" ? "text-primary" : "text-muted-foreground"
                    )}
                >
                    <User className="h-4 w-4" />
                    <span>{user ? "Account" : "Sign In"}</span>
                </Link>
            </div>
        </nav>
    );
}
