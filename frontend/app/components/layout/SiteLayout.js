"use client";

import styles from "./sitelayout.module.scss";

import { AuthContext } from "@/app/providers/AuthProvider";
import Loader from "../loader/Loader";
import { Header } from "../header/header";
import DesktopSideNav from "../sidenavs/DesktopSideNav";

import { useContext } from "react";

export default function SiteLayout({ children }) {
  const authenticatedUser = useContext(AuthContext);

  if (authenticatedUser === undefined) {
    return (
      <>
        <div className={styles.loadingPageOverlay}>
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <Header authenticatedUser={authenticatedUser} />
      <main className={styles.siteBody}>
        <DesktopSideNav authenticatedUser={authenticatedUser} />
        {children}
      </main>
    </>
  );
}
