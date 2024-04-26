import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { useLocalStorage } from "../components/localStorage";
import { useFilterStore } from "../store/filterStore";
import { useTodoStore } from "../store/todoStore";

export const useManageTodo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todoList, setTodoList, category, setCategory } = useTodoStore();
  const { filterOption, filterCategory, setFilterOption, setFilterCategory } =
    useFilterStore();
  const { storedTodoList } = useLocalStorage();

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
  };
};
