import {
  createBrowserRouter,
} from "react-router-dom";
import Home from "../user/home/Home";

import Login from "../../features/login/Login";
import SignUp from "../../features/sign-up/SignUp";
const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login /> ,
    },
    {
        path: "/signup",
        element: <SignUp /> ,
      },
    {
        path: "/home",
        element: <Home /> ,
    },
  ]);

export default router