import { renderToBuffer } from "@react-pdf/renderer";
import { CVDocument } from "@/lib/pdf/CVDocument";
import { getCVData, getUiLabels } from "@/lib/content";

export const dynamic = "force-static";

export async function GET() {
  const cv = getCVData();
  const uiLabels = getUiLabels();
  const buffer = await renderToBuffer(CVDocument({ cv, presentLabel: uiLabels.presentLabel }));

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="niamat-ullah-cv.pdf"',
    },
  });
}
