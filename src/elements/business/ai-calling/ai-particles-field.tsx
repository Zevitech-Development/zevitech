"use client";

import { useEffect, useRef } from "react";

export default function AiParticlesField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 820) return;

    let animId: number;

    import("three").then((THREE) => {
      const cv = canvasRef.current;
      if (!cv) return;

      const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      cam.position.z = 18;

      const N = 650;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N * 3; i++) pos[i] = (Math.random() - 0.5) * 42;
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const pts = new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.07, color: 0x6d5bf5, transparent: true, opacity: 0.28 }));
      scene.add(pts);

      let mx = 0, my = 0;
      const onMouse = (e: MouseEvent) => {
        mx = e.clientX / window.innerWidth - 0.5;
        my = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("mousemove", onMouse);

      const onResize = () => {
        cam.aspect = window.innerWidth / window.innerHeight;
        cam.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const loop = () => {
        pts.rotation.y += 0.0004;
        pts.rotation.x += 0.0002;
        cam.position.x += (mx * 4 - cam.position.x) * 0.03;
        cam.position.y += (-my * 4 - cam.position.y) * 0.03;
        cam.lookAt(0, 0, 0);
        renderer.render(scene, cam);
        animId = requestAnimationFrame(loop);
      };
      loop();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("mousemove", onMouse);
        window.removeEventListener("resize", onResize);
        renderer.dispose();
      };
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-55"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
