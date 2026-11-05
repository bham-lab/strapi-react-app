import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center py-16">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-brand text-8xl font-extrabold tracking-tight sm:text-9xl">
            404
          </p>
          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            page not found
          </h1>
          <p className="text-muted mx-auto mt-4 max-w-md text-base leading-7">
            Sorry, we couldn't find the page you're looking for. It may have
            been moved, deleted, or the URL might be incorrect.
          </p>

          <div className="mt-8 justify-center">
            <Button>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-slate-500">Error code: 404</p>
        </div>
      </Container>
    </main>
  );
}
