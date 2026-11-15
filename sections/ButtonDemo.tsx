import ProjectCard from '@/components/ProjectCard';
import { PixelButton } from '@/components/ui/PixelButton';

export default function ButtonDemo() {
  return (
    <section className="min-h-screen bg-black px-6 py-16 text-white sm:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/50">
            Temporary component preview
          </p>
          <h1 className="mt-3 text-4xl font-bold uppercase text-neon sm:text-5xl">
            UI Components
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="mb-5 font-mono text-sm uppercase tracking-widest text-white/60">
              Button
            </h2>
            <PixelButton>View Project</PixelButton>
          </div>

          <div className="w-full max-w-md">
            <h2 className="mb-5 font-mono text-sm uppercase tracking-widest text-white/60">
              Project card
            </h2>
            <ProjectCard
              image="/project-preview.svg"
              imageAlt="Abstract dark project landing page with lime geometric shapes"
              title="Northstar Studio"
              description="A considered digital home for a creative studio, built around clear typography and bold geometry."
              tech={['React', 'GSAP', 'Tailwind CSS']}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
