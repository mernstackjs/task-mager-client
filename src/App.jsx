import { Outlet } from "react-router-dom";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <div>
      <Header />

      <main className="md:p-12 p-3">
        <Outlet />
      </main>

      <ToastContainer />
    </div>
  );
}
