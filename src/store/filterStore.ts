import { create } from "zustand";

type filterStore = {
  filterOption: string;
  filterCategory: string;
  setFilterOption: (filterOption: string) => void;
  setFilterCategory: (filterCategory: string) => void;
};

export const useFilterStore = create<filterStore>((set) => ({
  filterOption: "all",
  filterCategory: "all",
  setFilterOption: (filterOption) => set({ filterOption }),
  setFilterCategory: (filterCategory) => set({ filterCategory }),
}));
