import { PlusIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

export default function AddTodoButton() {
  const router = useRouter();

  function onClick() {
    router.push("/todos/new-todo");
  }

  return (
    <button
      onClick={onClick}
      className="absolute right-8 bottom-28 flex items-center text-white/40 border-2 p-2 h-16 w-16 rounded-full bg-blue-500/60"
    >
      <PlusIcon />
    </button>
  );
}
