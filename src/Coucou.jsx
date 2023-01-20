import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TodoItem from "./components/TodoItem";

function Coucou() {
  const [input, setinput] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    fetch("/todos")
      .then((el) => el.json())
      .then((el) => settodos(el));
  }, []);

  const onDelete = (todoId) =>
    settodos((todos) => [...todos].filter(({ id }) => id !== todoId));

  const onComplete = (todoId) =>
    settodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, status: "done" } : todo
      )
    );

  const onAdd = () => {
    const newTodo = {
      status: "todo",
      id: 1,
      content: input,
    };

    axios.post("/todo", newTodo);

    settodos((todos) => [...todos, newTodo]);
    setinput("");
  };

  return (
    <div style={{ margin: "0 auto", maxWidth: 600 }}>
      <div style={{ display: "flex", marginBottom: 20 }}>
        <input
          style={{ flexGrow: 1 }}
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button data-cy="add" onClick={onAdd}>
          Ajouter
        </button>
      </div>
      <ul id="list">
        {todos.map((todo) => (
          <TodoItem
            {...todo}
            key={todo.id}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default Coucou;
