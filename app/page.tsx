import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <FeaturedProjects />
      <Testimonials />
      <Contact />
    </>
  );
}
