"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
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

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (active && panelRef.current) {
      panelRef.current.focus();
    }
  }, [active]);

  return (
    <div>
      {projects.length === 0 ? (
        <p className="pg-no-projects">No projects to display.</p>
      ) : (
        <ul className="pg-project-list" data-count={projects.length}>
          {projects.map((p) => (
            <li
              key={p.slug}
              className="pg-project-item"
              onClick={() => setActive(p)}
              tabIndex={0}
            >
              <figure className="pg-project-img">
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
              </figure>
              <h3 className="pg-project-title">{p.metadata.title}</h3>
              <p className="pg-project-category">{p.metadata.category}</p>
            </li>
          ))}
        </ul>
      )}

      {active &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className={`project-modal open`}
            aria-hidden={active ? "false" : "true"}
          >
            <div
              className="project-modal-backdrop"
              onClick={() => setActive(null)}
            />
            <div
              className="project-modal-panel"
              ref={panelRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
            >
              <button
                className="project-modal-close"
                onClick={() => setActive(null)}
              >
                ✕
              </button>
              <h2>{active.metadata.title}</h2>
              <p className="muted">{active.metadata.publishedAt}</p>
              <div className="project-summary">
                <MarkdownRenderer content={active.metadata.summary || ""} />
              </div>
              <div className="project-actions">
                {active.metadata.link && (
                  <a
                    href={active.metadata.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Visit <LuExternalLink className="inline-icon" />
                  </a>
                )}
                <button className="btn" onClick={() => setActive(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
