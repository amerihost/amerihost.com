import "./Wordmark.css";
import wordmarkSvg from "./amerihost-wordmark.svg";

function SymbolMark() {
  return (
    <svg viewBox="0 0 124 124" role="img" aria-label="AmeriHost typographic mark crop">
      <title>AmeriHost bridge detail</title>
      <desc>The connected red and blue crossbar detail from the wordmark.</desc>
      <path d="M17 62h30M47 62h37" fill="none" stroke="#D61A02" strokeWidth="8" strokeLinecap="square" />
      <path d="M84 62h23" fill="none" stroke="#196BDE" strokeWidth="8" strokeLinecap="square" />
      <path d="M105 49v26" fill="none" stroke="#074FCD" strokeWidth="8" strokeLinecap="square" />
      <circle cx="107" cy="62" r="5" fill="#D61A02" />
    </svg>
  );
}

export default function Wordmark() {
  return (
    <main className="amerihost-review">
      <div className="amerihost-review__shell">
        <div className="amerihost-review__intro">
          <div>
            <p className="amerihost-review__eyebrow">AmeriHost / logo concepts</p>
            <span className="amerihost-review__label">Concept 4 · Wordmark</span>
            <h1>Confidence through typography.</h1>
          </div>
          <p className="amerihost-review__note">
            A steady, human-scale wordmark for the people who keep small businesses online.
          </p>
        </div>

        <section className="amerihost-review__card" aria-labelledby="full-logo-title">
          <div className="amerihost-review__card-head">
            <h2 id="full-logo-title">Full horizontal logo</h2>
            <span>Primary lockup · light background</span>
          </div>
          <div className="amerihost-review__canvas">
            <img src={wordmarkSvg} alt="AmeriHost in red and blue with a connected crossbar detail" />
          </div>
        </section>

        <section className="amerihost-review__card" aria-labelledby="symbol-title">
          <div className="amerihost-review__card-head">
            <h2 id="symbol-title">Letter detail</h2>
            <span>Not a separate icon</span>
          </div>
          <div className="amerihost-review__canvas">
            <div className="amerihost-review__symbol"><SymbolMark /></div>
            <p style={{ margin: "0 0 0 24px", maxWidth: 380, color: "#607087", fontSize: 14, lineHeight: 1.6 }}>
              The mark is a typographic intervention: a grounded A crossbar that carries forward into the H.
              It gives the name its own memory cue without introducing a detached cloud or server symbol.
            </p>
          </div>
        </section>

        <section className="amerihost-review__card" aria-labelledby="preview-title">
          <div className="amerihost-review__card-head">
            <h2 id="preview-title">Website-header preview</h2>
            <span>Small-size legibility check</span>
          </div>
          <div className="amerihost-review__preview">
            <div className="amerihost-review__browser">
              <div className="amerihost-review__browserbar"><i /><i /><i /></div>
              <div className="amerihost-review__sitebar">
                <img src={wordmarkSvg} alt="" />
                <nav className="amerihost-review__nav" aria-label="Preview navigation"><span>Services</span><span>Support</span><span>About</span></nav>
                <span className="amerihost-review__cta">Get support</span>
              </div>
              <div className="amerihost-review__sitebody">
                <div><h3>Keep your business moving.</h3><p>Practical web services, responsive support, and a real person when you need one.</p></div>
                <div className="amerihost-review__sitepanel" />
              </div>
            </div>
          </div>
        </section>

        <section className="amerihost-review__card amerihost-review__details" aria-labelledby="evaluation-title">
          <div><h3 id="evaluation-title">Concept explanation</h3><p><strong>Ameri</strong> in red/orange carries warmth and ownership; <strong>Host</strong> in blue signals technical steadiness. The bridge keeps both halves in one word and creates a subtle “connected” idea without literal infrastructure imagery.</p></div>
          <div><h3>Evaluation note</h3><p>Strong at header scale and in one color. The custom crossbar is a simple production-ready detail: memorable enough to own, restrained enough to stay legible in email signatures, invoices, and browser chrome.</p></div>
        </section>
      </div>
    </main>
  );
}