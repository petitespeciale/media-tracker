import { SearchBar } from "@/components/search-bar";
import { searchMulti, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q: string }>;
}) {
    const { q } = await searchParams;
    console.log(`[SearchPage] Query: "${q}"`);
    const results = q ? await searchMulti(q) : null;
    console.log(`[SearchPage] Results found: ${results?.results?.length || 0}`);

    return (
        <main className="min-h-screen p-4 pb-24 md:p-8">
            <div className="mx-auto max-w-5xl space-y-8">
                <header className="flex flex-col items-center space-y-4 py-8">
                    <Link href="/" className="flex flex-col items-center group">
                        <div className="text-2xl animate-gradient-x leading-none -mb-1">
                            <span className="font-normal tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-[#ce0000] mr-1">media</span><span className="font-bold tracking-tighter text-[#ce0000]">TRACKER</span>
                        </div>
                        <p className="text-sm font-medium text-[#e2d2c2]">
                            your personal cinema log
                        </p>
                    </Link>
                    <Suspense>
                        <SearchBar />
                    </Suspense>
                </header>

                {q && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-foreground">
                            Results for "{q}"
                        </h2>

                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {results?.results?.map((item: any) => {
                                if (item.media_type !== "movie" && item.media_type !== "tv")
                                    return null;

                                const title = item.title || item.name;
                                const date = item.release_date || item.first_air_date;
                                const year = date ? new Date(date).getFullYear() : "N/A";
                                const poster = item.poster_path
                                    ? `${TMDB_IMAGE_BASE_URL}/w500${item.poster_path}`
                                    : null;

                                return (
                                    <Link
                                        key={item.id}
                                        href={`/${item.media_type}/${item.id}`}
                                        className="group relative flex flex-col overflow-hidden rounded-xl bg-card transition-transform hover:scale-105"
                                    >
                                        <div className="aspect-[2/3] w-full bg-muted">
                                            {poster ? (
                                                <Image
                                                    src={poster}
                                                    alt={title}
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
                                                {title}
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                {item.media_type === "movie" ? "Movie" : "TV"} • {year}
                                            </p>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
