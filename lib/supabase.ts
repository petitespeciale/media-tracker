import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DbMediaItem {
    id: number;
    user_id: string;
    type: 'movie' | 'tv';
    title: string;
    poster_path: string | null;
    release_date: string | null;
    vote_average: number;
    status?: 'watched' | 'watching' | 'plan';
    date_watched?: string;
    progress?: number;
    notes?: string;
    rating?: number;
    watched_episodes?: number[];
    created_at?: string;
    updated_at?: string;
}
