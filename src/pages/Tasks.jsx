import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
export const taskLoader = async () => {
  const res = await fetch(
    "https://task-manager-api-8lyb.onrender.com/api/task",
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

  return data;
};

export default function Tasks() {
  const data = useLoaderData();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold text-center mb-6">All Tasks</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.tasks?.map((task) => (
          <div
            key={task._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {task.title}
            </h2>
            <h3 className="text-lg font-medium text-gray-600 mb-3">
              Owner: {task.owner.username}
            </h3>
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
