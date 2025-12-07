"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4 text-destructive">
                <AlertTriangle className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md">
                We encountered an unexpected error. Please try again.
            </p>
            <button
                onClick={reset}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
                Try again
            </button>
        </div>
    );
}
