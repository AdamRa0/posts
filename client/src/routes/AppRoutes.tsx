import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import SettingsPage from "../pages/SettingsPage";
import AppLayout from "../layouts/AppLayout";
import PostPage from "../pages/PostPage";
import NewPostPage from "../pages/NewPostPage";

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
          {
            path: "new",
            element: <NewPostPage />,
          },
        ],
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={routes} />;
}
