import Image from "next/image";
import PageHeader from "@/components/page-header";
import FilterSelectBox from "@/components/filter/filter-select-box";
import FilterList from "@/components/filter/filter-list";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import Pagination from "@/components/pagination";
import { ProgressBarLink } from "@/components/progress-bar";
import ProjectGrid from "@/components/portfolio/project-grid";
import config from "@/config";
import { LuEye } from "react-icons/lu";

const { title } = config;
const POSTS_PER_PAGE = 9;

export const metadata = {
  title: `Portfolio | ${title}`,
  description: "Read my thoughts on software development, design, and more.",
};

type PortfolioQueryParams = Promise<{ tag?: string; page?: string }>;

export default async function Portfolio({
  searchParams,
}: {
  searchParams: PortfolioQueryParams;
}) {
  const { tag = "All", page = "1" } = await searchParams;

  const allPortfolioPosts = (config.resume.projects || []).map((p) => ({
    ...p,
  }));

  const blogTags = [
    "All",
    ...Array.from(
      new Set(allPortfolioPosts.map((post) => post.metadata.category ?? ""))
    ),
  ];
  const selectedTag = tag;
  const currentPage = parseInt(page, 10);

  // Filter blogs based on the selected tag
  const filteredPortfolioPosts =
    selectedTag === "All"
      ? allPortfolioPosts
      : allPortfolioPosts.filter(
          (post) => post.metadata.category === selectedTag
        );

  // Calculate total pages
  const totalPages = Math.ceil(filteredPortfolioPosts.length / POSTS_PER_PAGE);

  // Get blogs for current page
  const paginatedPortfolioPosts = filteredPortfolioPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <article>
      <PageHeader header="Portfolio" />
      <section className="projects">
        <FilterList
          path="portfolio"
          selectedTag={selectedTag}
          blogTags={blogTags}
        />
        <FilterSelectBox
          path="portfolio"
          selectedTag={selectedTag}
          blogTags={blogTags}
        />
        <ProjectGrid projects={paginatedPortfolioPosts} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          selectedTag={selectedTag}
          basePath="/portfolio"
        />
      </section>
    </article>
  );
}
