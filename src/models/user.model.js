import { model, models, Schema } from "mongoose";
import { encryptPassword } from "../lib/auth";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now() },
  todos: [{ type: Schema.Types.ObjectId, ref: "Todo" }],
});

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

UserSchema.pre("save", async function () {
  const user = this;
  user.password = await encryptPassword(user.password.trim());
  user.firstName = capitalize(user.firstName.trim().toLowerCase());
  user.lastName = capitalize(user.lastName.trim().toLowerCase());
  user.email = user.email.toLowerCase();
});

export const Users = models.Users || model("Users", UserSchema);
