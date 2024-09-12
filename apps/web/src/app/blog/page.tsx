import Link from 'next/link';
import { getBlogPosts } from '@/app/db/blog';
import PageHeader from '@/components/page-header';
import Image from 'next/image';
import FilterSelectBox from '@/components/blog/filter-select-box';
import FilterList from '@/components/blog/filter-list';

export const metadata = {
  title: 'Blog | Hugo ChunHo Lin (1chooo) | Open Source Enthusiast',
  description: 'Read my thoughts on software development, design, and more.',
};

let blogTags: string[] = ['All'];

const POSTS_PER_PAGE = 4;

export default function BlogPage({ searchParams }: { searchParams: { tag?: string; page?: string } }) {
  let allBlogs = getBlogPosts();
  blogTags = ['All', ...Array.from(new Set(allBlogs.map(post => post.metadata.category ?? '')))];
  const selectedTag = searchParams.tag || 'All';
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Filter blogs based on the selected tag
  const filteredBlogs = selectedTag === 'All'
    ? allBlogs
    : allBlogs.filter(post => post.metadata.category === selectedTag);

  // Sort blogs by date
  const sortedBlogs = filteredBlogs.sort((a, b) => {
    if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
      return -1;
    }
    return 1;
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedBlogs.length / POSTS_PER_PAGE);

  // Get blogs for current page
  const paginatedBlogs = sortedBlogs.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <article>
      <PageHeader title="Hugo's Blog" />
      <section className="blog-posts">
        <FilterList selectedTag={selectedTag} blogTags={blogTags} />
        <FilterSelectBox selectedTag={selectedTag} blogTags={blogTags} />

        <ul className="blog-posts-list">
          {paginatedBlogs.map((post, index) => (
            <li
              key={index}
              className="blog-post-item active"
              data-category={post.metadata.category}
            >
              <Link href={`/blog/${post.slug}`} rel="noopener noreferrer">
                <figure className="blog-banner-box">
                  <Image
                    src={post.metadata.banner}
                    alt={post.metadata.alt || 'Blog post image'}
                    loading="lazy"
                    width={1600}
                    height={900}
                  />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.metadata.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.metadata.publishedAt}>
                      {new Date(post.metadata.publishedAt).toLocaleDateString()}
                    </time>
                  </div>
                  <h3 className="h3 blog-item-title">{post.metadata.title}</h3>
                  <p className="blog-text">{post.metadata.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <Link
              key={pageNum}
              href={{
                pathname: '/blog',
                query: { ...searchParams, page: pageNum.toString() },
              }}
              className={`pagination-btn ${pageNum === currentPage ? 'active' : ''}`}
            >
              {pageNum}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
