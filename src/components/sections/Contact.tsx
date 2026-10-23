"use client";

import { useState } from "react";
import { ArrowUpRight, Copy, Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { toGmailComposeUrl } from "@/lib/email";
import type { ContactContent, PersonalInfo, SocialLink } from "@/types";

interface ContactProps {
  contact: ContactContent;
  personal: PersonalInfo;
  socialLinks: SocialLink[];
}

const iconMap = { github: GithubIcon, linkedin: LinkedinIcon, mail: Mail } as const;

export function Contact({ contact, personal, socialLinks }: ContactProps) {
  const [toastVisible, setToastVisible] = useState(false);

  async function handleCopyEmail() {
    if (!personal.email) return;
    await navigator.clipboard.writeText(personal.email);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  }

  return (
    <section id="contact" className="scroll-mt-24 px-2 py-24 sm:px-4 sm:py-32">
      <Container>
        <div className="surface-grid relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-card/65 px-5 py-14 text-center shadow-[0_40px_100px_-55px_rgba(59,130,246,0.6)] sm:px-10 sm:py-20">
          <div className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]" aria-hidden="true" />
          <p className="relative font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {contact.sectionLabel}
          </p>
          <h2 className="relative mx-auto mt-4 max-w-3xl whitespace-pre-line text-[clamp(2.25rem,1.4rem+3.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-foreground text-balance">
            {contact.heading}
          </h2>
          <p className="relative mx-auto mt-6 max-w-2xl text-base leading-7 text-foreground-secondary sm:text-lg">
            {contact.description}
          </p>

          <div className="relative mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-foreground-secondary">
            {personal.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {personal.location}
              </span>
            )}
            {personal.phone && (
              <a
                href={`tel:${personal.phone}`}
                aria-label={`Call Niamat Ullah at ${personal.phone}`}
                className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-foreground"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                {personal.phone}
              </a>
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {personal.email && (
              <>
                <Button href={toGmailComposeUrl(personal.email)} variant="primary" external>
                  {contact.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="secondary" onClick={handleCopyEmail}>
                  <Copy className="h-4 w-4" aria-hidden="true" />
                  {contact.copyEmailLabel}
                </Button>
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
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
          </div>
        </div>
      </Container>

      <Toast message={contact.copiedLabel} visible={toastVisible} />
    </section>
  );
}
