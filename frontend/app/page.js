"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import useGetPosts from "./useGetPosts";
import { useCallback, useEffect, useRef, useState } from "react";

const SvgComponent = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 -960 960 960"
  >
    <path
      fill="#00000040"
      d="M796-121 533-384q-30 26-69.959 40.5T378-329q-108.162 0-183.081-75Q120-479 120-585t75-181q75-75 181.5-75t181 75Q632-691 632-584.85 632-542 618-502q-14 40-42 75l264 262-44 44ZM377-389q81.25 0 138.125-57.5T572-585q0-81-56.875-138.5T377-781q-82.083 0-139.542 57.5Q180-666 180-585t57.458 138.5Q294.917-389 377-389Z"
    />
  </svg>
);

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
        <button className={styles.authButton}>Login</button>
      </header>
      <main className={styles.siteBody}>
        <section className={styles.left}>
          <section className={styles.leftUpper}>
            <div>
              <p className={styles.sectionTitle}>Feed</p>
              <li>
                <ul>
                  <div className={styles.listItem} tabIndex={0}>
                    <Image
                      src="/public.svg"
                      width={36}
                      height={36}
                      alt="Public square icon"
                    />
                    <p>Public Square</p>
                  </div>
                </ul>
                <ul>
                  <div className={styles.listItem} tabIndex={0}>
                    <Image
                      src="/community.svg"
                      width={36}
                      height={36}
                      alt="Public square icon"
                    />
                    <p>Private Square</p>
                  </div>
                </ul>
              </li>
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
                <button className={styles.authButton}>Join Posts</button>
              </div>
              <p>
                By signing up, you agree to our <span>terms of service</span>
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
