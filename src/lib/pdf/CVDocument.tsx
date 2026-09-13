import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CVData } from "@/types";
import { formatDateRange } from "@/lib/format-date";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#111111",
  },
  name: { fontSize: 22, fontWeight: 700 },
  title: { fontSize: 13, color: "#3b4b63", marginTop: 2 },
  contactRow: { flexDirection: "row", gap: 12, marginTop: 8, fontSize: 9.5, color: "#3b4b63" },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginTop: 18,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#1d4ed8",
    borderBottom: "1px solid #d0d7e2",
    paddingBottom: 4,
  },
  summary: { lineHeight: 1.5 },
  entry: { marginBottom: 10 },
  entryHeaderRow: { flexDirection: "row", justifyContent: "space-between" },
  entryTitle: { fontSize: 11, fontWeight: 700 },
  entryDate: { fontSize: 9.5, color: "#5b6b82" },
  entrySubtitle: { fontSize: 10, color: "#3b4b63", marginTop: 1 },
  bullet: { flexDirection: "row", marginTop: 3 },
  bulletDot: { width: 8, fontSize: 10 },
  bulletText: { flex: 1, lineHeight: 1.4 },
  skillGroupRow: { flexDirection: "row", marginBottom: 4 },
  skillGroupLabel: { width: 130, fontSize: 9.5, fontWeight: 700, color: "#1d4ed8" },
  skillGroupItems: { flex: 1, fontSize: 9.5, color: "#333333" },
});

interface CVDocumentProps {
  cv: CVData;
  presentLabel: string;
}

export function CVDocument({ cv, presentLabel }: CVDocumentProps) {
  const contactParts = [cv.email, cv.location, cv.links.github, cv.links.linkedin].filter(
    (part): part is string => Boolean(part),
  );

  return (
    <Document title={`${cv.name} — CV`} author={cv.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.name}>{cv.name}</Text>
        <Text style={styles.title}>{cv.title}</Text>
        {contactParts.length > 0 && (
          <View style={styles.contactRow}>
            {contactParts.map((part) => (
              <Text key={part}>{part}</Text>
            ))}
          </View>
        )}

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.summary}>{cv.summary}</Text>

        {cv.experience.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Experience</Text>
            {cv.experience.map((entry) => {
              const dateRange = formatDateRange(
                entry.startDate,
                entry.endDate,
                entry.isCurrent,
                presentLabel,
              );
              return (
                <View key={entry.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryTitle}>{entry.position}</Text>
                    {dateRange && <Text style={styles.entryDate}>{dateRange}</Text>}
                  </View>
                  <Text style={styles.entrySubtitle}>{entry.company}</Text>
                  {entry.description && (
                    <Text style={{ marginTop: 4, lineHeight: 1.4 }}>{entry.description}</Text>
                  )}
                  {entry.achievements.map((achievement) => (
                    <View key={achievement} style={styles.bullet}>
                      <Text style={styles.bulletDot}>{"•"}</Text>
                      <Text style={styles.bulletText}>{achievement}</Text>
                    </View>
                  ))}
                </View>
              );
            })}
          </>
        )}

        {cv.education.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Education</Text>
            {cv.education.map((entry) => {
              const dateRange = formatDateRange(entry.startDate, entry.endDate, false, presentLabel);
              return (
                <View key={entry.id} style={styles.entry}>
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryTitle}>{entry.credential}</Text>
                    {dateRange && <Text style={styles.entryDate}>{dateRange}</Text>}
                  </View>
                  <Text style={styles.entrySubtitle}>{entry.institution}</Text>
                </View>
              );
            })}
          </>
        )}

        {cv.skills.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {cv.skills.map((group) => (
              <View key={group.id} style={styles.skillGroupRow}>
                <Text style={styles.skillGroupLabel}>{group.label}</Text>
                <Text style={styles.skillGroupItems}>{group.technologies.join(", ")}</Text>
              </View>
            ))}
          </>
        )}
      </Page>
    </Document>
  );
}
