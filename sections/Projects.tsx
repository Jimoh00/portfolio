import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    image: "/images/mockup-1.webp",
    imageAlt: "Desktop mockup showing a colorful geometric design concept",
    title: "Nova Studio",
    description:
      "A considered digital home for a creative studio, built around clear typography and bold geometry.",
    tech: ["Vite", "React", "GSAP", "Tailwind CSS"],
    index: "001",
    category: "Creative studio / Web",
  },
  {
    image: "/images/phone-mockup.webp",
    imageAlt: "Angled phone mockup displaying a colorful geometric design concept",
    title: "Northstar Studio",
    description:
      "A considered digital home for a creative studio, built around clear typography and bold geometry.",
    tech: ["React", "GSAP", "Tailwind CSS"],
    index: "002",
    category: "Creative studio / Mobile",
  },
];

export default function Projects() {
  return (
    <section className="selected-work page-frame" id="work" aria-labelledby="selected-work-title">
      <div className="section-heading" data-reveal>
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

      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.index}
            {...project}
            className={index === 0 ? "project-card-featured" : "project-card-secondary"}
          />
        ))}
      </div>

      <div className="section-outro">
        <span>More experiments are always in progress.</span>
        <a href="#home">Back to top ↑</a>
      </div>
    </section>
  );
}
