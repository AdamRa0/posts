"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.scss";

import AuthButton from "./components/AuthButton";
import PostsList from "./components/lists/PostsList";
import SquaresList from "./components/lists/SquaresList";
import SvgComponent from "./components/SearchIconComponent";
import InputComponent from "./components/InputComponent";
import LogoPlusBrand from "./components/logo-and-brand/LogoPlusBrand";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  console.log(isOpen);

  function handleOnInteractMenu() {
    setIsOpen(!isOpen);
  }

  function handleOnMenuPressEnter(event) {
    if (event.key === "Enter") {
      handleOnInteractMenu();
    }
  }

  return (
    <section className={styles.mainBody}>
      <header className={styles.siteHeader}>
        <div
          className={styles.menuLogo}
          tabIndex={0}
          onClick={() => handleOnInteractMenu()}
          onKeyDown={(event) => handleOnMenuPressEnter(event)}
        >
          <Image
            src={isOpen ? "/close.svg" : "/menu.svg"}
            height={36}
            width={36}
            alt="Menu Icon"
          />
        </div>
        <LogoPlusBrand logoDimens={36} />
        <div className={styles.inputGroup}>
          <span aria-hidden="true">
            <SvgComponent />
          </span>
          <InputComponent type={"search"} placeholder={"Search Posts"} />
        </div>
        <AuthButton
          text={"Login"}
          handleOnClick={() => router.push("/auth/login")}
        />
      </header>
      <main className={styles.siteBody}>
        <section
          className={
            isOpen
              ? `${styles.mobileSideNav} ${styles.active}`
              : styles.mobileSideNav
          }
        >
          <section className={styles.mobileSideNavUpper}>
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
          <section className={styles.mobileSideNavLower}>
            <div>
              <div className={styles.mobileSideNavLowerUpper}>
                <h2>New to posts?</h2>
                <AuthButton
                  text={"Join Posts"}
                  handleOnClick={() => router.push("/auth/signup")}
                />
              </div>
              <p>
                By signing up, you agree to our <span>terms of service</span>{" "}
                and <span>privacy policy</span> including{" "}
                <span>cookie use</span>
              </p>
            </div>
          </section>
        </section>
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
                <AuthButton
                  text={"Join Posts"}
                  handleOnClick={() => router.push("/auth/signup")}
                />
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
          <div className={isOpen ? styles.rightInactive : ""}></div>
          <PostsList />
        </section>
      </main>
    </section>
  );
}
