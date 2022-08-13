import { model, models, Schema } from "mongoose";
import { Users } from "./user.model";

const TodoSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  todo: String,
  createdAt: { type: Date, default: Date.now() },
});

TodoSchema.pre("remove", async function () {
  await Users.findByIdAndUpdate(this.user, { $pull: { todos: this._id } });
});

TodoSchema.pre("save", async function () {
  this.todo = this.todo.trim();
});

export const Todo = models.Todo || model("Todo", TodoSchema);
