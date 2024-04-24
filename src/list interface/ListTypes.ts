import { Types } from "../type/types";

export interface ListTypes {
  title: Types;
  onDelete: (id: string) => void;
  onToggleCompleted: (id: string) => void;
  onEditTitle: (id: string, newTitle: string) => void;
  category: string;
}
