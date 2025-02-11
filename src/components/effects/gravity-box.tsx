"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

interface GravityBoxProps {
  children: React.ReactNode;
  isActive: boolean;
}

export const GravityBox = ({ children, isActive }: GravityBoxProps) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGravityActive, setIsGravityActive] = useState(false);

  useEffect(() => {
    if (
      !isActive ||
      !sceneRef.current ||
      !contentRef.current ||
      !containerRef.current ||
      isGravityActive
    )
      return;

    const containerBounds = containerRef.current.getBoundingClientRect();

    // Initialize engine with proper gravity
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.002 },
    });

    // Setup render with proper canvas sizing
    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: containerBounds.width,
        height: containerBounds.height,
        wireframes: false,
        background: "transparent",
        pixelRatio: window.devicePixelRatio,
      },
    });

    // Position canvas absolutely within container
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.width = "100%";
    render.canvas.style.height = "100%";

    const createPhysicsElement = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const physicsElement = document.createElement("div");
      const computedStyle = window.getComputedStyle(element);

      // Calculate position relative to container
      const relativeLeft = rect.left - containerBounds.left;
      const relativeTop = rect.top - containerBounds.top;

      Object.assign(physicsElement.style, {
        position: "absolute",
        left: "0",
        top: "0",
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        fontSize: computedStyle.fontSize,
        fontFamily: computedStyle.fontFamily,
        fontWeight: computedStyle.fontWeight,
        color: computedStyle.color,
        background: computedStyle.background,
        backgroundClip: computedStyle.backgroundClip,
        webkitBackgroundClip: computedStyle.webkitBackgroundClip,
        webkitTextFillColor: computedStyle.webkitTextFillColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `translate(${relativeLeft}px, ${relativeTop}px)`,
        pointerEvents: "none",
      });

      physicsElement.innerHTML = element.innerHTML;
      sceneRef.current?.appendChild(physicsElement);

      return {
        physicsElement,
        rect: {
          width: rect.width,
          height: rect.height,
          left: relativeLeft,
          top: relativeTop,
        },
      };
    };

    // Create walls with proper collision
    const wallOptions = { isStatic: true, render: { visible: false } };
    const walls = [
      Matter.Bodies.rectangle(
        containerBounds.width / 2,
        containerBounds.height + 30,
        containerBounds.width,
        60,
        wallOptions
      ),
      Matter.Bodies.rectangle(
        -30,
        containerBounds.height / 2,
        60,
        containerBounds.height,
        wallOptions
      ),
      Matter.Bodies.rectangle(
        containerBounds.width + 30,
        containerBounds.height / 2,
        60,
        containerBounds.height,
        wallOptions
      ),
    ];

    // Create bodies for text elements
    const elements = contentRef.current.querySelectorAll("h1, p, span");
    const bodies: Matter.Body[] = [];

    elements.forEach((element) => {
      const { physicsElement, rect } = createPhysicsElement(element);

      const body = Matter.Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          render: { visible: false },
          chamfer: { radius: 2 },
          density: 0.001,
          friction: 0.1,
          restitution: 0.3,
          slop: 0,
        }
      );

      (body as any).domElement = physicsElement;
      bodies.push(body);
    });

    // Improve render updates
    Matter.Events.on(render, "beforeRender", () => {
      bodies.forEach((body) => {
        const element = (body as any).domElement;
        if (element) {
          element.style.transform = `translate(${
            body.position.x - (body.bounds.max.x - body.bounds.min.x) / 2
          }px, ${
            body.position.y - (body.bounds.max.y - body.bounds.min.y) / 2
          }px) rotate(${body.angle}rad)`;
        }
      });
    });

    // Setup mouse control
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    render.mouse = mouse;

    // Add everything to world
    Matter.World.add(engine.world, [...walls, ...bodies, mouseConstraint]);

    // Run the engine
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    setIsGravityActive(true);

    // Cleanup
    return () => {
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      render.canvas.remove();
      if (sceneRef.current) {
        sceneRef.current.innerHTML = "";
      }
    };
  }, [isActive]);

  return (
    <div className="relative" ref={containerRef}>
      <div
        ref={sceneRef}
        className={`absolute inset-0 ${isActive ? "block" : "hidden"}`}
        style={{ overflow: "hidden" }}
      />
      <div ref={contentRef} className={isActive ? "invisible" : "visible"}>
        {children}
      </div>
    </div>
  );
};
