import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";
import { useState } from "react";

export default function Header() {
  const { user, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (loading) return <div>Loading...</div>;

  return (
    <header className="flex justify-between items-center p-3 border-b bg-white">
      <h1 className="text-lg font-semibold">Logo</h1>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-5">
        <Link to="/">Tasks</Link>
        {!user ? (
          <div className="flex gap-3">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div className="flex gap-3 items-center">
            <Link to="/create-task">Create Task</Link>
            <Link to="/my-tasks">My Tasks</Link>
            <Link to="/account">Account</Link>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md md:hidden p-5 z-10">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block mb-3"
          >
            Tasks
          </Link>

          {!user ? (
            <div className="flex flex-col gap-3">
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/create-task" onClick={() => setMenuOpen(false)}>
                Create Task
              </Link>
              <Link to="/my-tasks" onClick={() => setMenuOpen(false)}>
                My Tasks
              </Link>
              <Link to="/account" onClick={() => setMenuOpen(false)}>
                Account
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-500 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      )}
    </header>
  );
}
