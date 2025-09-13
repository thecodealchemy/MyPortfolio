import { Suspense } from "react";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PageHeader from "@/components/page-header";
import EnhancedLoading from "@/components/enhanced-loading";
import FilterSelectBox from "@/components/filter/filter-select-box";
import FilterList from "@/components/filter/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import { POSTS_PER_PAGE } from "@/lib/constants";
import { getBlogPosts } from "@/lib/db/v1/post";
import config from "@/config";

const { title } = config;

export const metadata = {
  title: `Post | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

type BlogQueryParams = Promise<{ tag?: string; page?: string }>;

async function BlogPosts({ searchParams }: { searchParams: BlogQueryParams }) {
  const { tag = "All", page = "1" } = await searchParams;
  let allBlogs = await getBlogPosts();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const blogTags = [
    "All",
    ...Array.from(
      new Set(allBlogs.map((post) => post.metadata.category ?? ""))
    ),
  ];
  const selectedTag = tag;
  const currentPage = parseInt(page, 10);

  // Filter blogs based on the selected tag
  const filteredBlogs =
    selectedTag === "All"
      ? allBlogs
      : allBlogs.filter((post) => post.metadata.category === selectedTag);

  // Calculate total pages
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);

  // Get blogs for current page
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

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
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="blog-posts" ref={ref}>
      <FilterList path="post" selectedTag={selectedTag} blogTags={blogTags} />
      <FilterSelectBox
        path="post"
        selectedTag={selectedTag}
        blogTags={blogTags}
      />
      <motion.ul
        className="blog-posts-list"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {paginatedBlogs.map((post, index) => (
          <motion.li
            key={post.slug}
            className="blog-post-item active"
            data-category={post.metadata.category}
            variants={itemVariants}
            whileHover={{
              scale: 1.02,
              y: -8,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
          >
            <ProgressBarLink
              href={`/post/${post.slug}`}
              rel="noopener noreferrer"
            >
              <motion.figure
                className="blog-banner-box"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={post.metadata.banner}
                  alt={post.metadata.alt || "Blog post image"}
                  width={1600}
                  height={900}
                  priority={false}
                  placeholder="blur"
                  loading="eager"
                  blurDataURL="https://docs.1chooo.com/images/cover-with-1chooo-com.png"
                />
              </motion.figure>
              <div className="blog-content">
                <motion.div
                  className="blog-meta"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="blog-category">{post.metadata.category}</p>
                  <span className="dot"></span>
                  <time dateTime={post.metadata.publishedAt}>
                    {new Date(post.metadata.publishedAt).toLocaleDateString(
                      "en-us",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </time>
                </motion.div>
                <motion.h3
                  className="text-2xl text-white-2 font-semibold leading-[1.3] transition-all hover:text-orange-yellow-crayola"
                  whileHover={{
                    x: 5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <Balancer>
                    <MarkdownRenderer content={post.metadata.title} />
                  </Balancer>
                </motion.h3>
                <MarkdownRenderer
                  className="text-light-gray text-s font-light leading-6 overflow-hidden line-clamp-2"
                  content={post.metadata.summary}
                />
              </div>
            </ProgressBarLink>
          </motion.li>
        ))}
      </motion.ul>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          selectedTag={selectedTag}
          basePath="/post"
        />
      </motion.div>
    </section>
  );
}

export default function Post({
  searchParams,
}: {
  searchParams: BlogQueryParams;
}) {
  return (
    <article>
      <PageHeader header="Hugo's Blog" />
      <Suspense
        fallback={<EnhancedLoading type="skeleton" text="Loading posts..." />}
      >
        <BlogPosts searchParams={searchParams} />
      </Suspense>
    </article>
  );
}
