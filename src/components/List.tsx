import React, { useState } from "react";
import "./List.style.css";
import { Data } from "../data";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

interface TodoInterface {
  title: Data;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
  category: string;
  onEditTitle: (id: string, newTitle: string) => void;
}

const List = ({
  title,
  onDelete,
  onToggleCompleted,
  onEditTitle,
}: TodoInterface) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleDelete = (): void => {
    onDelete(title.id);
  };

  const handleToggleCompleted = (): void => {
    onToggleCompleted(title.id);
  };

  const handleEdit = (): void => {
    onEditTitle(title.id, editedTitle);
    setIsEditing(false);
  };

  const checkIfEditing = (): void => {
    setIsEditing(true);
    setEditedTitle(title.title);
  };

  return (
    <div className="todo-container">
      <div className="todo-each">
        <span id="checkbox">
          <input
            type="checkbox"
            checked={title.isCompleted}
            onChange={handleToggleCompleted}
          />
        </span>
        <span
          id="status"
          style={{
            backgroundColor: title.isCompleted ? "#c4dea4" : "#beab8f",
          }}
        >
          {title.isCompleted ? "Completed" : "Pending"}
        </span>
        <span id="category">{title.category}</span>
        {isEditing ? (
          <>
            <input
              id="span-mid-long"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleEdit}
              autoFocus
            />
            {/* <button onClick={handleEdit}>✓</button>
            <button onClick={() => setIsEditing(false)}>✗</button> */}
          </>
        ) : (
          <span id="span-mid-long">{title.title}</span>
        )}
        <span id="span-short">{title.createdAtDate} </span>
        {/* <span id="span-long">Description: {title.description}</span> */}
      </div>

      <div className="buttons">
        <FaEdit id="edit-button" onClick={checkIfEditing} />
        |
        <FaDeleteLeft
          id="delete-button"
          style={{
            color: "#cc1e1e",
          }}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default List;
