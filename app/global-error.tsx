"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        Sentry.captureException(error);
    }, [error]);
    return (
        <html>
            <body className="bg-background text-foreground">
                <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
                    <div className="rounded-full bg-destructive/10 p-4 text-destructive">
                        <AlertTriangle className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold">Something went wrong!</h2>
                    <p className="text-muted-foreground">
                        A critical error occurred. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Refresh Page
                    </button>
                </div>
            </body>
        </html>
    );
}
