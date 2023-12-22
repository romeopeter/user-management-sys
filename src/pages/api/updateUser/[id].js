import { users } from "@/userDataStore";

export default function handler(req, res) {
  const { id } = req.query;
  const { name, email, role } = req.body;

  const user = users.find((user) => user.id === id);
  const emailIsUnique = users.every((user) => user.email !== email);

  if (!emailIsUnique) {
    res
      .status(404)
      .json({ error: "Email is not unique. Please choose a different email." });
  }

  if (user) {
    user.name = name;
    user.email = email;
    user.role = role;
    res.status(200).json(users);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
