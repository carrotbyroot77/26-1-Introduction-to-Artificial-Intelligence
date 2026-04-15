const accents = ["amber", "mint", "sky", "rose", "violet"];

export default function ExhibitCard({ exhibit, index }) {
  const accent = accents[index % accents.length];

  return (
    <article className={`exhibit-card exhibit-card-${accent}`}>
      <div className="exhibit-image-wrap">
        <img
          className="exhibit-image"
          src={exhibit.image}
          alt={`${exhibit.title} 전시 장면`}
        />
      </div>

      <div className="exhibit-copy">
        <div className="exhibit-meta">
          <span className="exhibit-index">작품 {index + 1}</span>
          <span className="exhibit-zone">{exhibit.visualMotif}</span>
        </div>
        <h3>{exhibit.title}</h3>
        <p className="exhibit-tagline">{exhibit.tagline}</p>
        <p>{exhibit.shortDescription}</p>
      </div>
    </article>
  );
}
