const steps = [
  {
    title: "해석가",
    body: "입력한 키워드 사이의 감정적, 상징적 연결고리를 찾아냅니다.",
  },
  {
    title: "큐레이터",
    body: "박물관 이름과 전시의 핵심 컨셉을 정합니다.",
  },
  {
    title: "전시 디자이너",
    body: "하나의 전시처럼 이어지는 3~5개의 작품을 구성합니다.",
  },
  {
    title: "홍보 담당",
    body: "큐레이터 노트와 포스터용 슬로건을 작성합니다.",
  },
];

export default function HowItWorks() {
  return (
    <section className="panel how-it-works">
      <div className="section-heading">
        <p className="eyebrow">에이전틱 워크플로우</p>
        <h2>AI 팀은 이렇게 전시를 만듭니다</h2>
      </div>
      <div className="workflow-grid">
        {steps.map((step) => (
          <article className="workflow-card" key={step.title}>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
