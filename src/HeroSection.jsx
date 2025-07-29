import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const HeroSection = () => {
  const sectionContainerRef = useRef(null);
  const textContainerRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    if (
      !sectionContainerRef.current ||
      !textContainerRef.current ||
      !buttonRef.current
    )
      return;

    const animate = () => {
      const split = SplitText.create(textContainerRef.current, {
        type: "chars,words",
      });

      gsap.set(textContainerRef.current, { opacity: 1, y: 0 });
      gsap.set(buttonRef.current, { opacity: 1, y: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionContainerRef.current,
          start: "top center",
          end: "+=50%",
          scrub: 1,
          // markers: true,
        },
      });

      tl.from(split.chars, {
        y: 20,
        autoAlpha: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: "power4.out",
      });

      tl.from(
        buttonRef.current,
        {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.3"
      );

      return () => {
        split.revert();
        tl.kill();
      };
    };

    if (document.fonts && document.fonts.ready) {
      return document.fonts.ready.then(animate);
    } else {
      return animate();
    }
  }, [sectionContainerRef, textContainerRef, buttonRef]);

  return (
    <section
      ref={sectionContainerRef}
      className="h-[100vh] p-5 tickle-me-pink-opacity80 bg text-[2.5rem]  md:text-[4rem] text-center flex flex-col items-center justify-center gap-10"
    >
      <div
        ref={textContainerRef}
        className="h-auto whitespace-pre-line"
        style={{ opacity: 0 }}
      >
        <p>
          Cartoon Podcast is where every frame tells a story that sparks your
          imagination and brings your favorite characters to life. Tune in and
          let the adventure begin!
        </p>
      </div>
      <button
        ref={buttonRef}
        className=" bg-indigo-600 text-white rounded"
        style={{ opacity: 0 }}
      >
        Click Me
      </button>
    </section>
  );
};

export default HeroSection;
