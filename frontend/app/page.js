"use client";

import styles from "./page.module.scss";
import useGetPosts from "./useGetPosts";
import { useCallback, useRef, useState } from "react";

import AuthButton from "./components/AuthButton";
import SquaresList from "./components/SquaresList";
import SvgComponent from "./components/SearchIconComponent";

export default function Home() {
  const [pageNumber, setPageNumber] = useState(1);

  const { posts, hasMore, loading, error } = useGetPosts({
    pageNumber: pageNumber,
  });

  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((previousPageNo) => previousPageNo + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <section className={styles.mainBody}>
      <header className={styles.siteHeader}>
        <h1>Posts</h1>
        <div className={styles.inputGroup}>
          <span aria-hidden="true">
            <SvgComponent />
          </span>
          <input type="search" placeholder="Search Posts" />
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
          {/* <p>Main content and other pages go here</p> */}
          {posts.map((post, index) => {
            if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post}>
                  {post}
                </div>
              );
            }
            return <div key={post}>{post}</div>;
          })}
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error"}</div>
        </section>
      </main>
    </section>
  );
}
