"use client";

import styles from "./page.module.scss";

import { faker } from "@faker-js/faker";

import Image from "next/image";

import { Header } from "../components/header/header";
import DesktopSideNav from "../components/sidenavs/DesktopSideNav";
import PostsList from "../components/lists/PostsList";
import Button from "../components/Button";

export default function Profile() {
  const fakeBannerImage = faker.image.url();
  const profileAvatar = faker.internet.avatar();
  const userName = faker.internet.displayName();
  const userHandle = `@${faker.internet.displayName()}`;
  const userBio = "Hello there, new to posts.";

  const profileNavItems = [
    "overview",
    "posts",
    "reposts",
    "subsribers",
    "subscribees",
  ];

  const navItems = profileNavItems.map((item) => (
    <li key={faker.finance.routingNumber()}>
      <p>{item}</p>
    </li>
  ));

  return (
    <>
      <Header />
      <main className={styles.profilePageBody}>
        <DesktopSideNav />
        <section className={styles.profilePageContent}>
          <PostsList />
          <section className={styles.profileDetails}>
            <div className={styles.bannerImage}>
              <Image
                src={fakeBannerImage}
                width={356}
                height={250}
                alt="User banner image"
              />
            </div>
            <div className={styles.profileAvatar}>
              <Image
                src={profileAvatar}
                width={70}
                height={70}
                alt="User profile image"
              />
            </div>
            <Button text={"Subscribe"} />
            <div className={styles.userDetails}>
              <h3 tabIndex={0}>{userName} </h3>
              <h4 tabIndex={0}>{userHandle} </h4>
              <p>{userBio}</p>
            </div>
            <div className={styles.userNetwork}>
              <div>
                <h3>200</h3>
                <p>Subscribers</p>
              </div>
              <div>
                <h3>500</h3>
                <p>Subscribees</p>
              </div>
            </div>
            <nav>
              <ul>{navItems}</ul>
            </nav>
          </section>
        </section>
      </main>
    </>
  );
}
