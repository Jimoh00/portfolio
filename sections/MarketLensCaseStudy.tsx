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
        alt="NGX Lens app home screen showing a market snapshot and watchlist."
        width={720}
        height={1600}
      />
    </div>
  );
}

export default function MarketLensCaseStudy() {
  return (
    <section
      className="market-case-study page-frame border-t border-[var(--color-rule)] py-[clamp(4.5rem,10vw,8rem)] scroll-mt-8 max-[760px]:py-[4.5rem]"
      id="case-study"
      aria-labelledby="ngx-case-title"
    >
      <div
        className="market-case-heading mb-[clamp(2.5rem,5vw,4rem)] flex items-end justify-between gap-8 max-[760px]:items-start max-[680px]:grid max-[680px]:gap-4"
        data-reveal
      >
        <div>
          <p className="section-kicker">Featured case study / Mobile app</p>
          <h2 className="market-case-title" id="ngx-case-title">
            NGX <span>Lens.</span>
          </h2>
        </div>
        <p className="market-case-version">Version 01 / Mobile app</p>
      </div>

      <div className="market-case-layout grid grid-cols-1 items-center gap-8 min-[761px]:grid-cols-[minmax(0,0.9fr)_minmax(25rem,1.1fr)] min-[761px]:gap-[clamp(2.5rem,7vw,7rem)]">
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
          aria-label="NGX Lens app home screen preview."
        >
          <PhonePreview />
          <figcaption className="market-case-preview-tag">
            NGX Lens · app home screen
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
