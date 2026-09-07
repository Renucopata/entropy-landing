import { Hero } from "@/components/hero/Hero";
import { StickyNav } from "@/components/nav/StickyNav";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Page() {
  return (
    <>
      <StickyNav />
      <Hero />
      <main id="content">
        <ServicesSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  );
}
