import { useState } from "react";
import "../css/List.style.css";
import { toast } from "sonner";
import { ListTypes } from "../type/ListTypes";
import { useListStore } from "../store/listStore";

export const useManageList = ({
  title,
  onDelete,
  onToggleCompleted,
  onEditTitle,
}: ListTypes) => {
  const { editedTitle, setEditedTitle } = useListStore();
  const [isEditing, setIsEditing] = useState(false);

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
