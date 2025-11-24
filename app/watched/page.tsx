"use client";

import { useStore } from "@/context/store";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function WatchedPage() {
    const { getWatched } = useStore();
    const watched = getWatched().sort((a, b) => {
        // Sort by dateWatched descending (newest first)
        // Items without date go to the bottom
        if (!a.dateWatched) return 1;
        if (!b.dateWatched) return -1;
        return new Date(b.dateWatched).getTime() - new Date(a.dateWatched).getTime();
    });

    return (
        <main className="min-h-screen p-4 pb-24 md:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="space-y-4 py-8">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="text-muted-foreground hover:text-primary">
                            <ArrowLeft className="h-6 w-6" />
                        </Link>
                        <h1 className="text-3xl font-bold">Watched History</h1>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Link
                            href="/ratings/loved-it"
                            className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <span className="text-lg">😍</span>
                            Loved It
                        </Link>
                        <Link
                            href="/ratings/liked-it"
                            className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <span className="text-lg">😊</span>
                            Liked It
                        </Link>
                        <Link
                            href="/ratings/not-for-me"
                            className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <span className="text-lg">😐</span>
                            Not For Me
                        </Link>
                        <Link
                            href="/ratings/nope"
                            className="flex items-center gap-2 rounded-lg bg-card border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                        >
                            <span className="text-lg">😞</span>
                            Nope
                        </Link>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {watched.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${item.type}/${item.id}`}
                            className="group relative flex flex-col overflow-hidden rounded-xl bg-card transition-transform hover:scale-105"
                        >
                            <div className="aspect-[2/3] w-full bg-muted">
                                {item.poster_path ? (
                                    <Image
                                        src={`${TMDB_IMAGE_BASE_URL}/w500${item.poster_path}`}
                                        alt={item.title}
                                        width={500}
                                        height={750}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <div className="p-3">
                                <h3 className="line-clamp-1 text-sm font-medium text-foreground">
                                    {item.title}
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    Watched: {item.dateWatched ? new Date(item.dateWatched).toLocaleDateString() : "Unknown"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {watched.length === 0 && (
                    <div className="text-center text-muted-foreground py-20">
                        You haven't marked anything as watched yet.
                    </div>
                )}
            </div>
        </main>
    );
}
