import React, {ChangeEvent, FC, useState,useEffect} from 'react';
import './App.css';
import { Data } from './data';
import List from './components/List';

const App: FC = () => {

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todoList, setTodoList] = useState<Data[]>([]);
  const todosLength = todoList.length

  const storedTodoList = localStorage.getItem("todoList");

  useEffect(() => {
    if (storedTodoList) {
      setTodoList(JSON.parse(storedTodoList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const handleUpdate = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    } else {
      setDescription(event.target.value);
    }
  }

  const addTodo = (): void => {
    if (title.trim() === "") {
      alert("Title cannot be empty. Please provide a title."); 
      return;
    } else {
      const currentDate = new Date().toLocaleDateString();
      const currentTime = new Date().toLocaleTimeString();
      const newTodo = { id:String(todosLength + 1), title: title, description: description, isCompleted: false, 
        createdAtDate: `${currentDate}`, createdAtTime: `${currentTime}`};
      setTodoList([...todoList, newTodo]);
      setTitle("");
      setDescription("");
    }
    console.log(todoList)
  };

  const deleteTodo = (id: string): void => {
    const updatedTodoList = todoList.filter(title => title.id !== id);
    setTodoList(updatedTodoList);
  };

  const toggleCompleted = (id: string): void => {
    const updatedTodoList = todoList.map(title => {
      if (title.id === id) {
        return { ...title, isCompleted: !title.isCompleted };
      }
      return title;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <div className="App">
      <header className="heading">
        <h1>To Do List</h1>
      </header>

      <div className="add-todo">
        <div className="input-class">
          <div className="title">
            <label>Title: </label>
            <input type="text" placeholder="Title..." name="title" value={title} onChange={handleUpdate} required/> 
          </div>

          <div className="description">
            <label>Description: </label>
            <textarea placeholder="Description..." name="description" value={description} onChange={handleUpdate}/>
            <button id="add" onClick={addTodo}>+ Add To Do </button>
          </div>

        </div>
      </div>

      <div className="todo-list">
        {todoList.slice().reverse().map((title: Data, id: number) =>{
          return <List key={id} title={title} onDelete={deleteTodo} onToggleCompleted={toggleCompleted}/>;
        })}
      </div>
      

    </div>
  );
}

export default App;
