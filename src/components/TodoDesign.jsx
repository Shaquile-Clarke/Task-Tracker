import {
  CheckCircleIcon,
  PencilAltIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useState } from "react";

export default function TodoDesign({ todo }) {
  const [finished, setFinished] = useState(false);
  const router = useRouter();

  function finishedTodo(e) {
    setFinished(!finished);
  }

  function editTodo() {
    router.push(`/todos/edit/${todo._id}`);
  }

  async function deleteTodo() {
    const options = {
      method: "DELETE",
      body: JSON.stringify({ id: todo._id }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/todos", options);
    await response.json();
  }

  return (
    <div
      className={`h-10 py-2 pl-2 flex justify-between items-center rounded-md border-2 w-full text-white ${
        finished ? "bg-green-500/20" : ""
      }`}
    >
      <p>{todo.todo}</p>
      <div className="flex">
        <button onClick={finishedTodo} className="py-2 px-1">
          <CheckCircleIcon className="h-6 text-green-600" />
        </button>
        <button onClick={editTodo} className="py-2 px-1">
          <PencilAltIcon className="h-6 text-blue-300" />
        </button>
        <button onClick={deleteTodo} className="py-2 px-1">
          <XCircleIcon className="h-6 text-red-600" />
        </button>
      </div>
    </div>
  );
}
