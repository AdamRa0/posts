"use client";

import styles from "./page.module.scss";
import { Header } from "./components/header/header";
import PostsList from "./components/lists/PostsList";
import DesktopSideNav from "./components/sidenavs/DesktopSideNav";

import { AuthContext } from "./providers/AuthProvider";

import { useContext } from "react";

export default function Home() {
  const authenticatedUser = useContext(AuthContext);

  return (
    <>
      <Header authenticatedUser={authenticatedUser} />
      <section className={styles.mainBody}>
        <main className={styles.siteBody}>
          <DesktopSideNav authenticatedUser={authenticatedUser} />
          <section className={styles.right}>
            <PostsList />
          </section>
        </main>
      </section>
    </>
  );
}
