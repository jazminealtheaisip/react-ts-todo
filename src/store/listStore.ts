import { create } from "zustand";

type listStore = {
  editedTitle: string;
  setEditedTitle: (editedTitle: string) => void;
};

export const useListStore = create<listStore>((set) => ({
  editedTitle: "",
  setEditedTitle: (editedTitle) => set({ editedTitle }),
}));
