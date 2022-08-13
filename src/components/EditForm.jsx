import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditForm({ todoId }) {
  const router = useRouter();
  const [content, setContent] = useState();

  useEffect(() => {
    (async function getTodo() {
      const request = await fetch(`/api/todos/${todoId}`, { method: "GET" });
      const response = await request.json();
      setContent(response.data);
    })();
  }, [todoId]);

  if (!content) {
    return <div className="text-center">Loading...</div>;
  }

  function onCancel() {
    router.replace("/todos");
  }

  async function onSubmit(e) {
    e.preventDefault();

    const options = {
      method: "PATCH",
      body: JSON.stringify({ todo: content }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const request = await fetch(`/api/todos/${todoId}`, options);
    const response = await request.json();

    if (response.status === 200) {
      router.push("/todos");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        cols={50}
        rows={2}
        className={"p-2 rounded-md resize-none"}
      ></textarea>
      <div className={"flex gap-2 text-white/90 font-bold"}>
        <button className={"rounded-md p-2 w-1/2 bg-green-500/90"}>
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={"rounded-md p-2 w-1/2 bg-red-700/90"}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
