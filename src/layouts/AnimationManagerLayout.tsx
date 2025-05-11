import HeroAnimation from "@/sections/landing/hero/Animation";
import { useEffect, useState, type JSX } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroAnimation from "@/sections/landing/Intro/Animation";
import AboutFollowText from "@/sections/landing/about/Animation";

gsap.registerPlugin(ScrollTrigger);

const globalAnimations: JSX.Element[] = [];

const animationsByPath: Record<string, JSX.Element[]> = {
  "/": [
  <HeroAnimation key={"Hero"}/>,
  <IntroAnimation key={"Intro"}/>,
  <AboutFollowText key={"About Curved Text"}/>,
],
  "/page1": [],
  "/page2": [],
  "/page3": []
};

export default function AnimationManager() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const images = Array.from(document.images);
    const unloaded = images.filter(img => !img.complete);

    if (unloaded.length === 0) {
      reveal();
      return;
    }

    let loadedCount = 0;
    const listeners: [HTMLImageElement, () => void][] = [];

    const check = () => {
      loadedCount++;
      if (loadedCount === unloaded.length) {
        reveal();
      }
    };

    unloaded.forEach((img) => {
      img.addEventListener("load", check);
      img.addEventListener("error", check);
      listeners.push([img, check]);
    });

    function reveal() {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const pageContent = document.getElementById("page-content");
            const loader = document.getElementById("loading-screen");

            if (pageContent) {
              pageContent.style.display = "block";
            }

            if (loader) {
              loader.style.opacity = "0";
              setTimeout(() => loader.remove(), 400);
            }

            setLoaded(true);
          }, 100);
        });
      });
    }

    return () => {
      listeners.forEach(([img, handler]) => {
        img.removeEventListener("load", handler);
        img.removeEventListener("error", handler);
      });
    };
  }, []);

  if (!loaded) return null;

  const pathname = window.location.pathname;
  const localAnimations = animationsByPath[pathname] || [];
  const allAnimations = [...globalAnimations, ...localAnimations];

  return <>{allAnimations}</>;
}
