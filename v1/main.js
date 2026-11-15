// Add scroll reveals only when JavaScript is available.
document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pixelRows = [
  [1, 3, 4, 7, 9, 10, 14, 17, 19, 22, 24, 27, 30],
  [0, 2, 3, 5, 6, 9, 11, 12, 15, 17, 18, 21, 23, 25, 28, 29, 31],
  [0, 1, 3, 4, 6, 7, 8, 11, 13, 14, 16, 18, 19, 21, 23, 24, 27, 28, 30],
  [0, 1, 2, 4, 5, 6, 8, 9, 11, 12, 14, 15, 16, 18, 20, 21, 23, 24, 26, 27, 29, 30],
  [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31],
  Array.from({ length: 32 }, (_, index) => index),
  Array.from({ length: 24 }, (_, index) => index),
];

document.querySelectorAll("[data-pixel-mask]").forEach((mask) => {
  pixelRows.forEach((columns, row) => {
    columns.forEach((column) => {
      const pixel = document.createElement("span");
      pixel.style.gridColumn = String(column + 1);
      pixel.style.gridRow = String(row + 1);
      mask.append(pixel);
    });
  });
});

const contactPixelEdges = document.querySelectorAll("[data-contact-pixel-edge]");

function updateContactPixelEdges() {
  const viewportWidth = document.documentElement.clientWidth;
  document.documentElement.style.setProperty("--contact-viewport-width", `${viewportWidth}px`);

  contactPixelEdges.forEach((edge) => {
    const styles = getComputedStyle(edge);
    const columns = Number.parseInt(styles.getPropertyValue("--pixel-columns"), 10);
    const rows = styles.gridTemplateRows.split(" ").length;
    const edgeType = edge.dataset.contactPixelEdge;

    if (edgeType !== "top" && edgeType !== "bottom") return;
    if (edge.dataset.pixelColumns === String(columns)) return;

    edge.replaceChildren();
    edge.dataset.pixelColumns = String(columns);
    const occupied = Array.from({ length: rows }, () => Array(columns).fill(false));

    for (let depth = 0; depth < rows; depth += 1) {
      const row = edgeType === "top" ? depth : rows - depth - 1;
      const outerRow = edgeType === "top" ? row - 1 : row + 1;

      for (let column = 0; column < columns; column += 1) {
        const leftPixel = column > 0 && occupied[row][column - 1];
        const outerPixel = outerRow >= 0 && outerRow < rows && occupied[outerRow][column];
        const fillChance = Math.min(0.9, 0.25 + depth * 0.14 + (leftPixel ? 0.18 : 0) + (outerPixel ? 0.12 : 0));
        occupied[row][column] = Math.random() < fillChance;

        if (occupied[row][column]) {
          const pixel = document.createElement("span");
          pixel.className = "contact-pixel";
          pixel.style.gridColumn = String(column + 1);
          pixel.style.gridRow = String(row + 1);
          pixel.style.setProperty("--pixel-delay", `${Math.floor(Math.random() * 450)}ms`);
          edge.append(pixel);
        }
      }
    }
  });
}

if (contactPixelEdges.length > 0) {
  let contactResizeFrame = 0;
  updateContactPixelEdges();
  window.addEventListener("resize", () => {
    if (contactResizeFrame) return;
    contactResizeFrame = window.requestAnimationFrame(() => {
      contactResizeFrame = 0;
      updateContactPixelEdges();
    });
  });
}

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const loader = document.querySelector("#type-loader");
const loaderCount = document.querySelector("#type-loader-count");
const pixelLayer = loader?.querySelector(".type-loader-pixels");

if (loader && loaderCount && pixelLayer) {
  const loadDuration = reduceMotion ? 350 : 1100;
  const tileSize = 80;
  let startedAt;

  document.body.style.overflow = "hidden";

  function updateCount(timestamp) {
    startedAt ??= timestamp;
    const progress = Math.min((timestamp - startedAt) / loadDuration, 1);
    loaderCount.textContent = String(Math.round(progress * 100));

    if (progress < 1) {
      requestAnimationFrame(updateCount);
      return;
    }

    revealPixels();
  }

  async function revealPixels() {
    const columns = Math.ceil(window.innerWidth / tileSize);
    const rows = Math.ceil(window.innerHeight / tileSize);
    const total = columns * rows;
    const pixels = Array.from({ length: total }, (_, index) => {
      const pixel = document.createElement("span");
      pixel.className = "type-loader-pixel";
      pixelLayer.append(pixel);
      return pixel;
    });
    const remaining = new Set(pixels.map((_, index) => index));
    const groups = [];

    pixelLayer.style.setProperty("--pixel-columns", String(columns));
    pixelLayer.style.setProperty("--pixel-rows", String(rows));

    while (remaining.size > 0) {
      const seed = Array.from(remaining)[Math.floor(Math.random() * remaining.size)];
      const group = [seed];
      remaining.delete(seed);

      while (group.length < 5 && remaining.size > 0) {
        const neighbors = new Set();
        group.forEach((index) => {
          const x = index % columns;
          const y = Math.floor(index / columns);
          if (x > 0) neighbors.add(index - 1);
          if (x < columns - 1) neighbors.add(index + 1);
          if (y > 0) neighbors.add(index - columns);
          if (y < rows - 1) neighbors.add(index + columns);
        });

        const available = Array.from(neighbors).filter((index) => remaining.has(index));
        if (available.length === 0) break;

        const next = available[Math.floor(Math.random() * available.length)];
        group.push(next);
        remaining.delete(next);
      }

      groups.push(group);
    }

    if (reduceMotion) {
      loader.remove();
      document.body.style.overflow = "";
      return;
    }

    await new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    });

    loader.classList.add("is-pixelating");

    const groupDelay = Math.min(80, Math.max(38, 2500 / groups.length));

    groups.forEach((group, groupIndex) => {
      group.forEach((index) => {
        pixels[index].style.setProperty("--chunk-delay", `${groupIndex * groupDelay}ms`);
        pixels[index].classList.add("is-hidden");
      });
    });

    const revealDuration = groups.length * groupDelay + 600;
    window.setTimeout(() => {
      loader.classList.add("is-fading");
      window.setTimeout(() => {
        loader.remove();
        document.body.style.overflow = "";
      }, 200);
    }, revealDuration);
  }

  requestAnimationFrame(updateCount);
}

const aboutSection = document.querySelector(".about-scroll");

if (aboutSection) {
  const stage = aboutSection.querySelector(".about-stage");
  const image = aboutSection.querySelector(".about-image");
  const stageTitle = aboutSection.querySelector(".about-stage-title");
  const topWord = aboutSection.querySelector(".about-word--top");
  const bottomWord = aboutSection.querySelector(".about-word--bottom");
  const overlay = aboutSection.querySelector(".about-overlay");
  const aboutCopy = aboutSection.querySelector(".about-copy");
  let scrollFrame = 0;

  if (stage && image && stageTitle && topWord && bottomWord && overlay && aboutCopy && !reduceMotion) {
    const clamp = (value) => Math.min(1, Math.max(0, value));

    function updateAboutAnimation() {
      scrollFrame = 0;

      const sectionTop = aboutSection.getBoundingClientRect().top + window.scrollY;
      const scrollRange = aboutSection.offsetHeight - stage.clientHeight;
      const progress = clamp((window.scrollY - sectionTop) / scrollRange);
      const expansion = clamp((progress - 0.04) / 0.72);
      const easedExpansion = expansion * expansion * (3 - 2 * expansion);
      const imageSize = image.offsetWidth;
      const coverScale = Math.max(stage.clientWidth, stage.clientHeight) / imageSize * 1.08;
      const imageScale = 1 + (coverScale - 1) * easedExpansion;
      const separation = stage.clientWidth * 0.42 * progress;
      const imageOpacity = clamp((progress - 0.08) / 0.18);
      const titleOpacity = 1 - clamp((progress - 0.62) / 0.14);
      const overlayProgress = clamp((progress - 0.58) / 0.25);
      const copyProgress = clamp((progress - 0.82) / 0.12);

      topWord.style.transform = `translateX(${-separation}px)`;
      bottomWord.style.transform = `translateX(${separation}px)`;
      image.style.transform = `translate(-50%, -50%) scale(${imageScale})`;
      image.style.opacity = String(imageOpacity);
      stageTitle.style.opacity = String(titleOpacity);
      overlay.style.opacity = String(overlayProgress);
      aboutCopy.style.opacity = String(copyProgress);
      aboutCopy.style.transform = `translate3d(0, ${24 * (1 - copyProgress)}px, 0)`;
    }

    function requestAboutUpdate() {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateAboutAnimation);
    }

    window.addEventListener("scroll", requestAboutUpdate, { passive: true });
    window.addEventListener("resize", requestAboutUpdate);
    updateAboutAnimation();
  }
}
