import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";
import SettingsPage from "../pages/SettingsPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<HomePage />} />
        <Route path="/user" element={<UserPage />}/>
        <Route path="/settings" element={<SettingsPage />}/>
      </Routes>
    </BrowserRouter>
  );
}
