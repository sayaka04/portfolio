// =========================================================
//                 LENIS (Mobile Optimized)
// =========================================================

function initializeLenis() {
  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
  });

  // 1. Tell Lenis to update GSAP ScrollTrigger on every scroll event
  lenis.on("scroll", ScrollTrigger.update);

  // 2. Hook Lenis into GSAP's internal ticker (This replaces your requestAnimationFrame loop!)
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // 3. Turn off GSAP's lag smoothing to prevent conflicts with Lenis's own smoothing
  gsap.ticker.lagSmoothing(0, 0);
}
