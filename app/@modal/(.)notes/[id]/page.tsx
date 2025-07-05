import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePreview({ params }: NoteDetailsProps) {
  const { id } = await params;
  const newId = Number(id);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", newId],
    queryFn: () => fetchNoteById(newId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={newId} />
    </HydrationBoundary>
  );
}
