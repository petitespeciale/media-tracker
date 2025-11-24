"use client";

import { useStore } from "@/context/store";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Play } from "lucide-react";

export default function WatchingPage() {
    const { getWatching } = useStore();
    const watching = getWatching();

    return (
        <main className="min-h-screen p-4 pb-24 md:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="flex items-center gap-4 py-8">
                    <Link href="/" className="text-muted-foreground hover:text-primary">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">Currently Watching</h1>
                </header>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {watching.map((item) => (
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
                                <div className="absolute bottom-0 left-0 w-full bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm flex items-center gap-1">
                                    <Play className="h-3 w-3 fill-current" />
                                    Watching
                                </div>
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

                {watching.length === 0 && (
                    <div className="text-center text-muted-foreground py-20">
                        You aren't watching anything right now.
                    </div>
                )}
            </div>
        </main>
    );
}
