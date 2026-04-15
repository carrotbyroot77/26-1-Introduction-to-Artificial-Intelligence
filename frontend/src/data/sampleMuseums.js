function placeholderImage(title, subtitle, colors) {
  const [a, b, c] = colors;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${a}" />
          <stop offset="55%" stop-color="${b}" />
          <stop offset="100%" stop-color="${c}" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="56" fill="url(#bg)" />
      <rect x="140" y="180" width="560" height="250" rx="30" fill="rgba(255,255,255,0.18)" />
      <rect x="220" y="530" width="600" height="220" rx="40" fill="rgba(255,255,255,0.16)" />
      <rect x="300" y="350" width="160" height="260" rx="76" fill="rgba(255,255,255,0.74)" />
      <rect x="500" y="420" width="200" height="110" rx="40" fill="rgba(255,255,255,0.58)" />
      <circle cx="770" cy="620" r="56" fill="rgba(255,255,255,0.72)" />
      <text x="120" y="865" font-size="68" font-weight="700" font-family="Arial, sans-serif" fill="#30231c">${title}</text>
      <text x="120" y="925" font-size="34" font-family="Arial, sans-serif" fill="rgba(48,35,28,0.82)">${subtitle}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const exampleKeywordSets = [
  ["우산", "외로움", "벌레"],
  ["고양이", "에러", "우주"],
  ["지하철", "종이컵", "졸림"],
  ["감자", "졸림", "빨간색"],
  ["전구", "향수", "안개"],
  ["체리", "불안", "호텔"],
  ["시계", "먼지", "파란빛"],
  ["종이배", "침묵", "달"],
  ["라면", "우울", "네온"],
  ["유리", "기억", "바다"],
  ["계단", "비", "혼잣말"],
  ["토스트", "우주", "고양이"],
  ["풍선", "멜랑콜리", "복도"],
  ["연필", "꿈", "파도"],
  ["주전자", "정적", "노을"],
  ["커튼", "속삭임", "분홍빛"],
  ["버섯", "편지", "새벽"],
  ["열쇠", "잠", "정원"],
  ["사탕", "기억상실", "회전목마"],
  ["필름", "한숨", "보라색"],
];

export const sampleMuseumResult = {
  museumName: "한밤중 이동 사물 박물관",
  summary: "도시의 피로와 잔여 사물들을 작은 퍼즐 전시실로 재조립한 몽환적 박물관.",
  concept:
    "이 박물관은 지하철, 종이컵, 졸림을 하나의 심야 생활권으로 묶습니다. 이동 중 버려지는 사물과 반쯤 잠든 감각을 미니 전시실처럼 큐레이션해, 관람객이 각 장면을 하나씩 통과하도록 설계했습니다.",
  interpretedTheme:
    "도시의 피로가 사라지지 않고 작은 방 안에 장면으로 축적되는 과정.",
  emotionalTone: "고요하고 포근하지만, 금방이라도 꿈으로 넘어갈 듯 살짝 흔들리는 분위기.",
  curatorialDirection:
    "모든 작품을 손바닥 위 디오라마처럼 구성해, 짧은 시선만으로도 전시의 정서를 읽을 수 있게 했습니다.",
  designLanguage:
    "라운드형 오브제, 파스텔 조명, 토이 스케일 전시실, 미니어처 건축, 부드러운 그림자.",
  museumPalette: ["#f2e2bf", "#9bc5d9", "#f09d6f"],
  heroImagePrompt: "",
  heroImage: placeholderImage(
    "한밤중 이동 사물 박물관",
    "지하철 / 종이컵 / 졸림",
    ["#f2e2bf", "#9bc5d9", "#f09d6f"],
  ),
  curatorComment:
    "이 전시는 사라지는 이동의 순간들을 작은 박물관 방 안에 붙잡아 두기 위해 만들어졌습니다.",
  slogan: "잠들기 직전의 도시를 수집합니다.",
  exhibits: [
    {
      title: "플랫폼 수면실",
      tagline: "정차와 졸음이 맞물리는 입구 장면",
      shortDescription:
        "붉은 좌석과 푸른 안내등 사이에 정차 직전의 긴장감이 낮은 높이의 전시실로 압축됩니다.",
      visualMotif: "지하철 좌석, 조명 기둥, 반쯤 감긴 눈 형태의 표지판",
      palette: ["#f5dfc6", "#7cb3d8", "#d8695f"],
      imagePrompt: "",
      image: placeholderImage(
        "플랫폼 수면실",
        "정차와 졸음이 맞물리는 입구 장면",
        ["#f5dfc6", "#7cb3d8", "#d8695f"],
      ),
    },
    {
      title: "종이컵 별자리",
      tagline: "버려진 온기의 자리를 그린 작은 방",
      shortDescription:
        "사용된 종이컵들이 별자리처럼 떠 있고, 손의 온기가 조용한 빛으로 남아 관람객의 동선을 감쌉니다.",
      visualMotif: "공중에 뜬 종이컵, 잔광, 따뜻한 원형 바닥",
      palette: ["#edd7b1", "#f4a66a", "#8fd3c3"],
      imagePrompt: "",
      image: placeholderImage(
        "종이컵 별자리",
        "버려진 온기의 자리를 그린 작은 방",
        ["#edd7b1", "#f4a66a", "#8fd3c3"],
      ),
    },
    {
      title: "7호차의 느린 밤",
      tagline: "이동 중인 졸음을 실내 풍경으로 바꾼 장면",
      shortDescription:
        "창문 밖 어둠과 실내의 완만한 조명이 만나, 움직이는 객실 전체가 하나의 부유하는 전시물이 됩니다.",
      visualMotif: "차창, 긴 벤치, 푸른 야간 조명",
      palette: ["#d8e7ef", "#6f90d9", "#f5c485"],
      imagePrompt: "",
      image: placeholderImage(
        "7호차의 느린 밤",
        "이동 중인 졸음을 실내 풍경으로 바꾼 장면",
        ["#d8e7ef", "#6f90d9", "#f5c485"],
      ),
    },
  ],
};
