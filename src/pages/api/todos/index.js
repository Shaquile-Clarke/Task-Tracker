import { getToken } from "next-auth/jwt";
import db from "../../../lib/db";
import { Todo } from "../../../models/todo.model";
import { Users } from "../../../models/user.model";

export default async function handler(req, res) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req, secret });
  const { email } = token;

  switch (req.method) {
    //!GET REQUEST
    case "GET":
      try {
        db();
        const user = await Users.findOne({ email });

        const todos = await user.populate("todos");

        res.status(200).json({ content: todos.todos });
      } catch (err) {
        console.log(err);
      }
      return;

    //!POST REQUEST
    case "POST":
      try {
        db();
        const user = await Users.findOne({ email });

        const newTodo = await Todo.create({
          todo: req.body.todo,
        });

        user.todos.push(newTodo._id);
        newTodo.user = user._id;

        await newTodo.save();
        await user.save();

        res.status(200).json({ message: "Todo Created" });
      } catch (err) {
        console.log(err);
      }
      return;

    //!PATCH REQUEST
    case "PATCH":
      try {
        db();
        res.status(200).json({ message: "PATCH ROUTE" });
      } catch (err) {
        console.log(err);
      }
      return;
    //!DELETE REQUEST
    case "DELETE":
      try {
        const toDelete = await Todo.findById(req.body.id);
        toDelete.remove();

        res.status(200).json({ message: "DELETE ROUTE" });
      } catch (err) {
        console.log(err);
      }

      return;

    default:
      return;
  }
}
