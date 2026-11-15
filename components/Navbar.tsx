"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "What I make" },
  { href: "#capabilities", label: "What I do" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

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
          onClick={() => setIsOpen((open) => !open)}
        >
          <span>{isOpen ? "Close" : "Menu"}</span>
          <span className="menu-toggle-icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>

        <nav
          className={`site-nav${isOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
        >
          {links.map(({ href, label }) => (
            <a
              className="nav-link"
              href={href}
              key={href}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#work">
          <span>Explore my work</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
