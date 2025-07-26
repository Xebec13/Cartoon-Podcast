import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

const LandingPage = () => {
  const landingContainerRef = useRef(null);
  const split = useRef(null);

  useGSAP(() => {
    const animate = () => {
      split.current = SplitText.create(landingContainerRef.current, {
        type: "chars",
        charsClass: "split-char",
      });

      gsap.from(split.current.chars, {
        duration: 1.2,
        yPercent: "random([-150,150])",
        xPercent: "random([-150,150])",
        stagger: {
          from: "random",
          amount: 2.7,
        },
        opacity: 0,
        ease: "power3.out",
      });

      gsap.to(landingContainerRef.current, {
        scrollTrigger: {
          trigger: landingContainerRef.current,
          start: "top top",
          end: "+=250vh",
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
  // DODAC TIMELINE W PRZYSZLOSCI DO SYNCHRONIZACJI
  return (
    <div className="lp-bg h-[100vh] p-10 flex justify-center">
      <div ref={landingContainerRef} className="text-center">
        <h1 className="split" style={{ opacity: 1 }}>
          Cartoon
          <br />
          Podcast
        </h1>
      </div>
    </div>
  );
};

export default LandingPage;
