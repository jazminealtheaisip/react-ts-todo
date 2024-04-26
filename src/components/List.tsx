import React from "react";
import "../css/List.style.css";
import { FaEdit } from "react-icons/fa";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import {
  MdWork,
  MdSchool,
  MdOtherHouses,
  MdDragIndicator,
  MdDeleteForever,
  MdPendingActions,
} from "react-icons/md";
import { ListTypes } from "../type/ListTypes";
import { useManageList } from "../functions/manageList";

const List = ({
  title,
  onDelete,
  onToggleCompleted,
  onEditTitle,
}: ListTypes & { index: number }) => {
  const {
    isEditing,
    editedTitle,
    setEditedTitle,
    handleToggleCompleted,
    handleDelete,
    handleEdit,
    checkIfEditing,
  } = useManageList({
    title,
    category: title.category,
    onDelete,
    onToggleCompleted,
    onEditTitle,
  });

  return (
    <div className="todo-container">
      <div className="side-list"></div>
      <div className="todo-each">
        <span id="drag">
          <MdDragIndicator />
        </span>

        <span
          style={{
            backgroundColor: title.isCompleted ? "#c4dea4" : "#b5a28d",
          }}
          id="category"
        >
          {/* {title.category} */}
          {title.category === "Work" && <MdWork color="#912a2d" />}
          {title.category === "School" && <MdSchool color="#052c49" />}
          {title.category === "Other" && <MdOtherHouses color="#357d77" />}
        </span>

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
