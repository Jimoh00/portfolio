import { getPixelPositions, type PixelEdge as PixelEdgeDirection } from "@/lib/pixel-pattern";

type PixelEdgeProps = {
  edge: PixelEdgeDirection;
};

export default function PixelEdge({ edge }: PixelEdgeProps) {
  return (
    <div
      className={`contact-pixel-edge contact-pixel-edge-${edge}`}
      data-pixel-reveal
      aria-hidden="true"
    >
      {getPixelPositions(edge).map(({ column, row }) => (
        <span
          className="contact-pixel"
          key={`${edge}-${column}-${row}`}
          style={{
            gridColumn: column + 1,
            gridRow: row + 1,
            animationDelay: `${(column * 17 + row * 23) % 450}ms`,
          }}
        />
      ))}
    </div>
  );
}
