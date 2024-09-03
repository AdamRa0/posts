import {
  MdModeComment,
  MdOutlineRepeat,
  MdDelete,
  MdOutlineRepeatOn,
  MdOutlineThumbDownAlt,
  MdOutlineThumbUpAlt,
  MdThumbDown,
  MdThumbUp,
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
import {
  useApprovePost,
  useUnapprovePost,
} from "@hooks/useApproveUnApprovePost";
import {
  useDispprovePost,
  useUndisapprovePost,
} from "@hooks/usedisapproveUnDisapprovePost";
import { useRemoveRepost, useRepost } from "@hooks/useRepostRemoveRepost";

import AuthPage from "@pages/AuthPage";

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
  const { approve } = useApprovePost();
  const { unapprove } = useUnapprovePost();
  const { disapprove } = useDispprovePost();
  const { undisapprove } = useUndisapprovePost();
  const { repost } = useRepost();
  const { removeRepost } = useRemoveRepost();

  const postLiked = post.liked_by.find(
    (userLiked) => userLiked.id === authenticatedUser.id
  );
  const postDisliked = post.disliked_by.find(
    (userDisliked) => userDisliked.id === authenticatedUser.id
  );
  const postReposted = post.reposted_by.find(
    (userReposted) => userReposted.id === authenticatedUser.id
  );

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
        postLiked ? unapprove(post.id) : approve(post.id);
        break;

      case "delete":
        deletePost({ postId: post.id });
        break;

      case "disapprove":
        postDisliked ? undisapprove(post.id) : disapprove(post.id);
        break;

      case "repost":
        postReposted ? removeRepost(post.id) : repost(post.id);
        break;

      case "reply":
        handleModal();
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
          disabled={postDisliked}
        >
          {postLiked ? <MdThumbUp /> : <MdOutlineThumbUpAlt />}
          {post.approvals >= 1000
            ? formatNumber(post.approvals)
            : post.approvals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("disapprove")}
          disabled={postLiked}
        >
          {authenticatedUser && postDisliked ? (
            <MdThumbDown />
          ) : (
            <MdOutlineThumbDownAlt />
          )}
          {post.disapprovals >= 1000
            ? formatNumber(post.disapprovals)
            : post.disapprovals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={() => handlePostInterraction("repost")}
        >
          {authenticatedUser && postReposted ? (
            <MdOutlineRepeatOn />
          ) : (
            <MdOutlineRepeat />
          )}
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
