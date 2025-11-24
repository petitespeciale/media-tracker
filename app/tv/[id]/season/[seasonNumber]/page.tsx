import { getSeasonDetails, TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { EpisodeList } from "@/components/episode-list";

export default async function SeasonPage({
    params,
}: {
    params: Promise<{ id: string; seasonNumber: string }>;
}) {
    const { id, seasonNumber } = await params;
    const data = await getSeasonDetails(id, parseInt(seasonNumber));

    if (!data) {
        return notFound();
    }

    const poster = data.poster_path
        ? `${TMDB_IMAGE_BASE_URL}/w500${data.poster_path}`
        : null;

    return (
        <main className="min-h-screen pb-24 bg-background text-foreground">
            <div className="mx-auto max-w-4xl p-4 md:p-8">
                <Link
                    href={`/tv/${id}`}
                    className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-primary"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Show
                </Link>

                <div className="mb-8 flex flex-col gap-6 md:flex-row">
                    <div className="relative h-[300px] w-[200px] flex-none overflow-hidden rounded-xl shadow-xl">
                        {poster ? (
                            <Image
                                src={poster}
                                alt={data.name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                                No Poster
                            </div>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{data.name}</h1>
                        <p className="mt-2 text-muted-foreground">
                            {data.episodes?.length} Episodes • {data.air_date ? new Date(data.air_date).getFullYear() : ""}
                        </p>
                        <p className="mt-4 leading-relaxed text-muted-foreground">
                            {data.overview || "No overview available for this season."}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Episodes</h2>
                    <EpisodeList
                        showId={parseInt(id)}
                        seasonNumber={parseInt(seasonNumber)}
                        episodes={data.episodes}
                        showName={data.name}
                        showPoster={data.poster_path}
                    />
                </div>
            </div>
        </main>
    );
}
