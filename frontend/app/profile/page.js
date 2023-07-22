"use client";

import styles from "./page.module.scss";

import { Header } from "../components/header/header";
import DesktopSideNav from "../components/sidenavs/DesktopSideNav";
import PostsList from "../components/lists/PostsList";
import ProfileDetailsCard from "../components/cards/ProfileDetailsCard";

export default function Profile() {
  return (
    <>
      <Header />
      <main className={styles.profilePageBody}>
        <DesktopSideNav />
        <section className={styles.profilePageContent} suppressHydrationWarning>
          <section className={styles.profilePosts}>
            <PostsList />
          </section>
          <ProfileDetailsCard />
        </section>
      </main>
    </>
  );
}
