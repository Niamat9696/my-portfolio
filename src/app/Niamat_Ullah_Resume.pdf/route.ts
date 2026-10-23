import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "@/lib/pdf/CVDocument";
import { CV_FILENAME } from "@/constants/site";
import { getCVData, getUiLabels } from "@/lib/content";

export const dynamic = "force-static";

// The folder name ends in ".pdf" so the static export writes a real
// `Niamat_Ullah_Resume.pdf` file, which GitHub Pages serves as application/pdf.
export async function GET() {
  const cv = getCVData();
  const uiLabels = getUiLabels();
  const buffer = await renderToBuffer(CVDocument({ cv, presentLabel: uiLabels.presentLabel }));

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${CV_FILENAME}"`,
    },
  });
}
