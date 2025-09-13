"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { LuExternalLink } from "react-icons/lu";
import { ProgressBarLink } from "@/components/progress-bar";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import "@/styles/portfolio/project-grid.css";

type Project = {
  slug: string;
  metadata: {
    title: string;
    publishedAt: string;
    summary?: string;
    category?: string;
    banner?: string;
    alt?: string;
    link?: string;
  };
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const panelRef = useRef<HTMLDivElement | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    if (active && panelRef.current) {
      panelRef.current.focus();
    }
  }, [active]);

  return (
    <div ref={ref}>
      {projects.length === 0 ? (
        <motion.p
          className="pg-no-projects"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          No projects to display.
        </motion.p>
      ) : (
        <motion.ul
          className="pg-project-list"
          data-count={projects.length}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((p, index) => (
            <motion.li
              key={p.slug}
              className="pg-project-item"
              variants={itemVariants}
              onClick={() => setActive(p)}
              tabIndex={0}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                cursor: "pointer",
              }}
            >
              <motion.figure
                className="pg-project-img"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                {p.metadata.banner ? (
                  <Image
                    src={p.metadata.banner}
                    alt={p.metadata.alt || p.metadata.title}
                    width={960}
                    height={540}
                    quality={50}
                  />
                ) : (
                  <div className="pg-project-placeholder" />
                )}
              </motion.figure>
              <motion.h3
                className="pg-project-title"
                whileHover={{
                  color: "#ffdb4d",
                  transition: { duration: 0.2 },
                }}
              >
                {p.metadata.title}
              </motion.h3>
              <p className="pg-project-category">{p.metadata.category}</p>
            </motion.li>
          ))}
        </motion.ul>
      )}

      <AnimatePresence>
        {active && typeof document !== "undefined" && (
          <motion.div
            className={`project-modal open`}
            aria-hidden={active ? "false" : "true"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="project-modal-backdrop"
              onClick={() => setActive(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="project-modal-panel"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="project-modal-close"
                onClick={() => setActive(null)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {active.metadata.title}
              </motion.h2>
              <motion.p
                className="muted"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3 }}
              >
                {active.metadata.publishedAt}
              </motion.p>
              <motion.div
                className="project-summary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <MarkdownRenderer content={active.metadata.summary || ""} />
              </motion.div>
              <motion.div
                className="project-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                {active.metadata.link && (
                  <motion.a
                    href={active.metadata.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit <LuExternalLink className="inline-icon" />
                  </motion.a>
                )}
                <motion.button
                  className="btn"
                  onClick={() => setActive(null)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
