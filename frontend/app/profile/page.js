"use client";

import styles from "./page.module.scss";

import { Header } from "../components/header/header";
import DesktopSideNav from "../components/sidenavs/DesktopSideNav";
import PostsList from "../components/lists/PostsList";
import ProfileDetailsCard from "../components/cards/ProfileDetailsCard";

import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";

export default function Profile() {
  const authenticatedUser = useContext(AuthContext);

  console.log(`From profile page: ${JSON.stringify(authenticatedUser)}`);

  return (
    <>
      <Header authenticatedUser={authenticatedUser} />
      <main className={styles.profilePageBody}>
        <DesktopSideNav authenticatedUser={authenticatedUser} />
        <section className={styles.profilePageContent} suppressHydrationWarning>
          <section className={styles.profilePosts}>
            <PostsList />
          </section>
          <ProfileDetailsCard user={authenticatedUser} />
        </section>
      </main>
    </>
  );
}
