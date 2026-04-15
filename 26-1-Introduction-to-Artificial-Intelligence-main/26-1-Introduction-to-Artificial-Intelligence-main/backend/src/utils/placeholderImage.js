function pickColors(palette = []) {
  const [a = "#f5e6c8", b = "#a5d7c3", c = "#f29d78"] = palette;
  return [a, b, c];
}

export function buildPlaceholderImage({
  title,
  subtitle = "",
  motif = "",
  palette = [],
}) {
  const [colorA, colorB, colorC] = pickColors(palette);
  const safeTitle = String(title ?? "").slice(0, 30);
  const safeSubtitle = String(subtitle ?? "").slice(0, 42);
  const safeMotif = String(motif ?? "").slice(0, 26);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${colorA}" />
          <stop offset="55%" stop-color="${colorB}" />
          <stop offset="100%" stop-color="${colorC}" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="64" fill="url(#bg)" />
      <circle cx="790" cy="220" r="120" fill="rgba(255,255,255,0.28)" />
      <rect x="160" y="210" width="520" height="260" rx="36" fill="rgba(255,255,255,0.18)" />
      <rect x="210" y="560" width="610" height="220" rx="44" fill="rgba(255,255,255,0.18)" />
      <rect x="300" y="370" width="150" height="250" rx="70" fill="rgba(255,255,255,0.78)" />
      <rect x="475" y="430" width="200" height="130" rx="44" fill="rgba(255,255,255,0.64)" />
      <circle cx="740" cy="630" r="52" fill="rgba(255,255,255,0.72)" />
      <text x="120" y="120" font-size="44" font-family="Arial, sans-serif" fill="rgba(44,32,24,0.7)">${safeMotif}</text>
      <text x="120" y="870" font-size="68" font-weight="700" font-family="Arial, sans-serif" fill="#2e2218">${safeTitle}</text>
      <text x="120" y="930" font-size="34" font-family="Arial, sans-serif" fill="rgba(46,34,24,0.8)">${safeSubtitle}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
