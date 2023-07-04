"use client";

import Navbar from "@/components/navbar";
import styles from "./page.module.scss";
import AuthRight from "@/components/sidenavs/authRight";
import SideNav from "@/components/sidenavs/sidenav";
import UnauthRight from "@/components/sidenavs/unauthRight";
import { useState } from "react";
import arrOfPosts from "@/dev-data";
import Image from "next/image";

function PostsList() {
  const postItems = arrOfPosts.map((post) => (
    <li key={post.postId}>
      <div className={styles.postHeader}>
        <div className={styles.profileAvatarContainer}>
          <Image
            src={post.profileAvatar}
            alt="User profile image"
            width={70}
            height={70}
          />
        </div>
        <div className={styles.usernameHandleContainer}>
          <h2>{post.username}</h2>
          <h3>{post.handle}</h3>
        </div>
        <div>
          <h3 className={styles.timeStamp}>1hr</h3>
        </div>
      </div>
      <div className={styles.postContainer}>
        <p>{post.post}</p>
        {post.image ? (
          <Image
            src={post.image}
            alt="Accompanying post image"
            width={600}
            height={600}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div className={styles.actionButtons}>
        <Image
          src="/approve.svg"
          alt="Approve post icon"
          width={48}
          height={48}
        />
        <p>{post.approvals}</p>
        <Image
          src="/disapprove.svg"
          alt="Disapprove post icon"
          width={48}
          height={48}
        />
        <p>{post.disapprovals}</p>
        <Image
          src="/repost.svg"
          alt="Repost post icon"
          width={48}
          height={48}
        />
        <p>{post.reposts}</p>
        <Image
          src="/comment.svg"
          alt="Comment post icon"
          width={48}
          height={48}
        />
        <p>{post.comments}</p>
      </div>
    </li>
  ));

  return <ul>{postItems}</ul>;
}

export default function Home() {
  const testUser = {
    username: "WittyUsername",
    handle: "@wittyusername",
  };

  const [authenticated, setAuthentiated] = useState(true);

  return (
    <div className={styles.homeDisplay}>
      <Navbar>
        <h2>Public Square</h2>
      </Navbar>
      <SideNav />
      <section className={styles.homeMiddle}>
        <PostsList />
      </section>
      {authenticated ? (
        <AuthRight
          user={testUser}
          onButtonClick={() => setAuthentiated(false)}
        />
      ) : (
        <UnauthRight onButtonClick={() => setAuthentiated(true)} />
      )}
    </div>
  );
}
