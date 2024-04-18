import { ReactNode } from "react";
import HeaderComponent from "../components/HeaderComponent";
import styles from "./applayout.module.css";
import ButtonComponent from "../components/ButtonComponent";
import { MdOutlineSettings, MdCreate } from "react-icons/md";
import { NavLink } from "react-router-dom";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps): React.JSX.Element {
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
          <ButtonComponent variant="createPostButton">
            <MdCreate />
            Create Post
          </ButtonComponent>
        </div>
        {children}
      </div>
    </>
  );
}
