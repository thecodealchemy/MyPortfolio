"use client";

import { motion } from "framer-motion";

interface EnhancedLoadingProps {
  type?: "skeleton" | "spinner" | "pulse" | "dots";
  text?: string;
  className?: string;
}

export default function EnhancedLoading({
  type = "skeleton",
  text = "Loading...",
  className = "",
}: EnhancedLoadingProps) {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  const skeletonVariants = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.3, 0.7, 0.3],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  if (type === "skeleton") {
    return (
      <motion.div
        className={`flex flex-col space-y-4 ${className}`}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-4"
            variants={skeletonVariants}
          >
            <div className="flex space-x-4">
              <motion.div
                className="w-20 h-20 bg-gray-600 rounded-lg"
                variants={skeletonVariants}
              />
              <div className="flex-1 space-y-2">
                <motion.div
                  className="h-4 bg-gray-600 rounded w-3/4"
                  variants={skeletonVariants}
                />
                <motion.div
                  className="h-3 bg-gray-600 rounded w-1/2"
                  variants={skeletonVariants}
                />
                <motion.div
                  className="h-3 bg-gray-600 rounded w-2/3"
                  variants={skeletonVariants}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  if (type === "spinner") {
    return (
      <motion.div
        className={`flex flex-col items-center justify-center py-12 ${className}`}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="w-12 h-12 border-4 border-gray-600 border-t-orange-yellow-crayola rounded-full"
          variants={spinnerVariants}
          animate="animate"
        />
        <motion.p
          className="mt-4 text-light-gray"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      </motion.div>
    );
  }

  if (type === "pulse") {
    return (
      <motion.div
        className={`flex items-center justify-center py-12 ${className}`}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.div
          className="w-16 h-16 bg-orange-yellow-crayola rounded-full"
          variants={pulseVariants}
          animate="animate"
        />
      </motion.div>
    );
  }

  if (type === "dots") {
    return (
      <motion.div
        className={`flex items-center justify-center space-x-2 py-12 ${className}`}
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-orange-yellow-crayola rounded-full"
            variants={dotVariants}
            animate="animate"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
        <motion.p
          className="ml-4 text-light-gray"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {text}
        </motion.p>
      </motion.div>
    );
  }

  return null;
}
