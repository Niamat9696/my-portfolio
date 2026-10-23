import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ReactNode } from "react";
import type { CVData, CVLabelledItem } from "@/types";
import { formatMonthYear } from "@/lib/format-date";

// Single-column, ATS-friendly layout: real text (no images or tables of
// text), standard fonts, and every URL a clickable link.
// Keep words whole: hyphenated tech terms read poorly and confuse ATS parsers.
Font.registerHyphenationCallback((word) => [word]);

const ACCENT = "#1F4E79";
const LINK = "#0B5CAD";
const TEXT = "#1A1A1A";
const MUTED = "#444444";

const styles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 40,
    fontSize: 9.1,
    lineHeight: 1.3,
    fontFamily: "Helvetica",
    color: TEXT,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    textAlign: "center",
    lineHeight: 1.2,
  },
  title: { fontSize: 10.5, fontFamily: "Helvetica-Bold", textAlign: "center", marginTop: 2 },
  contact: { fontSize: 9, color: MUTED, textAlign: "center", marginTop: 2 },
  link: { color: LINK, textDecoration: "underline" },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: ACCENT,
    textTransform: "uppercase",
    marginTop: 7,
    paddingBottom: 2,
    marginBottom: 4,
    borderBottomWidth: 0.8,
    borderBottomColor: ACCENT,
  },
  bold: { fontFamily: "Helvetica-Bold" },
  bulletRow: { flexDirection: "row", marginBottom: 1.5 },
  bulletDot: { width: 11, paddingLeft: 2 },
  bulletText: { flex: 1 },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 4,
    marginBottom: 1,
  },
  entryTitle: { fontSize: 9.8, fontFamily: "Helvetica-Bold" },
  entryTitleInRow: { flex: 1, paddingRight: 8 },
  entryDate: { fontFamily: "Helvetica-Oblique", color: MUTED },
  stack: { fontFamily: "Helvetica", color: MUTED },
  sub: { fontFamily: "Helvetica-Oblique", color: MUTED },
  project: { marginTop: 3 },
});

/** Renders `**bold**` markers from the CV content as bold runs. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, index) =>
        index % 2 === 1 ? (
          <Text key={index} style={styles.bold}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <View style={styles.bulletRow} wrap={false}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

function LabelledBullets({ items }: { items: CVLabelledItem[] }) {
  return (
    <>
      {items.map((item) => (
        <Bullet key={item.label}>
          <Text style={styles.bold}>{item.label}:</Text> {item.text}
        </Bullet>
      ))}
    </>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <Text style={styles.sectionTitle} minPresenceAhead={40}>
      {children}
    </Text>
  );
}

function ExternalLink({ url, label }: { url: string; label?: string }) {
  return (
    <Link src={url} style={styles.link}>
      {label ?? url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
    </Link>
  );
}

/** "+923359559696" → "+92 335 9559696"; other formats are left as-is. */
function formatPhone(phone: string): string {
  const match = /^\+92(\d{3})(\d{7})$/.exec(phone);
  return match ? `+92 ${match[1]} ${match[2]}` : phone;
}

function formatRange(
  startDate: string | null,
  endDate: string | null,
  isCurrent: boolean,
  presentLabel: string,
): string | null {
  const start = formatMonthYear(startDate);
  const end = isCurrent ? presentLabel : formatMonthYear(endDate);
  if (start && end) return `${start} – ${end}`;
  return start ?? end;
}

interface CVDocumentProps {
  cv: CVData;
  presentLabel: string;
}

export function CVDocument({ cv, presentLabel }: CVDocumentProps) {
  const location = [cv.location, cv.availability].filter(Boolean).join(" | ");

  return (
    <Document
      title={`${cv.name} – ${cv.title} Resume`}
      author={cv.name}
      subject={`${cv.title} | ${cv.headline}`}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{cv.name.toUpperCase()}</Text>
        <Text style={styles.title}>
          {cv.title} | {cv.headline}
        </Text>
        <Text style={[styles.contact, { marginTop: 4 }]}>
          {location}
          {cv.phone && (
            <>
              {" | "}
              <ExternalLink url={`tel:${cv.phone}`} label={formatPhone(cv.phone)} />
            </>
          )}
          {cv.email && (
            <>
              {" | "}
              <ExternalLink url={`mailto:${cv.email}`} label={cv.email} />
            </>
          )}
        </Text>
        <Text style={styles.contact}>
          {cv.links.linkedin && (
            <>
              LinkedIn: <ExternalLink url={cv.links.linkedin} />
            </>
          )}
          {cv.links.github && (
            <>
              {" | "}GitHub: <ExternalLink url={cv.links.github} />
            </>
          )}
        </Text>
        <Text style={styles.contact}>
          Portfolio: <ExternalLink url={cv.links.portfolio} />
        </Text>

        <SectionTitle>Professional Summary</SectionTitle>
        <Text>
          <RichText text={cv.summary} />
        </Text>

        <SectionTitle>Technical Skills</SectionTitle>
        <LabelledBullets items={cv.skills} />

        <SectionTitle>{cv.aiEngineering.heading}</SectionTitle>
        <LabelledBullets items={cv.aiEngineering.items} />

        <SectionTitle>Professional Experience</SectionTitle>
        {cv.experience.map((entry) => {
          const dateRange = formatRange(
            entry.startDate,
            entry.endDate,
            entry.isCurrent,
            presentLabel,
          );
          const [first, ...rest] = entry.achievements;
          return (
            <View key={entry.id} style={{ marginBottom: 2 }}>
              <View wrap={false}>
                <View style={styles.entryHeader}>
                  <Text style={[styles.entryTitle, styles.entryTitleInRow]}>
                    {entry.position} | {entry.company}
                  </Text>
                  {dateRange && <Text style={styles.entryDate}>{dateRange}</Text>}
                </View>
                {first && (
                  <Bullet>
                    <RichText text={first} />
                  </Bullet>
                )}
              </View>
              {rest.map((achievement) => (
                <Bullet key={achievement}>
                  <RichText text={achievement} />
                </Bullet>
              ))}
            </View>
          );
        })}

        <SectionTitle>{cv.projectsHeading}</SectionTitle>
        {cv.projects.map((project) => (
          <View key={project.id} style={styles.project}>
            <Text style={styles.entryTitle} minPresenceAhead={36}>
              {project.name} | <Text style={styles.stack}>{project.stack}</Text>
            </Text>
            {project.url && (
              <Text style={styles.sub}>
                Live: <ExternalLink url={project.url} />
              </Text>
            )}
            <Bullet>{project.description}</Bullet>
            {project.extraLinks.length > 0 && (
              <Text style={styles.sub}>
                Dashboards:{" "}
                {project.extraLinks.map((link, index) => (
                  <Text key={link.url}>
                    {index > 0 && " | "}
                    <ExternalLink url={link.url} label={link.label} />
                  </Text>
                ))}
              </Text>
            )}
          </View>
        ))}

        <SectionTitle>Education</SectionTitle>
        {cv.education.map((entry) => (
          <View key={entry.id} style={styles.entryHeader}>
            <Text style={[styles.entryTitle, styles.entryTitleInRow]}>
              {entry.credential} | {entry.institution}
            </Text>
            {entry.endDate && <Text style={styles.entryDate}>{entry.endDate.slice(0, 4)}</Text>}
          </View>
        ))}
      </Page>
    </Document>
  );
}
