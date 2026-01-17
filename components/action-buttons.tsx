"use client";

import { useStore, MediaItem } from "@/context/store";
import { Check, Plus, Eye, Calendar, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function ActionButtons({ item }: { item: MediaItem }) {
    const { updateItem, getItem, removeItem } = useStore();
    const normalizedId = Number(item.id);
    const storedItem = getItem(normalizedId);
    const status = storedItem?.status;

    // Debugging
    console.log(`[ActionButtons] Item: ${normalizedId} Status: ${status}`);

    // Date picker state
    const [showDatePicker, setShowDatePicker] = useState(false);
    // Watch time input state (displayed as MM:SS or H:MM:SS)
    const [watchInput, setWatchInput] = useState(
        storedItem?.progress ? formatDisplay(storedItem.progress) : '0:00'
    );




    const handleWatched = () => {
        console.log('[ActionButtons] Setting status to watched');
        updateItem({
            ...item,
            id: normalizedId,
            status: "watched",
            dateWatched: storedItem?.dateWatched || new Date().toISOString()
        });
    };

    const handleWatchlist = () => {
        if (status === "plan") {
            removeItem(normalizedId);
        } else {
            updateItem({ ...item, id: normalizedId, status: "plan" });
        }
    };

    const handleWatching = () => {
        updateItem({ ...item, id: normalizedId, status: "watching", dateWatched: new Date().toISOString() });
    };

    const handleDateChange = (date: string) => {
        // If the date string is empty, clear the dateWatched field
        const newDate = date ? date : undefined;
        updateItem({ ...item, id: normalizedId, status: "watched", dateWatched: newDate });
        setShowDatePicker(false);
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
                <button
                    onClick={handleWatched}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 rounded-lg py-3 text-xs font-medium transition-all active:scale-95",
                        status === "watched"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                >
                    <Check className="h-4 w-4" />
                    Watched
                </button>

                <button
                    onClick={handleWatching}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 rounded-lg py-3 text-xs font-medium transition-all active:scale-95",
                        status === "watching"
                            ? "bg-blue-600 text-white"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                >
                    <Play className="h-4 w-4" />
                    Watching
                </button>

                <button
                    onClick={handleWatchlist}
                    className={cn(
                        "flex flex-col items-center justify-center gap-1 rounded-lg py-3 text-xs font-medium transition-all active:scale-95",
                        status === "plan"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                >
                    <Plus className="h-4 w-4" />
                    {item.type === 'tv' ? 'Track Series' : 'Watchlist'}
                </button>
            </div>

            {status === "watched" && (
                <>
                    <div className="space-y-3 rounded-lg border-2 border-primary/20 bg-muted/50 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Date Watched:</span>
                            <input
                                type="date"
                                value={storedItem?.dateWatched?.split('T')[0] || ''}
                                onChange={(e) => handleDateChange(e.target.value)}
                                onClick={(e) => e.currentTarget.showPicker()}
                                className="bg-background text-sm font-medium focus:outline-none text-right border border-border rounded px-2 py-1 cursor-pointer hover:bg-muted/50"
                            />
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                            <input
                                type="checkbox"
                                id="no-date"
                                checked={!storedItem?.dateWatched}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        handleDateChange('');
                                    } else {
                                        handleDateChange(new Date().toISOString().split('T')[0]);
                                    }
                                }}
                                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary"
                            />
                            <label htmlFor="no-date" className="text-sm text-muted-foreground select-none cursor-pointer">
                                No specific date
                            </label>
                        </div>
                        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                            <input
                                type="checkbox"
                                id="did-not-finish"
                                checked={storedItem?.didNotFinish || false}
                                onChange={(e) => updateItem({ ...item, id: normalizedId, status: "watched", didNotFinish: e.target.checked })}
                                className="h-4 w-4 rounded border-primary text-primary focus:ring-primary accent-primary"
                            />
                            <label htmlFor="did-not-finish" className="text-sm font-medium text-red-500/80 select-none cursor-pointer">
                                Did not finish
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-sm font-medium">How did you like it?</span>
                        <div className="grid grid-cols-4 gap-2">
                            {[
                                { value: 0, label: "Nope", emoji: "😞" },
                                { value: 1, label: "Not For Me", emoji: "😐" },
                                { value: 2, label: "Liked It", emoji: "😊" },
                                { value: 3, label: "Loved It", emoji: "😍" }
                            ].map(({ value, label, emoji }) => (
                                <button
                                    key={value}
                                    onClick={() => updateItem({ ...item, status: "watched", rating: value })}
                                    className={cn(
                                        "relative flex flex-col items-center gap-1 rounded-lg p-2 text-xs font-medium transition-all active:scale-95",
                                        storedItem?.rating === value
                                            ? "bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background"
                                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                                    )}
                                >
                                    {storedItem?.rating === value && (
                                        <Check className="absolute top-1 right-1 h-3 w-3" />
                                    )}
                                    <span className="text-lg">{emoji}</span>
                                    <span className="text-[10px] leading-tight text-center">{label}</span>
                                </button>
                            ))}
                        </div>
                        {storedItem?.rating !== undefined && (
                            <p className="text-xs text-center text-primary font-medium">
                                ✓ Rated as {["Nope", "Not For Me", "Liked It", "Loved It"][storedItem.rating]}
                            </p>
                        )}
                    </div>
                </>
            )}

            {status === "watching" && item.type !== "tv" && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border border-border bg-card p-3">
                        <span className="text-sm text-muted-foreground">Time Watched:</span>
                        <input
                            type="text"
                            placeholder="MM:SS"
                            value={watchInput}
                            onChange={e => setWatchInput(e.target.value)}
                            onBlur={e => {
                                const seconds = parseTime(e.target.value);
                                updateItem({ ...item, status: "watching", progress: seconds });
                                setWatchInput(formatDisplay(seconds));
                            }}
                            className="w-24 bg-transparent text-sm font-medium text-right focus:outline-none border border-input rounded px-2 py-1"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Format: MM:SS or H:MM:SS</p>
                </div>
            )}
        </div>
    );
}
// Helper: format seconds for display (MM:SS or H:MM:SS)
function formatDisplay(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Helper: parse user input (MM:SS or H:MM:SS) into seconds
function parseTime(timeStr: string): number {
    // Trim whitespace
    const trimmed = timeStr.trim();
    // If contains colon, split normally
    if (trimmed.includes(':')) {
        const parts = trimmed.split(':').map(p => parseInt(p, 10) || 0);
        if (parts.length === 3) {
            // H:MM:SS
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        if (parts.length === 2) {
            // MM:SS
            return parts[0] * 60 + parts[1];
        }
        return parts[0] || 0;
    }
    // No colon – handle compact MMSS (e.g., "2520" -> 25:20)
    if (/^\d{4}$/.test(trimmed)) {
        const mins = parseInt(trimmed.slice(0, 2), 10);
        const secs = parseInt(trimmed.slice(2), 10);
        return mins * 60 + secs;
    }
    // Fallback: treat as seconds
    const num = parseInt(trimmed, 10);
    return isNaN(num) ? 0 : num;
}
