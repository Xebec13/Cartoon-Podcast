import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import bg1 from "./assets/cartoon-podcast-hero-bg-1.jpg";
import bg2 from "./assets/cartoon-podcast-hero-bg-2.jpg";
import bg3 from "./assets/cartoon-podcast-hero-bg-3.jpg";

gsap.registerPlugin(ScrollTrigger);

const backgrounds = [bg1, bg2, bg3];
const heroWords = ["Unscripted", "Unfiltered", "Unforgettable"];
const heroColors = [
  "tickle-me-pink-text",
  "champagne-text",
  "magenta-haze-text",
];

const MinorHeroSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const sections = gsap.utils.toArray(
      sectionRef.current.querySelectorAll(".hero-section")
    );
    const getRatio = (el) =>
      window.innerHeight / (window.innerHeight + el.offsetHeight);

    // Store created ScrollTriggers for cleanup
    const triggers = [];

    sections.forEach((section) => {
      const bg = section.querySelector(".bg");

      const trigger = gsap.fromTo(
        bg,
        {
          backgroundPosition: `50% ${
            -window.innerHeight * getRatio(section)
          }px`,
        },
        {
          backgroundPosition: () =>
            `50% ${window.innerHeight * (1 - getRatio(section))}px`,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      triggers.push(trigger.scrollTrigger);
    });

    // Cleanup — remove only our ScrollTriggers
    return () => {
      triggers.forEach((t) => {
        if (t) t.kill();
      });
    };
  }, []); // Empty deps: run once on mount

  return (
    <section className="h-full" ref={sectionRef}>
      {backgrounds.map((bg, idx) => (
        <div
          key={idx}
          className="hero-section h-screen relative flex items-center justify-center overflow-hidden"
        >
          <div
            className="bg"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: -1,
              backgroundImage: `url(${bg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            aria-hidden="true"
          ></div>
          <h1 className={`relative z-10 text-[8rem] ${heroColors[idx]}`}>
            {heroWords[idx]}
          </h1>
        </div>
      ))}
    </section>
  );
};

export default MinorHeroSection;