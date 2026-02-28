"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  type: "star" | "dot" | "diamond";
  opacity: number;
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function BackgroundSparkles({ count = 35 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const types: Particle["type"][] = ["star", "dot", "diamond"];
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: randomBetween(0, 100),
      y: randomBetween(0, 100),
      size: randomBetween(3, 8),
      duration: randomBetween(12, 28),
      delay: randomBetween(0, 15),
      drift: randomBetween(-40, 40),
      type: types[Math.floor(Math.random() * types.length)],
      opacity: randomBetween(0.15, 0.5),
    }));
    setParticles(generated);
  }, [count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute sparkle-particle"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            opacity: 0,
          }}
        >
          {p.type === "star" && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-purple-300" style={{ opacity: p.opacity }} width={p.size} height={p.size}>
              <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.9L16.18 20 12 16.27 7.82 20l1.09-6.83L3.82 9.27l6.09-1.01z" />
            </svg>
          )}
          {p.type === "dot" && (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: `rgba(196, 181, 253, ${p.opacity})`,
              }}
            />
          )}
          {p.type === "diamond" && (
            <div
              className="rotate-45"
              style={{
                width: p.size * 0.7,
                height: p.size * 0.7,
                background: `rgba(244, 114, 182, ${p.opacity})`,
                borderRadius: 1,
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
