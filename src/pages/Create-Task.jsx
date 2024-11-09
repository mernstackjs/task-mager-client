import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
export const taskAction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const desc = formData.get("desc");
  const priority = formData.get("priority");

  const res = await fetch(
    "https://task-manager-api-8lyb.onrender.com/api/task",
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        title,
        desc,
        priority,
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
  return redirect("/");
};

export default function CreateTask() {
  return (
    <div>
      <div className="border md:w-3/5  m-auto p-8">
        <h1 className="text-2xl mb-3">Create Task</h1>
        <Form method="post">
          <div>
            <label htmlFor="title">Task</label>
            <input
              placeholder="Enter here your title"
              className="w-full p-3 border my-3"
              id="title"
              name="title"
            />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <textarea
              className="w-full border p-3 h-52 my-3"
              placeholder="Enter here your description"
              id="desc"
              name="desc"
            />
          </div>
          <div>
            <h1 className="mb-3">Choose Priority</h1>
            <div className="flex gap-2">
              <input type="radio" id="low" name="priority" value="Low" />
              <label htmlFor="low">Low</label>
            </div>
            <div className="flex my-1 gap-2">
              <input type="radio" id="middle" name="priority" value="Middle" />
              <label htmlFor="middle">Middle</label>
            </div>
            <div className="flex gap-2">
              <input type="radio" id="high" name="priority" value="High" />
              <label htmlFor="high">High</label>
            </div>
          </div>
          <button
            type="submit"
            className="px-3 py-2 bg-blue-700 text-white text-lg mt-5 mb-3 rounded-md"
          >
            Add Task
          </button>
        </Form>
      </div>
    </div>
  );
}
