import React from "react";
import styles from "./postitemcomponent.module.css";
import { postsData } from "../../data/dummyPostsData";
import dateFormatter from "../../helpers/dateFormatter";
import formatNumber from "../../helpers/numericalFormatter";
import ButtonComponent from "../ui/ButtonComponent";

import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdModeComment,
} from "react-icons/md";

type PostItemComponentProps = {
  post: postsData;
};

export default function PostItemComponent({
  post,
}: PostItemComponentProps): React.JSX.Element {
  return (
    <>
      <div className={styles.postHeader}>
        <img
          className={styles.authorAvatar}
          src={post.avatar}
          alt="Post author avatar"
        />
        <div className={styles.postUserDetails}>
          <h4>{post.username}</h4>
          <p>{post.handle}</p>
        </div>
        <p>{dateFormatter(post.timeStamp)}</p>
      </div>
      <p>{post.postContent}</p>
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
          {post.dislikes >= 1000 ? formatNumber(post.dislikes) : post.dislikes}
        </ButtonComponent>
        <ButtonComponent variant="postInteractionButton">
          <MdModeComment />
          {post.numOfComments >= 1000
            ? formatNumber(post.numOfComments)
            : post.numOfComments}
        </ButtonComponent>
      </div>
    </>
  );
}
