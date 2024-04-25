import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { Types } from "../type/types";
import { useTodoStore } from "../store/todoStore";

export const useManageTodo = () => {
  const [todoList, setTodoList] = useState<Types[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<string>("");

  const { filterOption, filterCategory, setFilterOption, setFilterCategory } =
    useTodoStore();
  /* const [filterCategory, setFilterCategory] = useState<string>("all"); */
  /*  const [filterOption, setFilterOption] = useState<string>("all"); */

  const storedTodoList = localStorage.getItem("todoList");

  useEffect(() => {
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (): void => {
    const title = inputRef.current?.value.trim();

    if (!title) {
      toast.error("Title cannot be empty. Please provide a Task Name.");
      return;
    } else if (!category) {
      toast.error("Category cannot be empty. Please provide a Category.");
      return;
    } else {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const newTodo = {
        id: uuidv4(),
        title: title,
        isCompleted: false,
        category: category,
        createdAtDate: `${currentDate} ${currentTime}`,
      };
      setTodoList([...todoList, newTodo]);
      setCategory("");
      inputRef.current!.value = "";
      toast.success("New todo added!");
    }
  };

  const handleEditTitle = (id: string, newTitle: string): void => {
    const updatedTodoList = todoList.map((title) => {
      if (title.id === id) {
        return { ...title, title: newTitle };
      }
      return title;
    });
    setTodoList(updatedTodoList);
  };

  const toggleCompleted = (id: string): void => {
    const updatedTodoList = todoList.map((title) => {
      if (title.id === id) {
        return { ...title, isCompleted: !title.isCompleted };
      }
      return title;
    });
    setTodoList(updatedTodoList);
  };

  const deleteTodo = (id: string): void => {
    const updatedTodoList = todoList.filter((title) => title.id !== id);
    setTodoList(updatedTodoList);
    toast.success("Deleted!");
  };

  const filterTodoList = () => {
    let filteredList = todoList;

    if (filterOption === "completed") {
      filteredList = filteredList.filter((title) => title.isCompleted);
    } else if (filterOption === "pending") {
      filteredList = filteredList.filter((title) => !title.isCompleted);
    }

    if (filterCategory !== "all") {
      filteredList = filteredList.filter(
        (title) => title.category === filterCategory
      );
    }

    return filteredList;
  };

  return {
    todoList,
    filterOption,
    inputRef,
    storedTodoList,
    category,
    filterCategory,
    setCategory,
    setFilterCategory,
    setFilterOption,
    addTodo,
    handleEditTitle,
    toggleCompleted,
    deleteTodo,
    filterTodoList,

    /*  handleUpdate, */
  };
};
