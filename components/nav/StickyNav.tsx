"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { LogoMark } from "@/components/shared/LogoMark";
import { useLenis } from "@/components/smooth-scroll/SmoothScrollProvider";
import type { SectionId } from "@/types";

type NavLink = { id: SectionId; label: string };
const LINKS: NavLink[] = [
  { id: "servicios", label: "Servicios" },
  { id: "nosotros", label: "Nosotros" },
  { id: "proyectos", label: "Proyectos" },
];

export function StickyNav() {
  const rootRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const lenis = useLenis();

  // Watch the hero with IntersectionObserver: as soon as the hero is
  // completely out of the viewport (no pixels intersecting), reveal the nav;
  // when any pixel of the hero re-enters, hide it. More robust than a
  // scroll-position trigger — works whether Lenis is smoothing scroll or
  // native scroll is in play, and doesn't depend on cached layout positions.
  useEffect(() => {
    const hero = document.querySelector("[data-hero-root]");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" },
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  // Close mobile menu on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const scrollTo = (id: SectionId) => {
    const target = document.getElementById(id);
    if (!target) return;
    setMenuOpen(false);
    if (lenis) {
      lenis.scrollTo(target, { offset: -16 });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        ref={rootRef}
        data-visible={visible ? "true" : "false"}
        className="fixed inset-x-0 top-0 z-40 border-b border-line/60 bg-bg/70 opacity-0 backdrop-blur transition-opacity duration-300 ease-out data-[visible=true]:pointer-events-auto data-[visible=true]:opacity-100 data-[visible=false]:pointer-events-none"
      >
        <nav
          aria-label="Principal"
          className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6"
        >
          <button
            type="button"
            onClick={() => scrollTo("servicios")}
            aria-label="Volver arriba"
            className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <LogoMark size={64} alt="" className="rounded-full" />
          </button>

          <div className="flex items-center gap-2 md:gap-8">
            <ul className="hidden items-center gap-8 md:flex">
              {LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="group relative text-sm font-normal text-fg-muted transition-colors hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-0 bg-fg transition-all duration-300 group-hover:w-full group-focus-visible:w-full"
                    />
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => scrollTo("contacto")}
              className="hidden rounded-full border border-fg px-4 py-2 text-sm font-semibold text-fg transition-colors hover:border-accent hover:bg-accent hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:inline-block"
            >
              Contacto
            </button>

            <button
              type="button"
              onClick={() => scrollTo("contacto")}
              className="rounded-full border border-fg px-3 py-1.5 text-xs font-semibold text-fg transition-colors hover:border-accent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg md:hidden"
            >
              Contacto
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="flex h-11 w-11 items-center justify-center rounded-full text-fg transition-colors hover:bg-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden />
              ) : (
                <Menu className="h-5 w-5" aria-hidden />
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-bg/95 backdrop-blur md:hidden"
          >
            <ul className="flex flex-col items-center gap-8 text-2xl font-extrabold tracking-tight">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => scrollTo(link.id)}
                    className="rounded px-4 py-2 text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
