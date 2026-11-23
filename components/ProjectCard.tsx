import Image from "next/image";
import { getPixelPositions } from "@/lib/pixel-pattern";

interface ProjectCardProps {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  tech: string[];
  index?: string;
  category?: string;
  className?: string;
}

export default function ProjectCard({
  image,
  imageAlt,
  title,
  description,
  tech,
  index = "001",
  category = "Project",
  className,
}: ProjectCardProps) {
  return (
    <article className={`project-card${className ? ` ${className}` : ""}`} data-reveal>
      <div className="project-visual">
        <div className="project-image">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1200px) 60vw, 760px"
            className="project-image-content"
          />
        </div>
        <span className="project-index">PROJECT / {index}</span>
        <div className="project-pixel-mask" aria-hidden="true">
          {getPixelPositions("top", 24, 4).map(({ column, row }) => (
            <span
              key={`${row}-${column}`}
              style={{ gridColumn: column + 1, gridRow: row + 1 }}
            />
          ))}
        </div>
      </div>
      <div className="project-copy">
        <p className="project-tech">{tech.join(" · ")}</p>
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        <div className="project-foot">
          <span>{category}</span>
          <span aria-hidden="true">↗</span>
        </div>
      </div>
    </article>
  );
}
