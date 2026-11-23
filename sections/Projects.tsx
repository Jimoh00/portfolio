import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    image: "/images/nova.png",
    imageAlt: "Nova Studio website design",
    title: "Nova Studio",
    description:
      "A considered digital home for a creative studio, built around clear typography and bold geometry.",
    tech: ["Vite", "React", "GSAP", "Tailwind CSS"],
    index: "001",
    category: "Creative studio / Web",
  },
  {
    image: "/images/NGXLens.png",
    imageAlt: "NGX Lens app on a phone with NGX branding.",
    title: "NGX Lens",
    description:
      "A mobile research app that brings NGX companies, financial details, and market and economic news into one place.",
    tech: ["React Native", "Supabase", "NGN API", "Tavily", "Groq"],
    index: "002",
    category: "Finance / Mobile app",
  },
];

export default function Projects() {
  return (
    <section
      className="selected-work page-frame border-t border-[var(--color-rule)] py-[clamp(4.5rem,10vw,8rem)] scroll-mt-8 max-[760px]:py-[4.5rem]"
      id="work"
      aria-labelledby="selected-work-title"
    >
      <div
        className="section-heading mb-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-1 items-end gap-4 min-[761px]:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] min-[761px]:gap-8"
        data-reveal
      >
        <div>
          <p className="section-kicker">Things I’ve made · 01—02</p>
          <h2 className="section-title" id="selected-work-title">
            Built from <span>ideas.</span>
          </h2>
        </div>
        <p className="section-intro">
          Websites, experiments, and digital products — each one starting as an idea
          and ending as something you can actually use.
        </p>
      </div>

      <div className="project-grid grid grid-cols-1 items-start gap-8 min-[761px]:grid-cols-[repeat(12,minmax(0,1fr))] min-[761px]:gap-[clamp(1.5rem,3.2vw,3.5rem)]">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.index}
            {...project}
            className={
              index === 0
                ? "min-[761px]:col-span-7"
                : "min-[761px]:col-start-8 min-[761px]:col-span-5 min-[761px]:mt-[clamp(2rem,7vw,6rem)]"
            }
          />
        ))}
      </div>

      <div className="section-outro mt-[clamp(2.5rem,5vw,4rem)] flex items-center justify-between gap-4 border-t border-[var(--color-rule)] pt-4 font-pixel text-[0.64rem] uppercase tracking-[0.12em] text-[var(--color-muted)]">
        <span>More experiments are always in progress.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </section>
  );
}
