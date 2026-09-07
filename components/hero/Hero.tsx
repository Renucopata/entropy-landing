"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LogoMark } from "@/components/shared/LogoMark";

const INTRO_KEY = "entropy_intro_done";
const DESKTOP_MQ = "(min-width: 768px)";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // useGSAP wraps useLayoutEffect, so anything set inside runs BEFORE the
  // browser's first paint after hydration. That means we can render the
  // settled state in SSR (SEO-friendly, no-JS-friendly), then hide + animate
  // when the intro runs — without any visible flash.
  useGSAP(
    () => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      let alreadyPlayed = false;
      try {
        alreadyPlayed = sessionStorage.getItem(INTRO_KEY) === "1";
      } catch {
        // sessionStorage unavailable (privacy mode) — treat as first visit;
        // intro will replay on hard reloads in that context, no harm done.
      }

      if (prefersReduced || alreadyPlayed) return;

      const root = heroRef.current;
      if (!root) return;

      const logo = root.querySelector("[data-hero-logo]");
      const desc = root.querySelector("[data-hero-desc]");
      const tagline = root.querySelector("[data-hero-tagline]");
      const scrollCue = root.querySelector("[data-hero-scroll]");
      const isDesktop = window.matchMedia(DESKTOP_MQ).matches;

      // On desktop, the logo's SSR-rendered position sits in the right column
      // of a two-column grid. Measure how far its center is from the viewport
      // center so the intro can pin the logo at the visual center of the
      // screen, then slide it back to its natural (right-column) resting
      // position after the fade+scale.
      let centerOffset = 0;
      if (isDesktop && logo) {
        const rect = logo.getBoundingClientRect();
        centerOffset = window.innerWidth / 2 - (rect.left + rect.width / 2);
      }

      gsap.set(logo, {
        opacity: 0,
        scale: 0.92,
        x: centerOffset,
        transformOrigin: "50% 50%",
      });
      gsap.set(desc, { opacity: 0, x: 20 });
      gsap.set(tagline, { opacity: 0, y: 8 });
      gsap.set(scrollCue, { opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem(INTRO_KEY, "1");
          } catch {
            // ignore — see note above
          }
        },
      });

      tl.to(
        logo,
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        0.2,
      );

      if (isDesktop) {
        tl.to(
          logo,
          { x: 0, duration: 0.9, ease: "power2.inOut" },
          1.6,
        )
          .to(
            desc,
            { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
            1.9,
          )
          .to(
            scrollCue,
            { opacity: 1, duration: 0.6, ease: "power2.out" },
            2.4,
          );
      } else {
        tl.to(
          tagline,
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          1.4,
        ).to(
          scrollCue,
          { opacity: 1, duration: 0.6, ease: "power2.out" },
          2.0,
        );
      }
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      data-hero-root
      aria-label="Bienvenida"
      className="relative flex min-h-[100svh] items-center justify-center px-6"
    >
      <div className="grid w-full max-w-5xl grid-cols-1 place-items-center gap-8 md:grid-cols-2 md:gap-16">
        <div className="order-1 flex flex-col items-center md:items-end md:justify-self-end">
          <div data-hero-logo>
            <LogoMark priority className="h-auto w-72 sm:w-80 md:w-96" />
          </div>
          <p
            data-hero-tagline
            className="mt-8 text-lg text-fg-muted sm:text-xl md:hidden"
          >
            Orden a partir del caos.
          </p>
        </div>

        <div
          data-hero-desc
          className="order-2 hidden md:block md:justify-self-start md:text-left"
        >
          <p className="text-2xl leading-snug text-fg lg:text-3xl">
            Software, marca, IA y CRM. Cuatro frentes, una sola filosofía:
            orden a partir del caos.
          </p>
        </div>
      </div>

      <a
        data-hero-scroll
        href="#servicios"
        aria-label="Ir a la sección Servicios"
        className="group absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 rounded-full p-2 text-fg-muted transition-colors hover:text-fg focus-visible:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <span className="text-xs uppercase tracking-[0.3em]">Explorar</span>
        <span
          aria-hidden
          className="text-lg leading-none motion-safe:animate-bounce"
        >
          ↓
        </span>
      </a>
    </section>
  );
}
