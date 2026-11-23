"use client";

import { useEffect, useState } from "react";
import { createPixelReveal, type LoaderPixel } from "@/lib/pixel-reveal";

export default function PortfolioInteractions() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pixels, setPixels] = useState<LoaderPixel[]>([]);
  const [isPixelating, setIsPixelating] = useState(false);
  const [pixelsHidden, setPixelsHidden] = useState(false);
  const [isCountFading, setIsCountFading] = useState(false);
  const [loaderGrid, setLoaderGrid] = useState({ columns: 16, rows: 9 });

  useEffect(() => {
    document.documentElement.classList.add("js");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const pixelReveals = document.querySelectorAll<HTMLElement>("[data-pixel-reveal]");
    let cleanupObserver = () => {};
    let cleanupAbout = () => {};

    if (reduceMotion || !("IntersectionObserver" in window)) {
      reveals.forEach((element) => element.classList.add("is-visible"));
      pixelReveals.forEach((element) => element.classList.add("is-visible"));
    } else {
      const observer = new IntersectionObserver(
        (entries, currentObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );

      reveals.forEach((element) => observer.observe(element));
      pixelReveals.forEach((element) => observer.observe(element));
      cleanupObserver = () => observer.disconnect();
    }

    const aboutSection = document.querySelector<HTMLElement>(".about-scroll");
    const stage = aboutSection?.querySelector<HTMLElement>(".about-stage");
    const image = aboutSection?.querySelector<HTMLElement>(".about-image");
    const title = aboutSection?.querySelector<HTMLElement>(".about-stage-title");
    const topWord = aboutSection?.querySelector<HTMLElement>(".about-word-top");
    const bottomWord = aboutSection?.querySelector<HTMLElement>(".about-word-bottom");
    const overlay = aboutSection?.querySelector<HTMLElement>(".about-overlay");
    const aboutCopy = aboutSection?.querySelector<HTMLElement>(".about-copy");
    let scrollFrame = 0;

    if (
      aboutSection &&
      stage &&
      image &&
      title &&
      topWord &&
      bottomWord &&
      overlay &&
      aboutCopy &&
      !reduceMotion
    ) {
      const clamp = (value: number) => Math.min(1, Math.max(0, value));

      const updateAbout = () => {
        scrollFrame = 0;

        const sectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
        const availableScroll = aboutSection.offsetHeight - stage.clientHeight;
        const releaseHold = Math.min(stage.clientHeight * 0.4, availableScroll * 0.25);
        const scrollRange = availableScroll - releaseHold;
        const progress = clamp((window.scrollY - sectionTop) / scrollRange);
        const expansion = clamp((progress - 0.04) / 0.72);
        const easedExpansion = expansion * expansion * (3 - 2 * expansion);
        const revealRadius = Math.hypot(stage.clientWidth, stage.clientHeight) * easedExpansion;
        const separation = stage.clientWidth * 0.42 * progress;
        const imageOpacity = clamp((progress - 0.08) / 0.18);
        const titleOpacity = 1 - clamp((progress - 0.62) / 0.14);
        const overlayOpacity = clamp((progress - 0.58) / 0.25);
        const copyOpacity = clamp((progress - 0.82) / 0.12);

        topWord.style.transform = `translateX(${-separation}px)`;
        bottomWord.style.transform = `translateX(${separation}px)`;
        image.style.clipPath = `circle(${revealRadius}px at 50% 50%)`;
        image.style.opacity = String(imageOpacity);
        title.style.opacity = String(titleOpacity);
        overlay.style.opacity = String(overlayOpacity);
        aboutCopy.style.opacity = String(copyOpacity);
        aboutCopy.style.transform = `translate3d(0, calc(-50% + ${24 * (1 - copyOpacity)}px), 0)`;
      };

      const requestAboutUpdate = () => {
        if (scrollFrame === 0) {
          scrollFrame = window.requestAnimationFrame(updateAbout);
        }
      };

      window.addEventListener("scroll", requestAboutUpdate, { passive: true });
      window.addEventListener("resize", requestAboutUpdate);
      updateAbout();

      cleanupAbout = () => {
        window.removeEventListener("scroll", requestAboutUpdate);
        window.removeEventListener("resize", requestAboutUpdate);
        if (scrollFrame !== 0) window.cancelAnimationFrame(scrollFrame);
      };
    }

    if (reduceMotion) {
      return () => {
        cleanupObserver();
        cleanupAbout();
        document.documentElement.classList.remove("js");
      };
    }

    document.body.classList.add("is-loading");
    let animationFrame = 0;
    let startedAt: number | null = null;
    const timeoutIds: number[] = [];

    const finishLoading = () => {
      setIsCountFading(true);
      timeoutIds.push(
        window.setTimeout(() => {
          const columns = Math.ceil(window.innerWidth / 80);
          const rows = Math.ceil(window.innerHeight / 80);
          const reveal = createPixelReveal(columns, rows);
          setLoaderGrid({ columns, rows });
          setPixels(reveal.pixels);
          setIsPixelating(true);

          animationFrame = window.requestAnimationFrame(() => {
            animationFrame = window.requestAnimationFrame(() => setPixelsHidden(true));
          });

          timeoutIds.push(
            window.setTimeout(() => {
              setIsLoading(false);
              document.body.classList.remove("is-loading");
            }, reveal.duration),
          );
        }, 200),
      );
    };

    const updateCount = (timestamp: number) => {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / 1100, 1);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(updateCount);
      } else {
        finishLoading();
      }
    };

    animationFrame = window.requestAnimationFrame(updateCount);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
      cleanupObserver();
      cleanupAbout();
      document.body.classList.remove("is-loading");
      document.documentElement.classList.remove("js");
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      className={`type-loader${isPixelating ? " is-pixelating" : ""}${isCountFading ? " is-count-fading" : ""}`}
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="type-loader-content" aria-hidden="true">
        <span className="type-loader-count">{count}</span>
        <span className="type-loader-percent">%</span>
        <span className="type-loader-label">Loading portfolio</span>
      </div>
      <div
        className="type-loader-pixels"
        aria-hidden="true"
        style={{
          gridTemplateColumns: `repeat(${loaderGrid.columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${loaderGrid.rows}, minmax(0, 1fr))`,
        }}
      >
        {pixels.map((pixel, index) => (
          <span
            className={`type-loader-pixel${pixelsHidden ? " is-hidden" : ""}`}
            key={index}
            style={{
              gridColumn: pixel.column + 1,
              gridRow: pixel.row + 1,
              transitionDelay: `${pixel.delay}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
