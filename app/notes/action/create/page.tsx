import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create new note",
  description: "New note is created here",
  openGraph: {
    title: "Create new note",
    description: "New note is created here",
    url: `https://07-routing-nextjs-ochre.vercel.app/notes/action/create`,
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
    title: "Create new note",
    description: "New note is created here",
    images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
