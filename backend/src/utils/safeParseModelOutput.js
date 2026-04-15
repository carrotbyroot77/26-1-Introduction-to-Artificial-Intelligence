const REQUIRED_STRING_FIELDS = [
  "museumName",
  "summary",
  "concept",
  "interpretedTheme",
  "emotionalTone",
  "curatorialDirection",
  "designLanguage",
  "heroImagePrompt",
  "curatorComment",
  "slogan",
];

function normalizeString(value, fallback, maxLength = 220) {
  const normalized = String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

  return normalized || fallback;
}

function normalizePalette(value, fallbackPalette) {
  if (!Array.isArray(value)) {
    return fallbackPalette;
  }

  const palette = value
    .map((item) => normalizeString(item, "", 24))
    .filter(Boolean)
    .slice(0, 3);

  return palette.length === 3 ? palette : fallbackPalette;
}

function extractJsonString(rawOutput) {
  if (typeof rawOutput !== "string") {
    return "";
  }

  const trimmed = rawOutput.trim();
  const withoutFences = trimmed
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");

  const firstBrace = withoutFences.indexOf("{");
  const lastBrace = withoutFences.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return withoutFences.slice(firstBrace, lastBrace + 1);
  }

  return withoutFences;
}

export function safeParseModelOutput(rawOutput) {
  const jsonCandidate = extractJsonString(rawOutput);
  const parsed = JSON.parse(jsonCandidate);

  const museum = {};

  for (const field of REQUIRED_STRING_FIELDS) {
    museum[field] = normalizeString(parsed?.[field], `Missing ${field}.`);
  }

  museum.museumPalette = normalizePalette(parsed?.museumPalette, [
    "cream",
    "mint",
    "coral",
  ]);

  const exhibits = Array.isArray(parsed?.exhibits) ? parsed.exhibits : [];
  museum.exhibits = exhibits
    .map((item, index) => ({
      title: normalizeString(item?.title, `작품 ${index + 1}`, 50),
      tagline: normalizeString(item?.tagline, "기묘한 전시 장면", 54),
      shortDescription: normalizeString(
        item?.shortDescription,
        "이 작품은 박물관의 중심 분위기를 시각적으로 압축한 장면입니다.",
        140,
      ),
      visualMotif: normalizeString(item?.visualMotif, "부유하는 조각 오브제", 60),
      palette: normalizePalette(item?.palette, ["cream", "sky", "peach"]),
      imagePrompt: normalizeString(
        item?.imagePrompt,
        "A whimsical museum diorama, toy-like scale, soft light, polished surfaces.",
        320,
      ),
    }))
    .filter((item) => item.title && item.shortDescription)
    .slice(0, 5);

  if (museum.exhibits.length < 3) {
    throw new Error("Model output did not include enough valid exhibits.");
  }

  return museum;
}
