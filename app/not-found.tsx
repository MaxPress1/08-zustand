import css from "./page.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not found",

  openGraph: {
    title: "Page not found",
    description: "This page is not found",
    url: `https://07-routing-nextjs-ochre.vercel.app/`,
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page not found",
    description: "This page is not found",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
