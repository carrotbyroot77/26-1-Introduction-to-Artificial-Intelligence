import OpenAI from "openai";
import { getDemoMuseum } from "../utils/demoMuseum.js";
import { buildPlaceholderImage } from "../utils/placeholderImage.js";
import { safeParseModelOutput } from "../utils/safeParseModelOutput.js";

const RESPONSE_SCHEMA = {
  name: "museum_exhibition",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      museumName: { type: "string" },
      summary: { type: "string" },
      concept: { type: "string" },
      interpretedTheme: { type: "string" },
      emotionalTone: { type: "string" },
      curatorialDirection: { type: "string" },
      designLanguage: { type: "string" },
      museumPalette: {
        type: "array",
        minItems: 3,
        maxItems: 3,
        items: { type: "string" },
      },
      heroImagePrompt: { type: "string" },
      exhibits: {
        type: "array",
        minItems: 3,
        maxItems: 5,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            tagline: { type: "string" },
            shortDescription: { type: "string" },
            visualMotif: { type: "string" },
            palette: {
              type: "array",
              minItems: 3,
              maxItems: 3,
              items: { type: "string" },
            },
            imagePrompt: { type: "string" },
          },
          required: [
            "title",
            "tagline",
            "shortDescription",
            "visualMotif",
            "palette",
            "imagePrompt",
          ],
        },
      },
      curatorComment: { type: "string" },
      slogan: { type: "string" },
    },
    required: [
      "museumName",
      "summary",
      "concept",
      "interpretedTheme",
      "emotionalTone",
      "curatorialDirection",
      "designLanguage",
      "museumPalette",
      "heroImagePrompt",
      "exhibits",
      "curatorComment",
      "slogan",
    ],
  },
};

const SYSTEM_PROMPT = `
You are AI Strange Museum Generator, a creative museum team operating as four coordinated roles:
1. Interpreter: analyze the emotional, symbolic, and conceptual links between the user's keywords.
2. Curator: invent a fictional museum title and one coherent exhibition concept.
3. Exhibit Designer: create exhibit scenes that could be shown as visual diorama cards.
4. Publicist: write a compact curator note and a memorable poster slogan.

Output rules:
- Return valid JSON only.
- Do not use markdown.
- Do not include explanation outside the JSON object.
- Write all values in Korean except image prompts, which must be in English.
- Keep summary, tagline, and shortDescription compact and presentation-friendly.
- Avoid line breaks in any field.
- Make the exhibition feel visually distinctive and closely tied to the user's keywords.
- Treat the result as a museum that should look like a polished healing puzzle game.
- Every exhibit must contain concrete visual motifs, palette hints, and an image prompt that clearly shows the user's keywords in scene form.
`.trim();

function buildUserPrompt(keywords, mood) {
  return `
User keywords: ${keywords.join(", ")}
Selected mood: ${mood}

Create a fictional museum exhibition based on these inputs.
The result must be visually rich, keyword-specific, and suitable for a public exhibition microsite.

Field guidance:
- summary: one sentence
- concept: 2 to 3 concise sentences
- interpretedTheme: one sentence
- emotionalTone: one sentence
- curatorialDirection: one sentence
- designLanguage: one sentence describing materials, lighting, composition, and game-like feel
- museumPalette: exactly 3 color words or hex-like color cues
- heroImagePrompt: an English image prompt for the overall museum hero visual
- each exhibit:
  - title: short
  - tagline: short, card-friendly
  - shortDescription: 1 to 2 compact sentences
  - visualMotif: concrete visible objects
  - palette: exactly 3 color words or hex-like color cues
  - imagePrompt: English prompt for a single exhibit diorama image
`.trim();
}

function extractOutputText(response) {
  if (typeof response?.output_text === "string" && response.output_text.trim()) {
    return response.output_text;
  }

  return (
    response?.output
      ?.flatMap((item) => item.content ?? [])
      ?.filter((content) => content.type === "output_text")
      ?.map((content) => content.text ?? "")
      ?.join("") || ""
  );
}

async function generateImage(client, prompt, fallbackData) {
  try {
    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
      quality: "low",
      output_format: "webp",
      output_compression: 60,
    });

    const base64 = result?.data?.[0]?.b64_json;

    if (!base64) {
      return fallbackData;
    }

    return `data:image/webp;base64,${base64}`;
  } catch (error) {
    console.error(
      "Image generation failed:",
      error instanceof Error ? error.message : "Unknown error",
    );
    return fallbackData;
  }
}

async function attachMuseumVisuals(client, museum, keywords) {
  const heroFallback = buildPlaceholderImage({
    title: museum.museumName,
    subtitle: keywords.join(" / "),
    motif: museum.slogan,
    palette: museum.museumPalette,
  });

  const heroImage = await generateImage(client, museum.heroImagePrompt, heroFallback);

  const exhibitImages = await Promise.all(
    museum.exhibits.map(async (exhibit) => {
      const fallback = buildPlaceholderImage({
        title: exhibit.title,
        subtitle: exhibit.tagline,
        motif: exhibit.visualMotif,
        palette: exhibit.palette,
      });

      const image = await generateImage(client, exhibit.imagePrompt, fallback);
      return { ...exhibit, image };
    }),
  );

  return {
    ...museum,
    heroImage,
    exhibits: exhibitImages,
  };
}

export async function generateMuseumExhibition({ keywords, mood }) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      museum: getDemoMuseum(keywords, mood),
      demoMode: true,
    };
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: SYSTEM_PROMPT }],
        },
        {
          role: "user",
          content: [{ type: "input_text", text: buildUserPrompt(keywords, mood) }],
        },
      ],
      text: {
        format: {
          type: "json_schema",
          ...RESPONSE_SCHEMA,
        },
      },
    });

    let museum;

    try {
      museum = safeParseModelOutput(extractOutputText(response));
    } catch (parseError) {
      console.error(
        "Model output parsing failed:",
        parseError instanceof Error ? parseError.message : "Unknown parse error",
      );

      return {
        museum: getDemoMuseum(keywords, mood),
        demoMode: true,
      };
    }

    const visualMuseum = await attachMuseumVisuals(client, museum, keywords);

    return {
      museum: visualMuseum,
      demoMode: false,
    };
  } catch (error) {
    console.error(
      "Museum generation failed:",
      error instanceof Error ? error.message : "Unknown error",
    );

    throw new Error("AI 박물관 생성 중 오류가 발생했습니다. 다시 시도해 주세요.");
  }
}
