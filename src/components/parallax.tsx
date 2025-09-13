"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

export function ParallaxContainer({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: ParallaxProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const getTransform = () => {
    const distance = speed * 100;
    switch (direction) {
      case "down":
        return useTransform(smoothProgress, [0, 1], [0, distance]);
      case "left":
        return useTransform(smoothProgress, [0, 1], [0, -distance]);
      case "right":
        return useTransform(smoothProgress, [0, 1], [0, distance]);
      default: // up
        return useTransform(smoothProgress, [0, 1], [0, -distance]);
    }
  };

  const transform = getTransform();

  const motionStyle =
    direction === "left" || direction === "right"
      ? { x: transform }
      : { y: transform };

  return (
    <motion.div ref={ref} style={motionStyle} className={className}>
      {children}
    </motion.div>
  );
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.3,
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}) {
  return (
    <ParallaxContainer speed={speed} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover scale-110"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.3 }}
      />
    </ParallaxContainer>
  );
}

export function ParallaxBackground({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.1, 0.3, 0.1]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255, 219, 77, 0.1) 0%, transparent 70%)",
          y: backgroundY,
          opacity: backgroundOpacity,
        }}
      />
      {children}
    </div>
  );
}

// Floating elements component
export function FloatingElements() {
  const { scrollY } = useScroll();

  const element1Y = useTransform(scrollY, [0, 1000], [0, -100]);
  const element2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const element3Y = useTransform(scrollY, [0, 1000], [0, -80]);

  const element1Rotate = useTransform(scrollY, [0, 1000], [0, 360]);
  const element2Rotate = useTransform(scrollY, [0, 1000], [0, -180]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {/* Floating circle 1 */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-orange-yellow-crayola/20 to-transparent rounded-full blur-xl"
        style={{
          y: element1Y,
          rotate: element1Rotate,
        }}
      />

      {/* Floating circle 2 */}
      <motion.div
        className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl"
        style={{
          y: element2Y,
          rotate: element2Rotate,
        }}
      />

      {/* Floating circle 3 */}
      <motion.div
        className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-purple-500/15 to-transparent rounded-full blur-lg"
        style={{
          y: element3Y,
        }}
      />

      {/* Grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 219, 77, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 219, 77, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          y: useTransform(scrollY, [0, 1000], [0, -50]),
        }}
      />
    </div>
  );
}
