import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const LandingPage = () => {
  const landingContainerRef = useRef(null);
  const split = useRef(null);

  useGSAP(() => {
    if (!landingContainerRef.current) return;

    const animate = () => {
      split.current = SplitText.create(landingContainerRef.current, {
        type: "chars,words",
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
    };

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: landingContainerRef.current,
        start: "top top",
        end: "+=20%",
        scrub: 1,
      },
    });

    tl.to(landingContainerRef.current, {
      scale: 0.1,
      opacity: 0,
      ease: "power1.out",
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(animate);
    } else {
      animate();
    }

    return () => {
      // cleanup tylko własnego SplitText i timeline + powiązanego ScrollTrigger
      split.current && split.current.revert();

      if (tl) {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      }
    };
  }, []);

  return (
    <div className="lp-bg h-[100vh] py-5 px-15 flex justify-center items-center">
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
