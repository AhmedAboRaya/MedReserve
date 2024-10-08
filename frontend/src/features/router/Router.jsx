import { createBrowserRouter } from "react-router-dom";
import Home from "../user/home/Home";

import Login from "../../features/login/Login";
import SignUp from "../../features/sign-up/SignUp";
import Layout from "../layout/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "about",
        element: <Home />,
      },
      {
        path: "services",
        element: <Home />,
      },
      {
        path: "experts",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

export default router;
