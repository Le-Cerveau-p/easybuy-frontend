import { AlertTriangle, ArrowLeft, Home, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function NotFoundPage() {
  const location = useLocation();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-card p-6 text-center shadow-xl sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          404 - Page not found
        </p>
        <h1 className="mb-3 text-3xl font-bold sm:text-4xl">
          We couldn&apos;t find this page
        </h1>
        <p className="mx-auto mb-6 max-w-md text-muted-foreground">
          The page at{" "}
          <span className="break-words font-semibold text-foreground">
            {location.pathname}
          </span>{" "}
          does not exist or may have been moved.
        </p>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            to="/products"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-5 py-3 font-semibold transition-all hover:bg-muted"
          >
            <Search className="h-4 w-4" />
            Browse Products
          </Link>
        </div>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
        >
          <ArrowLeft className="h-4 w-4" />
          Go back to previous page
        </button>
      </div>
    </div>
  );
}
