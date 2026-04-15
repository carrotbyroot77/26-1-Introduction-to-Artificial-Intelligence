import DemoBadge from "./DemoBadge";
import ExhibitCard from "./ExhibitCard";

export default function MuseumResult({
  museum,
  demoMode,
  onCopy,
  onRegenerate,
  loading,
}) {
  return (
    <section className="museum-result">
      <div className="result-topbar">
        <div>
          <p className="eyebrow">디지털 전시</p>
          <h2>생성된 박물관</h2>
        </div>
        <div className="result-actions">
          {demoMode ? <DemoBadge /> : null}
          <button className="secondary-button" onClick={onCopy}>
            결과 복사
          </button>
          <button
            className="primary-button"
            onClick={onRegenerate}
            disabled={loading}
          >
            {loading ? "다시 생성 중..." : "다시 생성"}
          </button>
        </div>
      </div>

      <article className="panel exhibition-panel museum-showcase">
        <section className="showcase-hero">
          <div className="showcase-copy">
            <p className="poster-slogan">{museum.slogan}</p>
            <h3 className="museum-name">{museum.museumName}</h3>
            <p className="museum-summary">{museum.summary}</p>

            <div className="showcase-meta">
              <span className="meta-chip">{museum.emotionalTone}</span>
              <span className="meta-chip">{museum.designLanguage}</span>
            </div>
          </div>

          <div className="showcase-image-frame">
            <img
              className="showcase-image"
              src={museum.heroImage}
              alt={`${museum.museumName} 대표 전시 이미지`}
            />
          </div>
        </section>

        <div className="puzzle-info-grid">
          <section className="content-card concept-card">
            <h4>전시 컨셉</h4>
            <p>{museum.concept}</p>
          </section>

          <section className="content-card curation-card">
            <h4>AI가 이렇게 큐레이션했습니다</h4>
            <dl className="curation-list">
              <div>
                <dt>해석된 테마</dt>
                <dd>{museum.interpretedTheme}</dd>
              </div>
              <div>
                <dt>감정 톤</dt>
                <dd>{museum.emotionalTone}</dd>
              </div>
              <div>
                <dt>큐레이션 방향</dt>
                <dd>{museum.curatorialDirection}</dd>
              </div>
            </dl>
          </section>
        </div>

        <section className="exhibit-section">
          <div className="section-heading-inline">
            <h4>전시 작품</h4>
            <p>각 작품은 키워드를 장면으로 번역한 작은 디오라마 카드입니다.</p>
          </div>
          <div className="exhibit-grid">
            {museum.exhibits.map((exhibit, index) => (
              <ExhibitCard exhibit={exhibit} index={index} key={exhibit.title} />
            ))}
          </div>
        </section>

        <aside className="curator-note">
          <span className="eyebrow">큐레이터 노트</span>
          <p>{museum.curatorComment}</p>
        </aside>
      </article>
    </section>
  );
}
