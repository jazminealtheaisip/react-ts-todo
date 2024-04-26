import { useEffect } from "react";
import { useTodoStore } from "../store/todoStore";

export const useLocalStorage = () => {
  const { todoList, setTodoList } = useTodoStore();

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

  return {
    todoList,
    storedTodoList,
  };
};
