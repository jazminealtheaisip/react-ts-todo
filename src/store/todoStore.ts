import { create } from "zustand";
import { Types } from "../type/types";

type todoStore = {
  todoList: Types[];
  filterOption: string;
  filterCategory: string;
  setFilterOption: (filterOption: string) => void;
  setFilterCategory: (filterCategory: string) => void;
};

export const useTodoStore = create<todoStore>((set) => ({
  todoList: [],
  filterOption: "all",
  filterCategory: "all",
  setFilterOption: (filterOption) => set({ filterOption }),
  setFilterCategory: (filterCategory) => set({ filterCategory }),
}));
