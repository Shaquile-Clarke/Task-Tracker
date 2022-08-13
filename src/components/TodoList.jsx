import { useEffect, useState } from "react";
import useSWR from "swr";
import TodoDesign from "./TodoDesign";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TodoList() {
  const { data, error } = useSWR("/api/todos", fetcher);
  const [todos, setTodos] = useState();

  useEffect(() => {
    if (data) {
      setTodos(data.content);
    }
  }, [data]);

  if (error) return <h1>Something Went Wrong</h1>;

  if (!todos & !error) return <h1>Loading...</h1>;

  return (
    <div className="w-full flex flex-col gap-y-1">
      {todos.map((todo) => (
        <TodoDesign key={todo._id} todo={todo} />
      ))}
    </div>
  );
}
