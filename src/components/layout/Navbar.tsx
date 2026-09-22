"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { toGmailComposeUrl } from "@/lib/email";
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

export function Navbar({ navigation, socialLinks, uiLabels }: NavbarProps) {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = navigation.links.map((link) => link.href.replace("#", ""));
  const activeId = useActiveSection(sectionIds);
  const prefersReducedMotion = usePrefersReducedMotion();
  const menu = prefersReducedMotion ? noopMenuVariants : menuVariants;
  const item = prefersReducedMotion ? noopItemVariants : itemVariants;

  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-350 items-center justify-between px-4 sm:px-6 lg:px-8">
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
            className="h-10 w-auto sm:h-14"
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
          <Button href="/cv" variant="primary" className="ml-1">
            {navigation.downloadCvLabel}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label={uiLabels.openMenuLabel}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="relative text-foreground transition-transform duration-200 hover:scale-110 hover:text-accent md:hidden"
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
            className="fixed inset-0 z-50 bg-background md:hidden"
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
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label={uiLabels.closeMenuLabel}
                className="text-foreground transition-transform duration-200 hover:rotate-90 hover:text-accent"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </motion.div>

            <ul className="flex flex-col gap-1 px-6 pt-6">
              {navigation.links.map((link) => (
                <motion.li key={link.href} variants={item}>
                  <Link
                    href={`/${link.href}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 text-lg text-foreground-secondary transition-colors duration-200 hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div variants={item} className="px-6 pt-4">
              <Button
                href="/cv"
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
