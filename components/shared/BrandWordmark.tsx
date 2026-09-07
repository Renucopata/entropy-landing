type Props = {
  className?: string;
};

export function BrandWordmark({ className }: Props) {
  return (
    <span
      className={className}
      style={{
        fontFamily: "var(--font-sora), sans-serif",
        fontWeight: 400,
        letterSpacing: "0.35em",
        textTransform: "lowercase",
      }}
    >
      entropy soluciones
    </span>
  );
}
