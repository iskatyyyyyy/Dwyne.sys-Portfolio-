"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// Blurred mesh-gradient orbs
const BLOB_FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
varying vec2 v_texCoord;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p = p * 2.03 + vec2(1.7, 9.2);
        a *= 0.5;
    }
    return v;
}

// Soft Gaussian orb: smooth falloff so shapes melt into each other
vec3 orb(vec2 uv, vec2 c, vec3 col, float r, float intensity) {
    float d = distance(uv, c) / r;
    return col * exp(-d * d * 3.0) * intensity;
}

void main() {
    vec2 uv = v_texCoord;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 auv = uv * vec2(aspect, 1.0);
    vec2 amouse = u_mouse / u_resolution * vec2(aspect, 1.0);
    float t = u_time * 1.35;

    // Deep midnight slate base
    vec3 base = vec3(0.039, 0.055, 0.09);
    // Mesh palette (kept muted so text stays legible)
    vec3 indigo = vec3(0.263, 0.220, 0.792);
    vec3 teal = vec3(0.055, 0.455, 0.565);
    vec3 violet = vec3(0.345, 0.110, 0.529);
    vec3 accent = vec3(0.176, 0.831, 0.749);

    // Whole field leans gently toward the cursor (already eased in JS)
    vec2 p = auv + (amouse - auv) * 0.03;

    // Fast, strong morphing warp field: blobs twist and deform on their own
    vec2 warp = vec2(
        fbm(p * 2.6 + vec2(t * 0.55, -t * 0.42)),
        fbm(p * 2.6 + vec2(-t * 0.38, t * 0.48) + 11.3)
    );
    vec2 q = p + (warp - 0.5) * 0.24;

    // Six large orbs: bigger, faster, wider range of motion
    vec2 c1 = vec2(0.28, 0.32) * vec2(aspect, 1.0) + vec2(sin(t * 1.15 + 1.2), cos(t * 1.30 + 0.6)) * 0.27;
    vec2 c2 = vec2(0.75, 0.30) * vec2(aspect, 1.0) + vec2(cos(t * 0.95 + 2.1), sin(t * 1.20 + 1.4)) * 0.29;
    vec2 c3 = vec2(0.55, 0.75) * vec2(aspect, 1.0) + vec2(sin(t * 1.05 + 0.3), cos(t * 0.90 + 2.6)) * 0.27;
    vec2 c4 = vec2(0.15, 0.72) * vec2(aspect, 1.0) + vec2(cos(t * 1.22 + 3.4), sin(t * 1.02 + 1.1)) * 0.25;
    vec2 c5 = vec2(0.88, 0.70) * vec2(aspect, 1.0) + vec2(sin(t * 0.98 + 4.2), cos(t * 1.10 + 2.2)) * 0.27;
    vec2 c6 = vec2(0.45, 0.48) * vec2(aspect, 1.0) + vec2(cos(t * 0.90 + 5.0), sin(t * 1.18 + 0.9)) * 0.24;

    // Orbs near the cursor are gently pulled toward it
    c1 += (amouse - c1) * 0.20 * (1.0 - smoothstep(0.12, 0.6, distance(amouse, c1)));
    c2 += (amouse - c2) * 0.18 * (1.0 - smoothstep(0.12, 0.6, distance(amouse, c2)));
    c3 += (amouse - c3) * 0.18 * (1.0 - smoothstep(0.12, 0.6, distance(amouse, c3)));
    c4 += (amouse - c4) * 0.20 * (1.0 - smoothstep(0.12, 0.6, distance(amouse, c4)));
    c5 += (amouse - c5) * 0.18 * (1.0 - smoothstep(0.12, 0.6, distance(amouse, c5)));
    c6 += (amouse - c6) * 0.18 * (1.0 - smoothstep(0.12, 0.6, distance(amouse, c6)));

    // The nearest orb glides most strongly toward the cursor
    float d1 = distance(amouse, c1);
    float d2 = distance(amouse, c2);
    float d3 = distance(amouse, c3);
    float d4 = distance(amouse, c4);
    float d5 = distance(amouse, c5);
    float d6 = distance(amouse, c6);
    float nearest = min(min(min(d1, d2), min(d3, d4)), min(d5, d6));
    c1 += (amouse - c1) * 0.25 * exp(-pow((d1 - nearest) * 3.0, 2.0));
    c2 += (amouse - c2) * 0.25 * exp(-pow((d2 - nearest) * 3.0, 2.0));
    c3 += (amouse - c3) * 0.25 * exp(-pow((d3 - nearest) * 3.0, 2.0));
    c4 += (amouse - c4) * 0.25 * exp(-pow((d4 - nearest) * 3.0, 2.0));
    c5 += (amouse - c5) * 0.25 * exp(-pow((d5 - nearest) * 3.0, 2.0));
    c6 += (amouse - c6) * 0.25 * exp(-pow((d6 - nearest) * 3.0, 2.0));

    // Larger, livelier breathing radii for a living mesh
    float r1 = 0.55 + sin(t * 1.30 + 0.4) * 0.12;
    float r2 = 0.52 + cos(t * 1.05 + 1.8) * 0.12;
    float r3 = 0.58 + sin(t * 1.15 + 2.9) * 0.14;
    float r4 = 0.50 + cos(t * 1.40 + 0.2) * 0.10;
    float r5 = 0.54 + sin(t * 1.00 + 3.7) * 0.12;
    float r6 = 0.48 + cos(t * 1.22 + 4.4) * 0.10;

    vec3 col = base;
    col += orb(q, c1, indigo, r1, 0.24);
    col += orb(q, c2, teal, r2, 0.22);
    col += orb(q, c3, violet, r3, 0.23);
    col += orb(q, c4, teal, r4, 0.21);
    col += orb(q, c5, indigo, r5, 0.23);
    col += orb(q, c6, violet, r6, 0.21);

    // Faint accent sheen near the cursor (the dot grid carries the glow)
    col += accent * exp(-pow(distance(q, amouse) * 2.5, 2.0)) * 0.03;

    // Gentle vignette keeps edges calm while the blobs stay upfront
    col *= 0.92 + 0.08 * (1.0 - length(auv - vec2(0.5 * aspect, 0.5)) * 0.8);

    // Subtle dithering prevents banding in large gradients
    col += (hash(gl_FragCoord.xy) - 0.5) * 0.01;

    gl_FragColor = vec4(col, 1.0);
}`;

// Dot grid with magnetic cursor pull (separate, unblurred canvas)
const DOT_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 u_mouse;
uniform float u_pull;
varying vec2 v_texCoord;

void main() {
    float gap = 20.0;
    float pullRadius = 240.0;
    float pullStrength = 0.6;

    // Inverse-space sampling: shift the sampling coordinate away from the cursor
    // by a falloff-weighted amount, so the dots themselves get pulled toward it.
    // u_pull eases to 0 when the cursor leaves the window, reverting to the grid.
    vec2 p = gl_FragCoord.xy;
    vec2 toMouse = u_mouse - p;
    float dist = length(toMouse);
    float falloff = exp(-pow(dist / (pullRadius * 0.5), 2.0));
    vec2 q = p - toMouse * (pullStrength * falloff * u_pull);

    // Fine grid of tiny dots laid out in screen-pixel space
    vec2 g = q / gap;
    vec2 gfrac = fract(g) - 0.5;

    // Hard-edged dot: crisp and tiny, no soft falloff
    float dotMask = 1.0 - step(0.06, length(gfrac));

    // Light-up that fades with distance from the cursor
    vec2 dotCenter = (floor(g) + 0.5) * gap;
    float distToCursor = distance(dotCenter, u_mouse);
    float cursorGlow = exp(-pow(distToCursor / 170.0, 2.0));

    // Base: muted slate blue at ~12%; light-up: cyan/emerald accent
    vec3 baseDot = vec3(0.45, 0.55, 0.70);
    vec3 glowDot = vec3(0.18, 0.83, 0.75);
    vec3 dotCol = mix(baseDot, glowDot, cursorGlow * 0.9);

    float alpha = (0.12 + cursorGlow * 0.5) * dotMask;

    // Premultiplied alpha output for a transparent canvas
    gl_FragColor = vec4(dotCol * alpha, alpha);
}`;

export default function ShaderBackground({ resetSignal = 0 }: { resetSignal?: number }) {
  const blobRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLCanvasElement>(null);
  const resetRef = useRef<() => void>(() => {});

  useEffect(() => {
    const blobCanvas = blobRef.current;
    const dotCanvas = dotRef.current;
    if (!blobCanvas || !dotCanvas) return;

    const getGL = (canvas: HTMLCanvasElement) =>
      (canvas.getContext("webgl") as WebGLRenderingContext | null) ??
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    const blobGl = getGL(blobCanvas);
    const dotGl = getGL(dotCanvas);
    if (!blobGl || !dotGl) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let mouseSet = false;
    let targetMouse = { x: blobCanvas.width / 2, y: blobCanvas.height / 2 };
    const mouse = { ...targetMouse };
    let rafId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let lastT = 0;
    let timeBase = 0;
    let hasTime = false;

    const syncSize = () => {
      for (const canvas of [blobCanvas, dotCanvas]) {
        const w = canvas.clientWidth || 1280;
        const h = canvas.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
      }
      if (!mouseSet) {
        targetMouse = { x: blobCanvas.width / 2, y: blobCanvas.height / 2 };
        mouse.x = targetMouse.x;
        mouse.y = targetMouse.y;
      }
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(syncSize);
      resizeObserver.observe(blobCanvas);
      resizeObserver.observe(dotCanvas);
    }
    syncSize();

    const compileShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const setup = (gl: WebGLRenderingContext, fragSource: string) => {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragSource);
      if (!vs || !fs) return null;
      const program = gl.createProgram();
      if (!program) return null;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

      return {
        program,
        uTime: gl.getUniformLocation(program, "u_time"),
        uRes: gl.getUniformLocation(program, "u_resolution"),
        uMouse: gl.getUniformLocation(program, "u_mouse"),
        uPull: gl.getUniformLocation(program, "u_pull"),
      };
    };

    const blob = setup(blobGl, BLOB_FRAGMENT_SHADER);
    const dots = setup(dotGl, DOT_FRAGMENT_SHADER);
    if (!blob || !dots) return;

    // Magnetic pull strength: eases to 0 when the cursor leaves the window so the
    // dot grid relaxes back into its perfect layout, and back to 1 on re-entry.
    let pull = 0;
    let pullTarget = 0;

    // Reboot reset: zeroes the clock, mouse, and pull so everything restarts fresh
    const reset = () => {
      pull = 0;
      pullTarget = 0;
      mouseSet = false;
      targetMouse = { x: blobCanvas.width / 2, y: blobCanvas.height / 2 };
      mouse.x = targetMouse.x;
      mouse.y = targetMouse.y;
      if (hasTime) timeBase = lastT;
    };
    resetRef.current = reset;

    const onMouseMove = (event: MouseEvent) => {
      const rect = blobCanvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1 - (event.clientY - rect.top) / rect.height;
        targetMouse = { x: nx * blobCanvas.width, y: ny * blobCanvas.height };
        mouseSet = true;
        pullTarget = 1;
      }
    };
    const onMouseLeave = () => {
      pullTarget = 0;
    };
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("blur", onMouseLeave);

    const render = (t: number) => {
      if (typeof ResizeObserver === "undefined") syncSize();

      lastT = t;
      hasTime = true;
      const elapsed = (t - timeBase) * 0.001;

      // Eased mouse makes both layers glide and fade smoothly
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;
      pull += (pullTarget - pull) * 0.06;

      blobGl.viewport(0, 0, blobCanvas.width, blobCanvas.height);
      if (blob.uTime) blobGl.uniform1f(blob.uTime, elapsed);
      if (blob.uRes) blobGl.uniform2f(blob.uRes, blobCanvas.width, blobCanvas.height);
      if (blob.uMouse) blobGl.uniform2f(blob.uMouse, mouse.x, mouse.y);
      blobGl.drawArrays(blobGl.TRIANGLE_STRIP, 0, 4);

      dotGl.viewport(0, 0, dotCanvas.width, dotCanvas.height);
      if (dots.uRes) dotGl.uniform2f(dots.uRes, dotCanvas.width, dotCanvas.height);
      if (dots.uMouse) dotGl.uniform2f(dots.uMouse, mouse.x, mouse.y);
      if (dots.uPull) dotGl.uniform1f(dots.uPull, pull);
      dotGl.drawArrays(dotGl.TRIANGLE_STRIP, 0, 4);

      if (!reduceMotion) rafId = requestAnimationFrame(render);
    };
    render(0);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("blur", onMouseLeave);
      resizeObserver?.disconnect();
    };
  }, []);

  useEffect(() => {
    resetRef.current();
  }, [resetSignal]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none" aria-hidden="true">
      <div className="fixed inset-0 w-full h-full" style={{ display: "block" }}>
        <canvas
          ref={blobRef}
          style={{ display: "block", width: "100%", height: "100%", filter: "blur(24px)" }}
        />
      </div>
      <div className="fixed inset-0 w-full h-full" style={{ display: "block" }}>
        <canvas
          ref={dotRef}
          style={{ display: "block", width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
}
