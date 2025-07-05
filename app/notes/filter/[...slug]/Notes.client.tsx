"use client";

import NoteList from "@/components/NoteList/NoteList";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import { useDebounce } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import css from "./page.module.css";
import { fetchNotes, NoteResponse } from "@/lib/api";
import Loading from "../../../loading";
import Error from "./error";
import Link from "next/link";

interface NotesClientProps {
  initialData?: NoteResponse;
  tag: string;
}

export default function NotesClient({ initialData, tag }: NotesClientProps) {
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const [debouncedSearchText] = useDebounce(searchText, 300);

  const trimmedSearch = debouncedSearchText.trim();

  const { data, isLoading, isSuccess, isError, error, isFetching } = useQuery({
    queryKey: ["notes", page, trimmedSearch, tag],
    queryFn: () => fetchNotes({ page, search: trimmedSearch, tag }),
    placeholderData: keepPreviousData,
    initialData: () => initialData,
  });

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox
          value={searchText}
          onChange={(value: string) => {
            setSearchText(value);
            setPage(1);
          }}
        />

        {isSuccess && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}
        <Link className={css.button} href={`/notes/action/create`}>
          Create note +
        </Link>
      </div>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {(isLoading || isFetching) && <Loading />}
      {isError && <Error error={error!} />}
    </div>
  );
}
