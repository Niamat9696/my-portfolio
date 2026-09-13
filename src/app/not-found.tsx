import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNotFoundContent } from "@/lib/content";

export default function NotFound() {
  const content = getNotFoundContent();

  return (
    <div className="flex min-h-[70vh] items-center py-24">
      <Container className="text-center">
        <p className="font-mono text-6xl font-semibold text-primary sm:text-7xl">
          {content.title}
        </p>
        <p className="mt-4 text-lg text-foreground-secondary">{content.message}</p>
        <div className="mt-8">
          <Button href="/" variant="primary">
            {content.ctaLabel}
          </Button>
        </div>
      </Container>
    </div>
  );
}
