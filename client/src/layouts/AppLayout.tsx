import { ReactNode } from "react";
import HeaderComponent from "../components/HeaderComponent";
import styles from "./applayout.module.css";

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
      <div className={styles.contentContainer}>{children}</div>
    </>
  );
}
