import { useState } from "react";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import KeywordForm from "./components/KeywordForm";
import MuseumResult from "./components/MuseumResult";
import { exampleKeywordSets, sampleMuseumResult } from "./data/sampleMuseums";
import { copyToClipboard } from "./utils/copyToClipboard";

const initialKeywords = ["", "", ""];
const initialMood = "dreamy";

const moodThemes = {
  dreamy: "theme-dreamy",
  horror: "theme-horror",
  emotional: "theme-emotional",
  philosophical: "theme-philosophical",
  comic: "theme-comic",
  futuristic: "theme-futuristic",
};

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";

async function readApiResponse(response) {
  const rawText = await response.text();

  if (!rawText.trim()) {
    return {
      ok: false,
      error: "서버가 빈 응답을 반환했습니다. 백엔드가 정상 실행 중인지 확인해 주세요.",
    };
  }

  try {
    return JSON.parse(rawText);
  } catch {
    return {
      ok: false,
      error: "서버 응답을 해석하지 못했습니다. 백엔드 로그를 확인해 주세요.",
    };
  }
}

function formatMuseumForCopy(museum) {
  const exhibitLines = museum.exhibits
    .map(
      (item, index) =>
        `${index + 1}. ${item.title}\n- ${item.tagline}\n- ${item.shortDescription}`,
    )
    .join("\n\n");

  return [
    museum.museumName,
    museum.summary,
    "",
    `전시 컨셉: ${museum.concept}`,
    `해석된 테마: ${museum.interpretedTheme}`,
    `감정 톤: ${museum.emotionalTone}`,
    `큐레이션 방향: ${museum.curatorialDirection}`,
    `디자인 언어: ${museum.designLanguage}`,
    "",
    "전시 작품:",
    exhibitLines,
    "",
    `큐레이터 코멘트: ${museum.curatorComment}`,
    `슬로건: ${museum.slogan}`,
  ].join("\n");
}

export default function App() {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [mood, setMood] = useState(initialMood);
  const [museum, setMuseum] = useState(sampleMuseumResult);
  const [demoMode, setDemoMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const themeClass = moodThemes[mood] ?? moodThemes.dreamy;

  const applyExample = (example) => {
    setKeywords([example[0] ?? "", example[1] ?? "", example[2] ?? ""]);
    setError("");
  };

  const handleRandomExample = () => {
    const example =
      exampleKeywordSets[Math.floor(Math.random() * exampleKeywordSets.length)];
    applyExample(example);
  };

  const handleKeywordChange = (index, value) => {
    setKeywords((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? value : item)),
    );
  };

  const generateMuseum = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const cleanKeywords = keywords.map((item) => item.trim()).filter(Boolean);

    if (cleanKeywords.length < 2) {
      setError("박물관을 생성하려면 키워드를 최소 2개 입력해야 합니다.");
      return;
    }

    setLoading(true);
    setError("");
    setCopyMessage("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/generate-museum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: cleanKeywords,
          mood,
        }),
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data?.error || "박물관 생성에 실패했습니다.");
      }

      if (!data?.museum) {
        throw new Error("생성 결과가 비어 있습니다. 잠시 후 다시 시도해 주세요.");
      }

      setMuseum(data.museum);
      setDemoMode(Boolean(data.demoMode));
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "박물관을 생성하는 중 오류가 발생했습니다.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await copyToClipboard(formatMuseumForCopy(museum));
      setCopyMessage("결과를 클립보드에 복사했습니다.");
      window.setTimeout(() => setCopyMessage(""), 2200);
    } catch {
      setCopyMessage("복사에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className={`app-shell ${themeClass}`}>
      <div className="page-gradient" aria-hidden="true" />
      <main className="page">
        <Hero />

        <div className="page-grid">
          <div className="left-column">
            <KeywordForm
              keywords={keywords}
              mood={mood}
              loading={loading}
              onKeywordChange={handleKeywordChange}
              onMoodChange={setMood}
              onSubmit={generateMuseum}
              onRandomExample={handleRandomExample}
              onSelectExample={applyExample}
            />
            <HowItWorks />
          </div>

          <div className="right-column">
            {error ? <div className="status-message error-message">{error}</div> : null}
            {copyMessage ? (
              <div className="status-message success-message">{copyMessage}</div>
            ) : null}
            {loading ? (
              <div className="panel loading-panel">
                <div className="loading-ring" />
                <h2>박물관 장면을 생성하는 중입니다...</h2>
                <p>
                  AI가 전시 컨셉을 정리하고, 작품 장면을 설계하고, 이미지까지
                  구성하고 있습니다.
                </p>
              </div>
            ) : null}
            <MuseumResult
              museum={museum}
              demoMode={demoMode}
              onCopy={handleCopy}
              onRegenerate={generateMuseum}
              loading={loading}
            />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>에이전틱 AI 실습 과제를 위해 제작된 프로젝트입니다.</p>
        <a href="https://github.com/your-username/your-repo" target="_blank" rel="noreferrer">
          GitHub 저장소 링크 자리
        </a>
      </footer>
    </div>
  );
}
