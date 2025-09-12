import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import PageHeader from "@/components/page-header";
import AboutHeader from "@/components/about/about-header";
import MarkdownRenderer from "@/components/markdown/markdown-renderer";
import config from "@/config";

const DynamicLatestArticles = dynamic(
  () => import("@/components/about/latest-articles"),
  {
    loading: () => <p>Loading latest articles...</p>,
  }
);

const DynamicLifeStyles = dynamic(
  () => import("@/components/about/life-styles"),
  {
    loading: () => <p>Loading life styles...</p>,
  }
);

const DynamicCodingStats = dynamic(
  () => import("@/components/about/coding-stats"),
  {
    loading: () => <p>Loading coding stats...</p>,
  }
);

const { about, title, description, author, keywords, openGraph, siteURL } =
  config;
const {
  firstName,
  lastName,
  preferredName,
  introduction,
  lifestyles,
  techStacks,
  githubUsername,
} = about;

export const metadata: Metadata = {
  title: title,
  description: description,
  authors: [{ name: author }],
  creator: author,
  keywords: keywords,
  openGraph: {
    url: openGraph.url,
    type: "website",
    siteName: openGraph.siteName,
    title: openGraph.title,
    description: openGraph.description,
    images: openGraph.images,
  },
  manifest: "/manifest.webmanifest",
  twitter: {
    card: "summary_large_image",
    title: "Open Source Enthusiast",
    description: description,
    images: openGraph.images,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/logo192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
};

const addJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Person",
      "@id": "${siteURL}#person",
      "givenName": ${firstName},
      "familyName": ${lastName},
      "additionalName": ${preferredName},
      "gender": "male",
      "birthPlace": "Gurugram, IN",
      "nationality": "India",
      "alumniOf":[
        {
          "@type": "CollegeOrUniversity",
          "name": "Indian Institute of Technology, Hyderabad",
          "sameAs": "https://www.iith.ac.in/"
        }
      ],
      "jobTitle": "Software Engineer",
      "skills": "Software Engineering, Web Development, Open Source",
      "image": "https://code-alchemy.netlify.app/images/profile.webp",
      "url": ${siteURL},
      "sameAs": [
        "https://www.linkedin.com/in/thecodealchemy/",
        "http://github.com/thecodealchemy",
      ]
    }
  `,
  };
};

async function About() {
  // Use projects defined in site config (resume.projects)
  const allProjects = config.resume?.projects || [];

  const selectedPosts = allProjects.map((post: any) => ({
    slug: post.slug,
    metadata: {
      ...post.metadata,
      category: post.metadata?.category || "Project",
    },
  }));

  let header = `About me 👨🏻‍💻`;

  return (
    <article>
      <Script
        id="application/ld+json"
        type="application/ld+json"
        dangerouslySetInnerHTML={addJsonLd()}
        key="1chooo-website-jsonld"
      />
      <PageHeader header={header} />
      <AboutHeader id="introduction" text="$ ls -al Self 👨🏻‍💻" />
      <MarkdownRenderer
        className="text-light-gray leading-relaxed"
        content={introduction}
      />
      <DynamicLatestArticles posts={selectedPosts} hrefBase="/portfolio" />
      <DynamicCodingStats
        techStacks={techStacks}
        githubUsername={githubUsername}
      />
      <DynamicLifeStyles lifestyles={lifestyles} />
    </article>
  );
}

export default About;
