"use client";

import styles from "./page.module.scss";

import PostsList from "../components/lists/PostsList";
import ProfileDetailsCard from "../components/cards/ProfileDetailsCard";

import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
import SiteLayout from "../components/layout/SiteLayout";

export default function Profile() {
  const authenticatedUser = useContext(AuthContext);

  return (
    <SiteLayout>
      <section className={styles.profilePageContent}>
        <section className={styles.profilePosts}>
          <PostsList />
        </section>
        <ProfileDetailsCard user={authenticatedUser} />
      </section>
    </SiteLayout>
  );
}
