function initializeGSAPTransitions() {
  // 1. Explicitly register ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // =========================================================================
  // SAFE AUDIO HELPER
  // Guarantees no crashes even if the audio engine is missing or uninitialized
  // =========================================================================
  function playScrollSound(soundName) {
    try {
      if (
        soundName &&
        typeof globalThis !== "undefined" &&
        globalThis.EngineAudio &&
        globalThis.EngineAudio.initialized
      ) {
        globalThis.EngineAudio.playSFX(soundName);
      }
    } catch (error) {
      // Silently fail without breaking the website or GSAP animations
    }
  }

  // =========================================================================
  // MASTER MIDPOINT CONFIGURATOR
  // =========================================================================
  function createMidpointTransition(selector, fromVars, toVars, soundEffect = null) {
    gsap.utils.toArray(selector).forEach((el) => {
      gsap.fromTo(el, fromVars, {
        ...toVars,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "top 50%",
          scrub: 1.5,
          invalidateOnRefresh: true,

          // Plays when scrolling down (Element appears)
          onEnter: () => playScrollSound(soundEffect),

          // Plays when scrolling up (Element starts to reverse/disappear)
          onEnterBack: () => playScrollSound(soundEffect),
        },
      });
    });
  }

  // --- 01 to 19: STANDARD TRANSITIONS ---

  // 01. Fade Up
  createMidpointTransition(".fx-fade-up", { y: 100, opacity: 0 }, { y: 0, opacity: 1 }, "out");

  // 02. Scale In
  createMidpointTransition(".fx-scale-in", { scale: 0.75, opacity: 0 }, { scale: 1, opacity: 1 }, "out");

  // 03. Scale Out
  createMidpointTransition(".fx-scale-out", { scale: 1.25, opacity: 0 }, { scale: 1, opacity: 1 }, "out");

  // 04. Blur In
  createMidpointTransition(
    ".fx-blur-in",
    { filter: "blur(30px)", opacity: 0, scale: 0.95 },
    { filter: "blur(0px)", opacity: 1, scale: 1 },
    "out",
  );

  // 05. Flip X
  createMidpointTransition(
    ".fx-flip-x",
    { transformPerspective: 1200, rotationX: -80, opacity: 0 },
    { rotationX: 0, opacity: 1 },
    "out",
  );

  // 06. Flip Y
  createMidpointTransition(
    ".fx-flip-y",
    { transformPerspective: 1200, rotationY: 80, opacity: 0 },
    { rotationY: 0, opacity: 1 },
    "out",
  );

  // 07. Slide Right
  createMidpointTransition(".fx-slide-right", { x: -150, opacity: 0 }, { x: 0, opacity: 1 }, "out");

  // 08. Slide Left
  createMidpointTransition(".fx-slide-left", { x: 150, opacity: 0 }, { x: 0, opacity: 1 }, "out");

  // 09. Elastic Bounce
  createMidpointTransition(".fx-elastic", { y: 120, scaleY: 0.7, opacity: 0 }, { y: 0, scaleY: 1, opacity: 1 }, "out");

  // 10. Skew Up
  createMidpointTransition(".fx-skew-up", { y: 120, skewY: 8, opacity: 0 }, { y: 0, skewY: 0, opacity: 1 }, "out");

  // 11. Wipe Up
  createMidpointTransition(
    ".fx-wipe-up",
    { clipPath: "inset(100% 0 0 0)", opacity: 0 },
    { clipPath: "inset(0% 0 0 0)", opacity: 1 },
    "out",
  );

  // 12. Wipe Side
  createMidpointTransition(
    ".fx-wipe-side",
    { clipPath: "inset(0 100% 0 0)", opacity: 0 },
    { clipPath: "inset(0% 0 0 0)", opacity: 1 },
    "out",
  );

  // 13. Swing Down
  createMidpointTransition(
    ".fx-swing-down",
    { transformOrigin: "top center", rotationX: -90, opacity: 0 },
    { rotationX: 0, opacity: 1 },
    "out",
  );

  // 14. Zoom Blur
  createMidpointTransition(
    ".fx-zoom-blur",
    { scale: 0.4, filter: "blur(40px)", opacity: 0 },
    { scale: 1, filter: "blur(0px)", opacity: 1 },
    "out",
  );

  // 15. Ambient Glow Ignite
  createMidpointTransition(
    ".fx-glow-in",
    { y: 60, opacity: 0, boxShadow: "0 0 0px transparent" },
    { y: 0, opacity: 1, boxShadow: "0 25px 70px rgba(168, 85, 247, 0.25)" },
    "out",
  );

  // 19. Pop Out
  createMidpointTransition(
    ".fx-pop-out",
    { scale: 0.3, rotation: -12, opacity: 0 },
    { scale: 1, rotation: 0, opacity: 1 },
    "out",
  );

  // =========================================================================
  // MACRO VIEWPORT CONSTANT TRACKERS (16 - 18)
  // =========================================================================

  // 16. Scrub Scale
  gsap.utils.toArray(".fx-scrub-scale").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.8 },
      {
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 35%",
          scrub: 1.2,
          onEnter: () => playScrollSound("hover"), // Scrolling down
          onEnterBack: () => playScrollSound("hover"), // Scrolling up
        },
      },
    );
  });

  // 17. Scrub Parallax
  gsap.utils.toArray(".fx-scrub-parallax").forEach((el) => {
    gsap.fromTo(
      el,
      { y: -60 },
      {
        y: 60,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          onEnter: () => playScrollSound("hover"),
          onEnterBack: () => playScrollSound("hover"),
        },
      },
    );
  });

  // 18. Scrub Rotate
  gsap.utils.toArray(".fx-scrub-rotate").forEach((el) => {
    gsap.fromTo(
      el,
      { rotation: -8 },
      {
        rotation: 8,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 35%",
          scrub: 1.2,
          onEnter: () => playScrollSound("hover"),
          onEnterBack: () => playScrollSound("hover"),
        },
      },
    );
  });

  // =========================================================================
  // LOOPING NODE SYSTEM
  // =========================================================================

  // 20. Continuous Float (Locks at midpoint, then initializes infinite float loop)
  gsap.utils.toArray(".fx-continuous-float").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: el,
          start: "top 98%",
          end: "top 50%",
          scrub: 1.5,
          onEnter: () => playScrollSound("out"),
          onLeave: () => {
            // Once past midpoint, start looping the up/down motion seamlessly
            gsap.to(el, {
              y: -12,
              duration: 2.2,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              overwrite: "auto",
            });
          },
          onEnterBack: () => {
            // Kill looping logic if scrolling backward above mid-point
            gsap.killTweensOf(el);
            playScrollSound("out");
          },
        },
      },
    );
  });

  // =========================================================================
  // ROBUST STACKING MECHANIC (Bypasses CSS Sticky issues)
  // =========================================================================
  const stackCards = gsap.utils.toArray(".fx-sticky-stack");

  stackCards.forEach((card, i) => {
    // 1. PIN THE CARD using GSAP when it reaches 120px from the top
    ScrollTrigger.create({
      trigger: card,
      start: "top 120px",
      endTrigger: ".stack-wrapper",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      // Play a snappy sound exactly when the card hits the top and pins!
      onEnter: () => playScrollSound("out"), // Locks in scrolling down
      onLeaveBack: () => playScrollSound("out"), // Unlocks/releases scrolling up
    });

    // 2. SCALE AND BLUR IT when the next card touches it
    if (i !== stackCards.length - 1) {
      gsap.to(card, {
        scale: 0.92,
        opacity: 0.4,
        filter: "blur(8px)",
        ease: "power2.inOut", // Smooths out the visual scaling curve
        scrollTrigger: {
          trigger: stackCards[i + 1],
          start: "top 80%",
          end: "top 120px",
          scrub: 1.5, // Buttery momentum
        },
      });
    }
  });
}
