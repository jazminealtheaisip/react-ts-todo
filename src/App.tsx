import React, { ChangeEvent, FC, useState, useEffect } from "react";
import "./App.css";
import { Data } from "./data";
import List from "./components/List";
import { v4 as uuidv4 } from "uuid";

const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [todoList, setTodoList] = useState<Data[]>([]);
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
      alert("Title cannot be empty. Please provide a title.");
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
    }
  };

  const handleUpdate = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
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
  };

  const filterTodoList = () => {
    let filteredList = todoList;

    if (filterOption === "completed") {
      filteredList = filteredList.filter((title) => title.isCompleted);
    } else if (filterOption === "pending") {
      filteredList = filteredList.filter((title) => !title.isCompleted);
    }
    return filteredList;
  };

  return (
    <div className="App">
      <div className="heading">
        <h2>To Do List</h2>
      </div>

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

      <div className="todo-list">
        {filterTodoList().map((title: Data, id: number) => {
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
      </div>
    </div>
  );
};

export default App;
