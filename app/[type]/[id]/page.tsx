import { getDetails, getWatchProviders, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import { ActionButtons } from "@/components/action-buttons";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

export default async function DetailsPage({
    params,
}: {
    params: Promise<{ type: string; id: string }>;
}) {
    const { type, id } = await params;

    if (type !== "movie" && type !== "tv") {
        return notFound();
    }

    const data = await getDetails(type, id);
    const providersData = await getWatchProviders(type, id);

    if (!data) {
        return notFound();
    }

    const title = data.title || data.name;
    const releaseDate = data.release_date || data.first_air_date;
    const year = releaseDate ? new Date(releaseDate).getFullYear() : "N/A";
    const runtime = data.runtime || (data.episode_run_time ? data.episode_run_time[0] : null);
    const backdrop = data.backdrop_path
        ? `${TMDB_IMAGE_BASE_URL}/original${data.backdrop_path}`
        : null;
    const poster = data.poster_path
        ? `${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}`
        : null;

    // Get US streaming providers
    const usProviders = providersData?.results?.US;

    return (
        <main className="min-h-screen pb-24 bg-background text-foreground overflow-x-hidden">
            {/* Hero Section */}
            <div className="relative h-[40vh] md:h-[60vh] w-full overflow-hidden">
                {backdrop ? (
                    <Image
                        src={backdrop}
                        alt={title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                ) : (
                    <div className="h-full w-full bg-muted" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-4 md:p-8">
                    <Link
                        href="/"
                        className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Search
                    </Link>
                    <h1 className="text-3xl font-bold md:text-5xl">{title}</h1>
                    <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        {year !== "N/A" && (
                            <span className="flex items-center">
                                <Calendar className="mr-1 h-4 w-4" /> {year}
                            </span>
                        )}
                        {runtime && (
                            <span className="flex items-center">
                                <Clock className="mr-1 h-4 w-4" /> {runtime} min
                            </span>
                        )}
                        {data.vote_average && (
                            <span className="flex items-center text-yellow-500">
                                <Star className="mr-1 h-4 w-4 fill-current" />
                                {data.vote_average.toFixed(1)}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl px-4 md:px-8">
                <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                    {/* Poster & Actions */}
                    <div className="-mt-24 relative z-10 space-y-4 mx-auto max-w-[200px] md:mx-0 md:max-w-none">
                        <div className="overflow-hidden rounded-xl shadow-2xl aspect-[2/3]">
                            {poster ? (
                                <Image
                                    src={poster}
                                    alt={title}
                                    width={300}
                                    height={450}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                    No Poster
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <ActionButtons
                            item={{
                                id: data.id,
                                type: type as "movie" | "tv",
                                title: title,
                                poster_path: data.poster_path,
                                release_date: releaseDate,
                                vote_average: data.vote_average
                            }}
                        />
                    </div>

                    {/* Details */}
                    <div className="space-y-8 pt-4 md:pt-0 w-full max-w-full overflow-hidden">
                        <div className="flex flex-wrap gap-2">
                            {data.genres?.map((genre: any) => (
                                <span key={genre.id} className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md">
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4 text-sm text-gray-300">
                            {releaseDate && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(releaseDate).getFullYear()}
                                </div>
                            )}
                            {data.vote_average > 0 && (
                                <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    {data.vote_average.toFixed(1)}
                                </div>
                            )}
                            {data.runtime > 0 && (
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {Math.floor(data.runtime / 60)}h {data.runtime % 60}m
                                </div>
                            )}
                        </div>



                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Overview</h3>
                            <p className="leading-relaxed text-gray-300">
                                {data.overview || "No overview available."}
                            </p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            {data.imdb_id && (
                                <a
                                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded-md bg-[#f5c518] px-3 py-1.5 text-xs font-bold text-black hover:bg-[#e2b60f]"
                                >
                                    IMDb
                                </a>
                            )}
                            {/* Does The Dog Die Integration */}
                            <a
                                href={`https://www.doesthedogdie.com/search?q=${encodeURIComponent(title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-red-700 text-center"
                            >
                                Does The Dog Die?
                            </a>
                        </div>

                        {/* Streaming Availability */}
                        {usProviders && (usProviders.flatrate || usProviders.free || usProviders.ads) && (
                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold">Where to Watch</h3>
                                <div className="flex flex-wrap gap-3">
                                    {[...(usProviders.flatrate || []), ...(usProviders.free || []), ...(usProviders.ads || [])].map((provider: any) => (
                                        <div
                                            key={provider.provider_id}
                                            className="flex flex-col items-center gap-1"
                                            title={provider.provider_name}
                                        >
                                            <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                                                <Image
                                                    src={`${TMDB_IMAGE_BASE_URL}/w92${provider.logo_path}`}
                                                    alt={provider.provider_name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-[10px] text-center text-muted-foreground max-w-[60px] truncate">
                                                {provider.provider_name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Streaming data provided by JustWatch
                                </p>
                            </div>
                        )}

                        {/* Cast */}
                        {data.credits?.cast?.length > 0 && (
                            <section>
                                <h2 className="mb-4 text-xl font-semibold">Top Cast</h2>
                                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                    {data.credits.cast.slice(0, 10).map((actor: any) => (
                                        <a
                                            key={actor.id}
                                            href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(actor.name)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-24 flex-none space-y-2 transition-transform hover:scale-105"
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
                                        </a>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Seasons (TV Only) */}
                        {type === "tv" && data.seasons && (
                            <section>
                                <h2 className="mb-4 text-xl font-semibold">Seasons</h2>
                                <div className="space-y-4">
                                    {data.seasons.map((season: any) => (
                                        season.season_number > 0 && (
                                            <Link
                                                key={season.id}
                                                href={`/tv/${id}/season/${season.season_number}`}
                                                className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                                            >
                                                <div className="relative h-24 w-16 flex-none overflow-hidden rounded-md bg-muted">
                                                    {season.poster_path ? (
                                                        <Image
                                                            src={`${TMDB_IMAGE_BASE_URL}/w185${season.poster_path}`}
                                                            alt={season.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                                            No Image
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">{season.name}</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {season.episode_count} Episodes • {season.air_date ? new Date(season.air_date).getFullYear() : "TBA"}
                                                    </p>
                                                </div>
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* External Links */}
                        <section className="flex gap-4 pt-4 border-t border-border">
                            {data.imdb_id && (
                                <a
                                    href={`https://www.imdb.com/title/${data.imdb_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                                >
                                    View on IMDb
                                </a>
                            )}
                            <a
                                href={`https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(title + " " + (type === 'movie' ? 'film' : 'tv series'))}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline"
                            >
                                Search on Wikipedia
                            </a>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
