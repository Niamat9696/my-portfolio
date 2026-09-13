"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { toGmailComposeUrl } from "@/lib/email";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { HeroContent, PersonalInfo, SocialLink, UiLabels } from "@/types";

const iconMap = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail } as const;

interface HeroProps {
  hero: HeroContent;
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  uiLabels: UiLabels;
}

const containerMotion: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const itemMotion: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
const noopVariants: Variants = { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } };

export function Hero({ hero, personal, socialLinks, uiLabels }: HeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion || hero.rotatingWords.length <= 1) return;
    const interval = setInterval(() => {
      setWordIndex((current) => (current + 1) % hero.rotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [hero.rotatingWords.length, prefersReducedMotion]);

  const container = prefersReducedMotion ? noopVariants : containerMotion;
  const child = prefersReducedMotion ? noopVariants : itemMotion;

  return (
    <section id="hero" className="relative flex min-h-[92vh] scroll-mt-24 items-center pt-24">
      <Container>
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={child}>
          <p className="font-mono text-sm text-foreground-secondary">{hero.greeting}</p>
        </motion.div>

        <motion.div variants={child}>
          <h1 className="mt-4 max-w-4xl text-[clamp(2.25rem,1.5rem+3.5vw,4.5rem)] font-semibold leading-[1.05] tracking-tight text-foreground">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.div variants={child} className="mt-4 h-9 overflow-hidden sm:h-10">
          {prefersReducedMotion ? (
            <span className="font-mono text-lg text-primary sm:text-xl">
              {hero.rotatingWords[0]}
            </span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={hero.rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="block font-mono text-lg text-primary sm:text-xl"
              >
                {hero.rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          )}
        </motion.div>

        <motion.div variants={child}>
          <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-foreground-secondary sm:text-lg">
            {hero.description}
          </p>
        </motion.div>

        <motion.div variants={child} className="mt-8 flex flex-wrap items-center gap-4">
          <Button href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
          </Button>
        </motion.div>

        <motion.div variants={child} className="mt-8 flex items-center gap-5">
          {socialLinks.map((link) => {
            if (!link.url) return null;
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            if (!Icon) return null;
            const isMail = link.url.startsWith("mailto:");
            return (
              <a
                key={link.platform}
                href={isMail ? toGmailComposeUrl(link.url) : link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-primary"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}

          {personal.availableForOpportunities === true && (
            <span className="ml-2 inline-flex items-center gap-2 text-sm text-foreground-secondary">
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
              {uiLabels.availableForOpportunitiesLabel}
            </span>
          )}
        </motion.div>
      </motion.div>
      </Container>
    </section>
  );
}
