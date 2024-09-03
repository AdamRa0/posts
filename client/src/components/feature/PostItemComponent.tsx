import {
  MdOutlineThumbDownAlt,
  MdOutlineThumbUpAlt,
  MdModeComment,
  MdOutlineRepeatOn,
  MdOutlineRepeat,
  MdDelete,
  MdThumbUp,
  MdThumbDown,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

import styles from "./postitemcomponent.module.css";

import ButtonComponent from "@components/ui/ButtonComponent";
import AuthorDetailsComponent from "@components/ui/AuthorDetailsComponent";

import dateFormatter from "@helpers/dateFormatter";
import formatNumber from "@helpers/numericalFormatter";

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
import useFetchPostAuthorDetails from "@hooks/useFetchPostAuthorDetails";
import { useRemoveRepost, useRepost } from "@hooks/useRepostRemoveRepost";
import AuthPage from "@pages/AuthPage";

import { PostData } from "types/data/postData";

type PostItemComponentProps = {
  post: PostData;
};

export default function PostItemComponent({
  post,
}: PostItemComponentProps): React.JSX.Element {
  const postAuthor = useFetchPostAuthorDetails(post.author_id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { authenticatedUser } = useGetAuthenticatedUser();
  const navigate = useNavigate();

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

  function handleModal(e: { stopPropagation: () => void }) {
    e.stopPropagation();
    setIsModalOpen(!isModalOpen);
  }

  function handlePostInterraction(
    e: { stopPropagation: () => void },
    action: string
  ) {
    e.stopPropagation();

    if (authenticatedUser === undefined) {
      setIsModalOpen(true);
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

      case "comment":
        navigate(`/post/${post.id}`);
        break;

      case "repost":
        postReposted ? removeRepost(post.id) : repost(post.id);
        break;

      default:
        break;
    }
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
          onClick={(e) => handlePostInterraction(e, "approve")}
          disabled={postDisliked}
        >
          {postLiked ? <MdThumbUp /> : <MdOutlineThumbUpAlt />}
          {post.approvals >= 1000
            ? formatNumber(post.approvals)
            : post.approvals}
        </ButtonComponent>
        <ButtonComponent
          variant="postInteractionButton"
          onClick={(e) => handlePostInterraction(e, "disapprove")}
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
          onClick={(e) => handlePostInterraction(e, "repost")}
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
          onClick={(e) => handlePostInterraction(e, "comment")}
        >
          <MdModeComment />
          {post.comments >= 1000 ? formatNumber(post.comments) : post.comments}
        </ButtonComponent>
        {authenticatedUser && authenticatedUser.id === post.author_id && (
          <ButtonComponent
            variant="postInteractionButton"
            onClick={(e) => handlePostInterraction(e, "delete")}
          >
            <MdDelete style={{ color: "red" }} />
          </ButtonComponent>
        )}
      </div>
      {isModalOpen ? <AuthPage closeModal={(e) => handleModal(e)} /> : null}
    </>
  );
}
