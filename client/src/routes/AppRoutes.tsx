import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "@layouts/AppLayout";

import HomePage from "@pages/HomePage";
import UserPage from "@pages/UserPage";
import SettingsPage from "@pages/SettingsPage";
import PostPage from "@pages/PostPage";
import ResetPassword from "@pages/ResetPassword";
import PostContextProvider from "@providers/PostProvider";

const routes = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage />, index: true },
      {
        path: "/user",
        children: [{ path: ":userId", element: <UserPage /> }],
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
            element: (
              <PostContextProvider>
                <PostPage />
              </PostContextProvider>
            ),
          },
        ],
      },
      {
        path: "/reset-password",
        children: [
          {
            path: ":userId",
            element: <ResetPassword />,
          }
        ]
      },
    ],
  },
]);

export default function AppRoutes(): React.JSX.Element {
  return <RouterProvider router={routes} />;
}
