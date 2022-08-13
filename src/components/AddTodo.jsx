import { useRouter } from "next/router";
import { useRef } from "react";

export default function AddTodo() {
  const todoRef = useRef();
  const router = useRouter();

  function onClick() {
    router.push("/todos");
  }

  async function submitHandler(e) {
    e.preventDefault();

    const options = {
      method: "POST",
      body: JSON.stringify({ todo: todoRef.current.value }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/todos", options);
    const data = await response.json();

    todoRef.current.value = "";
    router.push("/todos");
  }

  return (
    <form onSubmit={submitHandler} className="flex w-full rounded-md ">
      <input
        type="text"
        name="todo"
        id="todo"
        ref={todoRef}
        placeholder="Enter Todo..."
        className="w-full h-10 p-2 border-t-2 border-l-2 border-b-2 border-r border-blue-400"
      />
      <button className="w-4/12 xl:w-2/12 bg-black/10 border-t-2 border-b-2 border-l border-r border-green-400 text-white">
        Add Todo
      </button>
      <button
        type="button"
        onClick={onClick}
        className="w-4/12 xl:w-2/12 bg-black/10 border-r-2 border-t-2 border-b-2 border-l border-red-400 text-white"
      >
        Cancel
      </button>
    </form>
  );
}
