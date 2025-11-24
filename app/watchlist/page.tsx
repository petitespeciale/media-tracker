"use client";

import { useStore } from "@/context/store";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SearchBar } from "@/components/search-bar";
import { Suspense } from "react";

export default function WatchlistPage() {
    const { getWatchlist } = useStore();
    const watchlist = getWatchlist();

    return (
        <main className="min-h-screen p-4 pb-24 md:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="flex items-center gap-4 py-8">
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Want to Watch</h1>
                </header>

                <Suspense>
                    <SearchBar placeholder="Add to your watchlist" />
                </Suspense>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {watchlist.map((item) => (
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
                                    {item.type === 'movie' ? 'Movie' : 'TV Show'}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {watchlist.length === 0 && (
                    <div className="text-center text-muted-foreground py-20">
                        Your watchlist is empty.
                    </div>
                )}
            </div>
        </main>
    );
}
