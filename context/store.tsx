"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/auth-context";

export type MediaStatus = "watched" | "watching" | "plan";

export interface MediaItem {
    id: number;
    type: "movie" | "tv";
    title: string;
    poster_path: string | null;
    release_date: string | null;
    vote_average: number;
    status?: MediaStatus;
    dateWatched?: string;
    progress?: number;
    notes?: string;
    rating?: number;
    watchedEpisodes?: number[];
    episodeProgress?: Record<number, number>;
}

interface StoreContextType {
    items: Record<number, MediaItem>;
    updateItem: (item: MediaItem) => void;
    removeItem: (id: number) => void;
    getItem: (id: number) => MediaItem | undefined;
    getWatched: () => MediaItem[];
    getWatchlist: () => MediaItem[];
    getWatching: () => MediaItem[];
    syncing: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<Record<number, MediaItem>>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const { user } = useAuth();

    // Load from localStorage on mount
    useEffect(() => {
        const savedItems = localStorage.getItem("media_tracker_items");
        if (savedItems) {
            setItems(JSON.parse(savedItems));
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("media_tracker_items", JSON.stringify(items));
        }
    }, [items, isLoaded]);

    // Sync with Supabase when user logs in
    useEffect(() => {
        if (user && isLoaded) {
            syncWithCloud();
        }
    }, [user, isLoaded]);

    const syncWithCloud = async () => {
        if (!user) return;

        setSyncing(true);
        try {
            console.log('Starting cloud sync...');

            // Fetch cloud data
            const { data: cloudItems, error } = await supabase
                .from('media_items')
                .select('*')
                .eq('user_id', user.id);

            if (error) {
                console.error('Supabase fetch error:', error);
                throw error;
            }

            console.log('Cloud items fetched:', cloudItems?.length);

            // Merge local and cloud data
            const cloudMap: Record<number, any> = {};
            cloudItems?.forEach(item => {
                cloudMap[item.id] = item;
            });

            const localItems = Object.values(items);
            const mergedItems: Record<number, MediaItem> = {};

            // Add all cloud items
            cloudItems?.forEach(cloudItem => {
                console.log('Processing cloud item:', cloudItem.id, cloudItem.type, cloudItem.title);
                mergedItems[cloudItem.id] = {
                    id: cloudItem.id,
                    type: cloudItem.type,
                    title: cloudItem.title,
                    poster_path: cloudItem.poster_path,
                    release_date: cloudItem.release_date,
                    vote_average: cloudItem.vote_average,
                    status: cloudItem.status,
                    dateWatched: cloudItem.date_watched,
                    progress: cloudItem.progress,
                    notes: cloudItem.notes,
                    rating: cloudItem.rating,
                    watchedEpisodes: cloudItem.watched_episodes || [],
                    episodeProgress: cloudItem.episode_progress || {},
                };
            });

            // Upload local items that aren't in cloud
            for (const localItem of localItems) {
                if (!cloudMap[localItem.id]) {
                    console.log('Uploading local item to cloud:', localItem.id);
                    // Upload to cloud
                    await supabase.from('media_items').insert({
                        id: localItem.id,
                        user_id: user.id,
                        type: localItem.type,
                        title: localItem.title,
                        poster_path: localItem.poster_path,
                        release_date: localItem.release_date,
                        vote_average: localItem.vote_average,
                        status: localItem.status,
                        date_watched: localItem.dateWatched,
                        progress: localItem.progress,
                        notes: localItem.notes,
                        rating: localItem.rating,
                        watched_episodes: localItem.watchedEpisodes,
                        episode_progress: localItem.episodeProgress,
                    });
                    mergedItems[localItem.id] = localItem;
                }
            }

            console.log('Merged items:', Object.keys(mergedItems).length);
            console.log('Sample merged item:', Object.values(mergedItems)[0]);
            setItems(mergedItems);
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            setSyncing(false);
        }
    };

    const syncItemToCloud = async (item: MediaItem) => {
        if (!user) return;

        try {
            await supabase.from('media_items').upsert({
                id: item.id,
                user_id: user.id,
                type: item.type,
                title: item.title,
                poster_path: item.poster_path,
                release_date: item.release_date,
                vote_average: item.vote_average,
                status: item.status,
                date_watched: item.dateWatched,
                progress: item.progress,
                notes: item.notes,
                rating: item.rating,
                watched_episodes: item.watchedEpisodes,
                episode_progress: item.episodeProgress,
                updated_at: new Date().toISOString(),
            });
        } catch (error) {
            console.error('Failed to sync item:', error);
        }
    };

    const updateItem = (item: MediaItem) => {
        setItems((prev) => ({
            ...prev,
            [item.id]: { ...prev[item.id], ...item }
        }));
        syncItemToCloud(item);
    };

    const removeItem = (id: number) => {
        setItems((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
        });

        if (user) {
            supabase.from('media_items').delete().eq('id', id).eq('user_id', user.id);
        }
    };

    const getItem = (id: number) => items[id];
    const getWatched = () => Object.values(items).filter((i) => i.status === "watched");
    const getWatchlist = () => Object.values(items).filter((i) => i.status === "plan");
    const getWatching = () => Object.values(items).filter((i) => i.status === "watching");

    return (
        <StoreContext.Provider
            value={{
                items,
                updateItem,
                removeItem,
                getItem,
                getWatched,
                getWatchlist,
                getWatching,
                syncing,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
}

export function useStore() {
    const context = useContext(StoreContext);
    if (context === undefined) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
}
