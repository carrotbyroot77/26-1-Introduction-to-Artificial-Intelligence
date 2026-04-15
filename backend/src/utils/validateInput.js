const ALLOWED_MOODS = [
  "dreamy",
  "horror",
  "emotional",
  "philosophical",
  "comic",
  "futuristic",
];

const sanitizeKeyword = (value) =>
  String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);

export function validateMuseumInput(payload) {
  if (!Array.isArray(payload?.keywords)) {
    return {
      valid: false,
      status: 400,
      message: "keywords 값은 배열 형태여야 합니다.",
    };
  }

  const rawKeywords = payload.keywords;
  const keywords = rawKeywords
    .map(sanitizeKeyword)
    .filter(Boolean)
    .slice(0, 3);

  const mood = String(payload?.mood ?? "")
    .trim()
    .toLowerCase();

  if (keywords.length < 2) {
    return {
      valid: false,
      status: 400,
      message: "비어 있지 않은 키워드를 최소 2개 입력해 주세요.",
    };
  }

  if (!ALLOWED_MOODS.includes(mood)) {
    return {
      valid: false,
      status: 400,
      message: "올바른 분위기를 선택해 주세요.",
    };
  }

  return {
    valid: true,
    data: {
      keywords,
      mood,
    },
  };
}

export { ALLOWED_MOODS };
