"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import { sendGTMEvent } from "@next/third-parties/google";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";
import { ProgressBarLink } from "@/components/progress-bar";
import AboutHeader from "@/components/about/about-header";

import { cn } from "@/lib/utils";
import { LuEye } from "react-icons/lu";
import { ArrowRightIcon } from "@primer/octicons-react";

import "@/styles/about/latest-posts.css";

type Post = {
  slug: string;
  metadata: {
    banner: string;
    alt?: string;
    title: string;
    category?: string;
    publishedAt: string;
  };
};

const handleSeeMorePostsClick = () => {
  console.log("See More Posts button clicked!");
  sendGTMEvent({
    event: "seeMorePostsClicked",
    value: process.env.NEXT_PUBLIC_GTM_ID,
  });
};

interface LatestArticlesProps {
  posts: Post[];
  hrefBase?: string; // e.g. '/post' or '/portfolio'
}

function LatestArticles({ posts, hrefBase = "/post" }: LatestArticlesProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setVisiblePosts(isMobile ? posts.slice(0, 2) : posts.slice(0, 3));
    }
  }, [isMounted, isMobile, posts]);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  return (
    <section>
      <AboutHeader id="latest-articles" text="$ ls -al Latest Projects" />
      <ul className="latest-post-list">
        {visiblePosts.map((post) => (
          <li
            key={post.slug}
            className="latest-post-item group active"
            data-category={post.metadata.category}
          >
            <ProgressBarLink
              href={`${hrefBase}`}
              rel="noopener noreferrer"
            >
              <figure className="latest-post-img">
                <div className="absolute latest-post-item-icon-box text-orange-yellow-crayola text-xl bg-jet p-[18px] rounded-xl top-1/2 left-1/2 transition-all duration-250 ease-linear">
                  <LuEye />
                </div>
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || "Blog post image"}
                  width={1600}
                  height={900}
                  priority
                  quality={50}
                  placeholder="empty"
                  loading="eager"
                />
              </figure>
              <h3 className="ml-[10px] text-white-2 text-base font-normal capitalize leading-[1.3] group-hover:text-orange-yellow-crayola group-hover:font-bold">
                <MarkdownRenderer content={post.metadata.title} />
              </h3>
            </ProgressBarLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LatestArticles;
