import "./grid-continuity.css";

const colors = {
  ink: "#13233B",
  red: "#D61A02",
  blue: "#074FCD",
};

function Mark({ size = 64 }: { size?: number }) {
  return (
    <svg
      aria-label="AmeriHost modular grid symbol"
      className="grid-continuity-mark"
      height={size}
      role="img"
      viewBox="0 0 88 88"
      width={size}
    >
      <title>AmeriHost continuity grid symbol</title>
      <desc>Four balanced red and blue modules frame a clear central opening.</desc>
      <rect fill={colors.red} height="35" rx="7" width="35" x="2" y="2" />
      <rect fill={colors.blue} height="35" rx="7" width="35" x="51" y="2" />
      <rect fill={colors.blue} height="35" rx="7" width="35" x="2" y="51" />
      <rect fill={colors.red} height="35" rx="7" width="35" x="51" y="51" />
      <path d="M37 37h14v14H37z" fill="#fff" />
    </svg>
  );
}

function GridLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div
      aria-label="AmeriHost Grid Continuity logo"
      className={`grid-wordmark-lockup${compact ? " grid-wordmark-lockup--compact" : ""}`}
      role="img"
    >
      <Mark size={compact ? 30 : 58} />
      <span className="grid-wordmark">
        <span className="grid-wordmark-ameri">Ameri</span><span className="grid-wordmark-host">Host</span>
      </span>
    </div>
  );
}

export function GridContinuity() {
  return (
    <main className="grid-page">
      <header className="grid-topbar">
        <div className="grid-kicker">
          <span className="grid-kicker-dot" />
          AmeriHost identity review
        </div>
        <div className="grid-hypothesis">Hypothesis 01 / Continuity</div>
      </header>

      <section className="grid-hero">
        <div className="grid-hero-copy">
          <p className="grid-eyebrow">Concept 1 · Grid Continuity</p>
          <h1>Familiar structure.<br /><em>Sharper signal.</em></h1>
          <p className="grid-intro">
            A quieter evolution of AmeriHost&apos;s square-grid mark: fewer
            pieces, a stronger opening, and a wordmark that reads with
            confidence at every scale.
          </p>
          <div className="grid-palette" aria-label="Logo colors">
            <span><i className="swatch swatch-red" /> #D61A02</span>
            <span><i className="swatch swatch-blue" /> #074FCD</span>
          </div>
        </div>
        <div className="grid-hero-mark" aria-label="Symbol study">
          <div className="grid-mark-caption">A / symbol study</div>
          <Mark size={166} />
          <span className="grid-axis axis-top" />
          <span className="grid-axis axis-left" />
        </div>
      </section>

      <section className="grid-panel grid-lockup">
        <div className="grid-section-heading">
          <p className="grid-eyebrow">Primary lockup</p>
          <h2>Built to hold the header.</h2>
          <p>Simple geometry keeps the mark distinct, even when the logo is only a few pixels tall.</p>
        </div>
        <div className="grid-logo-stage">
          <GridLogo />
          <div className="grid-stage-label">Full horizontal logo / light background</div>
        </div>
      </section>

      <section className="grid-preview-section">
        <div className="grid-section-heading">
          <p className="grid-eyebrow">In context</p>
          <h2>A familiar front door, made clearer.</h2>
          <p>One practical test: can a customer find their way back to you at a glance?</p>
        </div>
        <div className="grid-browser">
          <div className="grid-browser-bar">
            <div className="grid-browser-dots"><i /><i /><i /></div>
            <div className="grid-address">amerihost.com</div>
            <span className="grid-browser-secure">secure connection</span>
          </div>
          <div className="grid-site-header">
            <GridLogo compact />
            <nav><span>Websites</span><span>Hosting</span><span>Support</span><strong>Get started</strong></nav>
          </div>
          <div className="grid-site-content">
            <p>Web services for the work you do.</p>
            <div className="grid-site-rule" />
          </div>
          <div className="grid-size-note">Header preview / 28 px logo height</div>
        </div>
      </section>

      <section className="grid-panel grid-notes">
        <div className="grid-symbol-card">
          <p className="grid-eyebrow">B / mark alone</p>
          <div className="grid-symbol-inset"><Mark size={104} /></div>
          <p className="grid-caption">A compact service marker for account portals, support touchpoints, and social avatars.</p>
        </div>
        <div className="grid-evaluation">
          <p className="grid-eyebrow">Concept read</p>
          <h2>Trust, without the tech cliché.</h2>
          <p>
            The mark keeps the live logo&apos;s red / blue handshake and modular
            logic, then removes the busy 3 × 3 rhythm. The open center gives
            the identity room to breathe; the paired corners suggest a
            connected system without drawing a literal server or cloud.
          </p>
          <div className="grid-verdict">
            <span className="grid-verdict-mark">✓</span>
            <div><strong>Evaluation note</strong><br />Strongest when the brand needs continuity to do the reassuring work.</div>
          </div>
        </div>
      </section>

      <footer className="grid-footer">
        <span>AMERIHOST / LOGO CONCEPTS</span>
        <span>Grid Continuity · 01</span>
      </footer>
    </main>
  );
}

export default GridContinuity;