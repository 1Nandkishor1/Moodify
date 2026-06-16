import { createBrowserRouter } from "react-router-dom";
import Register from "./Features/auth/pages/Register";
import Login from "./Features/auth/pages/Login";
import Protected from "./Features/auth/pages/Protected";
import Home from "./Features/Home/pages/Home";

const routes = createBrowserRouter([
  {
    path: "/home",
    element: <Protected><Home/></Protected>
  },
  {
    path: "/",
    element: <Protected><Home/></Protected>
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

export default routes;