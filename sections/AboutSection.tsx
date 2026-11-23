import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="about-scroll" id="about" aria-labelledby="about-stage-title">
      <div className="about-stage">
        <h2 className="about-stage-title" id="about-stage-title">
          <span className="about-word about-word-top">About</span>
          <span className="about-word about-word-bottom">Me</span>
        </h2>
        <div className="about-image" aria-hidden="true">
          <Image
            src="/images/about-me.png"
            alt=""
            fill
            sizes="100vw"
          />
        </div>
        <div className="about-overlay" aria-hidden="true" />
        <div className="about-copy">
          <p className="about-copy-kicker">How I think / 01—03</p>
          <h3 className="about-copy-title">
            Build. Break.
            <br />
            Try again.
          </h3>
          <p className="about-copy-description">
            I like figuring things out — following a question, building an idea,
            learning what doesn’t work, then trying again until it feels right.
          </p>
          <ol className="about-process" aria-label="My approach">
            <li>
              <span>01</span>Explore
            </li>
            <li>
              <span>02</span>Build
            </li>
            <li>
              <span>03</span>Refine
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
