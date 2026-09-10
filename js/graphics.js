function initializeGraphics() {
  // =========================================================
  //           CANVAS SETUP & PERFORMANCE TRACKING
  // =========================================================
  const canvas = document.getElementById("dust-bg");
  const ctx = canvas.getContext("2d", { willReadFrequently: false });
  let width, height;
  let resizeTimeout;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resize, 200);
  });

  const mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    realX: -1000,
    realY: -1000,
  };
  let isTouchDevice = false;

  window.addEventListener("mousemove", (e) => {
    if (isTouchDevice) return;
    mouse.realX = e.clientX;
    mouse.realY = e.clientY;
    mouse.targetX = e.clientX / width - 0.5;
    mouse.targetY = e.clientY / height - 0.5;
  });
  window.addEventListener("mouseout", () => {
    mouse.realX = -1000;
    mouse.realY = -1000;
  });

  window.addEventListener(
    "touchstart",
    (e) => {
      isTouchDevice = true;
      const touch = e.touches[0];
      mouse.realX = touch.clientX;
      mouse.realY = touch.clientY;
      mouse.targetX = touch.clientX / width - 0.5;
      mouse.targetY = touch.clientY / height - 0.5;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      const touch = e.touches[0];
      mouse.realX = touch.clientX;
      mouse.realY = touch.clientY;
      mouse.targetX = (touch.clientX / width - 0.5) * 0.5;
      mouse.targetY = (touch.clientY / height - 0.5) * 0.5;
    },
    { passive: true },
  );
  window.addEventListener(
    "touchend",
    () => {
      mouse.realX = -1000;
      mouse.realY = -1000;
      mouse.targetX = 0;
      mouse.targetY = 0;
    },
    { passive: true },
  );

  // =========================================================
  //         PERFORMANCE BOOSTER: PRE-RENDER SPRITES
  // =========================================================
  const colors = ["#8b5cf6", "#06b6d4", "#ec4899", "#f8fafc"];
  const sprites = {};
  const GLOW_SIZE = 10;

  function preRenderSprites() {
    const spriteCanvas = document.createElement("canvas");
    const spriteCtx = spriteCanvas.getContext("2d");
    spriteCanvas.width = 120;
    spriteCanvas.height = GLOW_SIZE * 2 * colors.length + 10;

    let currentY = GLOW_SIZE;

    colors.forEach((color, index) => {
      const centerX = 60;
      spriteCtx.shadowBlur = GLOW_SIZE;
      spriteCtx.shadowColor = color;
      spriteCtx.beginPath();
      spriteCtx.arc(centerX, currentY, 2, 0, Math.PI * 2);
      spriteCtx.fillStyle = color;
      spriteCtx.fill();

      sprites[color] = {
        x: centerX - GLOW_SIZE,
        y: currentY - GLOW_SIZE,
        w: GLOW_SIZE * 2,
        h: GLOW_SIZE * 2,
      };
      currentY += GLOW_SIZE * 2;
    });
    sprites.imageMap = spriteCanvas;
  }

  preRenderSprites();

  // ================= PARTICLES =================
  const particles = [];
  for (let i = 0; i < 250; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      baseOpacity: Math.random() * 0.4 + 0.1,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.02,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5 - 0.2,
    });
  }

  // ================= ANIMATION LOOP =================
  function animate() {
    ctx.clearRect(0, 0, width, height);
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    particles.forEach((p) => {
      p.angle += p.spin;
      p.x += p.speedX + Math.sin(p.angle) * 0.3;
      p.y += p.speedY + Math.cos(p.angle) * 0.3;

      if (p.x < -50) p.x = width + 50;
      if (p.x > width + 50) p.x = -50;
      if (p.y < -50) p.y = height + 50;
      if (p.y > height + 50) p.y = -50;

      const drawX = p.x + mouse.x * p.size * 40;
      const drawY = p.y + mouse.y * p.size * 40;

      const sprite = sprites[p.color];
      ctx.globalAlpha = p.baseOpacity * (p.size < 1.2 ? 1 : 2);

      const scaleFactor = p.size / 1.5;
      const destW = sprite.w * scaleFactor;
      const destH = sprite.h * scaleFactor;

      ctx.drawImage(
        sprites.imageMap,
        sprite.x,
        sprite.y,
        sprite.w,
        sprite.h,
        drawX - destW / 2,
        drawY - destH / 2,
        destW,
        destH,
      );

      const dxMouse = mouse.realX - drawX;
      const dyMouse = mouse.realY - drawY;
      if (Math.abs(dxMouse) < 180 && Math.abs(dyMouse) < 180) {
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 180) {
          ctx.beginPath();
          ctx.moveTo(drawX, drawY);
          ctx.lineTo(mouse.realX, mouse.realY);
          const lineOpacity = (1 - distMouse / 180) * 0.3;
          ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  animate();
}
