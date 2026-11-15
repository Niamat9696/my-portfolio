"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowDownRight, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { withBasePath } from "@/lib/base-path";
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
    <section id="hero" className="relative flex min-h-[95svh] scroll-mt-24 items-center overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-32">
      <div className="absolute inset-x-0 top-20 mx-auto h-px max-w-320 hairline-gradient" aria-hidden="true" />
      <Container>
      <motion.div className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16" variants={container} initial="hidden" animate="show">
        <div>
        <motion.div variants={child} className="flex items-center gap-3">
          <span className="inline-flex h-2 w-2 rounded-full bg-gradient-logo-dot shadow-[0_0_0_5px_rgba(124,58,237,0.1)]" aria-hidden="true" />
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-foreground-secondary">{hero.greeting}</p>
        </motion.div>

        <motion.div variants={child}>
          <h1 className="mt-6 max-w-4xl text-[clamp(2.65rem,1.55rem+4.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-foreground text-balance">
            {hero.headline}
          </h1>
        </motion.div>

        <motion.div variants={child} className="mt-5 flex h-9 items-center gap-3 overflow-hidden sm:h-10">
          <span className="font-mono text-sm text-gradient-logo" aria-hidden="true">{"//"}</span>
          {prefersReducedMotion ? (
            <span className="text-gradient-brand font-mono text-base font-semibold sm:text-lg">
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
                className="text-gradient-brand block font-mono text-base font-semibold sm:text-lg"
              >
                {hero.rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          )}
        </motion.div>

        <motion.div variants={child}>
          <p className="mt-7 max-w-[62ch] text-base leading-7 text-foreground-secondary sm:text-lg sm:leading-8">
            {hero.description}
          </p>
        </motion.div>

        <motion.div variants={child} className="mt-9 flex flex-wrap items-center gap-3">
          <Button href={hero.primaryCta.href} variant="primary">
            {hero.primaryCta.label}
            <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary">
            {hero.secondaryCta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </motion.div>

        <motion.div variants={child} className="mt-9 flex flex-wrap items-center gap-5 border-t border-white/8 pt-6">
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
                className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-accent"
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </a>
            );
          })}

          {personal.availableForOpportunities === true && (
            <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/[0.06] px-3 py-1.5 text-xs text-foreground-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-signal" aria-hidden="true" />
              {uiLabels.availableForOpportunitiesLabel}
            </span>
          )}
        </motion.div>
        </div>

        <motion.div variants={child} className="relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/10 blur-3xl" aria-hidden="true" />
          <div className="gradient-border relative aspect-4/5 overflow-hidden rounded-[1.75rem] bg-background-secondary shadow-[0_40px_100px_-45px_rgba(59,130,246,0.55)]">
            <Image
              src={withBasePath("/profile.webp")}
              alt="Portrait of Niamat Ullah"
              fill
              priority
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 20rem"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-background via-background/70 to-transparent px-5 pb-5 pt-16">
              <p className="text-lg font-semibold tracking-tight text-foreground">{personal.name}</p>
              <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.14em] text-gradient-logo">
                Senior Full-Stack Developer
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
      </Container>
    </section>
  );
}
