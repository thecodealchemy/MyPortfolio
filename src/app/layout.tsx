import type { Metadata } from "next";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { roboto } from "@/app/font";
import Hello from "@/components/hello";
import NavBar from "@/components/nav-bar";
import { ProgressBar } from "@/components/progress-bar";
import SideBar from "@/components/side-bar";
import { WebVitals } from "@/components/web-vitals";
import { FloatingElements } from "@/components/parallax";
import config from "@/config";

import "@/styles/globals.css";

const {
  title,
  description,
  author,
  keywords,
  googleAnalyticId,
  googleTagManagerId,
  openGraph,
  about,
  avatar,
} = config;

const { firstName, lastName, middleName, preferredName } = about;

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
    title: title,
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

function RootLayout({ children }: { readonly children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.className}`}>
      <WebVitals gaId={googleAnalyticId} />
      <body>
        <FloatingElements />
        <ProgressBar className="fixed top-0 h-1 bg-yellow-500">
          <Hello />
          <main>
            <SideBar
              avatar={avatar}
              firstName={firstName}
              lastName={lastName}
              middleName={middleName}
              preferredName={preferredName}
            />
            <div className="main-content">
              <NavBar />
              {children}
            </div>
          </main>
        </ProgressBar>
      </body>
      <GoogleAnalytics gaId={googleAnalyticId} />
      <GoogleTagManager gtmId={googleTagManagerId} />
    </html>
  );
}

export default RootLayout;
