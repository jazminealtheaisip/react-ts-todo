import { useState } from "react";
import "../css/List.style.css";
import { toast } from "sonner";
import { ListTypes } from "../type/ListTypes";

export const useManageList = ({
  title,
  onDelete,
  onToggleCompleted,
  onEditTitle,
}: ListTypes) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title.title);

  const handleToggleCompleted = () => {
    onToggleCompleted(title.id);
  };

  const handleDelete = () => {
    onDelete(title.id);
  };

  const handleEdit = () => {
    onEditTitle(title.id, editedTitle);
    setIsEditing(false);
    toast.success("Saved");
  };

  const checkIfEditing = () => {
    setIsEditing(true);
    setEditedTitle(title.title);
  };

  return {
    isEditing,
    editedTitle,
    setIsEditing,
    setEditedTitle,
    handleToggleCompleted,
    handleDelete,
    handleEdit,
    checkIfEditing,
  };
};
