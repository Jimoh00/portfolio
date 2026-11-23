export default function HomeSection() {
  return (
    <section
      className="hero page-frame flex min-h-[min(720px,calc(100svh-5.25rem))] flex-col justify-center py-[clamp(4rem,11vh,8rem)] max-[680px]:min-h-auto max-[680px]:py-[5rem_4rem]"
      aria-labelledby="hero-title"
    >
      <p className="hero-kicker flex items-center gap-3" data-reveal>
        <span aria-hidden="true" />
        Independent developer &amp; designer
      </p>
      <h1 className="hero-title" id="hero-title" data-reveal>
        <span>Jimoh</span>
        <span className="hero-title-accent">AbdulRasheed.</span>
      </h1>
      <div
        className="hero-bottom grid grid-cols-1 items-start gap-4 border-t border-[var(--color-rule)] pt-6 min-[681px]:grid-cols-[minmax(0,1fr)_minmax(15rem,0.55fr)_auto] min-[681px]:items-end min-[681px]:gap-8"
        data-reveal
      >
        <span className="hero-index">A curious mind / 001</span>
        <p className="hero-description">
          I like figuring things out — usually by building, breaking, and trying again.
          Websites, experiments, and digital products made with care.
        </p>
        <a className="action-link" href="#work">
          <span>See what I make</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
