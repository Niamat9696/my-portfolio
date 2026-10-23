"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { toGmailComposeUrl } from "@/lib/email";
import { CV_FILENAME, CV_PATH } from "@/constants/site";
import { withBasePath } from "@/lib/base-path";
import { useActiveSection } from "@/hooks/useActiveSection";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useScrolled } from "@/hooks/useScrolled";
import type { NavigationContent, SocialLink, UiLabels } from "@/types";
import Image from "next/image";

interface NavbarProps {
  navigation: NavigationContent;
  socialLinks: SocialLink[];
  uiLabels: UiLabels;
}

const menuVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const noopMenuVariants: Variants = { hidden: { opacity: 1 }, visible: { opacity: 1 } };
const noopItemVariants: Variants = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };

/**
 * On the home page, scroll to the section ourselves. With a basePath (GitHub
 * Pages serves the site from `/my-portfolio/`), `<Link href="/#about">` resolves
 * to `/my-portfolio#about`, which Next.js treats as a different route than the
 * current `/my-portfolio/` — it updates the URL but never scrolls.
 * On other pages the Link navigates home and Next.js scrolls to the hash.
 */
function scrollToSection(event: MouseEvent<HTMLAnchorElement>, hash: string, onHomePage: boolean) {
  if (!onHomePage || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
  const target = document.getElementById(hash.replace("#", ""));
  if (!target) return;

  event.preventDefault();
  // Uses the CSS `scroll-behavior` (smooth, or instant under reduced motion)
  // and honours each section's `scroll-margin-top` for the fixed header.
  target.scrollIntoView();
  window.history.pushState(null, "", hash);
}

export function Navbar({ navigation, socialLinks, uiLabels }: NavbarProps) {
  const scrolled = useScrolled();
  const onHomePage = usePathname() === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const sectionIds = navigation.links.map((link) => link.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);
  const prefersReducedMotion = usePrefersReducedMotion();
  const menu = prefersReducedMotion ? noopMenuVariants : menuVariants;
  const item = prefersReducedMotion ? noopItemVariants : itemVariants;

  useEffect(() => {
    if (!menuOpen) return;

    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/8 bg-background/82 shadow-[0_12px_35px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-320 items-center justify-between px-5 sm:px-7 lg:px-8">
        <Link
          href="/"
          className="flex items-center font-mono text-lg font-semibold text-foreground transition-transform duration-200 hover:scale-[1.03]"
        >
          <Image
            src={navigation.brand}
            alt="Niamat Ullah — Full-Stack Engineer"
            height={72}
            width={217}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navigation.links.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={link.href}>
                <Link
                  href={`/${link.href}`}
                  onClick={(event) => scrollToSection(event, link.href, onHomePage)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-linear-to-r after:from-violet after:via-primary after:to-accent after:transition-transform after:duration-200 hover:text-foreground hover:after:scale-x-100 ${
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-foreground-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {socialLinks.map((link) =>
            link.url ? (
              <a
                key={link.platform}
                href={
                  link.url.startsWith("mailto:")
                    ? toGmailComposeUrl(link.url)
                    : link.url
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="text-foreground-secondary transition-all duration-200 hover:scale-105 hover:text-accent"
              >
                <SocialIcon icon={link.icon} className="h-5 w-5" />
              </a>
            ) : null,
          )}
          <Button href={withBasePath(CV_PATH)} download={CV_FILENAME} variant="primary" className="ml-1">
            {navigation.downloadCvLabel}
          </Button>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={uiLabels.openMenuLabel}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent md:hidden"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            variants={menu}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-50 bg-background/98 backdrop-blur-xl md:hidden"
          >
            <motion.div
              variants={item}
              className="flex h-16 items-center justify-between px-4 sm:px-6"
            >
              <span className="font-mono text-lg font-semibold text-foreground">
                <Image
                  src={navigation.brand}
                  alt="Niamat Ullah — Full-Stack Engineer"
                  height={72}
                  width={217}
                  priority
                  className="h-10 w-auto "
                />
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={uiLabels.closeMenuLabel}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </motion.div>

            <ul className="flex flex-col gap-1 px-6 pt-8">
              {navigation.links.map((link) => (
                <motion.li key={link.href} variants={item}>
                  <Link
                    href={`/${link.href}`}
                    onClick={(event) => {
                      setMenuOpen(false);
                      scrollToSection(event, link.href, onHomePage);
                    }}
                    className="block border-b border-white/7 py-4 text-xl font-medium text-foreground-secondary transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={item} className="px-6 pt-4">
              <Button
                href={withBasePath(CV_PATH)}
                download={CV_FILENAME}
                variant="primary"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                {navigation.downloadCvLabel}
              </Button>
            </motion.div>

            <motion.div variants={item} className="flex gap-4 px-6 pt-8">
              {socialLinks.map((link) =>
                link.url ? (
                  <a
                    key={link.platform}
                    href={
                      link.url.startsWith("mailto:")
                        ? toGmailComposeUrl(link.url)
                        : link.url
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="text-foreground-secondary transition-all duration-200 hover:scale-110 hover:text-accent"
                  >
                    <SocialIcon icon={link.icon} className="h-5 w-5" />
                  </a>
                ) : null,
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
