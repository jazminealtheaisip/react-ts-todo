import React, { ChangeEvent, FC, useState, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import { Types } from "./type/types";
import { v4 as uuidv4 } from "uuid";
import { Toaster, toast } from "sonner";
import FilteredList from "./features/FilteredList";

const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [todoList, setTodoList] = useState<Types[]>([]);
  const [filterOption, setFilterOption] = useState<string>("all");

  const storedTodoList = localStorage.getItem("todoList");

  useEffect(() => {
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (): void => {
    if (title.trim() === "") {
      toast.error("Title cannot be empty. Please provide a Task Name.");
      return;
    } else {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const newTodo = {
        id: uuidv4(),
        title: title,
        isCompleted: false,
        createdAtDate: `${currentDate} ${currentTime}`,
      };
      setTodoList([...todoList, newTodo]);
      setTitle("");
      toast.success("New todo added!");
    }
  };

  const handleUpdate = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
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

  /* const filterTodoList = () => {
    let filteredList = todoList;

    if (filterOption === "completed") {
      filteredList = filteredList.filter((title) => title.isCompleted);
    } else if (filterOption === "pending") {
      filteredList = filteredList.filter((title) => !title.isCompleted);
    }
    return filteredList;
  }; */

  return (
    <div className="App">
      <div className="heading">
        <h2>To Do List</h2>
      </div>
      {/* <LocalStorage title={todoList} setTodos={setTodoList} /> */}
      <Toaster position="bottom-center" />
      <div className="add-todo">
        <div className="side"></div>

        <div className="input-class">
          <div className="title">
            <label>Task Name: </label>
            <input
              type="text"
              placeholder="Enter Task Name..."
              name="title"
              value={title}
              onChange={handleUpdate}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
              required
            />
            <button id="add" onClick={addTodo}>
              + Todo
            </button>
          </div>
        </div>

        <div className="side"></div>
      </div>

      <div className="organize">
        <div className="filter-options">
          <select
            onChange={(e) => setFilterOption(e.target.value)}
            id="options"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <FilteredList
        title={todoList}
        onDelete={deleteTodo}
        onToggleCompleted={toggleCompleted}
        onEditTitle={handleEditTitle}
        filterOption={filterOption}
      />
      {/* <div className="todo-list">
        {filterTodoList().map((title: Types, id: number) => {
          return (
            <List
              key={id}
              title={title}
              onDelete={deleteTodo}
              onToggleCompleted={toggleCompleted}
              onEditTitle={handleEditTitle}
            />
          );
        })}
      </div> */}
    </div>
  );
};

export default App;
