import Image from "next/image";

const researchSteps = [
  "See the market index and browse companies listed on NGX.",
  "Check a company’s share price and latest financial statement.",
  "Follow company, market, and Nigerian economic news.",
];

const technology = ["React Native", "Supabase", "NGN API", "Tavily API", "Groq API"];

function PhonePreview() {
  return (
    <div className="market-phone">
      <Image
        className="market-phone-image"
        src="/images/stk-app-home-screen.png"
        alt="Market Lens app home screen showing a market snapshot and watchlist."
        width={720}
        height={1600}
      />
    </div>
  );
}

export default function MarketLensCaseStudy() {
  return (
    <section
      className="market-case-study page-frame"
      id="case-study"
      aria-labelledby="market-case-title"
    >
      <div className="market-case-heading" data-reveal>
        <div>
          <p className="section-kicker">Featured case study / Mobile app</p>
          <h2 className="market-case-title" id="market-case-title">
            Market <span>Lens.</span>
          </h2>
        </div>
        <p className="market-case-version">Version 01 / Working name</p>
      </div>

      <div className="market-case-layout">
        <div className="market-case-story">
          <p className="market-case-lead" data-reveal>
            Before considering a company, I wanted to understand it. Getting that
            context meant jumping between too many places.
          </p>
          <p className="market-case-copy" data-reveal>
            While learning about investing, I kept hearing the same advice:
            research a company, its financials, and what is happening around it. I
            built a mobile app to bring that research into one place and make it
            easier to follow the Nigerian market.
          </p>

          <div className="market-case-block" data-reveal>
            <p className="market-case-label">01 / The research flow</p>
            <ol className="market-case-features">
              {researchSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="market-case-block" data-reveal>
            <p className="market-case-label">02 / Working with API limits</p>
            <p>
              Free data sources did not cover everything I needed, so I combined
              tools: Tavily to search for company information and Groq to summarize
              selected details.
            </p>
          </div>

          <div className="market-case-block" data-reveal>
            <p className="market-case-label">03 / Built with</p>
            <ul className="market-case-stack" aria-label="Technology stack">
              {technology.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        <figure
          className="market-case-preview"
          data-reveal
          aria-label="Market Lens app home screen preview."
        >
          <PhonePreview />
          <figcaption className="market-case-preview-tag">
            Market Lens · app home screen
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
