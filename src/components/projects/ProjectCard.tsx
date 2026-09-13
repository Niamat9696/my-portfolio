import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { TechPill } from "@/components/ui/TechPill";
import { ProjectImagePlaceholder } from "./ProjectImagePlaceholder";
import { projectStatusLabels } from "@/constants/project-status";
import type { Project, UiLabels } from "@/types";

interface ProjectCardProps {
  project: Project;
  reverse: boolean;
  uiLabels: UiLabels;
}

export function ProjectCard({ project, reverse, uiLabels }: ProjectCardProps) {
  const media = (
    <div
      className={`relative aspect-16/10 overflow-hidden rounded-xl border border-border bg-background-secondary transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-lg group-hover:shadow-primary/10 ${
        reverse ? "lg:order-2" : "lg:order-1"
      }`}
    >
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
        />
      ) : (
        <ProjectImagePlaceholder title={project.title} />
      )}
    </div>
  );

  const info = (
    <div className={reverse ? "lg:order-1" : "lg:order-2"}>
            {project.category && (
              <p className="font-mono text-xs uppercase tracking-wide text-accent">
                {project.category}
              </p>
            )}
            <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-[28px]">
              {project.title}
            </h3>

            {project.status && (
              <span className="mt-3 inline-flex items-center rounded-full border border-border px-2.5 py-0.5 font-mono text-xs text-foreground-secondary">
                {projectStatusLabels[project.status]}
              </span>
            )}

            {project.shortDescription && (
              <p className="mt-4 max-w-[60ch] text-base leading-relaxed text-foreground-secondary">
                {project.shortDescription}
              </p>
            )}

            {project.role && (
              <p className="mt-4 text-sm text-foreground-secondary">
                <span className="text-foreground">{uiLabels.roleLabel}: </span>
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
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary-light"
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
    <article className="group py-10">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {media}
          {info}
        </div>
      </Container>
    </article>
  );
}
