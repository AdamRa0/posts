"use client";

import styles from "./page.module.scss";

import { Header } from "../components/header/header";
import DesktopSideNav from "../components/sidenavs/DesktopSideNav";

export default function Profile() {
  return (
    <>
      <Header />
      <main className={styles.profilePageBody}>
        <DesktopSideNav />
        <section className={styles.profilePageContent}></section>
      </main>
    </>
  );
}
