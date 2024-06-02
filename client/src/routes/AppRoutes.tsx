import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import SettingsPage from "../pages/SettingsPage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    index: true,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
]);

export default function AppRoutes() {
  return (
    <RouterProvider router={routes}/>
  );
}
