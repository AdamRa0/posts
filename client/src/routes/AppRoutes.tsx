import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import SettingsPage from "../pages/SettingsPage";
import AppLayout from "../layouts/AppLayout";
import PostPage from "../pages/PostPage";
import React from "react";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
      {
        path: "/post",
        children: [
          {
            path: ":postId",
            element: <PostPage />,
          },
        ],
      },
    ],
  },
]);

export default function AppRoutes(): React.JSX.Element {
  return <RouterProvider router={routes} />;
}
