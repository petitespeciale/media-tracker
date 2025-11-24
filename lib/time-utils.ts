export function formatDisplay(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

export function parseTime(timeStr: string): number {
    // Trim whitespace
    const trimmed = timeStr.trim();
    // Replace any non-digit characters (except colon) with colon to normalize
    const normalized = trimmed.replace(/[^0-9:]/g, ':');
    // If contains colon, split normally
    if (normalized.includes(':')) {
        const parts = normalized.split(':').filter(p => p.length > 0).map(p => parseInt(p, 10) || 0);
        if (parts.length === 3) {
            // H:MM:SS
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        if (parts.length === 2) {
            // MM:SS
            return parts[0] * 60 + parts[1];
        }
        // Single part with colon (unlikely) treat as seconds
        return parts[0] || 0;
    }
    // No colon – handle compact MMSS (e.g., "2520" -> 25:20)
    if (/^\d{4}$/.test(normalized)) {
        const mins = parseInt(normalized.slice(0, 2), 10);
        const secs = parseInt(normalized.slice(2), 10);
        return mins * 60 + secs;
    }
    // Fallback: treat as seconds
    const num = parseInt(normalized, 10);
    return isNaN(num) ? 0 : num;
}
