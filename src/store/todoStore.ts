import { create } from "zustand";
import { Types } from "../type/types";

type todoStore = {
  todoList: Types[];
  setTodoList: (todoList: Types[]) => void;
  category: string;
  setCategory: (category: string) => void;
};

export const useTodoStore = create<todoStore>((set) => ({
  todoList: [],
  setTodoList: (todoList) => set({ todoList }),
  category: "",
  setCategory: (category) => set({ category }),
}));
