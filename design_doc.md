# Media Tracker App - Design Document

## 1. Product Vision
A simplified, beautiful media tracking application focused on two core lists: "Watched" and "Want to Watch". The app supports both Movies and TV Shows (down to the episode level) and provides rich metadata including cast members and external links.

## 2. Core Features

### 2.1 Search & Discovery
- **Unified Search**: Search bar that accepts Movie titles, TV Show titles, or Episode names.
- **Results**: Display results with posters, titles, and release years.
- **Filtering**: Toggle between Movies and TV Shows.

### 2.2 Content Details
- **Movies**:
    - Poster, Title, Year, Runtime, Genre, Overview.
    - Cast List (Actor Name, Character Name, Photo).
    - Links: IMDb, Wikipedia.
- **TV Shows**:
    - Show Details (similar to movies).
    - **Season View**: List of seasons.
    - **Episode View**: List of episodes per season with plot summaries and air dates.
    - Cast List (Series regulars and Guest stars per episode).

### 2.3 User Lists (The "Tracker")
- **Watched**: A history of items the user has completed.
- **Want to Watch**: A watchlist for future viewing.
- **Quick Actions**: "Add to Watched" and "Add to Watchlist" buttons on every content page.

## 3. Technical Architecture

### 3.1 Tech Stack
- **Framework**: Next.js (React)
- **Styling**: TailwindCSS (Custom design system)
- **Data Source**: TMDB (The Movie Database) API
- **State Management**: React Context + LocalStorage (MVP)

### 3.2 Data Model (Simplified)
```typescript
interface MediaItem {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  poster_path: string;
  release_date: string;
}

interface UserLists {
  watched: MediaItem[];
  watchlist: MediaItem[];
}
```

## 4. Design Guidelines
- **Aesthetic**: Premium, dark mode default, vibrant accent colors (e.g., violet/teal gradients).
- **Layout**: Mobile-first responsive design.
- **Interactions**: Smooth transitions, instant feedback on list actions.
