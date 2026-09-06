import { useState } from "react";
import masterSvg from "./amerihost-network-master.svg";
import masterPng from "./amerihost-network-master.png";

function NetworkMark({ size = 64 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="AmeriHost Network Signal mark"
    >
      <title>AmeriHost Network Signal mark</title>
      <desc>Three connected blue and red routing tiles form a compact network signal.</desc>
      <path d="M17 17h14v14H17z" fill="#074FCD" />
      <path d="M33 33h14v14H33z" fill="#D61A02" />
      <path d="M33 17h14v14H33z" fill="#196BDE" />
      <path d="M17 33h14v14H17z" fill="#D61A02" />
      <path d="M31 24h4M40 31v4M31 40h4M24 31v4" stroke="#123455" strokeWidth="4" strokeLinecap="square" />
    </svg>
  );
}

export function NetworkSignal() {
  const [showPng, setShowPng] = useState(false);

  return (
    <main className="network-review">
      <style>{`
        .network-review{--ink:#123455;--blue:#074FCD;--blue2:#196BDE;--red:#D61A02;--paper:#f7f9fc;--line:#d9e2ee;min-height:100dvh;background:#eef3f8;color:var(--ink);font-family:"DM Sans","Avenir Next",Avenir,system-ui,sans-serif;padding:clamp(20px,5vw,64px)}
        .network-shell{max-width:1120px;margin:auto}
        .network-kicker{font:700 11px/1.2 "Space Mono",monospace;letter-spacing:.14em;text-transform:uppercase;color:#58708c;margin:0 0 14px}
        .network-heading{font-size:clamp(30px,5vw,58px);letter-spacing:-.055em;line-height:.98;margin:0;max-width:760px;color:#0d2945}
        .network-heading span{color:var(--blue)}
        .network-intro{display:flex;justify-content:space-between;align-items:end;gap:30px;margin-bottom:40px}
        .network-note{max-width:320px;font-size:14px;line-height:1.6;color:#526982;margin:0}
        .network-concept{display:inline-flex;align-items:center;gap:8px;color:var(--red);font-size:12px;font-weight:700;letter-spacing:.05em;text-transform:uppercase}
        .network-concept i{width:7px;height:7px;background:var(--red);display:inline-block}
        .network-card{background:var(--paper);border:1px solid var(--line);border-radius:18px;overflow:hidden}
        .network-cardhead{display:flex;justify-content:space-between;align-items:center;padding:18px 24px;border-bottom:1px solid var(--line);font-size:12px;color:#698099}
        .network-cardhead strong{font-size:13px;color:var(--ink)}
        .network-stage{padding:clamp(32px,7vw,86px) clamp(24px,8vw,104px);display:flex;justify-content:center;align-items:center;gap:42px;min-height:240px}
        .network-master{max-width:100%;height:auto;display:block}
        .network-markonly{border-left:1px solid var(--line);padding-left:42px;display:flex;flex-direction:column;align-items:center;gap:8px}
        .network-markonly small{font:10px "Space Mono",monospace;color:#7890a7;text-transform:uppercase;letter-spacing:.08em}
        .network-details{display:grid;grid-template-columns:1.1fr .9fr;border-top:1px solid var(--line)}
        .network-detail{padding:28px 30px}
        .network-detail+ .network-detail{border-left:1px solid var(--line)}
        .network-detail h2{font-size:13px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 16px;color:#5a718b}
        .network-detail p{font-size:15px;line-height:1.7;margin:0;color:#284763}
        .network-eval{display:flex;gap:12px;align-items:flex-start}
        .network-check{width:24px;height:24px;background:var(--blue);color:#fff;display:grid;place-items:center;font-weight:800;flex:none}
        .network-check:after{content:"✓"}
        .network-preview{margin-top:28px;border:1px solid var(--line);background:#fff;border-radius:15px;overflow:hidden}
        .network-previewbar{height:34px;background:#f2f5f9;border-bottom:1px solid #e3e9f0;display:flex;align-items:center;padding:0 13px;gap:5px}
        .network-dot{width:6px;height:6px;border-radius:50%;background:#b8c6d5}
        .network-browser{padding:0 18px;height:60px;display:flex;align-items:center;gap:11px;border-bottom:1px solid #edf1f5}
        .network-browser img{width:134px;height:auto}
        .network-nav{margin-left:auto;display:flex;gap:14px;font-size:9px;color:#768ba1}
        .network-previewbody{height:82px;padding:17px 18px;background:#fbfcfe}
        .network-skeleton{height:8px;width:39%;background:#dfe7f0;margin-bottom:9px}
        .network-skeleton.short{width:22%;background:#edf1f5}
        .network-toggle{margin-top:18px;border:0;background:none;color:#657b92;font-size:11px;text-decoration:underline;cursor:pointer;padding:0}
        @media (max-width:700px){.network-intro{display:block}.network-note{margin-top:20px}.network-details{grid-template-columns:1fr}.network-detail+.network-detail{border-left:0;border-top:1px solid var(--line)}.network-browser img{width:116px}.network-nav{display:none}}
      `}</style>
      <div className="network-shell">
        <header className="network-intro">
          <div>
            <p className="network-kicker">AmeriHost / identity study 03</p>
            <h1 className="network-heading">A small mark for a <span>connected</span> web.</h1>
          </div>
          <p className="network-note"><span className="network-concept"><i /> Concept 3 · Network Signal</span><br />A compact routing symbol built from coordinated tiles — dependable infrastructure, made human-scale.</p>
        </header>

        <section className="network-card" aria-labelledby="network-full-logo">
          <div className="network-cardhead"><strong id="network-full-logo">Full horizontal logo</strong><span>light background · master artwork</span></div>
          <div className="network-stage"><img className="network-master" src={masterSvg} alt="AmeriHost Network Signal full logo" /><div className="network-markonly"><NetworkMark size={58} /><small>symbol alone</small></div></div>
          <div className="network-details">
            <div className="network-detail">
              <h2>Why this direction</h2>
              <p>Four bold tiles read as a routed path rather than a literal server or cloud. The quiet central gaps create a signal rhythm; blue carries capability, while the red turn gives AmeriHost a memorable human signature.</p>
              <button className="network-toggle" type="button" onClick={() => setShowPng((value) => !value)}>{showPng ? "Show SVG master" : "Inspect transparent PNG export"}</button>
              {showPng ? <img src={masterPng} alt="Transparent PNG export of the AmeriHost Network Signal logo" style={{ display: "block", marginTop: 14, maxWidth: "100%", height: 28 }} /> : null}
            </div>
            <div className="network-detail">
              <h2>Evaluation note</h2>
              <div className="network-eval"><span className="network-check" aria-hidden="true" /><p>Strong at header scale: the mark keeps its signal logic at 16px, avoids industry clichés, and pairs naturally with the existing red/orange and blue relationship.</p></div>
            </div>
          </div>
        </section>

        <section className="network-preview" aria-labelledby="network-preview-title">
          <div className="network-cardhead"><strong id="network-preview-title">Website header preview</strong><span>realistic small-size test · 16px mark</span></div>
          <div className="network-previewbar"><span className="network-dot" /><span className="network-dot" /><span className="network-dot" /></div>
          <div className="network-browser">
            <img src={masterSvg} alt="AmeriHost compact website header logo" />
            <nav className="network-nav" aria-label="Preview navigation"><span>Services</span><span>Support</span><span>Contact</span></nav>
          </div>
          <div className="network-previewbody"><div className="network-skeleton" /><div className="network-skeleton short" /></div>
        </section>
      </div>
    </main>
  );
}

export default NetworkSignal;