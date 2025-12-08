"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TMDB_IMAGE_BASE_URL, getPersonCredits } from "@/lib/tmdb";
import { Loader2 } from "lucide-react";

interface StartProps {
    actor: {
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
    };
}

export function CastCard({ actor }: StartProps) {
    const [credits, setCredits] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    const handleMouseEnter = async () => {
        setIsOpen(true);
        if (!hasFetched && !loading) {
            setLoading(true);
            try {
                // Since this is a client component, we can't directly call the server-side function
                // imported from "@/lib/tmdb" if it relies on server secrets in a way that breaks client bundle.
                // However, our lib/tmdb.ts likely uses process.env.NEXT_PUBLIC_* for base URL 
                // but API key is server-side usually. 
                // Wait, the API_KEY in lib/tmdb.ts is NEXT_PUBLIC_TMDB_API_KEY? 
                // Let's check line 1 of lib/tmdb.ts from previous view_file.
                // Line 1: const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
                // It is public, so we can use it client side.
                // Re-implementing fetch here or creating a server action would be better practices, 
                // but for now importing the function might fail if it uses node-fetch or similar polyfills 
                // not present in browser, or if Next.js complains about server-only files.
                // `lib/tmdb.ts` uses `fetch` which is standard.
                // Let's try calling it. If it fails due to "Module not found: Can't resolve",
                // we'll need to move it to a server action or API route.

                const data = await getPersonCredits(actor.id.toString());
                if (data && data.cast) {
                    // Sort by popularity and take top 5, excluding current role if possible? 
                    // API returns combined credits.
                    const topCredits = data.cast
                        .sort((a: any, b: any) => b.popularity - a.popularity)
                        .slice(0, 5);
                    setCredits(topCredits);
                }
            } catch (error) {
                console.error("Failed to fetch credits", error);
            } finally {
                setLoading(false);
                setHasFetched(true);
            }
        }
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    return (
        <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link
                href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(actor.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-24 flex-none space-y-2 block transition-transform hover:scale-105"
            >
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-muted">
                    {actor.profile_path ? (
                        <Image
                            src={`${TMDB_IMAGE_BASE_URL}/w185${actor.profile_path}`}
                            alt={actor.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            No Photo
                        </div>
                    )}
                </div>
                <div className="text-center text-xs">
                    <p className="font-medium line-clamp-1">{actor.name}</p>
                    <p className="text-muted-foreground line-clamp-1">
                        {actor.character}
                    </p>
                </div>
            </Link>

            {/* Simple Hover Card */}
            {isOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-lg bg-popover text-popover-foreground shadow-xl border border-border z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-xs font-semibold mb-2 border-b pb-1">Known For</div>
                    {loading ? (
                        <div className="flex justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        </div>
                    ) : credits.length > 0 ? (
                        <div className="space-y-2">
                            {credits.map((credit: any) => (
                                <div key={credit.id} className="flex gap-2 items-center">
                                    <div className="relative h-8 w-6 flex-none bg-muted rounded overflow-hidden">
                                        {credit.poster_path && (
                                            <Image
                                                src={`${TMDB_IMAGE_BASE_URL}/w92${credit.poster_path}`}
                                                alt={credit.title || credit.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate text-xs">{credit.title || credit.name}</p>
                                        <p className="text-[10px] text-muted-foreground">
                                            {credit.release_date ? new Date(credit.release_date).getFullYear() : (credit.first_air_date ? new Date(credit.first_air_date).getFullYear() : "N/A")} • {credit.media_type === 'movie' ? 'Movie' : 'TV'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-xs text-muted-foreground text-center">No info available</div>
                    )}
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-popover" />
                </div>
            )}
        </div>
    );
}
