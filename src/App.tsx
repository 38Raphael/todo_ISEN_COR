import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TodoItem from "./components/TodoItem";

export type Todo = {
  id: string;
  content: string;
  status: "todo" | "done";
};

function App() {
  const [input, setinput] = useState("");
  const [todos, settodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/todos")
      .then((el) => el.json())
      .then((el) => settodos(el));
  }, []);

  const onDelete = (todoId: string) =>
    settodos((todos) => [...todos].filter(({ id }) => id !== todoId));

  const onComplete = (todoId: string) =>
    settodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, status: "done" } : todo
      )
    );

  const onAdd = () => {
    const newTodo = {
      status: "todo" as const,
      id: (todos.length + 1).toString(),
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
        {todos.map(({ content, status, id }) => (
          <TodoItem
            id={id}
            content={content}
            status={status}
            key={id}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
