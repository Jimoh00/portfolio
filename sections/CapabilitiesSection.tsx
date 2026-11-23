const capabilities = [
  {
    label: "01 / Build",
    title: "Frontend development",
    description:
      "Responsive, accessible websites and mobile apps built with care from the first component to the final detail.",
    tools: ["React", "JavaScript", "Mobile apps"],
  },
  {
    label: "02 / Shape",
    title: "Interface implementation",
    description:
      "Clear, considered layouts that turn a visual direction into a usable digital experience.",
    tools: ["HTML", "CSS", "Responsive UI"],
  },
  {
    label: "03 / Move",
    title: "Interactive experiences",
    description:
      "Subtle motion and playful interactions that add personality without getting in the way.",
    tools: ["GSAP", "JavaScript", "Motion"],
  },
];

function PixelMark() {
  return (
    <span className="capability-pixels" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <i className="capability-pixel" key={index} />
      ))}
    </span>
  );
}

export default function CapabilitiesSection() {
  return (
    <section
      className="capabilities page-frame border-t-0 py-[clamp(4.5rem,10vw,8rem)] scroll-mt-8 max-[760px]:py-[4.5rem]"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div
        className="section-heading mb-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-1 items-end gap-4 min-[761px]:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] min-[761px]:gap-8"
        data-reveal
      >
        <div>
          <p className="section-kicker">How I can help · 01—03</p>
          <h2 className="section-title" id="capabilities-title">
            What I <span>do.</span>
          </h2>
        </div>
        <p className="section-intro">
          I bring ideas to life with thoughtful interfaces, solid frontend
          foundations, and details that make a site feel good to use.
        </p>
      </div>

      <div className="capabilities-grid grid grid-cols-1 gap-[clamp(0.8rem,1.8vw,1.5rem)] min-[761px]:grid-cols-3">
        {capabilities.map((capability) => (
          <article className="capability-card" data-reveal key={capability.label}>
            <div className="capability-card-index">
              <span>{capability.label}</span>
              <PixelMark />
            </div>
            <h3 className="capability-title">{capability.title}</h3>
            <p className="capability-description">{capability.description}</p>
            <ul className="capability-tools" aria-label="Technologies">
              {capability.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
