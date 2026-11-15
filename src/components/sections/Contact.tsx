"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!personal.email) return;
    const data = new FormData(event.currentTarget);
    // Honeypot: real visitors never see or fill this field.
    if (String(data.get("website") ?? "") !== "") return;
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = `Portfolio inquiry from ${name}`;
    const body = `${message}\n\n— ${name} (${from})`;
    const url = `${toGmailComposeUrl(personal.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const fieldClasses =
    "mt-2 w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-foreground-secondary/50 transition-colors duration-200 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/25";
  const labelClasses = "font-mono text-[11px] uppercase tracking-[0.14em] text-foreground-secondary";

  interface InfoItem {
    key: string;
    icon: LucideIcon;
    label: string;
    value: string;
    href: string | null;
  }
  const infoItems: InfoItem[] = [];
  if (personal.email) {
    infoItems.push({ key: "email", icon: Mail, label: "Email", value: personal.email, href: toGmailComposeUrl(personal.email) });
  }
  if (personal.phone) {
    infoItems.push({ key: "phone", icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` });
  }
  if (personal.location) {
    infoItems.push({ key: "location", icon: MapPin, label: "Location", value: personal.location, href: null });
  }

  return (
    <section id="contact" className="scroll-mt-24 px-2 py-24 sm:px-4 sm:py-32">
      <Container>
        <div className="surface-grid relative mx-auto overflow-hidden rounded-[2rem] border border-white/10 bg-card/65 p-6 shadow-[0_40px_100px_-55px_rgba(59,130,246,0.6)] sm:p-10 lg:p-14">
          <div className="absolute left-1/2 top-0 h-56 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]" aria-hidden="true" />

          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gradient-logo">
                {contact.sectionLabel}
              </p>
              <h2 className="mt-4 whitespace-pre-line text-[clamp(2rem,1.3rem+2.6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-foreground text-balance">
                {contact.heading}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-foreground-secondary">
                {contact.description}
              </p>

              <ul className="mt-8 space-y-3">
                {infoItems.map(({ key, icon: Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/[0.03]">
                        <Icon className="icon-gradient h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-foreground-secondary/70">
                          {label}
                        </span>
                        <span className="block truncate text-sm text-foreground">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={key}>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="flex items-center gap-3 rounded-xl border border-white/8 bg-background/40 p-3 transition-colors duration-200 hover:border-accent/45"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-background/40 p-3">
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {personal.email && (
                  <Button variant="secondary" onClick={handleCopyEmail}>
                    <Copy className="h-4 w-4" aria-hidden="true" />
                    {contact.copyEmailLabel}
                  </Button>
                )}
                {socialLinks.map((link) => {
                  if (!link.url) return null;
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  if (!Icon || link.url.startsWith("mailto:")) return null;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.ariaLabel}
                      className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-foreground-secondary transition-all duration-200 hover:-translate-y-px hover:border-accent/45 hover:text-accent"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="gradient-border rounded-2xl bg-background/50 p-5 backdrop-blur-sm sm:p-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClasses}>Name</label>
                  <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={fieldClasses} />
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClasses}>Email</label>
                  <input id="contact-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={fieldClasses} />
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className={labelClasses}>Message</label>
                <textarea id="contact-message" name="message" required rows={6} placeholder="Tell me about your project or opportunity…" className={`${fieldClasses} resize-y`} />
              </div>
              {/* Honeypot field, hidden from people and assistive tech. */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="contact-website">Leave this empty</label>
                <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-[28ch] text-xs leading-5 text-foreground-secondary/70">
                  Sending opens a pre-filled Gmail draft addressed to me.
                </p>
                <Button type="submit" variant="primary">
                  {contact.ctaLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>

      <Toast message={contact.copiedLabel} visible={toastVisible} />
    </section>
  );
}
