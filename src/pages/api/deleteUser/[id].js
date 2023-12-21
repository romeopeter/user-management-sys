import { users } from "@/userDataStore";

export default function handler(req, res) {
  const { id } = req.query;

  //   Filter out (delete) user with matching
  const user = users.filter((user) => String(user.id) !== String(id));

  console.log(users)

  if (users) {
    console.log(id)
    users.push(user);
    res.status(200).json(users);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
