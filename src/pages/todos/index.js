import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AddTodo from "../../components/AddTodo";
import AddTodoButton from "../../components/AddTodoButton";
import TodoList from "../../components/TodoList";
import { getTodos } from "../../handler/fetcher";

export default function Todo() {
  const router = useRouter();
  const { data: session, status } = useSession();

  async function logoutHandler() {
    await signOut({
      redirect: false,
    });
    router.push("/");
  }

  return (
    <>
      {status === "authenticated" && (
        <div className="flex flex-col p-4 gap-4 items-center">
          <div className="flex w-full items-center">
            <div className="text-xl mr-auto text-white font-semibold">
              Hi, {session.user.name}
            </div>
            <button
              onClick={logoutHandler}
              className="bg-yellow-500/80 rounded self-end p-2"
            >
              Logout
            </button>
          </div>
          <TodoList />
          <AddTodoButton />
        </div>
      )}
    </>
  );
}
