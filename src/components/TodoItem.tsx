import { Todo } from "../App";

type Props = {
  onDelete: (id: string) => any;
  onComplete: (id: string) => any;
} & Todo;

function TodoItem({ id, content, status, onComplete, onDelete }: Props) {
  const textStyle = {
    textDecoration: status === "done" ? "line-through" : undefined,
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <p style={textStyle}>{content}</p>
      <button data-cy="complete" onClick={() => onComplete(id)}>
        compléter
      </button>
      <button data-cy="delete" onClick={() => onDelete(id)}>
        X
      </button>
    </li>
  );
}

export default TodoItem;
