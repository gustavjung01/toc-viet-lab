export function getCaseEditorialStatus(item: { analysis?: string | null; description?: string | null }) {
  const analysisLength = item.analysis?.trim().length ?? 0;
  const descriptionLength = item.description?.trim().length ?? 0;
  const isEdited = analysisLength >= 1200 && descriptionLength >= 200;

  return {
    label: isEdited ? "Đã biên tập" : "Bản nháp",
    className: isEdited
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-amber-50 text-amber-700 border border-amber-200",
  };
}
