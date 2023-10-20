import React, { useState } from "react";
import styles from './App.module.css';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [taskid, setTaskId] = useState(null);
  const [update, setUpdate] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); 

  const handlechange = (event) => {
    setNewTask(event.target.value);
    setSuccessMessage(null);
  }

  const addTask = () => {
    if (newTask.trim() !== "") {
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        Complete: false,
      };
      setTodoList([...todoList, task]);
      setNewTask("");
    }
  }

  const NewText = () => {
    const newTodoList = todoList.map((task) => {
      if (task.id === taskid && update.trim() !== "") {
        task.taskName = update;
      }
      return task;
    });
    setTodoList(newTodoList);
    setShowInput(false);
    if (update.trim() !== "") {
      setSuccessMessage("Updated successfully!");
    }
  }

  const deleteTask = (id) => {
    const newTodoList = todoList.filter((task) => task.id !== id);
    setTodoList(newTodoList);
    setSuccessMessage(null);
  }

  const markCompleted = (id) => {
    const newTodoList = todoList.map((task) => {
      if (task.id === id) {
        task.Complete = !task.Complete;
      }
      return task;
    });
    setTodoList(newTodoList);
    setSuccessMessage(null);
  }

  const updatedTask = (id) => {
    setTaskId(id);
    setShowInput(true);
    setSuccessMessage(null);
  }

  const filteredTasks = todoList.filter((task) => {
    return task.taskName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={styles.App}>
      <h1 className={styles.heading}>My To-Do List</h1>
      <div className={styles.addTask}>
        <input onChange={handlechange} value={newTask} />
        <button onClick={addTask}>Add Task</button>
        {showInput && <input onChange={(e) => setUpdate(e.target.value)} value={update} />}
        {showInput && <button onClick={NewText}>Update</button>}
        
        
        
      </div>
      <div className={styles.addTask}><input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search tasks..."
        /></div>
      <div>
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}
      </div>
      <div className={styles.list}>
        {filteredTasks.map((task) => (
          <div key={task.id}>
            <h1 style={{ color: task.Complete ? "green" : "black" }}>{task.taskName}</h1>
            <button className={styles.bt1} onClick={() => markCompleted(task.id)}>Done</button>
            <button className={styles.bt2} onClick={() => updatedTask(task.id)}>Update</button>
            <button className={styles.bt3} onClick={() => deleteTask(task.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;





