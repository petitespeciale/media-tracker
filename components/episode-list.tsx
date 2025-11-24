"use client";

import { useStore } from "@/context/store";
import { TMDB_IMAGE_BASE_URL } from "@/lib/tmdb";
import { Calendar, Check, Clock } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { formatDisplay, parseTime } from "@/lib/time-utils";

export function EpisodeList({
    showId,
    seasonNumber,
    episodes,
    showName,
    showPoster
}: {
    showId: number;
    seasonNumber: number;
    episodes: any[];
    showName: string;
    showPoster: string | null;
}) {
    const { getItem, updateItem } = useStore();
    const showItem = getItem(showId);
    const watchedEpisodes = showItem?.watchedEpisodes || [];

    const toggleEpisode = (episodeId: number) => {
        const isWatched = watchedEpisodes.includes(episodeId);
        let newWatchedEpisodes;

        if (isWatched) {
            newWatchedEpisodes = watchedEpisodes.filter(id => id !== episodeId);
        } else {
            newWatchedEpisodes = [...watchedEpisodes, episodeId];
        }

        updateShow(newWatchedEpisodes, showItem?.episodeProgress);
    };

    const updateProgress = (episodeId: number, seconds: number) => {
        const currentProgress = showItem?.episodeProgress || {};
        const newProgress = { ...currentProgress, [episodeId]: seconds };

        // If progress is 0, maybe remove it? For now keeping it simple.
        updateShow(showItem?.watchedEpisodes, newProgress);
    };

    const updateShow = (watched: number[] | undefined, progress: Record<number, number> | undefined) => {
        const newItem = showItem || {
            id: showId,
            type: "tv",
            title: showName,
            poster_path: showPoster,
            release_date: null,
            vote_average: 0,
            status: "watching"
        };

        updateItem({
            ...newItem,
            watchedEpisodes: watched,
            episodeProgress: progress,
            status: newItem.status === "plan" ? "watching" : newItem.status // Auto-switch to watching
        });
    };

    return (
        <div className="grid gap-4">
            {episodes.map((episode: any) => {
                const isWatched = watchedEpisodes.includes(episode.id);

                return (
                    <div
                        key={episode.id}
                        className={cn(
                            "flex flex-col gap-4 rounded-xl border bg-card p-4 md:flex-row transition-colors",
                            isWatched ? "border-primary/50 bg-primary/5" : "border-border"
                        )}
                    >
                        <div className="relative h-32 w-full flex-none overflow-hidden rounded-lg bg-muted md:w-56">
                            {episode.still_path ? (
                                <Image
                                    src={`${TMDB_IMAGE_BASE_URL}/w300${episode.still_path}`}
                                    alt={episode.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                    No Image
                                </div>
                            )}

                            <button
                                onClick={() => toggleEpisode(episode.id)}
                                className={cn(
                                    "absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-medium shadow-lg transition-all active:scale-95",
                                    isWatched
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                                )}
                            >
                                <Check className="h-3 w-3" />
                                {isWatched ? "Watched" : "Mark Watched"}
                            </button>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium">
                                        {episode.episode_number}. {episode.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {episode.air_date} • <Clock className="ml-2 mr-1 h-3 w-3" /> {episode.runtime} min
                                    </p>
                                </div>
                                <EpisodeProgressInput
                                    episodeId={episode.id}
                                    initialSeconds={showItem?.episodeProgress?.[episode.id] || 0}
                                    onUpdate={(secs) => updateProgress(episode.id, secs)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                                {episode.overview}
                            </p>

                            {/* Guest Stars */}
                            {episode.guest_stars?.length > 0 && (
                                <div className="mt-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {episode.guest_stars.slice(0, 5).map((star: any) => (
                                        <div key={star.id} className="flex-none text-[10px] text-center w-12">
                                            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted mb-1 mx-auto">
                                                {star.profile_path && (
                                                    <Image
                                                        src={`${TMDB_IMAGE_BASE_URL}/w185${star.profile_path}`}
                                                        alt={star.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <span className="block truncate">{star.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function EpisodeProgressInput({ episodeId, initialSeconds, onUpdate }: { episodeId: number, initialSeconds: number, onUpdate: (s: number) => void }) {
    const [input, setInput] = useState(initialSeconds > 0 ? formatDisplay(initialSeconds) : "");

    // Sync with external changes (e.g. cloud sync)
    useEffect(() => {
        if (initialSeconds > 0 && document.activeElement !== document.getElementById(`ep-input-${episodeId}`)) {
            setInput(formatDisplay(initialSeconds));
        }
    }, [initialSeconds, episodeId]);

    return (
        <input
            id={`ep-input-${episodeId}`}
            type="text"
            placeholder="--:--"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onBlur={(e) => {
                const secs = parseTime(e.target.value);
                onUpdate(secs);
                setInput(secs > 0 ? formatDisplay(secs) : "");
            }}
            className="w-16 rounded border border-input bg-transparent px-1 py-1 text-right text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
        />
    );
}
