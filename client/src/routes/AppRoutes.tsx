import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "@pages/HomePage";
import UserPage from "@pages/UserPage";
import SettingsPage from "@pages/SettingsPage";
import PostPage from "@pages/PostPage";
import AppLayout from "@layouts/AppLayout";
import PostContextProvider from "@providers/PostProvider";

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
            element: (
              <PostContextProvider>
                <PostPage />
              </PostContextProvider>
            ),
          },
        ],
      },
    ],
  },
]);

export default function AppRoutes(): React.JSX.Element {
  return <RouterProvider router={routes} />;
}
