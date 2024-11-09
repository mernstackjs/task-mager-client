import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/authcontext";

export default function Login() {
  const { login } = useAuth(); // Access login function from context
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch(
      "https://task-manager-api-8lyb.onrender.com/api/auth/login",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      toast.error(errorData.message);
      return;
    }

    const data = await res.json();
    login(data); // Update context with user data
    toast.success(data.message);
    navigate("/create-task"); // Redirect to create-task page
  };

  return (
    <div>
      <div className="border md:w-3/5 m-auto p-8">
        <h1 className="text-2xl mb-3">Login Form</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Enter your username"
              className="w-full p-3 border my-3"
              id="username"
              name="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="w-full border p-3 my-3"
              placeholder="Enter your password"
              id="password"
              name="password"
            />
          </div>

          <button
            type="submit"
            className="px-3 py-2 bg-blue-700 text-white text-lg mt-5 mb-3 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
