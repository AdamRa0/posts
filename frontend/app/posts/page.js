"use client";

import styles from "./page.module.scss";

import { faker } from "@faker-js/faker";

import Image from "next/image";

import PostCardActions from "../components/actions/PostCardActions";
import Button from "../components/buttons/Button";
import SiteLayout from "../components/layout/SiteLayout";

export default function PostPage() {
  const testPost = "Wasyuname";

  return (
    <SiteLayout>
      <section className={styles.postAndCommentSection}>
        <section className={styles.postSection}>
          <div className={styles.postCreatorDetails}>
            <div className={styles.postCreatorAvatar}>
              <Image
                src={faker.internet.avatar()}
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="Post Creator Profile Avatar"
              />
            </div>
            <div className={styles.postCreatorNames}>
              <h3>{"Test User"}</h3>
              <h4>{"@testuser"}</h4>
            </div>
            <h4>4h</h4>
          </div>
          <div className={styles.postContent}>
            <p>{testPost}</p>
            <div className={styles.accompanyingImage}>
              <Image
                src={faker.image.url()}
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                alt="Post Creator Profile Avatar"
              />
            </div>
          </div>
          <PostCardActions />
        </section>
        <section className={styles.commentSection}>
          <Button text={"Add a comment"} />
        </section>
      </section>
    </SiteLayout>
  );
}
