import { createBrowserRouter, Navigate } from "react-router-dom";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import AccountLayout from "../layouts/account";
import React from "react";
import ProtectedRoute from "./ProtectedRoute";
import News from "../pages/news";
import Logout from "../pages/logout";
import Dashboard from "../pages/dashboard"; // Import the Dashboard component

import Matches from "../pages/matches";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/signin" replace /> },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path:"/logout",
    element: <Logout />
  },       
  {
    path: "account",
    element: (
      <ProtectedRoute>
        <AccountLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/account/news" replace /> },
      {
        path: "dashboard",
        element: <Dashboard />, // Use the Dashboard component here
      },
      {
        path: "news",
        element: <News />, // Add the News component for the news section
      },
      {
        path: "matches",
        element: <Matches />, // Add the News component for the news section
      },
    ],
  },
]);

export default router;
