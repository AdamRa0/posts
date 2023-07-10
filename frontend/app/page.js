"use client";

import Image from "next/image";
import styles from "./page.module.scss";

import AuthButton from "./components/AuthButton";
import PostsList from "./components/lists/PostsList";
import SquaresList from "./components/lists/SquaresList";
import SvgComponent from "./components/SearchIconComponent";
import InputComponent from "./components/InputComponent";

export default function Home() {
  return (
    <section className={styles.mainBody}>
      <header className={styles.siteHeader}>
        <div className={styles.logoAndSiteName}>
          <Image src="/post.svg" width={36} height={36} alt="Site icon logo" />
          <h1>Posts</h1>
        </div>
        <div className={styles.inputGroup}>
          <span aria-hidden="true">
            <SvgComponent />
          </span>
          <InputComponent type={"search"} placeholder={"Search Posts"} />
        </div>
        <AuthButton text={"Login"} />
      </header>
      <main className={styles.siteBody}>
        <section className={styles.left}>
          <section className={styles.leftUpper}>
            <div>
              <p className={styles.sectionTitle}>Feed</p>
              <SquaresList />
            </div>
            <div>
              <p className={styles.sectionTitle}>Profile</p>
              {/* Show message if unauthenticated, else, show pfp, username, handle, notifications and settings */}
              <p>Sign up now for a personalized square</p>
            </div>
          </section>
          <section className={styles.leftLower}>
            <div>
              <div className={styles.leftLowerUpper}>
                <h2>New to posts?</h2>
                <AuthButton text={"Join Posts"} />
              </div>
              <p>
                By signing up, you agree to our <span>terms of service</span>{" "}
                and <span>privacy policy</span> including{" "}
                <span>cookie use</span>
              </p>
            </div>
          </section>
        </section>
        <section className={styles.right}>
          <PostsList />
        </section>
      </main>
    </section>
  );
}
