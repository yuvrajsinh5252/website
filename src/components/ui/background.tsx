"use client";

import { useEffect, useState } from "react";
import { DynamicStars } from "@/components/effects/dynamic-stars";
import { MeteorShowerEffect } from "@/components/effects/meteor-shower";

export function Background() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => {
      clearTimeout(loadTimer);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background:
            "radial-gradient(ellipse at center, #0f0f23 0%, #000000 100%)",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 2s ease-in-out",
        }}
      />

      {/* Dynamic Stars layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 1s ease-in-out",
          zIndex: 2,
        }}
      >
        <DynamicStars
          starCount={25}
          className="absolute inset-0"
          opacity={0.9}
        />
      </div>

      {/* Meteor Shower layer */}
      {isLoaded && (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 3 }}>
          <MeteorShowerEffect
            className="absolute inset-0"
            meteorCount={4}
            meteorFrequency={{ min: 3000, max: 7000 }}
            maxSimultaneousMeteors={2}
          />
        </div>
      )}
    </div>
  );
}
