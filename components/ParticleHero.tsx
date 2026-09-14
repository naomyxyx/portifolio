"use client";

import { useEffect, useRef } from "react";

type Particle = { homeX: number; homeY: number; x: number; y: number; startX: number; startY: number; roamTargetX: number; roamTargetY: number; vx: number; vy: number; repX: number; repY: number; inZone: boolean; char: "0" | "1"; size: number };
type AnimState = "assembling" | "active" | "idle";

const WORDMARK = "NEXT TO YOU";
const PINK = "255, 31, 143";
const AUTO_ASSEMBLY_DELAY_MS = 400;
const TRANSITION_MS = 2000;
const REPULSION_RADIUS = 80;
const REPULSION_FORCE = 10;
const REPULSION_APPROACH = 0.08;

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t); }
function randomPoint(w: number, h: number) { return [Math.random() * w, Math.random() * h] as const; }

function sampleWordmark(w: number, h: number) {
  const offscreen = document.createElement("canvas");
  offscreen.width = Math.max(1, Math.floor(w));
  offscreen.height = Math.max(1, Math.floor(h));
  const context = offscreen.getContext("2d");
  if (!context) return [] as { x: number; y: number }[];
  const mobile = w < 768;
  let fontSize = Math.floor(h * (mobile ? 0.24 : 0.22));
  const targetWidth = w * (mobile ? 0.86 : 0.68);
  context.fillStyle = "#fff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `800 ${fontSize}px Arial, sans-serif`;
  const measured = context.measureText(WORDMARK).width;
  if (measured > targetWidth) {
    fontSize = Math.floor((fontSize * targetWidth) / measured);
    context.font = `800 ${fontSize}px Arial, sans-serif`;
  }
  context.fillText(WORDMARK, w / 2, h / 2 + fontSize * 0.03);
  const pixels = context.getImageData(0, 0, offscreen.width, offscreen.height).data;
  const step = Math.max(1, Math.floor(w / 700));
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
    if (pixels[(y * offscreen.width + x) * 4 + 3] > 128) points.push({ x, y });
  }
  for (let i = points.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [points[i], points[j]] = [points[j], points[i]];
  }
  return points;
}

type ParticleHeroProps = {
  settled?: boolean;
  onFormed?: () => void;
};

export default function ParticleHero({ settled = false, onFormed }: ParticleHeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const currentCanvas = canvasRef.current;
    if (!currentContainer || !currentCanvas) return;

    const currentContext = currentCanvas.getContext("2d");
    if (!currentContext) return;

    const container: HTMLDivElement = currentContainer;
    const canvas: HTMLCanvasElement = currentCanvas;
    const ctx: CanvasRenderingContext2D = currentContext;
    let w = 0, h = 0, particles: Particle[] = [], frame = 0;
    let transitionTimer: ReturnType<typeof setTimeout> | null = null;
    let autoAssemblyTimer: ReturnType<typeof setTimeout> | null = null;
    let resizeTimer: ReturnType<typeof setTimeout>;
    let state: AnimState = settled ? "active" : "idle", transitionStarted = 0, finePointer = false, isVisible = true;
    const mouse = { x: -99999, y: -99999, active: false };
    const previous = { x: -99999, y: -99999 };
    const smooth = { x: -99999, y: -99999 };
    let mouseSpeed = 0;

    function buildParticles(forceActive = false) {
      const desired = w < 768 ? 900 : 2200;
      particles = sampleWordmark(w, h).slice(0, desired).map((point) => {
        const [x, y] = forceActive ? [point.x, point.y] : randomPoint(w, h);
        const [targetX, targetY] = randomPoint(w, h);
        return { homeX: point.x, homeY: point.y, x, y, startX: x, startY: y, roamTargetX: targetX, roamTargetY: targetY, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2, repX: 0, repY: 0, inZone: false, char: Math.random() > 0.5 ? "1" : "0", size: w < 768 ? 5.4 : 6.4 };
      });
    }

    function resize() {
      w = container.clientWidth; h = container.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      buildParticles(state === "active");
    }

    function transition(next: "assembling" | "idle") {
      if (transitionTimer) clearTimeout(transitionTimer);
      if (autoAssemblyTimer) {
        clearTimeout(autoAssemblyTimer);
        autoAssemblyTimer = null;
      }
      for (const p of particles) {
        p.startX = p.x; p.startY = p.y;
        if (next === "idle") [p.roamTargetX, p.roamTargetY] = randomPoint(w, h);
      }
      state = next; transitionStarted = performance.now();
      transitionTimer = setTimeout(() => {
        state = next === "assembling" ? "active" : "idle";
        if (next === "assembling") onFormed?.();
      }, TRANSITION_MS);
    }

    function render() {
      frame = requestAnimationFrame(render);
      if (!isVisible || document.hidden) return;
      ctx.clearRect(0, 0, w, h);
      const progress = easeInOut(Math.min(1, (performance.now() - transitionStarted) / TRANSITION_MS));
      const hitSpeed = mouseSpeed; mouseSpeed *= 0.88;
      if (mouse.active) {
        const factor = Math.max(0.18, 0.42 - hitSpeed * 0.004);
        if (smooth.x < -9000) { smooth.x = mouse.x; smooth.y = mouse.y; }
        else { smooth.x += (mouse.x - smooth.x) * factor; smooth.y += (mouse.y - smooth.y) * factor; }
      } else { smooth.x = -99999; smooth.y = -99999; }

      ctx.font = `700 ${w < 768 ? 5.4 : 6.4}px 'JetBrains Mono', monospace`;
      ctx.fillStyle = `rgba(${PINK}, ${state === "idle" ? 0.5 : 0.92})`;

      for (const p of particles) {
        let baseX = p.homeX, baseY = p.homeY;
        if (state === "assembling") {
          baseX = p.startX + (p.homeX - p.startX) * progress;
          baseY = p.startY + (p.homeY - p.startY) * progress;
        } else if (state === "idle") {
          const dx = p.roamTargetX - p.x, dy = p.roamTargetY - p.y;
          if (Math.hypot(dx, dy) < 3) [p.roamTargetX, p.roamTargetY] = randomPoint(w, h);
          p.vx = p.vx * 0.98 + (p.roamTargetX - p.x) * 0.003;
          p.vy = p.vy * 0.98 + (p.roamTargetY - p.y) * 0.003;
          const speed = Math.hypot(p.vx, p.vy);
          if (speed > 1.5) { p.vx = p.vx / speed * 1.5; p.vy = p.vy / speed * 1.5; }
          baseX = p.x + p.vx; baseY = p.y + p.vy;
        }
        if (mouse.active) {
          const dx = baseX - mouse.x, dy = baseY - mouse.y, distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < REPULSION_RADIUS) {
            const nx = dx / distance, ny = dy / distance, falloff = 1 - distance / REPULSION_RADIUS;
            const push = falloff * (2 + hitSpeed) * REPULSION_FORCE * 0.035;
            p.repX += nx * push; p.repY += ny * push;
            p.repX += (nx * (REPULSION_RADIUS - distance) - p.repX) * REPULSION_APPROACH;
            p.repY += (ny * (REPULSION_RADIUS - distance) - p.repY) * REPULSION_APPROACH;
            p.inZone = true;
          } else p.inZone = false;
        } else p.inZone = false;
        if (!p.inZone) { p.repX *= 0.97; p.repY *= 0.97; }
        p.x = baseX + p.repX; p.y = baseY + p.repY;
        ctx.fillText(p.char, p.x, p.y);
      }
    }

    function pointerMove(event: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      const touchPointer = event.pointerType === "touch" || event.pointerType === "pen";
      if (!inside && !touchPointer) {
        if (mouse.active) pointerLeave();
        return;
      }
      const x = Math.max(0, Math.min(w, (event.clientX - rect.left) * (w / rect.width)));
      const y = Math.max(0, Math.min(h, (event.clientY - rect.top) * (h / rect.height)));
      if (previous.x > -9000) mouseSpeed = Math.hypot(x - previous.x, y - previous.y);
      previous.x = x; previous.y = y; mouse.x = x; mouse.y = y; mouse.active = true;
      if (state === "idle") transition("assembling");
    }
    function pointerLeave() {
      mouse.active = false; previous.x = -99999; previous.y = -99999;
    }
    function pointerDown(event: PointerEvent) {
      if (event.pointerType === "touch" || event.pointerType === "pen") {
        canvas.setPointerCapture(event.pointerId);
      }
      pointerMove(event);
    }
    function pointerUp(event: PointerEvent) {
      mouse.active = false; previous.x = -99999; previous.y = -99999;
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    }

    resize(); frame = requestAnimationFrame(render);
    if (!settled) {
      autoAssemblyTimer = setTimeout(() => {
        if (state === "idle") transition("assembling");
      }, AUTO_ASSEMBLY_DELAY_MS);
    }
    if (finePointer) window.addEventListener("pointermove", pointerMove, { passive: true });
    canvas.addEventListener("pointerdown", pointerDown);
    canvas.addEventListener("pointermove", pointerMove, { passive: true });
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
    const observer = new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 160); });
    observer.observe(container);
    const visibilityObserver = new IntersectionObserver(([entry]) => { isVisible = entry.isIntersecting; }, { threshold: 0 });
    visibilityObserver.observe(container);
    return () => {
      cancelAnimationFrame(frame); if (transitionTimer) clearTimeout(transitionTimer); if (autoAssemblyTimer) clearTimeout(autoAssemblyTimer); clearTimeout(resizeTimer); observer.disconnect(); visibilityObserver.disconnect();
      window.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerdown", pointerDown);
      canvas.removeEventListener("pointermove", pointerMove);
      canvas.removeEventListener("pointerup", pointerUp);
      canvas.removeEventListener("pointercancel", pointerUp);
    };
  }, []);

  return <div ref={containerRef} className={`particle-hero absolute inset-0 ${settled ? "is-settled" : ""}`}><canvas ref={canvasRef} className="block h-full w-full touch-none" aria-hidden="true" /></div>;
}
