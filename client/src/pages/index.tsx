import { createBrowserRouter } from "react-router-dom";
import HomePage from "./home";
import SocketPage from "./socket";

const pages = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/socket",
    element: <SocketPage />,
  },
]);

export default pages;
