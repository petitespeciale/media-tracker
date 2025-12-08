const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";

if (!API_KEY) {
    console.error("TMDB API Key is missing. Please check .env.local");
}

export const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

export async function fetchTMDB(endpoint: string, params: Record<string, string> = {}) {
    if (!API_KEY) {
        console.error("[TMDB] API Key is missing! Check .env.local and NEXT_PUBLIC_ prefix.");
    }

    const query = new URLSearchParams({
        api_key: API_KEY || "",
        language: "en-US",
        ...params,
    });

    const url = `${BASE_URL}${endpoint}?${query.toString()}`;
    console.log(`[TMDB] Fetching: ${url.replace(API_KEY || "", "HIDDEN_KEY")}`);

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`[TMDB] Error ${res.status}: ${res.statusText} for URL: ${url.replace(API_KEY || "", "HIDDEN_KEY")}`);
            throw new Error(`TMDB API Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        // console.log(`[TMDB] Success for ${endpoint}`);
        return data;
    } catch (error) {
        console.error("Failed to fetch from TMDB:", error);
        return null;
    }
}

export async function searchMulti(query: string) {
    return fetchTMDB("/search/multi", { query });
}

export async function getTrending() {
    return fetchTMDB("/trending/all/week");
}

export async function getDetails(type: "movie" | "tv", id: string) {
    return fetchTMDB(`/${type}/${id}`, {
        append_to_response: "credits,similar,videos,images",
    });
}


export async function getSeasonDetails(tvId: string, seasonNumber: number) {
    return fetchTMDB(`/tv/${tvId}/season/${seasonNumber}`);
}

export async function getWatchProviders(type: "movie" | "tv", id: string) {
    return fetchTMDB(`/${type}/${id}/watch/providers`);
}

export async function getPersonCredits(personId: string) {
    return fetchTMDB(`/person/${personId}/combined_credits`);
}
