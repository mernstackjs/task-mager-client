import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Tasks, { taskLoader } from "./pages/Tasks.jsx";
import CreateTask, { taskAction } from "./pages/Create-Task.jsx";
import Register, { registerAction } from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import ProvideAuth from "./context/authcontext.jsx";
import AccountPage from "./pages/account.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import Mytasks, { myTasksLoader } from "./pages/my-tasks.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <ProvideAuth>
            <App />
          </ProvideAuth>
        }
      >
        <Route index element={<Tasks />} loader={taskLoader} />
        <Route
          path="/register"
          element={<Register />}
          action={registerAction}
        />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/create-task"
            element={<CreateTask />}
            action={taskAction}
          />
          <Route path="/account" element={<AccountPage />} />
          <Route
            path="/my-tasks"
            element={<Mytasks />}
            loader={myTasksLoader}
          />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
