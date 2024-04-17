import React, { useState } from "react";
import "./List.style.css";
import { Data } from "../data";
import { FaEdit } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";

interface TodoInterface {
  title: Data;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
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
      <div className="side-list"></div>
      <div className="todo-each">
        <span
          id="checkbox"
          style={{
            backgroundColor: title.isCompleted ? "#c4dea4" : "#beab8f",
          }}
        >
          <input
            id="checkbox-design"
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
          {title.isCompleted ? (
            <HiOutlineClipboardCheck />
          ) : (
            <MdPendingActions />
          )}
        </span>

        {isEditing ? (
          <>
            <input
              id="span-mid-long"
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleEdit}
              autoFocus
              style={{
                backgroundColor: title.isCompleted ? "#c4dea4" : "#beab8f",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleEdit();
                }
              }}
            />
          </>
        ) : (
          <span
            id="span-mid-long"
            style={{
              backgroundColor: title.isCompleted ? "#c4dea4" : "#beab8f",
            }}
            onClick={checkIfEditing}
          >
            {title.title}
          </span>
        )}
      </div>

      <div className="buttons">
        <FaEdit id="edit-button" onClick={checkIfEditing} />
        |
        <MdDeleteForever id="delete-button" onClick={handleDelete} />
      </div>

      <div className="side-list"></div>
    </div>
  );
};

export default List;
