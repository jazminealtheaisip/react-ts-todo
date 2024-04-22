// FilteredList.tsx
import React from "react";
import { Types } from "../type/types";
import List from "../components/List";

interface FilteredListProps {
  title: Types[];
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
  onEditTitle: (id: string, newTitle: string) => void;
  filterOption: string;
}

const FilteredList: React.FC<FilteredListProps> = ({
  title,
  onDelete,
  onToggleCompleted,
  onEditTitle,
  filterOption,
}) => {
  const filterTodoList = (todoList: Types[]): Types[] => {
    switch (filterOption) {
      case "completed":
        return todoList.filter((title) => title.isCompleted);
      case "pending":
        return todoList.filter((title) => !title.isCompleted);
      default:
        return todoList;
    }
  };

  const filteredList = filterTodoList(title);

  return (
    <div className="todo-list">
      {filteredList.map((title: Types) => (
        <List
          key={title.id}
          title={title}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
          onEditTitle={onEditTitle}
        />
      ))}
    </div>
  );
};

export default FilteredList;
