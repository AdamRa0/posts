import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import styles from "./applayout.module.css";
import { provideDummyPosts, postsData } from "../data/dummyPostsData";
import dateFormatter from "../helpers/dateFormatter";

function PostsList(posts: { posts: postsData[] }): React.JSX.Element {
  const postItems = posts.posts.map((post) => (
    <li key={post.id}>
      <div>
        <div className={styles.postHeader}>
          <img
            className={styles.authorAvatar}
            src={post.avatar}
            alt="Post author avatar"
          />
          <h4>{post.username}</h4>
          <p>{post.handle}</p>
          <p>{dateFormatter(post.timeStamp)}</p>
        </div>
        {post.postContent}
        {post.postImage ? (
          <img src={post.postImage} alt="Accompanying post image" />
        ) : null}
        <div>
          {post.likes}
          {post.dislikes}
          {post.numOfComments}
        </div>
      </div>
    </li>
  ));
  return (
    <>
      <ul className={styles.postList}>{postItems}</ul>
    </>
  );
}

export default function AppLayout(): React.JSX.Element {
  const dummyPostData: postsData[] = provideDummyPosts();

  return (
    <>
      <div className={styles.header}>
        <HeaderComponent />
      </div>
      <div className={styles.contentContainer}>
        <PostsList posts={dummyPostData} />
      </div>
    </>
  );
}
