import { useNavigate, useParams } from "react-router-dom";
import {
  MdModeComment,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdArrowBack,
  MdAdd,
} from "react-icons/md";
import styles from "./postpage.module.css";
import React, { useContext, useState } from "react";

import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import { PostContext } from "@contexts/postContext";
import formatNumber from "@helpers/numericalFormatter";
import dateFormatter from "@helpers/dateFormatter";
import AuthPage from "@pages/AuthPage";
import { PostContextProps } from "types/props/PostContextProviderProps";
import { UUID } from "crypto";
import ListComponent from "@/components/ui/ListComponent";
import useFetchImage from "@/hooks/useFetchImage";
import { useGetAuthenticatedUser } from "@/hooks/useGetUser ";

export default function PostPage(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { postId } = useParams();
  const { authenticatedUser: user } = useGetAuthenticatedUser();
  const { post, replies } = useContext<PostContextProps>(PostContext);
  const navigate = useNavigate();

  const comments = replies(postId! as UUID);

  const { image: postImage } = useFetchImage(post.post_file);

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
          <AuthorDetailsComponent authorID={post!.author_id} />
          <p>{dateFormatter(post!.time_created)}</p>
        </div>
        <p>{post!.body}</p>
        {postImage && (
          <img
            className={styles.postImage}
            src={postImage}
            alt="Accompanying post image"
          />
        )}
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
        <div className={styles.commentSection}>
          {(comments === undefined || comments.length === 0) && (
            <p>No Comments Yet</p>
          )}
          {comments !== undefined && (
            <ListComponent data={comments} typeOfData="comment" />
          )}
        </div>
      </div>
      {isModalOpen && user === undefined ? (
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
