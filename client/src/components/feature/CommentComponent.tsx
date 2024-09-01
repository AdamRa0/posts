import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdModeComment,
  MdOutlineRepeat,
  MdDelete,
} from "react-icons/md";
import React, { useState } from "react";

import styles from "./commentcomponent.module.css";
import ListComponent from "../ui/ListComponent";

import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";

import dateFormatter from "@helpers/dateFormatter";
import formatNumber from "@helpers/numericalFormatter";
import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";
import useFetchImage from "@hooks/useFetchImage";
import { useGetAuthenticatedUser } from "@hooks/useGetUser ";
import useDeletePost from "@hooks/useDeletePost";

import AuthPage from "@pages/AuthPage";
import approvePostService from "@services/posts/approvePostService";
import disapprovePostService from "@services/posts/disapprovePostService";
import repostPostService from "@services/posts/repostPostService";

import { PostData } from "types/data/postData";

type CommentComponentProps = {
  post: PostData;
};

export default function CommentComponent({
  post,
}: CommentComponentProps): React.JSX.Element {
  const postAuthor = useFetchPostAuthorDetails(post.author_id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showReplies, setShowReplies] = useState<boolean>(false);
  const { authenticatedUser } = useGetAuthenticatedUser();

  const CREATE_COMMENT_ROUTE: string = `/api/v1/posts/${post.id}/create-comment`;

  const { image } = useFetchImage(post.post_file!);
  const { deletePost } = useDeletePost();

  function handleModal() {
    setIsModalOpen(!isModalOpen);
  }

  function handlePostInterraction(action: string) {
    if (authenticatedUser === undefined) {
      handleModal();
      return;
    }

    switch (action) {
      case "approve":
        approvePostService(post.id);
        break;

      case "delete":
        deletePost({ postId: post.id });
        break;

      case "disapprove":
        disapprovePostService(post.id);
        break;

      case "reply":
        handleModal();
        break;

      case "repost":
        repostPostService(post.id);
        break;

      default:
        break;
    }
  }

  function handleShowReplies() {
    setShowReplies(!showReplies);
  }

  return (
    <>
      <div className={styles.postHeader}>
        {postAuthor === undefined ? (
          <p>Loading...</p>
        ) : (
          <AuthorDetailsComponent authorID={post.author_id} />
        )}
        <p>{dateFormatter(post.time_created)}</p>
      </div>
      <p>{post.body}</p>
      {post.post_file ? (
        <img
          className={styles.postImage}
          src={image}
          alt="Accompanying post image"
        />
      ) : null}
      <div className={styles.postInteractionButtons}>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("approve")}
        >
          <MdOutlineThumbUp />
          {post.approvals >= 1000
            ? formatNumber(post.approvals)
            : post.approvals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("disapprove")}
        >
          <MdOutlineThumbDown />
          {post.disapprovals >= 1000
            ? formatNumber(post.disapprovals)
            : post.disapprovals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("repost")}
        >
          <MdOutlineRepeat />
          {post.reposts
            ? post.reposts >= 1000
              ? formatNumber(post.reposts)
              : post.reposts
            : 0}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("reply")}
        >
          <MdModeComment />
          Reply
        </ButtonComponent>
        {authenticatedUser && authenticatedUser.id === post.author_id && (
          <ButtonComponent
            variant="postInteractionButton"
            onClick={() => handlePostInterraction("delete")}
          >
            <MdDelete style={{ color: "red" }} />
          </ButtonComponent>
        )}
      </div>
      {post.children!.length > 0 && (
        <ButtonComponent variant="linkButton" onClick={handleShowReplies}>
          {showReplies ? "Hide Replies" : "Show Replies"}
        </ButtonComponent>
      )}
      {showReplies && (
        <div className={styles.nestedComment}>
          <ListComponent
            data={post.children as PostData[]}
            typeOfData="comment"
          />
        </div>
      )}
      {isModalOpen && !authenticatedUser && (
        <AuthPage closeModal={handleModal} />
      )}
      {isModalOpen && authenticatedUser && (
        <PostForm
          handleFormModal={handleModal}
          formActionRoute={CREATE_COMMENT_ROUTE}
          buttonName="Reply"
        />
      )}
    </>
  );
}
