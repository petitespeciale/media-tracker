"use client";

import { useStore } from "@/context/store";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LovedItPage() {
    const { getWatched } = useStore();
    const lovedItems = getWatched().filter(item => item.rating === 3);

    return (
        <main className="min-h-screen p-4 pb-24 md:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="flex items-center gap-4 py-8">
                    <Link href="/watched" className="text-muted-foreground hover:text-primary">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">😍 Loved It</h1>
                        <p className="text-sm text-muted-foreground">{lovedItems.length} items</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {lovedItems.map((item) => (
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
                                    {item.dateWatched ? new Date(item.dateWatched).toLocaleDateString() : ""}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {lovedItems.length === 0 && (
                    <div className="text-center text-muted-foreground py-20">
                        You haven't rated anything as "Loved It" yet.
                    </div>
                )}
            </div>
        </main>
    );
}
