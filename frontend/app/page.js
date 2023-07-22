"use client";

import styles from "./page.module.scss";
import { Header } from "./components/header/header";
import PostsList from "./components/lists/PostsList";
import DesktopSideNav from "./components/sidenavs/DesktopSideNav";

export default function Home() {
  return (
    <>
      <Header />
      <section className={styles.mainBody}>
        <main className={styles.siteBody}>
          <DesktopSideNav />
          <section className={styles.right}>
            <PostsList />
          </section>
        </main>
      </section>
    </>
  );
}
