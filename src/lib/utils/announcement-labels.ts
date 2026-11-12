const LABELS: Record<string, string> = {
  vacancy: "Vacancy",
  notice: "Notice",
  call_for_concept_notes: "Call for concept notes",
  training_opportunity: "Training opportunity",
  bid: "Bid",
};

export function announcementTypeLabel(type: string | null | undefined): string {
  if (!type) return "";
  const known = LABELS[type];
  if (known) return known;

  const text = type.replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}
