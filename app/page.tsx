import { SearchBar } from "@/components/search-bar";
import { MediaList } from "@/components/media-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-24 p-4 md:p-24">
      <div className="flex w-full max-w-md md:max-w-7xl flex-col items-center space-y-8 text-center">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl animate-gradient-x leading-none -mb-2">
            <span className="font-normal tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-[#ce0000] mr-1">media</span><span className="font-bold tracking-tighter text-[#ce0000]">TRACKER</span>
          </h1>
          <p className="text-lg font-medium text-[#e2d2c2] mb-4">
            your personal cinema log
          </p>
          <p className="text-muted-foreground">
            Track what you watch. Remember every story.
          </p>
        </div>

        <Suspense>
          <SearchBar />
        </Suspense>

        <div className="w-full pt-8">
          <MediaList />
        </div>
      </div>
    </main>
  );
}
