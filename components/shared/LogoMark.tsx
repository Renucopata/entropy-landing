import Image from "next/image";

type Props = {
  /** Fixed pixel width (also becomes the height — source is square). Use for
   *  nav-size or other pixel-precise placements. If omitted, callers control
   *  sizing via `className` (e.g. Tailwind responsive utilities). */
  size?: number;
  /** Applied to the underlying <img>. */
  className?: string;
  /** True on the hero mount so Next preloads the asset. */
  priority?: boolean;
  /** Override alt when the logo is decorative (e.g. inside the nav next to
   *  the wordmark text). Default is the brand name. */
  alt?: string;
};

/** Raster logo lockup (mark + wordmark, white on black square). Vector SVG
 *  still pending — do not scale past ~1.5x the source's natural render width
 *  or edges will blur. */
export function LogoMark({
  size,
  className,
  priority = false,
  alt = "Entropy Soluciones",
}: Props) {
  return (
    <Image
      src="/logo/entropyLogo.jpeg"
      alt={alt}
      width={1280}
      height={1280}
      priority={priority}
      style={size !== undefined ? { width: size, height: size } : undefined}
      className={className}
    />
  );
}
