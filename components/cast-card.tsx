"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
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
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseEnter = async () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            // Position above the card
            setPosition({
                top: rect.top,
                left: rect.left + (rect.width / 2)
            });
        }

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
                    // Filter out Talk Shows (10767), News (10763), and "Self" roles
                    const filteredCast = data.cast.filter((item: any) => {
                        // Check genres
                        if (item.genre_ids?.includes(10767) || item.genre_ids?.includes(10763)) {
                            return false;
                        }
                        // Check character name for "Self" type roles
                        const char = item.character?.toLowerCase() || "";
                        const title = (item.title || item.name || "").toLowerCase();

                        // Exclude specific roles
                        if (["self", "himself", "herself", "guest", "host", "narrator", "archive footage"].some(r => char.includes(r))) {
                            return false;
                        }

                        // Double check titles for talk shows if genre is missing (fallback)
                        if (title.includes("late night") || title.includes("daily show") || title.includes("live with") || title.includes("tonight show")) {
                            return false;
                        }

                        return true;
                    });

                    const topCredits = filteredCast
                        .sort((a: any, b: any) => b.vote_count - a.vote_count)
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
            ref={triggerRef}
            className="relative group cursor-pointer" // cursor-pointer to hint interactivity
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

            {/* Portal Hover Card */}
            {isOpen && mounted && createPortal(
                <div
                    className="fixed z-[9999] mb-2 w-64 p-3 rounded-lg bg-popover text-popover-foreground shadow-xl border border-border animate-in fade-in zoom-in-95 duration-200 pointer-events-none"
                    style={{
                        top: position.top,
                        left: position.left,
                        transform: "translate(-50%, -100%) translateY(-10px)"
                    }}
                >
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
                    {/* Arrow - simplified as a small square rotated */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 h-2 w-2 rotate-45 border-r border-b border-border bg-popover" />
                </div>,
                document.body
            )}
        </div>
    );
}
