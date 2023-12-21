// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { users } from "@/userDataStore";

export default function handler(req, res) {
  const {id, name, email, role } = req.body;
  const user = {id, name, email, role };
  users.push(user);
  res.json(users);
}