import React, { FC } from "react";
import "./css/App.css";
import List from "./components/List";
import { Types } from "./type/types";
import { Toaster } from "sonner";
import { useManageTodo } from "./functions/manageTodo";
import { useFilterStore } from "./store/filterStore";
import { useTodoStore } from "./store/todoStore";

const App: FC = () => {
  const {
    inputRef,
    addTodo,
    handleEditTitle,
    toggleCompleted,
    deleteTodo,
    filterTodoList,
  } = useManageTodo();

  const { category, setCategory } = useTodoStore();
  const { setFilterOption, setFilterCategory } = useFilterStore();

  return (
    <div className="App">
      <div className="heading">
        <h2>To Do List</h2>
      </div>

      <Toaster position="bottom-center" />
      <div className="add-todo">
        <div className="side"></div>

        <div className="input-class">
          <div className="title">
            <label>Task Name: </label>
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Task Name..."
              name="title"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTodo();
                }
              }}
              required
            />
            <div />

            <div className="categories-options">
              <select
                id="options-input"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo();
                  }
                }}
                required
              >
                {!category && (
                  <option value="" disabled>
                    Category
                  </option>
                )}
                <option value="Work"> Work</option>
                <option value="School">School</option>
                <option value="Other">Other</option>
              </select>
            </div>
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

        <div className="categories-filter">
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            id="options-category"
          >
            <option value="all">All</option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="todo-list">
        {filterTodoList().map((title: Types, id: number) => {
          return (
            <List
              key={id}
              title={title}
              onDelete={deleteTodo}
              onToggleCompleted={toggleCompleted}
              onEditTitle={handleEditTitle}
              category={category}
              index={id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
