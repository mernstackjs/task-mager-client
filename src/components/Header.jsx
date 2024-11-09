import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

export default function Header() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <header className="flex justify-between items-center p-3 border">
      <h1>Logo</h1>
      <nav className="flex gap-5">
        <Link to="/">Tasks</Link>

        {!user ? (
          <div className="flex gap-3">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/create-task">Create Task</Link>
            <Link to="/my-tasks">My-Tasks</Link>
            <Link to="/account">Account</Link>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
