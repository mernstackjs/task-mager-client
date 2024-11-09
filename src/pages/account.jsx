import { useAuth } from "../context/authcontext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(
    user?.user?.username || ""
  );
  const [updatedEmail, setUpdatedEmail] = useState(user?.user?.email || "");

  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("username", updatedUsername);
    formData.append("email", updatedEmail);
    formData.append("profilePicture", profilePic);

    try {
      const res = await fetch("http://localhost:3000/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.message);
        return;
      }

      const updatedData = await res.json();
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Account Information
      </h1>

      {/* Display User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-4">
          <img
            src={user?.user?.profilePicture || "/default-profile-pic.jpg"}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {user?.user?.username}
          </h2>
          <button
            className="text-sm text-blue-500"
            onClick={() => setIsEditing((prev) => !prev)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
        <p className="text-sm text-gray-600">Email: {user?.user?.email}</p>
        <p className="text-sm text-gray-600">Role: {user?.user?.role}</p>
      </div>

      {/* Edit Profile Form */}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Edit Your Profile
          </h3>

          {/* Profile Picture */}
          <div className="mb-4">
            <label
              className="block text-sm text-gray-600"
              htmlFor="profilePicture"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full p-3 border rounded-md"
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={updatedUsername}
              onChange={(e) => setUpdatedUsername(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="Enter your new username"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm text-gray-600" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="Enter your new email"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      )}

      {/* Logout Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
