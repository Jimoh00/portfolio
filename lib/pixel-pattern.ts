export type PixelEdge = "top" | "bottom";

export const PIXEL_COLUMNS = 48;
export const PIXEL_ROWS = 4;

function isFilled(column: number, depth: number, edge: PixelEdge) {
  const seed = Math.sin((column + 1) * 127.1 + (depth + 1) * 311.7 + (edge === "top" ? 11 : 47)) * 43758.5453;
  const randomValue = seed - Math.floor(seed);
  const neighborSeed = Math.sin(column * 127.1 + (depth + 1) * 311.7 + (edge === "top" ? 11 : 47)) * 43758.5453;
  const hasNeighbor = column > 0 && neighborSeed - Math.floor(neighborSeed) < 0.62;
  const fillChance = Math.max(0.18, 0.82 - depth * 0.18 + (hasNeighbor ? 0.12 : 0));

  return randomValue < fillChance;
}

export function getPixelPositions(
  edge: PixelEdge,
  columns = PIXEL_COLUMNS,
  rows = PIXEL_ROWS,
) {
  return Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    const depth = edge === "top" ? rows - row - 1 : row;
    const patternColumn = Math.floor((column * PIXEL_COLUMNS) / columns);

    return isFilled(patternColumn, depth, edge) ? [{ column, row }] : [];
  }).flat();
}
