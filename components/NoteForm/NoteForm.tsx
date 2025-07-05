"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { NewNoteData, Tag } from "@/types/note";
import { useNoteDraft } from "@/lib/store/noteDraftStore";
import { ChangeEvent } from "react";

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraft();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onClose();
    },
    onError: () => {
      "Failed to create note. Please try again.";
    },
  });

  const handleCreate = (formData: FormData) => {
    const newNote: NewNoteData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as Tag,
    };
    mutate(newNote);
  };

  const onClose = () => router.back();

  const handleChange = ({
    target: { value, name },
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setDraft({ ...draft, [name]: value });
  };

  return (
    <>
      <form className={css.form} action={handleCreate}>
        <label className={css.label}>
          Title
          <input
            required
            defaultValue={draft.title}
            name="title"
            type="text"
            className={css.input}
            onChange={handleChange}
          />
        </label>

        <label className={css.label}>
          Content
          <input
            required
            defaultValue={draft.content}
            name="content"
            type="textarea"
            className={css.textarea}
            onChange={handleChange}
          />
        </label>

        <label className={css.label}>
          Tag
          <select
            name="tag"
            className={css.select}
            onChange={handleChange}
            required
            defaultValue={draft.tag}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </label>

        <div className={css.actions}>
          {
            <button type="submit" className={css.button}>
              Create note
            </button>
          }
          <button type="button" onClick={onClose} className={css.cancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
