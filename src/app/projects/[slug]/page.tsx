import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { TechPill } from "@/components/ui/TechPill";
import { ProjectImagePlaceholder } from "@/components/projects/ProjectImagePlaceholder";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { getProjectBySlug, getProjectSlugs, getUiLabels } from "@/lib/content";
import { projectStatusLabels } from "@/constants/project-status";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const description = project.shortDescription ?? project.description ?? undefined;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      type: "article",
    },
  };
}

interface DetailBlockProps {
  title: string;
  children: ReactNode;
}

function DetailBlock({ title, children }: DetailBlockProps) {
  return (
    <div className="border-t border-border pt-8">
      <h2 className="font-mono text-sm uppercase tracking-wide text-accent">{title}</h2>
      <div className="mt-3 max-w-[70ch] text-base leading-relaxed text-foreground-secondary">
        {children}
      </div>
    </div>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const uiLabels = getUiLabels();
  const gallery = project.images.length > 0 ? project.images : project.image ? [project.image] : [];

  return (
    <article className="py-24">
      <Container className="max-w-4xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {uiLabels.backToProjectsLabel}
        </Link>

        <header className="mt-6">
          {project.category && (
            <p className="font-mono text-xs uppercase tracking-wide text-accent">
              {project.category}
            </p>
          )}
          <h1 className="mt-2 text-[clamp(1.75rem,1.35rem+2vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
            {project.title}
          </h1>

          {project.status && (
            <span className="mt-4 inline-flex items-center rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-foreground-secondary">
              {projectStatusLabels[project.status]}
            </span>
          )}

          {project.shortDescription && (
            <p className="mt-4 max-w-[65ch] text-lg leading-relaxed text-foreground-secondary">
              {project.shortDescription}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {uiLabels.liveSiteLabel}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" aria-hidden="true" />
                {uiLabels.viewOnGithubLabel}
              </a>
            )}
          </div>
        </header>

        <div className="relative mt-10 aspect-16/10 overflow-hidden rounded-xl border border-border">
          {gallery.length > 0 ? (
            <Image
              src={gallery[0].src}
              alt={gallery[0].alt}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <ProjectImagePlaceholder title={project.title} />
          )}
        </div>

        {gallery.length > 1 && (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.slice(1).map((image) => (
              <div
                key={image.src}
                className="relative aspect-16/10 overflow-hidden rounded-lg border border-border"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 space-y-8">
          {project.description && (
            <DetailBlock title={uiLabels.overviewLabel}>{project.description}</DetailBlock>
          )}
          {project.problem && (
            <DetailBlock title={uiLabels.problemLabel}>{project.problem}</DetailBlock>
          )}
          {project.role && <DetailBlock title={uiLabels.myRoleLabel}>{project.role}</DetailBlock>}

          {project.architecture && (
            <DetailBlock title={uiLabels.architectureLabel}>
              <p>{project.architecture}</p>
              <div className="mt-6">
                <ArchitectureDiagram />
              </div>
            </DetailBlock>
          )}

          {project.keyFeatures.length > 0 && (
            <DetailBlock title={uiLabels.keyFeaturesLabel}>
              <ul className="space-y-2">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </DetailBlock>
          )}

          {project.challenges.length > 0 && (
            <DetailBlock title={uiLabels.technicalChallengesLabel}>
              <ul className="space-y-2">
                {project.challenges.map((challenge) => (
                  <li key={challenge} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </DetailBlock>
          )}

          {project.solution && (
            <DetailBlock title={uiLabels.solutionsLabel}>{project.solution}</DetailBlock>
          )}
          {project.results && (
            <DetailBlock title={uiLabels.resultsImpactLabel}>{project.results}</DetailBlock>
          )}

          {project.technologies.length > 0 && (
            <DetailBlock title={uiLabels.technologyStackLabel}>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            </DetailBlock>
          )}
        </div>
      </Container>
    </article>
  );
}
