import { Button, StepBadge } from "@/components/ui";

/* ── Petal config: position, size, animation timing ── */
const petals = [
  { left: "8%",   bottom: "-5%",  w: 14, h: 18, duration: "11s", delay: "0s",    sway: "40px",  rotate: "200deg" },
  { left: "22%",  bottom: "-8%",  w: 10, h: 13, duration: "14s", delay: "2s",    sway: "-30px", rotate: "160deg" },
  { left: "38%",  bottom: "-3%",  w: 16, h: 20, duration: "13s", delay: "4s",    sway: "25px",  rotate: "220deg" },
  { left: "55%",  bottom: "-10%", w: 11, h: 14, duration: "10s", delay: "1s",    sway: "-45px", rotate: "190deg" },
  { left: "68%",  bottom: "-6%",  w: 13, h: 17, duration: "15s", delay: "3s",    sway: "35px",  rotate: "170deg" },
  { left: "82%",  bottom: "-4%",  w: 9,  h: 12, duration: "12s", delay: "5s",    sway: "-20px", rotate: "240deg" },
  { left: "45%",  bottom: "-7%",  w: 12, h: 15, duration: "16s", delay: "6.5s",  sway: "50px",  rotate: "150deg" },
  { left: "92%",  bottom: "-9%",  w: 15, h: 19, duration: "11.5s", delay: "3.5s", sway: "-35px", rotate: "210deg" },
];

const steps = [
  {
    num: 1,
    title: "Pick your blooms",
    desc: "Pilih bunga favorit dari koleksi yang beragam dan penuh warna.",
  },
  {
    num: 2,
    title: "Arrange & style",
    desc: "Susun buket secara bebas di kanvas interaktif sesuai selera.",
  },
  {
    num: 3,
    title: "Share the love",
    desc: "Bagikan buket lewat link unik kepada orang yang kamu sayangi.",
  },
];

export default function Home() {
  return (
    <>
      {/* ════════════════════════════════════════════
          HERO SECTION
         ════════════════════════════════════════════ */}
      <section
        id="hero"
        className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
      >
        {/* ── Floating petals ── */}
        {petals.map((p, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.w,
              height: p.h,
              "--petal-duration": p.duration,
              "--petal-delay": p.delay,
              "--petal-sway": p.sway,
              "--petal-rotate": p.rotate,
            } as React.CSSProperties}
            aria-hidden="true"
          />
        ))}

        {/* ── Flower icon ── */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0s" }}>
          <svg
            className="mx-auto mb-5 h-10 w-10 text-[var(--color-primary)]"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {/* center */}
            <circle cx="24" cy="24" r="4" fill="currentColor" opacity="0.3" />
            {/* petals */}
            <ellipse cx="24" cy="14" rx="5" ry="8" opacity="0.8" />
            <ellipse cx="24" cy="34" rx="5" ry="8" opacity="0.8" />
            <ellipse cx="14" cy="24" rx="8" ry="5" opacity="0.8" />
            <ellipse cx="34" cy="24" rx="8" ry="5" opacity="0.8" />
            <ellipse cx="16.5" cy="16.5" rx="5" ry="8" transform="rotate(-45 16.5 16.5)" opacity="0.6" />
            <ellipse cx="31.5" cy="31.5" rx="5" ry="8" transform="rotate(-45 31.5 31.5)" opacity="0.6" />
            <ellipse cx="31.5" cy="16.5" rx="5" ry="8" transform="rotate(45 31.5 16.5)" opacity="0.6" />
            <ellipse cx="16.5" cy="31.5" rx="5" ry="8" transform="rotate(45 16.5 31.5)" opacity="0.6" />
            {/* stem */}
            <path d="M24 28 L24 46" strokeWidth="1.5" />
            <path d="M24 38 Q30 34 33 30" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* ── Wordmark ── */}
        <h1
          className="animate-fade-in-up font-[family-name:var(--font-heading)] font-bold italic text-[var(--color-primary)]"
          style={{
            fontSize: "clamp(48px, 10vw, 72px)",
            lineHeight: 1.1,
            animationDelay: "0.15s",
          }}
        >
          Everbloom
        </h1>

        {/* ── Tagline ── */}
        <p
          className="animate-fade-in-up mt-6 font-[family-name:var(--font-body)] text-lg italic text-[var(--color-text-muted)]"
          style={{ fontSize: 18, animationDelay: "0.3s" }}
        >
          Beautiful flowers, delivered digitally.
        </p>

        {/* ── CTA ── */}
        <div
          className="animate-fade-in-up mt-10"
          style={{ animationDelay: "0.5s" }}
        >
          <Button variant="primary" size="lg">
            Build a Bouquet
          </Button>
        </div>

        {/* ── Scroll hint ── */}
        <div
          className="animate-fade-in-up absolute bottom-8 flex flex-col items-center gap-1 text-[var(--color-text-muted)]"
          style={{ animationDelay: "1s" }}
        >
          <span className="text-xs font-[family-name:var(--font-body)]">Scroll</span>
          <svg
            className="h-4 w-4 animate-bounce"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
         ════════════════════════════════════════════ */}

      {/* ── Divider ── */}
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="h-px w-full bg-[var(--color-border)]" />
      </div>

      <section id="how-it-works" className="mx-auto w-full max-w-3xl px-6 py-20">
        <h2 className="text-center font-[family-name:var(--font-heading)] text-2xl font-semibold text-[var(--color-accent)] sm:text-3xl">
          Bagaimana Caranya?
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="flex flex-col items-center text-center">
              <StepBadge step={s.num} active={s.num === 1} />
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg italic text-[var(--color-primary)]">
                {s.title}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-text-muted)]">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
         ════════════════════════════════════════════ */}
      <footer className="py-10 text-center">
        <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-text-muted)]">
          © 2025 Everbloom · Beautiful flowers, delivered digitally.
        </p>
      </footer>
    </>
  );
}
