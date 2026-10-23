import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNotFoundContent } from "@/lib/content";

export default function NotFound() {
  const content = getNotFoundContent();

  return (
    <div className="surface-grid flex min-h-[75vh] items-center py-24">
      <Container className="text-center">
        <p className="text-gradient-brand font-mono text-7xl font-semibold tracking-tighter sm:text-8xl">
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
