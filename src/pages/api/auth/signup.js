import db from "../../../lib/db";
import { Users } from "../../../models/user.model";

export default async function handler(req, res) {
  if (!req.method === "POST") {
    throw new Error("Invalid Request Type");
  }

  const { password, passwordRepeat, email } = req.body;

  db();

  const user = await Users.findOne({ email });

  if (user) {
    res.status(401).json({ errMessage: "User Already Exist" });
    return;
  }

  if (password !== passwordRepeat) {
    res.status(401).json({ errMessage: "Passwords Do Not Match" });
    return;
  }

  const newUser = new Users(req.body);

  await newUser.save();

  res.status(200).json({ message: "Account Created", created: true });
}
