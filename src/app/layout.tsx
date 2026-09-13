import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { BackgroundEffects } from "@/components/layout/BackgroundEffects";
import { getConfiguredSocialLinks, getNavigation, getPersonalInfo, getUiLabels } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/constants/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const navigation = getNavigation();
  const socialLinks = getConfiguredSocialLinks();
  const uiLabels = getUiLabels();
  const personal = getPersonalInfo();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personal.name,
    jobTitle: personal.title,
    ...(personal.location ? { address: personal.location } : {}),
    url: SITE_URL,
    sameAs: socialLinks.filter((link) => link.url && !link.url.startsWith("mailto:")).map((link) => link.url),
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          {uiLabels.skipToContentLabel}
        </a>
        <BackgroundEffects />
        <Navbar navigation={navigation} socialLinks={socialLinks} uiLabels={uiLabels} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <BackToTop label={uiLabels.backToTopLabel} />
      </body>
    </html>
  );
}
