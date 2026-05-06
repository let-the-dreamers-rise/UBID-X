const noiseWords = new Set([
  "private",
  "pvt",
  "ltd",
  "limited",
  "company",
  "co",
  "unit",
  "u",
  "no",
  "plot",
  "road",
  "rd",
  "area",
  "industrial",
  "indl",
  "phase",
  "ph",
]);

const replacements = [
  [/\bbangalore\b/g, "bengaluru"],
  [/\bmysore\b/g, "mysuru"],
  [/\btumkur\b/g, "tumakuru"],
  [/\bhubli\b/g, "hubballi"],
  [/\bchikmagalur\b/g, "chikkamagaluru"],
  [/\bcomp\b/g, "components"],
  [/\bpvt\b/g, "private"],
  [/\bltd\b/g, "limited"],
  [/\bindl\b/g, "industrial"],
  [/\bph\b/g, "phase"],
  [/\bu 2\b/g, "unit 2"],
  [/\bu-2\b/g, "unit 2"],
];

export function normalizeText(value = "") {
  let text = value.toLowerCase().replace(/[^a-z0-9 ]+/g, " ");
  replacements.forEach(([pattern, replacement]) => {
    text = text.replace(pattern, replacement);
  });
  return text.replace(/\s+/g, " ").trim();
}

export function tokenFingerprint(value = "") {
  return normalizeText(value)
    .split(" ")
    .filter(Boolean)
    .filter((token) => !noiseWords.has(token))
    .sort()
    .join(" ");
}

export function identifierHealth(record) {
  if (record.gstin && record.pan) return "GSTIN + PAN";
  if (record.gstin) return "GSTIN only";
  if (record.pan) return "PAN only";
  return "Missing";
}

export function getDecisionBand(confidence) {
  if (confidence >= 85) return "High";
  if (confidence >= 65) return "Medium";
  return "Low";
}

export function decisionFromBand(band) {
  if (band === "High") return "Auto-link";
  if (band === "Medium") return "Human review";
  return "Keep separate";
}

export function confidenceColor(confidence) {
  if (confidence >= 85) return "var(--success)";
  if (confidence >= 65) return "var(--warning)";
  return "var(--danger)";
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

export function daysSince(value) {
  const current = new Date("2026-05-06T00:00:00+05:30");
  const date = new Date(`${value}T00:00:00+05:30`);
  return Math.max(0, Math.round((current - date) / 86400000));
}

export function classifyFreshness(status) {
  if (status === "Active") return "Fresh";
  if (status === "Dormant") return "Watch";
  return "Aged";
}

export function summarizeDecisions(candidateMatches, decisions) {
  return candidateMatches.reduce(
    (summary, match) => {
      const decision = decisions[match.id] || match.defaultDecision;
      if (decision === "approved" || decision === "auto-linked") summary.linked += 1;
      if (decision === "review") summary.review += 1;
      if (decision === "rejected" || decision === "separate") summary.separate += 1;
      return summary;
    },
    { linked: 0, review: 0, separate: 0 },
  );
}
