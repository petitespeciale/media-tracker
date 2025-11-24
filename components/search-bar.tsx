"use client";

import { Search, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { searchMulti, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";

export function SearchBar({ className, placeholder = "Search movies & TV shows..." }: { className?: string, placeholder?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");
    const [results, setResults] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim().length > 1) {
                setIsLoading(true);
                console.log(`[SearchBar] Searching for: "${query}"`);
                try {
                    const data = await searchMulti(query);
                    console.log(`[SearchBar] Results:`, data);
                    if (data?.results) {
                        setResults(data.results.slice(0, 5)); // Limit to 5 results
                        setIsOpen(true);
                    }
                } catch (error) {
                    console.error("[SearchBar] Search failed:", error);
                }
                setIsLoading(false);
            } else {
                setResults([]);
                setIsOpen(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsOpen(false);
        if (query.trim()) {
            startTransition(() => {
                router.push(`/search?q=${encodeURIComponent(query)}`);
            });
        }
    };

    return (
        <div ref={wrapperRef} className={cn("relative w-full max-w-lg", className)}>
            <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder={placeholder}
                    className="h-12 w-full bg-transparent pl-11 pr-4 text-lg outline-none placeholder:text-muted-foreground"
                />
                {isLoading && (
                    <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
                )}
            </form>

            {/* Live Results Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full mt-2 w-full overflow-hidden rounded-xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl z-50">
                    {results.map((item) => (
                        <Link
                            key={item.id}
                            href={`/${item.media_type}/${item.id}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 p-3 transition-colors hover:bg-muted/50"
                        >
                            <div className="relative h-12 w-8 flex-none overflow-hidden rounded bg-muted">
                                {item.poster_path ? (
                                    <Image
                                        src={`${TMDB_IMAGE_BASE_URL}/w92${item.poster_path}`}
                                        alt={item.title || item.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-[8px] text-muted-foreground">
                                        No Img
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="truncate text-sm font-medium text-foreground">
                                    {item.title || item.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {item.media_type === "movie" ? "Movie" : "TV Show"} •{" "}
                                    {(item.release_date || item.first_air_date)?.split("-")[0] || "N/A"}
                                </p>
                            </div>
                        </Link>
                    ))}
                    <button
                        onClick={handleSearch}
                        className="w-full border-t border-border p-3 text-center text-xs font-medium text-primary hover:bg-muted/50"
                    >
                        View all results for "{query}"
                    </button>
                </div>
            )}
        </div>
    );
}
