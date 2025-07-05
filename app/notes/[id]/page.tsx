import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteDetailsProps) {
  const { id } = await params;
  const newId = Number(id);
  const note = await fetchNoteById(newId);
  return {
    title: `Notes: ${note.title}`,
    description: note.content.slice(0, 30),
    openGraph: {
      title: `Notes: ${note.title}`,
      description: note.content.slice(0, 30),
      url: `https://07-routing-nextjs-ochre.vercel.app/notes/${id}`,
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
      title: `Notes: ${note.title}`,
      description: note.content.slice(0, 30),
      images: ["https://ac.goit.global/fullstack/react/og-meta.jpg"],
    },
  };
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const newId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", newId],
    queryFn: () => fetchNoteById(newId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
