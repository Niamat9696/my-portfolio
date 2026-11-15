import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { TechPill } from "@/components/ui/TechPill";
import { ProjectImagePlaceholder } from "./ProjectImagePlaceholder";
import { projectStatusLabels } from "@/constants/project-status";
import { withBasePath } from "@/lib/base-path";
import type { Project, UiLabels } from "@/types";

interface ProjectCardProps {
  project: Project;
  reverse: boolean;
  index: number;
  uiLabels: UiLabels;
}

export function ProjectCard({ project, reverse, index, uiLabels }: ProjectCardProps) {
  const media = (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-background-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-[0_28px_70px_-35px_rgba(59,130,246,0.55)] ${
        reverse ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <div className="flex items-center gap-3 border-b border-white/8 bg-white/[0.03] px-4 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="h-5 flex-1 truncate rounded-md bg-white/[0.04] px-3 font-mono text-[10px] leading-5 text-foreground-secondary/70">
          {project.slug}
        </span>
      </div>
      <div className="relative aspect-16/10">
      {project.image ? (
        <Image
          src={withBasePath(project.image.src)}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
        />
      ) : (
        <ProjectImagePlaceholder title={project.title} />
      )}
      </div>
    </div>
  );

  const info = (
    <div className={`${reverse ? "lg:order-1" : "lg:order-2"} flex flex-col justify-center`}>
            <span
              className="mb-4 text-6xl font-semibold leading-none tracking-tighter text-gradient-logo opacity-80 sm:text-7xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {project.category && (
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gradient-logo">
                {project.category}
              </p>
            )}
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {project.title}
            </h3>

            {project.status && (
              <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-success/15 bg-success/[0.045] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground-secondary before:h-1.5 before:w-1.5 before:rounded-full before:bg-success">
                {projectStatusLabels[project.status]}
              </span>
            )}

            {project.shortDescription && (
              <p className="mt-5 max-w-[58ch] text-base leading-7 text-foreground-secondary">
                {project.shortDescription}
              </p>
            )}

            {project.role && (
              <p className="mt-5 border-l-2 border-primary/40 pl-4 text-sm leading-6 text-foreground-secondary">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-secondary/70">
                  {uiLabels.roleLabel}
                </span>
                {project.role}
              </p>
            )}

            {project.technologies.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <TechPill key={tech} label={tech} />
                ))}
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <Link
                href={`/projects/${project.slug}`}
                className="group/link bg-gradient-logo inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/10 px-5 text-sm font-medium text-white"
              >
                {uiLabels.viewCaseStudyLabel}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1"
                  aria-hidden="true"
                />
              </Link>

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
    </div>
  );

  return (
    <article className="group">
      <Container>
        <div className="gradient-border grid items-center gap-8 rounded-[1.75rem] bg-card/45 p-4 sm:p-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14 lg:p-9">
          {media}
          {info}
        </div>
      </Container>
    </article>
  );
}
