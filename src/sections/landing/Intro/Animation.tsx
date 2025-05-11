// HeroScrollEffect.tsx
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const IntroAnimation = () => {
    useEffect(() => {
        gsap.to(".intro", {
            filter: "brightness(0)",
            ease: "none",
            scrollTrigger: {
                trigger: ".intro",
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                pinSpacing: false,
            },
        });
    }, []);

    return null;
};

export default IntroAnimation;
