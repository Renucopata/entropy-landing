"use client";

import { motion, useReducedMotion } from "motion/react";
import { Code2, Cpu, Megaphone, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  RevealItem,
  SectionReveal,
} from "@/components/shared/SectionReveal";
import { revealItemVariants } from "@/lib/motion-presets";

type Service = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const SERVICES: Service[] = [
  {
    icon: Code2,
    title: "Desarrollo de Software",
    body: "Aplicaciones web y móviles a medida, arquitectura escalable, integraciones complejas.",
  },
  {
    icon: Megaphone,
    title: "Marketing & Brand Management",
    body: "Estrategia de marca, posicionamiento, gestión integral de identidad y comunicación.",
  },
  {
    icon: Cpu,
    title: "Consultoría en IA",
    body: "Identificamos dónde la inteligencia artificial puede acelerar tu operación y la implementamos.",
  },
  {
    icon: Users,
    title: "CRM e Implementación",
    body: "Selección, configuración y despliegue de plataformas CRM adaptadas a tu proceso comercial.",
  },
];

const CARD_CLASSES =
  "group flex h-full flex-col rounded-2xl border border-line bg-bg p-8 transition-[transform,border-color,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:border-fg hover:shadow-lg hover:shadow-fg/5";

function ServiceCard({ service }: { service: Service }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = service.icon;

  const body = (
    <>
      <Icon className="h-8 w-8 text-fg" strokeWidth={1.5} aria-hidden />
      <h3 className="mt-6 text-xl font-semibold text-fg">{service.title}</h3>
      <p className="mt-3 leading-relaxed text-fg-muted">{service.body}</p>
    </>
  );

  if (prefersReducedMotion) {
    return <li className={CARD_CLASSES}>{body}</li>;
  }
  return (
    <motion.li variants={revealItemVariants} className={CARD_CLASSES}>
      {body}
    </motion.li>
  );
}

export function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="servicios-title"
      className="py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionReveal>
          <RevealItem className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-fg-subtle">
              01 — Servicios
            </p>
            <h2
              id="servicios-title"
              className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
            >
              Servicios
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-fg-muted">
              Construimos, asesoramos e implementamos. Cuatro frentes, una sola
              filosofía: orden a partir del caos.
            </p>
          </RevealItem>

          <ul className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
