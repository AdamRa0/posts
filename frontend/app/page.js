"use client";

import styles from "./page.module.scss";
import PostsList from "./components/lists/PostsList";
import SiteLayout from "./components/layout/SiteLayout";

export default function Home() {
  return (
    <SiteLayout>
      <section className={styles.right}>
        <PostsList />
      </section>
    </SiteLayout>
  );
}
