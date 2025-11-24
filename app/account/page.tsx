"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl animate-gradient-x leading-none -mb-2">
                        <span className="font-normal tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-[#ce0000] mr-1">media</span><span className="font-bold tracking-tighter text-[#ce0000]">TRACKER</span>
                    </h1>
                    <p className="text-lg font-medium text-[#e2d2c2] mb-4">
                        your personal cinema log
                    </p>
                    <p className="text-muted-foreground">
                        Manage your account
                    </p>
                </div>

                <div className="rounded-lg border border-border bg-card p-6 space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Signed in as</p>
                            <p className="font-medium">{user.email}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <button
                            onClick={() => signOut()}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>
                </div>

                <div className="text-center">
                    <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
