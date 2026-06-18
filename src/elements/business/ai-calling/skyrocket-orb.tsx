"use client";

import { useEffect, useRef } from "react";

export default function AiOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let animId: number;
    let THREE: typeof import("three");

    import("three").then((mod) => {
      THREE = mod;
      const cv = canvasRef.current;
      if (!cv) return;

      const renderer = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

      const scene = new THREE.Scene();
      const cam = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
      cam.position.z = 3.4;

      const group = new THREE.Group();
      scene.add(group);

      const N = 620;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(N * 3);
      for (let i = 0; i < N; i++) {
        const phi = Math.acos(2 * Math.random() - 1);
        const th = 2 * Math.PI * Math.random();
        const r = 1.35;
        pos[i * 3] = r * Math.sin(phi) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(th);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      group.add(new THREE.Points(geo, new THREE.PointsMaterial({ size: 0.04, color: 0x2ba8ff, transparent: true, opacity: 0.95 })));
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.35, 26, 20), new THREE.MeshBasicMaterial({ color: 0x2670ff, wireframe: true, transparent: true, opacity: 0.13 })));
      group.add(new THREE.Mesh(new THREE.SphereGeometry(0.92, 24, 18), new THREE.MeshBasicMaterial({ color: 0x6d5bf5, transparent: true, opacity: 0.10 })));

      let mx = 0, my = 0;
      cv.addEventListener("mousemove", (e) => {
        const r = cv.getBoundingClientRect();
        mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
        my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      });
      cv.addEventListener("mouseleave", () => { mx = 0; my = 0; });

      function size() {
        const r = cv!.getBoundingClientRect();
        if (r.width) {
          renderer.setSize(r.width, r.height, false);
          cam.aspect = r.width / r.height;
          cam.updateProjectionMatrix();
        }
      }
      size();
      window.addEventListener("resize", size);

      const loop = () => {
        group.rotation.y += 0.004;
        group.rotation.x += ((my * 0.55) - group.rotation.x) * 0.05;
        group.rotation.z += ((mx * 0.25) - group.rotation.z) * 0.05;
        renderer.render(scene, cam);
        animId = requestAnimationFrame(loop);
      };
      loop();

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", size);
        renderer.dispose();
      };
    });

    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
