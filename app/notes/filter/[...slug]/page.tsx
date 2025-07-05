import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: NotesProps) {
  const { slug } = await params;
  return {
    title: `Notes type: ${slug}`,
    description: "Here is the note type described",
    openGraph: {
      title: `Notes type: ${slug}`,
      description: "Here is the note type described",
      url: `https://07-routing-nextjs-ochre.vercel.app/filter/${slug}`,
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
      title: `Notes type: ${slug}`,
      description: "Here is the note type described",
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

export default async function Notes({ params }: NotesProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();
  const tag = slug[0] === "All" ? "" : slug[0];
  const res = await fetchNotes({ page: 1, search: "", tag });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialData={res} tag={tag} />
    </HydrationBoundary>
  );
}
