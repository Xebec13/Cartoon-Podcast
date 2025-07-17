import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const LandingPage = () => {
  const box = useRef(null);
  const split = useRef(null);

  useGSAP(() => {
    const animate = () => {
      split.current = SplitText.create(box.current, {
        type: "chars",
        charsClass: "split-char",
      });

      gsap.from(split.current.chars, {
        duration: 1.4,
        yPercent: "random([-150,150])",
        xPercent: "random([-150,150])",
        stagger: {
          from: "random",
          amount: 2.5,
        },
        opacity: 0,
        ease: "power3.out",
      });

      gsap.to(box.current, {
        scrollTrigger: {
          trigger: box.current,
          start: "top top",
          end: "+=150vh",
          scrub: true,
        },
        scale: 0.1,
        opacity: 0.1,
        transformOrigin: "center top",
        ease: "power1.out",
      });
    };

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(animate);
    } else {
      animate();
    }

    return () => {
      split.current && split.current.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="lp-bg h-[100vh] flex justify-center items-start">
      <div ref={box} className="text-center p-10">
        <h1 className="split" style={{ opacity: 1 }}>
          Cartoon<br />Podcast
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
