"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPixelReveal, type LoaderPixel } from "@/lib/pixel-reveal";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "What I make" },
  { href: "#capabilities", label: "What I do" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pixels, setPixels] = useState<LoaderPixel[]>([]);
  const [pixelsHidden, setPixelsHidden] = useState(false);
  const [pixelGrid, setPixelGrid] = useState({ columns: 0, rows: 0 });
  const closeTimer = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const pixelDuration = useRef(0);

  const closeMenu = useCallback(() => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);

    setIsOpen(false);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsMounted(false);
      return;
    }

    setPixelsHidden(false);
    closeTimer.current = window.setTimeout(() => {
      setIsMounted(false);
      closeTimer.current = null;
    }, pixelDuration.current);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-menu-open", isMounted);
    return () => document.body.classList.remove("is-menu-open");
  }, [isMounted]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeMenu, isOpen]);

  useEffect(
    () => () => {
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
    },
    [],
  );

  const openMenu = () => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);

    const columns = Math.ceil(window.innerWidth / 80);
    const rows = Math.ceil(window.innerHeight / 80);
    const reveal = createPixelReveal(columns, rows);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setPixelGrid({ columns, rows });
    setPixels(reveal.pixels);
    pixelDuration.current = reveal.duration;
    setPixelsHidden(reduceMotion);
    setIsMounted(true);
    setIsOpen(true);

    if (!reduceMotion) {
      animationFrame.current = window.requestAnimationFrame(() => {
        animationFrame.current = window.requestAnimationFrame(() => setPixelsHidden(true));
      });
    }
  };

  return (
    <header className="site-header" id="home">
      <div className="site-header-inner page-frame">
        <a
          className="wordmark"
          href="#home"
          aria-label="Jimoh AbdulRasheed, home"
          onClick={() => setIsOpen(false)}
        >
          <span className="wordmark-mark" aria-hidden="true">
            &lt;<span className="wordmark-name">JIMOH</span>/&gt;
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
          onClick={() => (isOpen ? closeMenu() : openMenu())}
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <span className="menu-toggle-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <nav
          className={`site-nav${isMounted ? " is-mounted" : ""}${isOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
          aria-hidden={isMounted && !isOpen ? true : undefined}
          inert={isMounted && !isOpen}
        >
          <div className="mobile-nav-content">
            <div className="mobile-nav-links">
              {links.map(({ href, label }, index) => (
                <a className="nav-link" href={href} key={href} onClick={closeMenu}>
                  <span className="nav-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
            <div className="mobile-nav-socials" role="group" aria-label="Social links">
              <span>WhatsApp</span>
              <span>Email</span>
              <span>GitHub</span>
            </div>
          </div>
          <div
            className="mobile-nav-pixels"
            aria-hidden="true"
            style={{
              gridTemplateColumns: `repeat(${pixelGrid.columns}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${pixelGrid.rows}, minmax(0, 1fr))`,
            }}
          >
            {pixels.map((pixel, index) => (
              <span
                className={`mobile-nav-pixel${pixelsHidden ? " is-hidden" : ""}`}
                key={index}
                style={{
                  gridColumn: pixel.column + 1,
                  gridRow: pixel.row + 1,
                  transitionDelay: `${pixel.delay}ms`,
                }}
              />
            ))}
          </div>
        </nav>

        <a className="header-cta" href="#work">
          <span>Explore my work</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
