import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const words = ["forgettable", "filtered", "scripted"];

const typeDelete = (
  el,
  word,
  typeSpeed = 0.2,
  deleteSpeed = 0.15,
  pause = 0.7
) => {
  const tl = gsap.timeline();

  // Typowanie liter
  for (let i = 1; i <= word.length; i++) {
    tl.call(
      () => {
        if (el) el.textContent = word.slice(0, i);
      },
      null,
      "+=" + typeSpeed
    );
  }

  // Pauza po wpisaniu słowa
  tl.to({}, { duration: pause });

  // Usuwanie liter
  for (let i = word.length; i >= 0; i--) {
    tl.call(
      () => {
        if (el) el.textContent = word.slice(0, i);
      },
      null,
      "+=" + deleteSpeed
    );
  }

  // Pauza po usunięciu słowa
  tl.to({}, { duration: pause });

  return tl;
};

const HeroSection = () => {
  const spanRef = useRef(null);
  const heroContainerRef = useRef(null);

  useGSAP(() => {
    if (!spanRef.current) return;

    const master = gsap.timeline({ repeat: -1 });

    words.forEach((word) => {
      master.add(typeDelete(spanRef.current, word, 0.15, 0.1, 0.5));
    });

    
    return () => master.kill();
  }, []);

  return (
    <div ref={heroContainerRef} className="lp-bg h-[100vh] border-2 p-5 flex flex-col text-center">
      <div  className="test1 text-[5rem]">
        <p>Your daily dose of animation</p>
        <p>
          Un<span ref={spanRef}></span>
        </p>
      </div>
      <div className="test2">
        Cartoon Podcast is where every frame tells a story that sparks your
        imagination and brings your favorite characters to life. Tune in and let
        the adventure begin!
      </div>
    </div>
  );
};

export default HeroSection;
