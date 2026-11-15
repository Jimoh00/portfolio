export default function HomeSection() {
  return (
    <section className="hero page-frame" aria-labelledby="hero-title">
      <p className="hero-kicker" data-reveal>
        <span aria-hidden="true" />
        Independent developer &amp; designer
      </p>
      <h1 className="hero-title" id="hero-title" data-reveal>
        <span>Jimoh</span>
        <span className="hero-title-accent">AbdulRasheed.</span>
      </h1>
      <div className="hero-bottom" data-reveal>
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
