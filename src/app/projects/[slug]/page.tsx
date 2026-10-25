import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Layers3, MoveUpRight } from "lucide-react";
import { CaseStudyNav } from "@/components/projects/CaseStudyNav";
import { ArchitectureDiagram } from "@/components/projects/ArchitectureDiagram";
import { ProjectImagePlaceholder } from "@/components/projects/ProjectImagePlaceholder";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TechPill } from "@/components/ui/TechPill";
import { projectStatusLabels } from "@/constants/project-status";
import { withBasePath } from "@/lib/base-path";
import { getProjectBySlug, getProjects, getProjectSlugs, getUiLabels } from "@/lib/content";

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
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `/projects/${project.slug}`,
      ...(project.image
        ? {
            images: [
              {
                url: withBasePath(project.image.src),
                width: project.image.width,
                height: project.image.height,
                alt: project.image.alt,
              },
            ],
          }
        : {}),
    },
  };
}

interface DetailBlockProps {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
  emphasis?: boolean;
}

function DetailBlock({ id, index, title, children, emphasis = false }: DetailBlockProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`scroll-mt-28 rounded-2xl border p-5 sm:p-8 ${
        emphasis ? "border-primary/20 bg-primary/[0.055]" : "border-white/8 bg-card/35"
      }`}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[10px] tracking-[0.18em] text-gradient-logo">
          {String(index).padStart(2, "0")}
        </span>
        <span className="h-px w-8 bg-gradient-logo-dot opacity-60" aria-hidden="true" />
        <h2
          id={`${id}-title`}
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground"
        >
          {title}
        </h2>
      </div>
      <div className="max-w-[72ch] text-[0.98rem] leading-7 text-foreground-secondary sm:text-base sm:leading-8">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-logo-dot shadow-[0_0_0_4px_rgba(124,58,237,0.1)]"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProjectCaseStudyPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const uiLabels = getUiLabels();
  const projects = getProjects();
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const gallery = project.images.length > 0 ? project.images : project.image ? [project.image] : [];

  const sections = [
    project.description && { id: "overview", label: uiLabels.overviewLabel },
    project.problem && { id: "problem", label: uiLabels.problemLabel },
    project.role && { id: "role", label: uiLabels.myRoleLabel },
    project.architecture && { id: "architecture", label: uiLabels.architectureLabel },
    project.keyFeatures.length > 0 && { id: "features", label: uiLabels.keyFeaturesLabel },
    project.challenges.length > 0 && { id: "challenges", label: uiLabels.technicalChallengesLabel },
    project.solution && { id: "solution", label: uiLabels.solutionsLabel },
    project.results && { id: "results", label: uiLabels.resultsImpactLabel },
    project.technologies.length > 0 && { id: "stack", label: uiLabels.technologyStackLabel },
  ].filter((section): section is { id: string; label: string } => Boolean(section));

  let sectionIndex = 0;
  const nextSectionIndex = () => ++sectionIndex;

  return (
    <article className="pb-24 pt-28 sm:pb-32 sm:pt-32">
      <Container>
        <Link
          href="/#projects"
          className="group inline-flex items-center gap-2 rounded-lg py-2 text-sm text-foreground-secondary transition-colors duration-200 hover:text-foreground"
        >
          <ArrowLeft
            className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1"
            aria-hidden="true"
          />
          {uiLabels.backToProjectsLabel}
        </Link>

        <header className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-card/55 p-6 sm:p-9 lg:p-12">
          <div className="surface-grid absolute inset-0 opacity-45" aria-hidden="true" />
          <div
            className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-primary/15 blur-[110px]"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-accent/[0.06] blur-[100px]"
            aria-hidden="true"
          />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-end lg:gap-16">
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em]">
                <span className="text-gradient-logo">{uiLabels.caseStudyLabel}</span>
                {project.category && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-foreground-secondary/45" aria-hidden="true" />
                    <span className="text-foreground-secondary">{project.category}</span>
                  </>
                )}
              </div>

              <h1 className="mt-5 max-w-4xl text-[clamp(2.5rem,1.55rem+4vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground">
                {project.title}
              </h1>

              {project.shortDescription && (
                <p className="mt-7 max-w-[66ch] text-base leading-7 text-foreground-secondary sm:text-lg sm:leading-8">
                  {project.shortDescription}
                </p>
              )}

              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.liveUrl && (
                    <Button href={project.liveUrl} external variant="primary">
                      {uiLabels.liveSiteLabel}
                      <MoveUpRight className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button href={project.githubUrl} external variant="secondary">
                      <GithubIcon className="h-4 w-4" aria-hidden="true" />
                      {uiLabels.viewOnGithubLabel}
                    </Button>
                  )}
                </div>
              )}
            </div>

            <dl className="grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/10 pt-6 lg:grid-cols-1 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              {project.role && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-secondary/65">
                    {uiLabels.roleLabel}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-foreground">{project.role}</dd>
                </div>
              )}
              {project.status && (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-secondary/65">
                    {uiLabels.statusLabel}
                  </dt>
                  <dd className="mt-2 inline-flex items-center gap-2 text-sm text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_0_4px_rgba(34,197,94,0.08)]" />
                    {projectStatusLabels[project.status]}
                  </dd>
                </div>
              )}
              {project.category && (
                <div className="col-span-2 lg:col-span-1">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-secondary/65">
                    {uiLabels.categoryLabel}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-6 text-foreground">{project.category}</dd>
                </div>
              )}
            </dl>
          </div>
        </header>

        <figure className="relative mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-background-secondary shadow-[0_35px_100px_-52px_rgba(59,130,246,0.65)]">
          <div className="flex h-9 items-center gap-1.5 border-b border-white/8 bg-card/80 px-4" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="h-2 w-2 rounded-full bg-white/10" />
            <span className="ml-3 h-1.5 w-20 rounded-full bg-white/7" />
          </div>
          <div className="relative aspect-16/10">
            {gallery.length > 0 ? (
              <Image
                src={withBasePath(gallery[0].src)}
                alt={gallery[0].alt}
                fill
                sizes="(min-width: 1280px) 1216px, (min-width: 768px) calc(100vw - 56px), calc(100vw - 40px)"
                className="object-contain"
                priority
              />
            ) : (
              <ProjectImagePlaceholder title={project.title} />
            )}
          </div>
        </figure>

        {gallery.length > 1 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(1).map((image) => (
              <div
                key={image.src}
                className="relative aspect-16/10 overflow-hidden rounded-xl border border-white/8 bg-background-secondary"
              >
                <Image
                  src={withBasePath(image.src)}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain transition-transform duration-300 hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-14 xl:gap-20">
          <aside className="hidden lg:block">
            <CaseStudyNav
              label={uiLabels.caseStudyNavigationLabel}
              heading={uiLabels.onThisPageLabel}
              sections={sections}
            />
          </aside>

          <div className="space-y-5">
            {project.description && (
              <DetailBlock id="overview" index={nextSectionIndex()} title={uiLabels.overviewLabel}>
                <p>{project.description}</p>
              </DetailBlock>
            )}
            {project.problem && (
              <DetailBlock id="problem" index={nextSectionIndex()} title={uiLabels.problemLabel}>
                <p>{project.problem}</p>
              </DetailBlock>
            )}
            {project.role && (
              <DetailBlock id="role" index={nextSectionIndex()} title={uiLabels.myRoleLabel}>
                <p>{project.role}</p>
              </DetailBlock>
            )}
            {project.architecture && (
              <DetailBlock id="architecture" index={nextSectionIndex()} title={uiLabels.architectureLabel}>
                <p>{project.architecture}</p>
                <div className="mt-7">
                  <ArchitectureDiagram />
                </div>
              </DetailBlock>
            )}
            {project.keyFeatures.length > 0 && (
              <DetailBlock id="features" index={nextSectionIndex()} title={uiLabels.keyFeaturesLabel}>
                <BulletList items={project.keyFeatures} />
              </DetailBlock>
            )}
            {project.challenges.length > 0 && (
              <DetailBlock id="challenges" index={nextSectionIndex()} title={uiLabels.technicalChallengesLabel}>
                <BulletList items={project.challenges} />
              </DetailBlock>
            )}
            {project.solution && (
              <DetailBlock id="solution" index={nextSectionIndex()} title={uiLabels.solutionsLabel}>
                <p>{project.solution}</p>
              </DetailBlock>
            )}
            {project.results && (
              <DetailBlock id="results" index={nextSectionIndex()} title={uiLabels.resultsImpactLabel} emphasis>
                <p>{project.results}</p>
              </DetailBlock>
            )}
            {project.technologies.length > 0 && (
              <DetailBlock id="stack" index={nextSectionIndex()} title={uiLabels.technologyStackLabel}>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <TechPill key={`${tech}-${index}`} label={tech} className="px-3 py-1.5" />
                  ))}
                </div>
              </DetailBlock>
            )}
          </div>
        </div>

        <nav
          aria-label={uiLabels.projectNavigationLabel}
          className="mt-16 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2"
        >
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="group rounded-2xl border border-white/8 bg-card/35 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/55"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-secondary">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                {uiLabels.previousProjectLabel}
              </span>
              <span className="mt-3 block text-lg font-medium text-foreground">{previousProject.title}</span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group rounded-2xl border border-white/8 bg-card/35 p-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/55 sm:text-right"
            >
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-secondary sm:justify-end">
                {uiLabels.nextProjectLabel}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="mt-3 block text-lg font-medium text-foreground">{nextProject.title}</span>
            </Link>
          )}
        </nav>

        <div className="mt-10 flex justify-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary transition-colors hover:text-foreground"
          >
            <Layers3 className="h-4 w-4" aria-hidden="true" />
            {uiLabels.backToProjectsLabel}
          </Link>
        </div>
      </Container>
    </article>
  );
}
