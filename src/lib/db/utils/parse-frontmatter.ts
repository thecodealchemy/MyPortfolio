// Compatibility re-export for tests and other modules that import
// from '@/lib/db/utils/parse-frontmatter'. The actual implementation
// currently lives under v0 utils; re-export it here to keep imports stable.
export { parseFrontmatter } from "../v0/utils/parse-frontmatter";
