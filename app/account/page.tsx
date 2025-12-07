"use client";

import { useAuth } from "@/context/auth-context";
import { useStore } from "@/context/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut, User, Download, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
    const { user, signOut } = useAuth();
    const { items, removeItem } = useStore();
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [storageUsage, setStorageUsage] = useState<string>("0 MB");

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }

        // Calculate storage usage
        if (typeof window !== 'undefined') {
            const usage = (JSON.stringify(localStorage).length / 1024 / 1024).toFixed(2);
            setStorageUsage(`${usage} MB`);
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    const handleExport = () => {
        const dataStr = JSON.stringify(items, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `media-tracker-data-${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleDeleteAccount = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This will permanently delete all your tracked movies and TV shows. This action cannot be undone.")) {
            return;
        }

        if (!window.confirm("Please confirm one last time: Do you want to DELETE ALL DATA and your account?")) {
            return;
        }

        setIsDeleting(true);
        try {
            // 1. Delete all items from Supabase (via store)
            const itemIds = Object.keys(items).map(Number);
            for (const id of itemIds) {
                removeItem(id);
            }

            // 2. Clear local storage
            localStorage.removeItem("media_tracker_items");

            // 3. Sign out
            await signOut();
        } catch (error) {
            console.error("Error deleting account:", error);
            alert("Failed to delete some data. Please try again.");
            setIsDeleting(false);
        }
    };

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

                    <div className="pt-4 border-t border-border space-y-3">
                        <button
                            onClick={handleExport}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        >
                            <Download className="h-4 w-4" />
                            Export Data
                        </button>

                        <button
                            onClick={() => signOut()}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/80 transition-colors"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </div>

                    <div className="pt-4 border-t border-border">
                        <button
                            onClick={handleDeleteAccount}
                            disabled={isDeleting}
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
                        >
                            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            {isDeleting ? "Deleting..." : "Delete Account"}
                        </button>
                        <p className="mt-2 text-center text-xs text-muted-foreground">
                            This will permanently delete all your tracked data.
                        </p>
                    </div>

                    <div className="pt-4 border-t border-border text-center">
                        <p className="text-xs text-muted-foreground">
                            Local Storage Used: <span className="font-mono text-foreground">{storageUsage}</span>
                        </p>
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
