import {
  MdModeComment,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdArrowBack,
  MdAdd,
} from "react-icons/md";
import styles from "./postpage.module.css";

import ButtonComponent from "@components/ui/ButtonComponent";
import formatNumber from "@helpers/numericalFormatter";
import dateFormatter from "@helpers/dateFormatter";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { authContextProp } from "types/props/AuthContextProps";
import { AuthContext } from "@contexts/authContext";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import AuthPage from "@pages/AuthPage";
import useFetchPost from "@hooks/useFetchPost";
import PostForm from "@components/feature/forms/PostForm";

export default function PostPage(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { user } = useContext<authContextProp>(AuthContext);
  const navigate = useNavigate();
  const { postId } = useParams();
  const { post, postImage } = useFetchPost(postId!);

  const CREATE_COMMENT_ROUTE: string = `/api/v1/posts/${postId!}/create-comment`;

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handleBackNavigation(): void {
    navigate(-1);
  }

  if (post === undefined)
    return (
      <div className={styles.contentContainer}>
        <p>Loading...</p>
      </div>
    );

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
          <AuthorDetailsComponent authorID={post.author_id} />
          <p>{dateFormatter(post!.time_created)}</p>
        </div>
        <p>{post!.body}</p>
        {postImage ? (
          <img
            className={styles.postImage}
            src={postImage}
            alt="Accompanying post image"
          />
        ) : null}
        <div className={styles.postInteractionButtons}>
          <ButtonComponent variant="postInteractionButton">
            <MdOutlineThumbUp />
            {post!.approvals >= 1000
              ? formatNumber(post!.approvals)
              : post!.approvals}
          </ButtonComponent>
          <ButtonComponent variant="postInteractionButton">
            <MdOutlineThumbDown />
            {post!.disapprovals >= 1000
              ? formatNumber(post!.disapprovals)
              : post!.disapprovals}
          </ButtonComponent>
          <ButtonComponent variant="postInteractionButton">
            <MdModeComment />
            {post!.comments >= 1000
              ? formatNumber(post!.comments)
              : post!.comments}
          </ButtonComponent>
        </div>
        <div>
          <ButtonComponent variant="addCommentButton" onClick={handleModal}>
            <MdAdd size={20} />
            Add Comment
          </ButtonComponent>
        </div>
        <div className={styles.commentSection}>No Comments Yet</div>
      </div>
      {isModalOpen && user === null ? (
        <AuthPage closeModal={handleModal} />
      ) : null}
      {isModalOpen && user ? (
        <>
          <PostForm
            handleFormModal={handleModal}
            formActionRoute={CREATE_COMMENT_ROUTE}
            buttonName="Create Comment"
          />
        </>
      ) : null}
    </>
  );
}
