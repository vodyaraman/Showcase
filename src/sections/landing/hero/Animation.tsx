// HeroScrollEffect.tsx
import { useEffect } from "react";
import { gsap } from "gsap";

const HeroAnimation = () => {
	useEffect(() => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: ".hero",
				start: "top top",
				end: "bottom top",
				scrub: true,
				pin: true,
				pinSpacing: false,
			},
		});

		tl.to(".hero", { y: "-40%", ease: "none" }, 0)
		  .to(".intro__bg-layer--middle", { y: "-110%", ease: "none" }, 0);

		console.log("Mounted");

		return () => {
			tl.scrollTrigger?.kill(true);
			tl.kill();
		};
	}, []);

	return null;
};

export default HeroAnimation;
