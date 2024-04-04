import React from 'react'
import './List.style.css'
import { Data } from '../data';


interface TodoInterface{
    title: Data;
    onDelete: (id: string) => void;
    onToggleCompleted: (id: string) => void;
}

const List = ({title, onDelete, onToggleCompleted}: TodoInterface) => {
  const handleDelete = (): void =>{
    onDelete(title.id);
  }

const handleToggleCompleted = (): void => {
    onToggleCompleted(title.id);
  };

  return (
    <div className="todo-container">
        <div className="todo-each">
            <span id="checkbox"><input type="checkbox" checked={title.isCompleted} onChange={handleToggleCompleted} /></span>
            <span id="span-short">Date: {title.createdAtDate}</span>
            <span id="span-short">Time: {title.createdAtTime}</span>
            <span id="span-mid-long">Title: {title.title}</span>
            <span id="span-long">Description: {title.description}</span>
        </div>

        <div className="buttons">
            <button id="edit-button">Edit</button>
            |
            <button id="delete-button" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default List;