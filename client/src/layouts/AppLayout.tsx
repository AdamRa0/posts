import { ReactNode } from "react";
import HeaderComponent from "../components/HeaderComponent";
import styles from "./applayout.module.css";
import ButtonComponent from "../components/ButtonComponent";
import { MdOutlineSettings, MdCreate } from "react-icons/md";

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
          <ButtonComponent variant="settingsButton">
            <MdOutlineSettings />
            Settings
          </ButtonComponent>
          <ButtonComponent variant="createPostButton">
            <MdCreate />
            Login
          </ButtonComponent>
        </div>
        {children}
      </div>
    </>
  );
}
