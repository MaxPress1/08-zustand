import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NewNoteData } from "@/types/note";

type NoteDraftStore = {
  draft: NewNoteData;
  setDraft: (newNoteDraft: NewNoteData) => void;
  clearDraft: () => void;
};

const initialDraft: NewNoteData = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraft = create<NoteDraftStore>()(
  persist(
    (set) => {
      return {
        draft: initialDraft,
        setDraft: (newNoteDraft: NewNoteData) => {
          return set({
            draft: newNoteDraft,
          });
        },
        clearDraft: () => {
          return set({
            draft: initialDraft,
          });
        },
      };
    },
    {
      name: "draft",
      partialize: (store) => {
        return { draft: store.draft };
      },
    }
  )
);
