import React, { ChangeEvent, FC, useState, useEffect } from "react";
import "./App.css";
import { Data } from "./data";
import List from "./components/List";
import { v4 as uuidv4 } from "uuid";

const App: FC = () => {
  const [title, setTitle] = useState<string>("");
  /* const [description, setDescription] = useState<string>(""); */
  const [todoList, setTodoList] = useState<Data[]>([]);
  /* const todosLength = todoList.length; */
  const [filterOption, setFilterOption] = useState<string>("all");

  const [category, setCategory] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  const [sortOrder, setSortOrder] = useState<string>("descending");

  const storedTodoList = localStorage.getItem("todoList");

  useEffect(() => {
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleUpdate = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } /* else {
      setDescription(event.target.value);
    } */ else if (event.target.name === "category") {
      setCategory(event.target.value);
    }
  };

  const addTodo = (): void => {
    if (title.trim() === "") {
      alert("Title cannot be empty. Please provide a title.");
      return;
    } else if (category.trim() === "") {
      alert("Please choose a category.");
      return;
    } else {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const newTodo = {
        id: uuidv4(),
        title: title,
        /* description: description, */
        isCompleted: false,
        category: category,
        createdAtDate: `${currentDate} ${currentTime}`,
      };
      setTodoList([...todoList, newTodo]);
      setTitle("");
      setCategory("");
      /* setDescription(""); */
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

  const deleteTodo = (id: string): void => {
    const updatedTodoList = todoList.filter((title) => title.id !== id);
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

    if (sortOrder === "ascending") {
      filteredList.sort(
        (a, b) =>
          new Date(a.createdAtDate).getTime() -
          new Date(b.createdAtDate).getTime()
      );
    } else {
      filteredList.sort(
        (a, b) =>
          new Date(b.createdAtDate).getTime() -
          new Date(a.createdAtDate).getTime()
      );
    }

    return filteredList;
  };

  return (
    <div className="App">
      <header className="heading">
        <h1>To Do List</h1>
      </header>

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
              required
            />
          </div>

          <div className="categories-options">
            {/*  <label>Category: </label> */}
            <select
              id="options-input"
              name="category"
              onChange={handleUpdate}
              value={category}
              required
            >
              {!category && (
                <option value="" disabled>
                  Select category
                </option>
              )}
              <option value="Work"> Work</option>
              <option value="School">School</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="description">
            {/* <label>Description: </label>
            <textarea
              placeholder="Description..."
              name="description"
              value={description}
              onChange={handleUpdate}
            /> */}
            <button id="add" onClick={addTodo}>
              + Add Todo
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

        <div className="sort-options">
          <select onChange={(e) => setSortOrder(e.target.value)} id="options">
            <option value="descending">Latest - Oldest</option>
            <option value="ascending">Oldest - Latest</option>
          </select>
        </div>

        <div className="categories-filer">
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            id="options"
          >
            <option value="all">All</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
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
              category={category}
              onEditTitle={handleEditTitle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
