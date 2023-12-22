import { Inter } from "next/font/google";
import { Fragment, useState, useEffect, useRef } from "react";
import { generateRandomId } from "@/utils/randomId";

const inter = Inter({ subsets: ["latin"] });

const userFields = {
  name: "",
  email: "",
  role: "",
}

export default function Home({ user }) {
  const [form, setForm] = useState(userFields);
  const [updatedData, setUpdatedData] = useState(userFields)
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setForm((user) => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  // Get users
  useEffect(
    () => {
      (async () => {
        const response = await fetch("/api/users");
        const user = await response.json();

        setLoading(false);
        setData(user);
      })();
    },
    [],
    [data],
  );


  // Post users
  const postUser = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/postUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: generateRandomId(),
        name: form.name,
        email: form.email,
        role: form.role,
      }),
    });

    const user = await response.json();

    setData(user);
    // setLoading(false);
  };

  // Update user
  const updateUser = async (e, updatedData) => {
    e.preventDefault();

    const { userId, name, email, role } = updatedData;

    const response = await fetch(`/api/updateUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        role: role,
      }),
    });

    const user = await response.json();

    if (user.status !== 400)  {
      console.log(user.error)
      return
    };

    setData(user)

   
  };

  // Delete user
  const deleteUser = async (e, userId) => {
    e.preventDefault();

    const response = await fetch(`/api/deleteUser/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const user = await response.json();

    setData(user);
  };

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <main className={`flex  h-screen flex-col items-center p-24 ${inter.className}`}>
      <div className="z-10 max-w-5xl w-full items-center justify-between">
        <p className="text-center text-2xl">User Management System</p>
      </div>

      <div className="text-center px-5 py-4 max-w-3xl">

        {/* Input form */}
        <form className="mb-10 w-full">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={(e) => changeHandler(e)}
            className="border border-black rounded p-1 w-full"
          />{" "}
          <br />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={(e) => changeHandler(e)}
            className="border border-black rounded p-1 my-2 w-full"
          />{" "}
          <br />
          <input
            type="text"
            placeholder="Role"
            name="role"
            value={form.role}
            onChange={(e) => changeHandler(e)}
            className="border border-black rounded p-1 w-full"
          />
          <input
            type="submit"
            className="border border-black rounded p-1 block w-full my-2 cursor-pointer"
            onClick={(e) => postUser(e)}
          />
        </form>

        {/* Presentation table */}
        <table class="table-auto w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border border-slate-600">Name</th>
              <th className="border border-slate-600">Email</th>
              <th className="border border-slate-600">Role</th>
              <th className="border border-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((data, idx) => (
                <Fragment key={data.id}>
                  {!data.email ? null : (
                    <tr>
                      <td
                        className="border border-slate-100 p-4 text-slate-500 dark:text-slate-400 text-sm"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) =>
                          setUpdatedData((data) => ({
                            ...data,
                            name: e.target.innerText,
                          }))
                        }
                      >
                        {data.name}
                      </td>
                      <td
                        className="border border-slate-100 p-4 text-slate-500 dark:text-slate-400 text-sm"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) =>
                          setUpdatedData((data) => ({
                            ...data,
                            email: e.target.innerText,
                          }))
                        }
                      >
                        {data.email}
                      </td>
                      <td
                        className="border border-slate-100 p-4 text-slate-500 dark:text-slate-400 text-sm"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) =>
                          setUpdatedData(() => ({
                            ...data,
                            role: e.target.innerText,
                          }))
                        }
                      >
                        {data.role}
                      </td>
                      <td
                        className="border border-slate-100 p-4 text-slate-500 dark:text-slate-400 text-sm"
                      >
                        <button
                          className="text-red-300"
                          onClick={(e) => deleteUser(e, data.id)}
                        >
                          Delete
                        </button>{" "}
                        {" | "}
                        <button
                          className="text-green-400"
                          onClick={(e) =>
                            updateUser(e, {
                              userId: updatedData.id,
                              name:   updatedData.name,
                              email:   updatedData.email,
                              role:   updatedData.role,
                            })
                          }
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
