// AboutFollowText.tsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AboutFollowText = () => {
	const lastAngleRef = useRef<number | null>(null);
	const accumulatedAngleRef = useRef(0);

	useEffect(() => {
		const element = document.querySelector(".about .curved-text") as HTMLElement;
		if (!element) return;

		const follow = (e: MouseEvent) => {
			const rect = element.getBoundingClientRect();
			const cx = rect.left + rect.width / 2;
			const cy = rect.top + rect.height / 2;

			const dx = e.clientX - cx;
			const dy = e.clientY - cy;

			const angle = Math.atan2(dy, dx) * (180 / Math.PI); // -180 to 180
			const normalizedAngle = (angle + 360) % 360;

			if (lastAngleRef.current !== null) {
				let delta = normalizedAngle - lastAngleRef.current;

				if (delta > 180) delta -= 360;
				else if (delta < -180) delta += 360;

				accumulatedAngleRef.current += delta;
			}

			lastAngleRef.current = normalizedAngle;

			gsap.to(element, {
				rotate: accumulatedAngleRef.current,
				duration: 0.2,
				ease: "power2.out",
				transformOrigin: "center center",
			});
		};

		window.addEventListener("mousemove", follow);

		return () => {
			window.removeEventListener("mousemove", follow);
		};
	}, []);

	return null;
};

export default AboutFollowText;
