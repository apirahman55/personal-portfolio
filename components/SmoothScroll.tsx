"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    // Setup global scroll animations
    setupScrollAnimations();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}

function setupScrollAnimations() {
  // Animate all elements with data-animate attribute
  gsap.utils.toArray<HTMLElement>("[data-animate]").forEach((el) => {
    const animation = el.dataset.animate;
    
    const defaults = {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    };

    let fromVars: gsap.TweenVars = { ...defaults };

    switch (animation) {
      case "fade-up":
        fromVars.y = 60;
        break;
      case "fade-down":
        fromVars.y = -60;
        break;
      case "fade-left":
        fromVars.x = 60;
        break;
      case "fade-right":
        fromVars.x = -60;
        break;
      case "scale-up":
        fromVars.scale = 0.8;
        break;
      case "rotate-in":
        fromVars.rotation = 10;
        fromVars.y = 40;
        break;
      default:
        fromVars.y = 40;
    }

    gsap.from(el, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Parallax effect for images
  gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
    const speed = parseFloat(el.dataset.parallax || "0.5");
    
    gsap.to(el, {
      yPercent: -30 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  // Stacking sections
  gsap.utils.toArray<HTMLElement>("[data-stack]").forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      pin: true,
      pinSpacing: false,
      endTrigger: section.nextElementSibling as HTMLElement || section,
      end: "top top",
    });
  });

  // Text reveal animation
  gsap.utils.toArray<HTMLElement>("[data-text-reveal]").forEach((el) => {
    const text = el.textContent || "";
    el.innerHTML = text.split("").map(char => 
      `<span class="inline-block">${char === " " ? "&nbsp;" : char}</span>`
    ).join("");

    gsap.from(el.querySelectorAll("span"), {
      opacity: 0,
      y: 100,
      rotateX: -90,
      stagger: 0.02,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });

  // Progress bar on scroll
  gsap.to("[data-progress]", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3,
    },
  });

  // Horizontal scroll section
  gsap.utils.toArray<HTMLElement>("[data-horizontal-scroll]").forEach((container) => {
    const wrapper = container.querySelector("[data-horizontal-wrapper]") as HTMLElement;
    if (!wrapper) return;
    
    const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

    gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  });
}
