import uiLabelsData from "@/content/ui-labels.json";
import type { UiLabels } from "@/types";

export function getUiLabels(): UiLabels {
  return uiLabelsData satisfies UiLabels;
}
