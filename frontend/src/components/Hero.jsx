export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">에이전틱 AI 실습 과제</p>
        <h1>AI Strange Museum Generator</h1>
        <p className="hero-subtitle">
          낯선 키워드 몇 개와 분위기를 선택하면, AI 창작 팀이 가상의 박물관
          전시를 기획합니다. 전시 제목, 컨셉, 작품 설명, 큐레이터 노트,
          포스터용 슬로건까지 한 번에 생성됩니다.
        </p>
      </div>
      <div className="hero-orb" aria-hidden="true">
        <div className="hero-orb-core" />
      </div>
    </section>
  );
}
