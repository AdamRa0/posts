import { ReactNode, useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import styles from "./applayout.module.css";
import ButtonComponent from "../components/ButtonComponent";
import { MdOutlineSettings, MdCreate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import AuthPage from "../pages/AuthPage";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps): React.JSX.Element {
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
            <MdCreate />
            Login
          </ButtonComponent>
        </div>
        {isModalOpen ? <AuthPage closeModal={handleModal} /> : null}
        {children}
      </div>
    </>
  );
}
