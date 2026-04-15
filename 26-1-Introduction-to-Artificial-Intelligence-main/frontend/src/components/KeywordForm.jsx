import { exampleKeywordSets } from "../data/sampleMuseums";

const moods = [
  "dreamy",
  "horror",
  "emotional",
  "philosophical",
  "comic",
  "futuristic",
];

const moodLabels = {
  dreamy: "몽환적",
  horror: "호러",
  emotional: "감성적",
  philosophical: "철학적",
  comic: "코믹",
  futuristic: "미래적",
};

export default function KeywordForm({
  keywords,
  mood,
  loading,
  onKeywordChange,
  onMoodChange,
  onSubmit,
  onRandomExample,
  onSelectExample,
}) {
  return (
    <section className="panel form-panel">
      <div className="section-heading">
        <p className="eyebrow">전시 만들기</p>
        <h2>박물관에 들어갈 이상한 재료를 입력해 보세요</h2>
      </div>

      <form className="keyword-form" onSubmit={onSubmit}>
        <div className="keyword-grid">
          {keywords.map((keyword, index) => (
            <label className="field" key={`keyword-${index}`}>
              <span>키워드 {index + 1}</span>
              <input
                type="text"
                value={keyword}
                placeholder={
                  index === 0 ? "우산" : index === 1 ? "외로움" : "벌레"
                }
                maxLength={40}
                onChange={(event) => onKeywordChange(index, event.target.value)}
              />
            </label>
          ))}
        </div>

        <label className="field">
          <span>분위기</span>
          <select value={mood} onChange={(event) => onMoodChange(event.target.value)}>
            {moods.map((moodOption) => (
              <option value={moodOption} key={moodOption}>
                {moodLabels[moodOption]}
              </option>
            ))}
          </select>
        </label>

        <div className="recommendation-block">
          <div className="recommendation-header">
            <span>추천 키워드 조합</span>
            <button
              type="button"
              className="recommendation-random"
              disabled={loading}
              onClick={onRandomExample}
            >
              랜덤 추천
            </button>
          </div>
          <div className="chip-row chip-grid">
            {exampleKeywordSets.map((example) => (
              <button
                key={example.join("-")}
                type="button"
                className="chip recommendation-chip"
                onClick={() => onSelectExample(example)}
              >
                {example.join(" / ")}
              </button>
            ))}
          </div>
        </div>

        <div className="action-row">
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? "전시 생성 중..." : "박물관 생성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
