"use client";

import {
  RevealItem,
  SectionReveal,
} from "@/components/shared/SectionReveal";

export function AboutSection() {
  return (
    <section
      id="nosotros"
      aria-labelledby="nosotros-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal className="max-w-3xl">
          <RevealItem>
            <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle">
              02 — Nosotros
            </p>
            <h2
              id="nosotros-title"
              className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              Nosotros
            </h2>
            <p className="mt-6 text-2xl font-normal leading-snug text-fg">
              Entropy nace en La Paz, Bolivia, con una idea simple: la
              complejidad bien gestionada es una ventaja competitiva.
            </p>
          </RevealItem>

          <RevealItem className="mt-10 space-y-6 text-lg leading-relaxed text-fg-muted">
            <p>
              Trabajamos con clientes en todo el país, desde startups locales
              hasta organizaciones consolidadas. No vendemos tecnología por moda
              — implementamos soluciones que generan orden, claridad y
              crecimiento sostenido.
            </p>
            <p>
              Nuestro enfoque combina desarrollo a medida, asesoría estratégica
              y un acompañamiento cercano en cada etapa del proyecto.
            </p>
          </RevealItem>
        </SectionReveal>
      </div>
    </section>
  );
}
