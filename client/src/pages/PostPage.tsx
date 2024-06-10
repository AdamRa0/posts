import {
  MdModeComment,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdArrowBack,
  MdAdd,
} from "react-icons/md";
import { postsData, provideDummyPosts } from "../data/dummyPostsData";
import styles from "@pages/postpage.module.css";
import ButtonComponent from "@components/ui/ButtonComponent";
import formatNumber from "@helpers/numericalFormatter";
import dateFormatter from "@helpers/dateFormatter";
import { useNavigate } from "react-router-dom";
import React from "react";

const post: postsData = provideDummyPosts()[0];

export default function PostPage(): React.JSX.Element {
  const navigate = useNavigate();

  function handleBackNavigation(): void {
    navigate(-1);
  }

  return (
    <>
      <div className={styles.contentContainer}>
        <div className={styles.postHeader}>
          <ButtonComponent
            variant="postBackButton"
            onClick={handleBackNavigation}
          >
            <MdArrowBack size={24} />
          </ButtonComponent>
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
        <div>
          <ButtonComponent variant="addCommentButton">
            <MdAdd size={20}/>
            Add Comment
          </ButtonComponent>
        </div>
        <div className={styles.commentSection}>
          No Comments Yet
        </div>
      </div>
    </>
  );
}
