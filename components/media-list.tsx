"use client";

import { useStore } from "@/context/store";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";

export const MediaList = () => {
    const { getWatched, getWatchlist, getWatching } = useStore();

    const watched = getWatched();
    const watchlist = getWatchlist();
    const watching = getWatching();

    if (watched.length === 0 && watchlist.length === 0 && watching.length === 0) {
        return null;
    }

    const ListSection = ({ title, items }: { title: string, items: any[] }) => (
        <section>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{title}</h2>
                <Link href={`/${title.toLowerCase().replace(" ", "-")}`} className="text-sm text-primary hover:underline">
                    View All
                </Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {items.map((item) => (
                    <Link
                        key={item.id}
                        href={`/${item.type}/${item.id}`}
                        className="relative w-32 flex-none transition-transform hover:scale-105"
                    >
                        <div className="aspect-[2/3] w-full overflow-hidden rounded-lg bg-muted">
                            {item.poster_path ? (
                                <Image
                                    src={`${TMDB_IMAGE_BASE_URL}/w300${item.poster_path}`}
                                    alt={item.title || 'Media item'}
                                    width={300}
                                    height={450}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground p-2 text-center">
                                    {item.title || 'No Image'}
                                </div>
                            )}
                        </div>
                        {item.status === "watching" && (
                            <div className="absolute bottom-0 left-0 w-full bg-black/60 px-2 py-1 text-[10px] text-white backdrop-blur-sm">
                                Watching
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </section>
    );

    return (
        <div className="w-full space-y-8 pt-8">
            {watching.length > 0 && <ListSection title="Watching" items={watching.slice(0, 20)} />}
            {watchlist.length > 0 && <ListSection title="Watchlist" items={watchlist.slice(0, 20)} />}
            {watched.length > 0 && <ListSection title="Watched" items={watched.slice(0, 20)} />}
        </div>
    );
}
