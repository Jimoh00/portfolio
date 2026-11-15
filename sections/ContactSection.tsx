import PixelEdge from "@/components/PixelEdge";

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <PixelEdge edge="top" />
      <div className="contact-copy page-frame">
        <p className="contact-kicker" data-reveal>
          A good place to start
        </p>
        <h2 className="contact-title" id="contact-title" data-reveal>
          Have an idea?
          <span>Let’s make it real.</span>
        </h2>
        <p className="contact-description" data-reveal>
          Every good project starts with a question. Bring yours, and let’s see
          what we can build.
        </p>
        <p className="contact-signoff" data-reveal>
          Thoughtful work · Built with care
        </p>
      </div>
      <PixelEdge edge="bottom" />
    </section>
  );
}
