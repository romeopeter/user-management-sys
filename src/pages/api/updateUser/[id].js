import { users } from "@/userDataStore";

export default function handler(req, res) {
  const { id } = req.query;
  const { name, email, role } = req.body;

  const user = users.find((user) => user.id === id);

  console.log(user)

  if (user) {
    user.name = name;
    user.email = email;
    user.role = role;

    const updatedUser = users.map(item =>  ({...item, ...user}));
    users.push(updatedUser);
    res.json(updatedUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
