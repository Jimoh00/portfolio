export type LoaderPixel = {
  column: number;
  row: number;
  delay: number;
};

export function createPixelReveal(columns: number, rows: number) {
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
