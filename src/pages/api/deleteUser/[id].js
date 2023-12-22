import { users } from "@/userDataStore";

export default function handler(req, res) {
  const { id } = req.query;

  //   Filter out (delete) user with matching
  const removeUser = users.filter((user) => user.id !== id);

  if (removeUser) {
    // console.log(users)
    res.status(200).json(removeUser);
  } else {
    res.status(404).json({ error: "User not found" });
  }
}
