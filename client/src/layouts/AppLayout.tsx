import { useState } from "react";
import HeaderComponent from "../components/ui/HeaderComponent";
import styles from "./applayout.module.css";
import ButtonComponent from "../components/ui/ButtonComponent";
import { MdOutlineSettings, MdLogin } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import AuthPage from "../pages/AuthPage";

export default function AppLayout(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div className={styles.header}>
        <HeaderComponent />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.someImportantButtons}>
          <NavLink className={styles.settingsLink} to="/settings">
            <MdOutlineSettings />
            Settings
          </NavLink>
          <ButtonComponent onClick={handleModal} variant="createPostButton">
            <MdLogin />
            Login
          </ButtonComponent>
        </div>
        {isModalOpen ? <AuthPage closeModal={handleModal} /> : null}
        <Outlet />
      </div>
    </>
  );
}
