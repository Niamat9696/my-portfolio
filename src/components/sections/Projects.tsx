import { getFeaturedProjects, getOtherProjects, getProjectsSectionCopy, getUiLabels } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TechPill } from "@/components/ui/TechPill";
import { ProjectCard } from "@/components/projects/ProjectCard";

export function Projects() {
  const copy = getProjectsSectionCopy();
  const projects = getFeaturedProjects();
  const others = getOtherProjects();
  const uiLabels = getUiLabels();

  return (
    <section id="projects" className="section-shell scroll-mt-24 border-y border-white/6 py-24 sm:py-32">
      <Container>
        <Reveal>
          <SectionHeading label={copy.sectionLabel} heading={copy.heading} />
        </Reveal>
      </Container>

      <div className="mt-10 space-y-6 sm:mt-14 sm:space-y-10">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={0.04}>
            <ProjectCard project={project} reverse={index % 2 === 1} index={index} uiLabels={uiLabels} />
          </Reveal>
        ))}
      </div>

      {others.length > 0 && (
        <Container className="mt-16 sm:mt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-secondary">More projects</p>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group gradient-border flex h-full flex-col rounded-2xl bg-card/45 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    {project.category && (
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gradient-logo">{project.category}</p>
                    )}
                    <ArrowUpRight className="icon-gradient h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">{project.title}</h3>
                  {project.shortDescription && (
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground-secondary">{project.shortDescription}</p>
                  )}
                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <TechPill key={tech} label={tech} />
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      )}
    </section>
  );
}
