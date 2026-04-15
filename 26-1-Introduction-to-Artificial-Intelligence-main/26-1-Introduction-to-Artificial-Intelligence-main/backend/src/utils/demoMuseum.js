import { buildPlaceholderImage } from "./placeholderImage.js";

const demoMuseums = {
  dreamy: {
    museumName: "부드러운 잡음의 박물관",
    summary: "비밀스러운 날씨와 사소한 사물들이 서로의 꿈을 번역하는 몽환적 전시.",
    concept:
      "이 전시는 입력된 키워드를 하나의 기후처럼 다룹니다. 감자 같은 평범한 물성, 졸림 같은 느슨한 감각, 빨간색 같은 강한 시각 신호가 한 공간 안에서 부유하며 낯선 휴식의 풍경을 만듭니다.",
    interpretedTheme:
      "익숙한 사물의 무게와 흐릿한 의식, 선명한 색의 충돌이 만들어내는 이상한 안락함.",
    emotionalTone: "포근하고 몽롱하지만, 한가운데에는 또렷한 시각적 긴장이 남아 있습니다.",
    curatorialDirection:
      "전시 전체를 낮잠 직전의 퍼즐 게임처럼 구성해, 관람객이 장면마다 잠깐 멈춰 서서 상징을 읽게 만듭니다.",
    designLanguage:
      "토이 같은 디오라마, 부드러운 조명, 둥근 구조물, 작은 퍼즐 방, 만졌을 때 촉감이 느껴질 듯한 표면.",
    museumPalette: ["#f4e6bf", "#9bd3c2", "#ec6f57"],
    heroImagePrompt:
      "A whimsical museum lobby designed like a healing puzzle game, featuring potato-like stone forms, sleepy floating clouds, vivid red accents, soft toy-like materials, polished diorama lighting, cinematic composition.",
    slogan: "낮잠의 가장 선명한 색을 전시합니다.",
    curatorComment:
      "이 박물관은 아무것도 대단하지 않은 사물들이 사실은 얼마나 강한 분위기를 만들 수 있는지 보여주기 위해 설계되었습니다.",
    exhibits: [
      {
        title: "붉은 낮잠 보관소",
        tagline: "감자의 표면과 졸린 공기가 만나는 입구 장면",
        shortDescription:
          "둥근 감자형 조각들이 천천히 떠다니는 붉은 실내에서, 잠들기 직전의 무게감이 전시 시작을 알립니다.",
        visualMotif: "둥근 감자 조각, 붉은 쿠션 바닥, 부유하는 졸음 구름",
        palette: ["#f4e6bf", "#f06e5c", "#9fd9c7"],
        imagePrompt:
          "A cozy puzzle-game diorama room with rounded potato sculptures, sleepy floating cloud shapes, strong red flooring, toy-like museum display, soft indirect light, polished whimsical textures.",
      },
      {
        title: "졸림의 관측실",
        tagline: "의식이 천천히 흐려지는 순간을 전시한 퍼즐 방",
        shortDescription:
          "방 중앙의 붉은 조명 기둥 주변으로 졸음을 상징하는 반투명 층이 겹치며, 시선의 속도가 느려집니다.",
        visualMotif: "빨간 빛 기둥, 흐린 안개층, 둥근 받침대",
        palette: ["#f5d9c9", "#de5f54", "#9ac5df"],
        imagePrompt:
          "A small museum observatory room as a healing puzzle diorama, centered on a glowing red pillar, dreamy translucent fog layers, rounded pedestals, stylized toy-scale architecture, elegant lighting.",
      },
      {
        title: "전분 정원",
        tagline: "감자가 식물처럼 자라는 조용한 실내 정원",
        shortDescription:
          "감자의 표면 질감이 화분, 조형물, 작은 계단 구조로 번역되어 차분한 붉은빛 속 정원처럼 펼쳐집니다.",
        visualMotif: "감자 식물, 낮은 계단, 붉은 실내 정원",
        palette: ["#eadab2", "#c84f4f", "#89c4a8"],
        imagePrompt:
          "An indoor puzzle-garden museum diorama where potato-like forms grow as plants and sculptural steps, warm red ambient light, serene toy-like scene, highly composed visual storytelling.",
      },
    ],
  },
};

function withImages(museum, keywords) {
  const heroImage = buildPlaceholderImage({
    title: museum.museumName,
    subtitle: keywords.join(" / "),
    motif: museum.slogan,
    palette: museum.museumPalette,
  });

  return {
    ...museum,
    heroImage,
    exhibits: museum.exhibits.map((exhibit) => ({
      ...exhibit,
      image: buildPlaceholderImage({
        title: exhibit.title,
        subtitle: exhibit.tagline,
        motif: exhibit.visualMotif,
        palette: exhibit.palette,
      }),
    })),
  };
}

export function getDemoMuseum(keywords, mood) {
  const preset = demoMuseums[mood] ?? demoMuseums.dreamy;

  return withImages(
    {
      ...preset,
      summary: `${preset.summary} 입력 키워드: ${keywords.join(", ")}.`,
    },
    keywords,
  );
}
