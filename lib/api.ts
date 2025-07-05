import axios from "axios";
import { type Note } from "../types/note";

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes({
  page = 1,
  search,
  tag,
}: FetchNotesParams): Promise<NoteResponse> {
  const params: FetchNotesParams = { page, perPage: 12 };
  if (search) params.search = search;
  if (tag) params.tag = tag;
  const res = await axios.get<NoteResponse>("/notes", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return {
    notes: res.data.notes ?? [],
    totalPages: res.data.totalPages ?? 1,
  };
}

export async function createNote(noteData: {
  title: string;
  content?: string;
  tag: string;
}) {
  const res = await axios.post<Note>("/notes/", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function deleteNote(id: number) {
  const res = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}

export async function fetchNoteById(id: number) {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
}
