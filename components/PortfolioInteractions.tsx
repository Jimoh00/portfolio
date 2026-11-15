"use client";

import { useEffect, useState } from "react";

type LoaderPixel = {
  column: number;
  row: number;
  delay: number;
};

function createPixelReveal(columns: number, rows: number) {
  const total = columns * rows;
  const remaining = new Set(Array.from({ length: total }, (_, index) => index));
  const groups: number[][] = [];

  while (remaining.size > 0) {
    const availableSeeds = Array.from(remaining);
    const seed = availableSeeds[Math.floor(Math.random() * availableSeeds.length)];
    const group = [seed];
    remaining.delete(seed);

    while (group.length < 5 && remaining.size > 0) {
      const neighbors = new Set<number>();

      for (const index of group) {
        const column = index % columns;
        const row = Math.floor(index / columns);
        if (column > 0) neighbors.add(index - 1);
        if (column < columns - 1) neighbors.add(index + 1);
        if (row > 0) neighbors.add(index - columns);
        if (row < rows - 1) neighbors.add(index + columns);
      }

      const candidates = Array.from(neighbors).filter((index) => remaining.has(index));
      if (candidates.length === 0) break;

      const next = candidates[Math.floor(Math.random() * candidates.length)];
      group.push(next);
      remaining.delete(next);
    }

    groups.push(group);
  }

  const groupDelay = Math.min(80, Math.max(38, 2500 / groups.length));
  const pixels: LoaderPixel[] = [];

  groups.forEach((group, groupIndex) => {
    group.forEach((index) => {
      pixels.push({
        column: index % columns,
        row: Math.floor(index / columns),
        delay: groupIndex * groupDelay,
      });
    });
  });

  return { pixels, duration: groups.length * groupDelay + 650 };
}

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
        const scrollRange = aboutSection.offsetHeight - stage.clientHeight;
        const progress = clamp((window.scrollY - sectionTop) / scrollRange);
        const expansion = clamp((progress - 0.04) / 0.72);
        const easedExpansion = expansion * expansion * (3 - 2 * expansion);
        const coverScale =
          Math.max(stage.clientWidth, stage.clientHeight) / image.offsetWidth * 1.08;
        const imageScale = 1 + (coverScale - 1) * easedExpansion;
        const separation = stage.clientWidth * 0.42 * progress;
        const imageOpacity = clamp((progress - 0.08) / 0.18);
        const titleOpacity = 1 - clamp((progress - 0.62) / 0.14);
        const overlayOpacity = clamp((progress - 0.58) / 0.25);
        const copyOpacity = clamp((progress - 0.82) / 0.12);

        topWord.style.transform = `translateX(${-separation}px)`;
        bottomWord.style.transform = `translateX(${separation}px)`;
        image.style.transform = `translate(-50%, -50%) scale(${imageScale})`;
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
