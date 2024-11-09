import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

export const myTasksLoader = async () => {
  const res = await fetch(
    "https://task-manager-api-8lyb.onrender.com/api/task/my-tasks",
    {
      credentials: "include",
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
  return data;
};

export default function Mytasks() {
  const data = useLoaderData();
  const [activeTab, setActiveTab] = useState("all"); // Track active tab

  // Categorize tasks by priority
  const highPriorityTasks = data?.tasks?.filter(
    (task) => task.priority === "High"
  );
  const middlePriorityTasks = data?.tasks?.filter(
    (task) => task.priority === "Middle"
  );
  const lowPriorityTasks = data?.tasks?.filter(
    (task) => task.priority === "Low"
  );

  // Get tasks based on the active tab
  const filteredTasks =
    activeTab === "high"
      ? highPriorityTasks
      : activeTab === "middle"
      ? middlePriorityTasks
      : activeTab === "low"
      ? lowPriorityTasks
      : data?.tasks; // Default to show all tasks

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-6">My Tasks</h1>

      {/* Tab Navigation */}
      <div className="mb-4 flex space-x-4 justify-center">
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            activeTab === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("all")}
        >
          All Tasks
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            activeTab === "high" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("high")}
        >
          High Priority
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            activeTab === "middle" ? "bg-yellow-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("middle")}
        >
          Middle Priority
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            activeTab === "low" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("low")}
        >
          Low Priority
        </button>
      </div>

      {/* Task Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTasks?.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {task.title}
            </h2>
            <p className="text-sm text-gray-600 mb-4">{task.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <span
                className={`px-3 py-1 rounded-full text-white text-sm ${
                  task.priority === "High"
                    ? "bg-red-500"
                    : task.priority === "Middle"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <p className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
