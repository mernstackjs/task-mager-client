import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
export const registerAction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const res = await fetch(
    "https://task-manager-api-8lyb.onrender.com/api/auth/register",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log(errorData);
    toast.error(errorData.message);
    return errorData;
  }
  const data = await res.json();
  console.log(data);
  toast.success(data.message);

  return redirect("/login");
};
export default function Register() {
  return (
    <div>
      <div className="border md:w-3/5  m-auto p-8">
        <h1 className="text-2xl mb-3">Register Form</h1>
        <Form method="post">
          <div>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Enter here your username"
              className="w-full p-3 border my-3"
              id="username"
              name="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="w-full border p-3 my-3"
              placeholder="Enter here your password"
              id="password"
              name="password"
            />
          </div>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-700 text-white text-lg mt-5 mb-3 rounded-md"
          >
            Register
          </button>
        </Form>
      </div>
    </div>
  );
}
