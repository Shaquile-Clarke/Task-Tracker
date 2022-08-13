import { getToken } from "next-auth/jwt";
import db from "../../../lib/db";
import { Todo } from "../../../models/todo.model";
import { Users } from "../../../models/user.model";

export default async function handler(req, res) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });

  db();
  const { email } = token;
  const user = await Users.findOne({ email });

  if (!user) {
    return res.status(401).json({ error: "Unauthorized Access" });
  }
  const id = req.url.split("/").pop();

  switch (req.method) {
    case "GET":
      const userTodo = user.todos.includes(id);

      if (!userTodo) {
        return res.status(404).json({ error: "Data does not exist" });
      }

      const data = await Todo.findOne({ _id: id });

      return res.status(200).json({ data: data.todo });
    case "PATCH":
      db();
      const { todo } = req.body;

      const updateTodo = await Todo.findByIdAndUpdate(id, { todo });

      return res.status(200).json({ message: "Updated Todo", status: 200 });

    default:
      return res.status(400).json({ error: "Invalid Request" });
  }
}
