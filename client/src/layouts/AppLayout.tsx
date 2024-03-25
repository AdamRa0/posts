import React from "react";
import HeaderComponent from "../components/HeaderComponent";
import styles from "./applayout.module.css";
import { provideDummyPosts, postsData } from "../data/dummyPostsData";
import dateFormatter from "../helpers/dateFormatter";
import formatNumber from "../helpers/numericalFormatter";
import ButtonComponent from "../components/ButtonComponent";

import {
  MdOutlineThumbUp,
  MdOutlineThumbDown,
  MdModeComment,
} from "react-icons/md";

function PostsList(posts: { posts: postsData[] }): React.JSX.Element {
  const postItems = posts.posts.map((post) => (
    <li key={post.id}>
      <div className={styles.postItem} tabIndex={0}>
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
          <img
            className={styles.postImage}
            src={post.postImage}
            alt="Accompanying post image"
          />
        ) : null}
        <div className={styles.postInteractionButtons}>
          <ButtonComponent variant="postInteractionButton">
            <MdOutlineThumbUp />
            {post.likes >= 1000 ? formatNumber(post.likes) : post.likes}
          </ButtonComponent>
          <ButtonComponent variant="postInteractionButton">
            <MdOutlineThumbDown />
            {post.dislikes >= 1000
              ? formatNumber(post.dislikes)
              : post.dislikes}
          </ButtonComponent>
          <ButtonComponent variant="postInteractionButton">
            <MdModeComment />
            {post.numOfComments >= 1000
              ? formatNumber(post.numOfComments)
              : post.numOfComments}
          </ButtonComponent>
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
