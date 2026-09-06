import { useState } from "react";

const red = "#D61A02";
const blue = "#074FCD";
const ink = "#18304D";

function AHMark({ small = false }: { small?: boolean }) {
  return (
    <svg
      aria-label="AH monogram"
      className={small ? "ah-mark ah-mark--small" : "ah-mark"}
      viewBox="0 0 200 182"
      role="img"
    >
      <title>Interlocking AH monogram</title>
      <desc>A red A and blue H share a precise central structure.</desc>
      <path fill={red} d="M13 164 66 18h29l24 58H88l-7-18-28 88H13Zm39-31h72l12 31H40l12-31Z" />
      <path fill={blue} d="M117 18h31v146h-31V18Zm52 0h31v146h-31V18Zm-55 58h58v31h-58V76Z" />
      <path fill="#196BDE" d="M148 18h21v58h-21V18Z" />
    </svg>
  );
}

function FullLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "full-logo full-logo--compact" : "full-logo"}>
      <AHMark small={compact} />
      <span className="wordmark">
        Ameri<span>Host</span>
      </span>
    </div>
  );
}

export default function AHMonogram() {
  const [active, setActive] = useState<"light" | "ink">("light");

  return (
    <main className="concept-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        .concept-shell { min-height:100dvh; background:#f4f6f8; color:${ink}; font-family:'DM Sans',system-ui,sans-serif; padding:clamp(22px,5vw,72px); }
        .concept-frame { max-width:1120px; margin:0 auto; }
        .eyebrow { display:flex; align-items:center; gap:10px; color:${blue}; font:700 11px 'Space Mono',monospace; letter-spacing:.14em; text-transform:uppercase; }
        .eyebrow i { width:28px; height:2px; background:${red}; display:block; }
        .intro { display:flex; align-items:flex-end; justify-content:space-between; gap:32px; margin:24px 0 40px; }
        h1 { font-size:clamp(40px,6vw,72px); letter-spacing:-.065em; line-height:.92; margin:0; font-weight:700; }
        .intro-note { max-width:265px; color:#607086; line-height:1.55; font-size:14px; margin:0 0 3px; }
        .hero-card { background:#fbfcfd; border:1px solid #dce3eb; padding:clamp(26px,6vw,72px); position:relative; overflow:hidden; }
        .hero-card:before { content:'AH / 02'; position:absolute; right:28px; top:24px; font:11px 'Space Mono',monospace; color:#a2afbd; letter-spacing:.1em; }
        .full-logo { display:flex; align-items:center; gap:22px; }
        .ah-mark { width:120px; height:110px; flex:none; }
        .ah-mark--small { width:28px; height:26px; }
        .wordmark { color:${ink}; font-size:clamp(36px,6vw,78px); font-weight:700; letter-spacing:-.075em; line-height:1; }
        .wordmark span { color:${blue}; }
        .lockup-label { margin-top:36px; display:flex; align-items:center; gap:12px; color:#7a899a; font:11px 'Space Mono',monospace; text-transform:uppercase; letter-spacing:.1em; }
        .lockup-label:before { content:''; width:8px; height:8px; background:${red}; display:block; }
        .lower-grid { display:grid; grid-template-columns:1fr 1.7fr; gap:18px; margin-top:18px; }
        .panel { background:#fbfcfd; border:1px solid #dce3eb; padding:28px; }
        .panel-kicker { color:${blue}; font:700 10px 'Space Mono',monospace; letter-spacing:.13em; text-transform:uppercase; margin:0 0 25px; }
        .symbol-stage { min-height:178px; display:grid; place-items:center; background:#f1f4f7; }
        .symbol-stage .ah-mark { width:104px; height:95px; }
        .explanation { color:#53657a; font-size:15px; line-height:1.7; max-width:560px; margin:0; }
        .explanation strong { color:${ink}; font-weight:700; }
        .metrics { display:flex; gap:24px; border-top:1px solid #e2e7ed; margin-top:26px; padding-top:20px; }
        .metric { display:grid; gap:5px; } .metric b { color:${ink}; font-size:13px; } .metric span { color:#8090a1; font:10px 'Space Mono',monospace; text-transform:uppercase; }
        .preview-panel { margin-top:18px; background:#18304d; padding:28px; color:white; }
        .preview-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; color:#c5d4e4; font-size:11px; font-family:'Space Mono',monospace; }
        .site-header { background:#fbfcfd; color:${ink}; min-height:72px; padding:0 20px; display:flex; justify-content:space-between; align-items:center; }
        .full-logo--compact { gap:9px; } .full-logo--compact .wordmark { font-size:22px; letter-spacing:-.075em; }
        .site-links { display:flex; align-items:center; gap:20px; color:#6b7b8d; font-size:11px; } .site-cta { background:${red}; color:white; padding:10px 14px; font-weight:700; }
        .evaluation { border-left:3px solid ${red}; padding-left:16px; margin-top:28px; color:#53657a; font-size:13px; line-height:1.55; }
        .evaluation b { color:${ink}; display:block; margin-bottom:5px; font-size:14px; }
        .swatches { display:flex; gap:8px; margin-top:25px; } .swatches span { width:18px; height:18px; display:block; } .swatches span:nth-child(1){background:${red}} .swatches span:nth-child(2){background:${blue}} .swatches span:nth-child(3){background:#196BDE}
        @media(max-width:700px){ .intro{display:block} .intro-note{margin-top:20px} .lower-grid{grid-template-columns:1fr} .hero-card{padding:34px 22px} .full-logo{gap:12px} .ah-mark{width:78px;height:72px}.site-links{gap:8px}.site-links span{display:none} }
      `}</style>
      <div className="concept-frame">
        <div className="eyebrow"><i /> Concept 2 · AH Monogram</div>
        <div className="intro">
          <h1>AmeriHost<br /><span style={{ color: red }}>AH</span> Monogram</h1>
          <p className="intro-note">A compact, ownable mark built from the company’s initials — direct, capable, and easy to recognize in a browser header.</p>
        </div>

        <section className="hero-card" aria-label="Full horizontal logo">
          <FullLogo />
          <div className="lockup-label">Primary horizontal lockup · light background</div>
        </section>

        <div className="lower-grid">
          <section className="panel" aria-label="Symbol alone">
            <p className="panel-kicker">01 / Symbol alone</p>
            <div className="symbol-stage"><AHMark /></div>
            <div className="swatches"><span /><span /><span /></div>
          </section>
          <section className="panel" aria-label="Concept explanation">
            <p className="panel-kicker">02 / Design logic</p>
            <p className="explanation"><strong>Two initials, one structure.</strong> The red A rises into the blue H’s shared crossbar, creating a compact signature without enclosing it in a predictable badge. The open geometry gives the mark room to breathe while the squared terminals signal technical confidence.</p>
            <div className="metrics">
              <div className="metric"><b>Ownable</b><span>Initial-led</span></div>
              <div className="metric"><b>Clear</b><span>At small scale</span></div>
              <div className="metric"><b>Balanced</b><span>Red / blue</span></div>
            </div>
          </section>
        </div>

        <section className="preview-panel" aria-label="Website header preview">
          <div className="preview-top"><span>03 / Real-world check</span><span>1440 × 72 header</span></div>
          <div className="site-header">
            <FullLogo compact />
            <div className="site-links"><span>Services</span><span>Support</span><span>Sign in</span><b className="site-cta">Get started</b></div>
          </div>
          <div className="evaluation"><b>Evaluation note</b>The symbol remains legible at favicon-adjacent sizes, while the horizontal lockup holds a calm, credible silhouette in a busy small-business website header. Keep the full wordmark for primary navigation; use the symbol alone for compact utility surfaces.</div>
        </section>
      </div>
    </main>
  );
}

export { AHMark };