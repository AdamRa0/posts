import styles from "./postpage.module.css";
import { UUID } from "crypto";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdModeComment,
  MdArrowBack,
  MdAdd,
  MdDelete,
  MdOutlineThumbUpAlt,
  MdOutlineThumbDownAlt,
  MdOutlineRepeatOn,
  MdOutlineRepeat,
  MdThumbDown,
  MdThumbUp,
} from "react-icons/md";
import React, { useContext, useState } from "react";

import ButtonComponent from "@components/ui/ButtonComponent";
import PostForm from "@components/feature/forms/PostForm";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";
import ListComponent from "@components/ui/ListComponent";

import { PostContext } from "@contexts/postContext";

import formatNumber from "@helpers/numericalFormatter";
import dateFormatter from "@helpers/dateFormatter";

import {
  useApprovePost,
  useUnapprovePost,
} from "@hooks/useApproveUnApprovePost";
import {
  useDispprovePost,
  useUndisapprovePost,
} from "@hooks/usedisapproveUnDisapprovePost";
import { useRemoveRepost, useRepost } from "@hooks/useRepostRemoveRepost";
import useFetchImage from "@hooks/useFetchImage";
import { useGetAuthenticatedUser } from "@hooks/useGetUser ";

import AuthPage from "@pages/AuthPage";

import { PostContextProps } from "types/props/PostContextProviderProps";

export default function PostPage(): React.JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { postId } = useParams();
  const { authenticatedUser: user } = useGetAuthenticatedUser();
  const { post, replies, deletePost } =
    useContext<PostContextProps>(PostContext);
  const navigate = useNavigate();

  const CREATE_COMMENT_ROUTE: string = `/api/v1/posts/${postId!}/create-comment`;

  const comments = replies(postId! as UUID);

  const { image: postImage } = useFetchImage(post?.post_file);

  const { approve } = useApprovePost();
  const { unapprove } = useUnapprovePost();
  const { disapprove } = useDispprovePost();
  const { undisapprove } = useUndisapprovePost();
  const { repost } = useRepost();
  const { removeRepost } = useRemoveRepost();

  const postLiked = post?.liked_by.find(
    (userLiked) => userLiked.id === user.id
  );
  const postDisliked = post?.disliked_by.find(
    (userDisliked) => userDisliked.id === user.id
  );
  const postReposted = post?.reposted_by.find(
    (userReposted) => userReposted.id === user.id
  );

  function handlePostInterraction(action: string) {
    if (user === undefined) {
      handleModal();
      return;
    }

    switch (action) {
      case "approve":
        postLiked ? unapprove(post?.id) : approve(post?.id);
        break;

      case "delete":
        deletePost!({ postId: post?.id });
        break;

      case "disapprove":
        postDisliked ? undisapprove(post?.id) : disapprove(post?.id);
        break;

      case "repost":
        postReposted ? removeRepost(post?.id) : repost(post?.id);
        break;

      default:
        break;
    }
  }

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
        {post.parent && (
          <>
            <div className={styles.postHeader}>
              <AuthorDetailsComponent authorID={post!.parent.author_id} />
              <p>{dateFormatter(post!.time_created)}</p>
            </div>
            <p>{post.parent.body}</p>
            {postImage && (
              <img
                className={styles.postImage}
                src={postImage}
                alt="Accompanying post image"
              />
            )}
          </>
        )}
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
            {user && postDisliked ? (
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
            {user && postReposted ? (
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
          {user && user.id === post.author_id && (
            <ButtonComponent
              variant="postInteractionButton"
              onClick={() => handlePostInterraction("delete")}
            >
              <MdDelete style={{ color: "red" }} />
            </ButtonComponent>
          )}
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
