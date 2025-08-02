import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  let [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() !== "") {
      setTodos((prevTodos) => {
        return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
      });
      setNewTodo("");
    }
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    // Fixed: Use prevTodos parameter, not todos
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  let markAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      })
    );
  };

  // Fixed: Accept id as parameter
  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          // Fixed: Use === instead of ==
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <div>
      <input
        placeholder="add a task"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br /> <br />
      <button onClick={addNewTask}style={{backgroundColor:"lightyellow" , color:"black"}}>Add Task</button>
      <br /> <br />
      <hr />
      <h4>Task Todo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button onClick={() => deleteTodo(todo.id)} style={{backgroundColor:"red"}}>Delete</button>
            <button onClick={() => markAsDone(todo.id)} style={{backgroundColor:"lightgreen" , color:"black"}}>Mark As Done</button>
          </li>
        ))}
      </ul>
      <br />
      <br />
      <button onClick={markAllDone} style={{backgroundColor:"lightgreen" , color:"black"}}>Mark All Done</button>
    </div>
  );
}
