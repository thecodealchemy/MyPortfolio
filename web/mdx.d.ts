declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types'
  export default function MDX(props: MDXProps): JSX.Element
}
